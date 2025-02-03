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

module.exports = {
    getAllActivities,
    getActivityById
}