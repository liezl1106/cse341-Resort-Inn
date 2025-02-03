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

module.exports = {
    getAllRestaurants,
    getRestaurantById,
    getRestaurantReservations
}