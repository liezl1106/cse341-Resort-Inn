const mongodb = require('../data/connect');
const ObjectId = require('mongodb').ObjectId;

//get all Reservations
const getAllReservation = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('Reservations').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
}

//get Reservation by Id

const getReservationById = async(req, res) => {
    const reservationsId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Reservations').findOne({_id: reservationsId});
    if (result){
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } else {
        res.status(404).json({error: 'Reservation not found.'})
    }
}

//get reservation by client ID

const getReservationByClientId = async (req, res) => {
    const clientId = req.params.clientId;
    const result = await mongodb.getDatabase().db().collection('Reservations').find({clientId}).toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
}

module.exports = {
    getAllReservation,
    getReservationById,
    getReservationByClientId
}