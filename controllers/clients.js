const mongodb = require('../data/connect');
const ObjectId = require('mongodb').ObjectId;

//get all clients
const getClients = async (req, res) => {
  //#swagger.tags=['clients']
  const result = await mongodb.getDatabase().db().collection('clients').find();
  result.toArray().then((clients) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(clients);
  });
};

//get Single Clients
const getClientsById = async (req, res) => {
  //#swagger.tags=['clients']
  console.log('Controller - ID from params:', req.params.id);
  const clientId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('clients').find({ _id: clientId });
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
  });
};


// Add a new client
const addClient = async (req, res) => {
  //#swagger.tags=['clients']
  try {
    const { name, phone, email, address, membershipLevel, preferences, loyaltyPoints } = req.body;

    if (
      !name ||
      !phone ||
      !email ||
      !address ||
      !membershipLevel ||
      !preferences ||
      !loyaltyPoints === undefined
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newClient = {
      name,
      phone,
      email,
      address,
      membershipLevel,
      preferences: {
        roomType: preferences.roomType,
        dietaryRestrictions: preferences.dietaryRestrictions,
        preferredActivities: preferences.preferredActivities
      },
      loyaltyPoints
    };

    const result = await mongodb.getDatabase().db().collection('clients').insertOne(newClient);
    res.status(201).json({ message: 'Client added successfully', clientId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add client', details: error.message });
  }
};

// Update a client
const updateClient = async (req, res) => {
  //#swagger.tags=['clients']
  try {
    const clientId = new ObjectId(req.params.id);
    const { name, phone, email, address, membershipLevel, preferences, loyaltyPoints } = req.body;

    if (
      !name ||
      !phone ||
      !email ||
      !address ||
      !membershipLevel ||
      !preferences ||
      !loyaltyPoints === undefined
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const updateData = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      membershipLevel: req.body.membershipLevel,
      preferences: req.body.preferences,
      roomType: req.body.preferences.roomType,
      dietaryRestrictions: req.body.preferences.dietaryRestrictions,
      preferredActivities: req.body.preferences.preferredActivities
    };

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('clients')
      .replaceOne({ _id: clientId }, updateData);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.status(200).json({ message: 'Client updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update client', details: error.message });
  }
};

const deleteClient = async (req, res) => {
  //#swagger.tags=['clients']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid client id to delete');
  }
  const clientId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('clients')
    .deleteOne({ _id: clientId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while deleting the client');
  }
};

module.exports = {
  getClients,
  getClientsById,
  addClient,
  updateClient,
  deleteClient
};
