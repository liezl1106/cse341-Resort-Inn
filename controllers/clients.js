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

module.exports = {
    getClients,
    getClientsById
}