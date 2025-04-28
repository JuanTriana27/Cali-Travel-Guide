require('dotenv').config(); // Carga las variables definidas en el archivo .env

const { MongoClient, ObjectId } = require('mongodb');
const nodemailer = require('nodemailer');

// Función para introducir un retraso
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

exports.handler = async (event) => {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000, // 10 segundos
  });
  try {
    await client.connect();
    const db = client.db();
    const contactsCollection = db.collection('contacts');

    // Manejo para POST: Guardar un nuevo contacto
    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body);
      await contactsCollection.insertOne({
        ...data,
        createdAt: new Date()
      });
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Mensaje guardado' }, null, 2)
      };
    }

    // Manejo para GET: Enviar correos de forma concurrente y devolver los contactos
    else if (event.httpMethod === 'GET') {
      const contacts = await contactsCollection.find({}).toArray();

      if (contacts.length === 0) {
        return {
          statusCode: 404,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'No hay contactos disponibles' }, null, 2)
        };
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Filtrar contactos que tienen email
      const contactsWithEmail = contacts.filter(contact => contact.email);

      // Enviar todos los correos de forma concurrente
      const emailPromises = contactsWithEmail.map(contact => {
        const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="margin: 0; padding: 20px 14px; background-color: #f5f5f5; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
        <!-- Banner Superior -->
        <div style="background-color: #508ca4; padding: 15px; text-align: center;">
          <a href="https://calitravelguide.netlify.app/" target="_blank">
            <img 
              src="https://calitravelguide.netlify.app/banner/CALI%20TRAVEL%20GUIDE.png" 
              alt="Banner Cali Travel Guide"
              style="max-width: 500px; width: 100%; height: auto;"
            />
          </a>
        </div>

        <!-- Contenido Principal -->
        <div style="padding: 25px;">
          <h1 style="color: #2c3e50; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            Detalles de Inscripción
          </h1>

          <p style="color: #333; line-height: 1.6; margin-bottom: 25px;">
            Hola ${contact.name || 'usuario'},<br><br>
            Gracias por contactarnos. Aquí están los detalles de tu inscripción:
          </p>

          <!-- Detalles Importantes -->
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
            <h2 style="color: #34495e; font-size: 18px; margin-top: 0; margin-bottom: 15px;">
              📋 Información clave
            </h2>
            
            <ul style="padding-left: 20px; margin: 0; color: #7f8c8d;">
              <li style="margin-bottom: 8px;"><strong>Ingreso gratuito:</strong> Sin costo de acceso</li>
              <li style="margin-bottom: 8px;"><strong>Número de personas:</strong> Máximo 5 por inscripción</li>
              <li style="margin-bottom: 8px;"><strong>Horarios disponibles:</strong> 9:00 a.m., 12:00 p.m., 3:00 p.m.</li>
              <li><strong>Requisito:</strong> Presentar QR y documento de identificación</li>
            </ul>
          </div>

          <!-- Imagen Adjunta -->
          <div style="text-align: center; margin: 25px 0;">
            <img 
              src="cid:cartelImage" 
              alt="Instrucciones importantes"
              style="max-width: 100%; height: auto; border-radius: 6px; border: 1px solid #ddd;"
            />
            <p style="color: #95a5a6; font-size: 12px; margin-top: 8px;">
              Detalles adicionales en la imagen adjunta
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #2c3e50; padding: 15px; text-align: center;">
          <p style="color: #fff; margin: 5px 0; font-size: 12px;">
            © ${new Date().getFullYear()} Cali Travel Guide<br>
            Todos los derechos reservados
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

        return transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: contact.email,
          subject: 'Confirmación de Inscripción - Cali Travel Guide',
          html: emailHtml,
          attachments: [
            {
              filename: 'advertisement.png',
              path: 'https://registerapp.testweb2024.com/images/pieza1.png',
              cid: 'cartelImage'
            }
          ]
        });
      });

      // Esperar a que todos se envíen
      await Promise.all(emailPromises);

      // Devolver la lista de contactos junto con un mensaje de confirmación
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            message: 'Correos enviados',
            contacts: contacts
          },
          null,
          2
        )
      };
    }

    // Manejo para PUT: Actualizar un contacto existente
    else if (event.httpMethod === 'PUT') {
      const data = JSON.parse(event.body);
      if (!data.id) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'ID es requerido para actualizar' }, null, 2)
        };
      }
      const id = data.id;
      const existing = await contactsCollection.findOne({ _id: new ObjectId(id) });
      if (!existing) {
        return {
          statusCode: 404,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Contacto no encontrado' }, null, 2)
        };
      }

      // Construir el nuevo documento, reemplazando todos los campos, pero conservando createdAt
      const newDocument = {
        ...data,
        createdAt: existing.createdAt
      };
      delete newDocument.id;

      const result = await contactsCollection.replaceOne(
        { _id: new ObjectId(id) },
        newDocument
      );

      if (result.modifiedCount === 1 || result.matchedCount === 1) {
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'Contacto actualizado' }, null, 2)
        };
      } else {
        return {
          statusCode: 404,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Contacto no encontrado' }, null, 2)
        };
      }
    }

    // Manejo para DELETE: Eliminar un contacto
    else if (event.httpMethod === 'DELETE') {
      const data = JSON.parse(event.body || '{}');
      const id = data.id;
      if (!id) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'ID es requerido para eliminar' }, null, 2)
        };
      }
      const result = await contactsCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'Contacto eliminado' }, null, 2)
        };
      } else {
        return {
          statusCode: 404,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Contacto no encontrado' }, null, 2)
        };
      }
    }

    // Método no permitido
    else {
      return {
        statusCode: 405,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Method not allowed' }, null, 2)
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message }, null, 2)
    };
  } finally {
    await client.close();
  }
};