const express = require('express');
const router = express.Router();

//controllers for collections
const clientsController = require('../controllers/clients');
const activitiesController = require('../controllers/Activities');
const reservationsController = require('../controllers/Reservations');
const restaurantsController = require('../controllers/Restaurants');

//Routes for clients

router.get('/clients', clientsController.getClients);
router.get('/clients/:id', clientsController.getClientsById);


//Routes for activities
router.get('/activities', activitiesController.getAllActivities);
router.get('/activities/:id', activitiesController.getActivityById);

//Routes for reservations
router.get('/reservations', reservationsController.getAllReservation);
router.get('/reservations/:id', reservationsController.getReservationById);
router.get('/reservations/client/:clientId', reservationsController.getReservationByClientId);

//Routes for restaurants
router.get('/restaurants', restaurantsController);
router.get('/restaurants/:id', restaurantsController.getRestaurantById);
router.get('/restaurants/reservations', restaurantsController.getRestaurantReservations);

// POST to add a new activity
router.post('/', activitiesController.addActivity);

// PUT to update an activity
router.put('/:id', activitiesController.updateActivity);

// POST to add a new client
router.post('/', clientsController.addClient);

// PUT to update a client
router.put('/:id', clientsController.updateClient);

// POST to add a new reservation
router.post('/', reservationsController.addReservation);

// PUT to update a reservation
router.put('/:id', reservationsController.updateReservation);

// POST to add a new restaurant
router.post('/', restaurantsController.addRestaurant);

// PUT to update a restaurant
router.put('/:id', restaurantsController.updateRestaurant);


module.exports = router;