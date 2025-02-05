const mongodb = require('../data/connect');
const ObjectId = require('mongodb').ObjectId;

//get all Restaurants

const getAllRestaurants = async(req,res) =>{
    const result = await mongodb.getDatabase().db().collection('Restaurants').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

//get Restaurants by ID
const getRestaurantById = async(req,res) =>{
    const restaurantId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Restaurants').findOne({_id: restaurantId});
    if (result) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    }else{
        res.status(404).json({error: 'Restaurant not found.'});
    }
};

//get all restaurant reservations
const getRestaurantReservations = async (req, res) =>{
    const result = await mongodb.getDatabase().db().collection('Restaurants')
        .find({reservations: {$exists: true, $ne: []}})
        .project({restaurantName: 1, reservations: 1})
        .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
}

// Add a new restaurant
const addRestaurant = async (req, res) => {
    try {
        const { clientId, restaurantType, openingDate, closingDate, status, averageCost, paymentStatus } = req.body;

        if (!clientId || !restaurantType || !openingDate || !closingDate || !status || !averageCost || !paymentStatus) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const restaurantData = {
            clientId: new ObjectId(clientId),
            restaurantType,
            openingDate: new Date(openingDate),
            closingDate: new Date(closingDate),
            status,
            averageCost: Number(averageCost),
            paymentStatus,
        };

        const result = await mongodb.getDatabase().db().collection('Restaurants').insertOne(restaurantData);
     res.status(201).json({ message: 'Restaurant added successfully', restaurantId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add restaurant', details: error.message });
    }
};

// Update a restaurant
const updateRestaurant = async (req, res) => {
    try {
        const restaurantId = new ObjectId(req.params.id);
        const { clientId, restaurantType, openingDate, closingDate, status, averageCost, paymentStatus } = req.body;

        if (!clientId && !restaurantType && !openingDate && !closingDate && !status && !averageCost && !paymentStatus) {
            return res.status(400).json({ error: 'At least one field must be provided for update.' });
        }

        const updateData = {};

        if (clientId) updateData.clientId = new ObjectId(clientId);
        if (restaurantType) updateData.restaurantType = restaurantType;
        if (openingDate) updateData.openingDate = new Date(openingDate);
        if (closingDate) updateData.closingDate = new Date(closingDate);
        if (status) updateData.status = status;
        if (averageCost) updateData.averageCost = Number(averageCost);
        if (paymentStatus) updateData.paymentStatus = paymentStatus;

        const result = await mongodb.getDatabase().db().collection('Restaurants').updateOne(
            { _id: restaurantId },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Restaurant not found.' });
        }

        res.status(200).json({ message: 'Restaurant updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update restaurant', details: error.message });
    }
};

module.exports = {
    getAllRestaurants,
    getRestaurantById,
    getRestaurantReservations,
    addRestaurant,
    updateRestaurant,
};