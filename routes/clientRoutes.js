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
router.delete('/clients/:id', clientsController.deleteClient);

//Routes for activities
router.get('/activities', activitiesController.getAllActivities);
router.get('/activities/:id', activitiesController.getActivityById);
router.delete('activities/:id', activitiesController.deleteActivity);

//Routes for reservations
router.get('/reservations', reservationsController.getAllReservation);
router.get('/reservations/:id', reservationsController.getReservationById);
router.get('/reservations/client/:clientId', reservationsController.getReservationByClientId);
router.delete('/reservations/:id', reservationsController.deleteReservation);

//Routes for restaurants
router.get('/restaurants', restaurantsController.getAllRestaurants);
router.get('/restaurants/:id', restaurantsController.getRestaurantById);
router.get('/restaurants/reservations', restaurantsController.getRestaurantReservations);
router.get('/restaurants/:id', restaurantsController.deleteRestaurant);

// POST to add a new activity
router.post('/activities', activitiesController.addActivity);

// PUT to update an activity
router.put('/activities/:id', activitiesController.updateActivity);

// POST to add a new client
router.post('/clients', clientsController.addClient);

// PUT to update a client
router.put('/clients/:id', clientsController.updateClient);

// POST to add a new reservation
router.post('/reservations/', reservationsController.addReservation);

// PUT to update a reservation
router.put('/reservations/:id', reservationsController.updateReservation);

// POST to add a new restaurant
router.post('/restaurants/', restaurantsController.addRestaurant);

// PUT to update a restaurant
router.put('/restaurants/:id', restaurantsController.updateRestaurant);

module.exports = router;
