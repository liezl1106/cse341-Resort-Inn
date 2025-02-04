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
        const { clientId, restaurantName, cuisineType, menu, reservations, location } = req.body;

        if (!clientId || !restaurantName || !cuisineType || !menu || !reservations || !location) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        //format menu
        const formattedMenu = menubar.map(item =>({
            itemName: item.itemName,
            price: Number(item.price),
            dietaryInfo: Array.isArray(item.dietaryInfo) ? item.dietaryInfo : []
        }));


        //reservations
        const formattedReservations = Array.isArray(reservations)
            ? reservations.map(res => ({
                reservationsDate: new Date(res.reservationDate),
                numOfGuests: Number(res.numOfGuests),
                status: res.status
            }))
            : [];

        const restaurantData = {
            clientId: new ObjectId(clientId),
            restaurantName,
            cuisineType,
            menu: formattedMenu,
            reservations: formattedReservations,
            location
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
        const { clientId, restaurantName, cuisineType, menu, reservations, location } = req.body;

        if (!clientId && !restaurantName && !cuisineType && !menu && !reservations && !location) {
            return res.status(400).json({ error: 'At least one field must be provided for update.' });
        }

        const updateData = {};

        if (clientId) updateData.clientId = new ObjectId(clientId);
        if (restaurantName) updateData.restaurantName = restaurantName;
        if (cuisineType) updateData.cuisineType = cuisineType;
        if (menu && Array.isArray(menu)) {
            updateData.menu = menu.map(item => ({
                itemName: item.itemName,
                price: Number(item.price),
                dietaryInfo: Array.isArray(item.dietaryInfo) ? item.dietaryInfo : []
            }));
        }
        if (reservations && Array.isArray(reservations)) {
            updateData.reservations = reservations.map(res => ({
                reservationDate: new Date(res.reservationDate),
                numOfGuests: Number(res.numOfGuests),
                status: res.status
            }));
        }
        if (location) updateData.location = location;
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