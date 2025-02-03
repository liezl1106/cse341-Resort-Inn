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
        const activityData = req.body;
        const result = await mongodb.getDatabase().db().collection('Activities').insertOne(activityData);

        res.status(201).json({ message: 'Activity added successfully', activityId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add activity', details: error.message });
    }
};

// Update an activity
const updateActivity = async (req, res) => {
    try {
        const activityId = new ObjectId(req.params.id);
        const updateData = req.body;

        const result = await mongodb.getDatabase().db().collection('Activities').updateOne(
            { _id: activityId },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Activity not found.' });
        }

        res.status(200).json({ message: 'Activity updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update activity', details: error.message });
    }
};

module.exports = {
    getAllActivities,
    getActivityById,
    addActivity,
    updateActivity,
};