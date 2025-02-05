const mongodb = require('../data/connect');
const ObjectId = require('mongodb').ObjectId;

//get all Activities
const getAllActivities = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('Activities').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
}

//get Activity By Id
const getActivityById = async(req, res) => {
    const activitiesId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Activities').findOne({_id: activitiesId});
    if (result){
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } else {
        res.status(404).json({error: 'Activity not found.'})
    }
}

// Add a new activity
const addActivity = async (req, res) => {
    try {
        const { activityName, description, schedule, capacity, price, status } = req.body;
        const newActivity = new Activity({ activityName, description, schedule, capacity, price, status });
        await mongodb.getDatabase().db().collection('activities').insertOne(newActivity);
        res.status(201).json({message: 'Activity added successfully', activity: newActivity});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an activity
const updateActivity = async (req, res) => {
    try {
        const activityId  = new ObjectId(req.params.id);
        const { activityName, description, schedule, capacity, price, status } = req.body;
        const updateActivity = { activityName, description, schedule, capacity, price, status };
        
        const result = await mongodb.getDatabase().db().collection('Activities').updateOne({_id: activityId}, {$set: updateActivity});

        if (result.modifiedCount === 0){
            return res.status(404).json({message: 'Activity not found or no changes made.'});
        }
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllActivities,
    getActivityById,
    addActivity,
    updateActivity,
};