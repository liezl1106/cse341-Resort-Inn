const mongodb = require('../data/connect');
const ObjectId = require('mongodb').ObjectId;

//get all Activities
const getAllActivities = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('activities').find().toArray();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

//get Activity By Id
const getActivityById = async (req, res) => {
  const activitiesId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('activities')
    .findOne({ _id: activitiesId });
  if (result) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } else {
    res.status(404).json({ error: 'Activity not found.' });
  }
};

// Add a new activity
const addActivity = async (req, res) => {
  try {
    const { activityName, description, schedule, capacity, price, status } = req.body;
    const newActivity = {
      activityName,
      description,
      schedule,
      capacity,
      price,
      status
    };
    await mongodb.getDatabase().db().collection('activities').insertOne(newActivity);
    res
      .status(201)
      .json({ message: 'Activity added successfully', ActivityId: newActivity.insertedId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an activity
const updateActivity = async (req, res) => {
  try {
    const activityId = new ObjectId(req.params.id);
    const { activityName, description, schedule, capacity, price, status } = req.body;

    if (
      !activityName ||
      !description ||
      !schedule ||
      !capacity ||
      !price ||
      !status === undefined
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const updateActivity = {
      activityName: req.body.activityName,
      description: req.body.description,
      schedule: req.body.schedule,
      day: req.body.schedule.day,
      time: req.body.schedule.time,
      capacity: req.body.capacity,
      price: req.body.price,
      status: req.body.status
    };

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('activities')
      .replaceOne({ _id: activityId }, updateActivity);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Activity not found or no changes made.' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteActivity = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid activity id to delete an activity');
  }
  const activityId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('activities')
    .deleteOne({ _id: activityId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while deleting the activity');
  }
};

module.exports = {
  getAllActivities,
  getActivityById,
  addActivity,
  updateActivity,
  deleteActivity
};
