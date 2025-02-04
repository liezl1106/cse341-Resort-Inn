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

// Add a new reservation
const addReservation = async (req, res) => {
    try {
        const { clientId, roomType, checkInDate, checkOutDate, status, totalPrice, paymentStatus } = req.body;

        if (!clientId || !roomType || !checkInDate || !checkOutDate || !status || !totalPrice || !paymentStatus) {
            return res.status(400).json({error: 'All fields are required.'});
        }

        const reservationData = {
            clientId: new ObjectId(clientId),
            roomType,
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate),
            status,
            totalPrice,
            paymentStatus
        };

        const result = await mongodb.getDatabase().db().collection('Reservations').insertOne(reservationData);
        res.status(201).json({ message: 'Reservation added successfully', reservationId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add reservation', details: error.message });
    }
};

// Update a reservation
const updateReservation = async (req, res) => {
    try {
        const reservationId = new ObjectId(req.params.id);
        const { clientId, roomType, checkInDate, checkOutDate, status, totalPrice, paymentStatus } = req.body;

        if (!clientId && !roomType && !checkInDate && !checkOutDate && !status && !totalPrice && !paymentStatus) {
            return res.status(400).json({error: 'At least one field must be provided for update.'})
        }

        //update object
        const updateData = {}

        if (clientId) updateData.clientId = new ObjectId(clientId);
        if (roomType) updateData.roomType = roomType;
        if (checkInDate) updateData.checkInDate = new Date(checkInDate);
        if (checkOutDate) updateData.checkOutDate =  new Date(checkOutDate);
        if (status) updateData.status = status;
        if (totalPrice) updateData.totalPrice = Number(totalPrice);
        if (paymentStatus) updateData.paymentStatus = paymentStatus;

        const result = await mongodb.getDatabase().db().collection('Reservations').updateOne(
            { _id: reservationId },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Reservation not found.' });
        }

        res.status(200).json({ message: 'Reservation updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update reservation', details: error.message });
    }
};

module.exports = {
    getAllReservation,
    getReservationById,
    getReservationByClientId,
    addReservation,
    updateReservation,
};