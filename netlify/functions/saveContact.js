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
      const emailPromises = contactsWithEmail.map(contact =>
        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: contact.email,
          subject: 'Notificación de Contacto',
          text: 
`Hola ${contact.name || 'usuario'}, 

Antes de realizar su inscripción, tenga en cuenta:
          
Ingreso gratuito: El acceso al ecoparque no tiene costo.
Número de personas: Máximo 5 personas por inscripción.
Horarios disponibles: 9:00 a.m., 12:00 p.m., 3:00 p.m.
Inscripción obligatoria: Debe presentar su QR y documento de identificación.
          
Adjunto encontraras más detalles en la imagen.
          
Saludos.`,

          attachments: [
            {
              filename: 'advertisement.png',
              path: 'https://registerapp.testweb2024.com/images/pieza1.png',
              cid: 'cartelImage'
            }
          ]
        })
      );

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