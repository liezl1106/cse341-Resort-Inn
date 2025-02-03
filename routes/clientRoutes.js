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

module.exports = router;