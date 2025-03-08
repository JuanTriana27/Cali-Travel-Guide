const { MongoClient } = require('mongodb');

exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();
        const db = client.db();
        await db.collection('contacts').insertOne({
            ...data,
            createdAt: new Date()
        });
        return { statusCode: 200, body: 'Mensaje guardado' };
    } catch (error) {
        return { statusCode: 500, body: 'Error: ' + error.message };
    } finally {
        await client.close();
    }
};