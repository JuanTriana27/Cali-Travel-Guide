const { MongoClient, ObjectId } = require('mongodb');

exports.handler = async (event) => {
  const client = new MongoClient(process.env.MONGODB_URI);
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
    // Manejo para GET: Listar todos los contactos
    else if (event.httpMethod === 'GET') {
      const contacts = await contactsCollection.find({}).toArray();
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contacts, null, 2)
      };
    }
    // Manejo para PUT: Actualizar un contacto existente (reemplaza el documento, conservando createdAt)
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
    // Manejo para DELETE: Eliminar un contacto (se espera el id en el body)
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