const mongodb = require('../data/connect');
const ObjectId = require('mongodb').ObjectId;

//get all clients
const getClients = async(req, res) => {
    const result = await mongodb.getDatabase().db().collection('clients').find().toArray();
    result.toArray().then((clients) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(clients);
    });
}


//get Single Clients
const getClientsById = async(req, res) =>{
    const clientId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('clients').findOne({_id: clientId});
    result.toArray().then((users) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    })
}

// Add a new client
const addClient = async (req, res) => {
    try {
        const clientData = req.body;
        const result = await mongodb.getDatabase().db().collection('clients').insertOne(clientData);
        res.status(201).json({ message: 'Client added successfully', clientId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add client', details: error.message });
    }
};

// Update a client
const updateClient = async (req, res) => {
    try {
        const clientId = new ObjectId(req.params.id);
        const updateData = req.body;
        const result = await mongodb.getDatabase().db().collection('clients').updateOne(
            { _id: clientId },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }

        res.status(200).json({ message: 'Client updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update client', details: error.message });
    }
};

module.exports = {
    getClients,
    getClientsById,
    addClient,
    updateClient,
};