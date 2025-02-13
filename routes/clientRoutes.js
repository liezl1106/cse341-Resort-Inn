const express = require('express');
const router = express.Router();

// validate
const { joiValidation } = require('../middlewares/joi');

// validation schema/rule
const { clients, activities, reservations, restaurants } = require('../middlewares/validation_schema');



//swagger
router.use('/', require('./swagger'));


//controllers for collections
const clientsController = require('../controllers/clients');
const activitiesController = require('../controllers/Activities');
const reservationsController = require('../controllers/Reservations');
const restaurantsController = require('../controllers/Restaurants');

//Routes for clients

// Routes for clients
router.get('/clients', joiValidation(clients.getAll), clientsController.getClients);
router.get('/clients/:id', joiValidation(clients.getOne), clientsController.getClientsById);
router.delete('/clients/:id', joiValidation(clients.deleteOne), clientsController.deleteClient);

// Routes for activities
router.get('/activities', joiValidation(activities.getAll), activitiesController.getAllActivities);
router.get('/activities/:id', joiValidation(activities.getOne), activitiesController.getActivityById);
router.delete('/activities/:id', joiValidation(activities.deleteOne), activitiesController.deleteActivity);

// Routes for reservations
router.get('/reservations', joiValidation(reservations.getAll), reservationsController.getAllReservation);
router.get('/reservations/:id', joiValidation(reservations.getOne), reservationsController.getReservationById);
router.get('/reservations/client/:clientId', joiValidation(reservations.getByClientId), reservationsController.getReservationByClientId);
router.delete('/reservations/:id', joiValidation(reservations.deleteOne), reservationsController.deleteReservation);


// Routes for restaurants
router.get('/restaurants', joiValidation(restaurants.getAll), restaurantsController.getAllRestaurants);
router.get('/restaurants/:id', joiValidation(restaurants.getOne), restaurantsController.getRestaurantById);
//router.get('/restaurants/reservations/clientId', restaurants.getReservationsByClientId, restaurantsController.getRestaurantReservationsByClient);
router.delete('/restaurants/:id', joiValidation(restaurants.deleteOne), restaurantsController.deleteRestaurant);


// POST to add a new activity
router.post('/activities', joiValidation(activities.createOne), activitiesController.addActivity);

// PUT to update an activity
router.put('/activities/:id', joiValidation(activities.updateOne), activitiesController.updateActivity);

// POST to add a new client
router.post('/clients', joiValidation(clients.createOne), clientsController.addClient);

// PUT to update a client
router.put('/clients/:id', joiValidation(clients.updateOne), clientsController.updateClient);

// POST to add a new reservation
router.post('/reservations/', joiValidation(reservations.createOne), reservationsController.addReservation);

// PUT to update a reservation
router.put('/reservations/:id', joiValidation(reservations.updateOne), reservationsController.updateReservation);

// POST to add a new restaurant
router.post('/restaurants/', joiValidation(restaurants.createOne), restaurantsController.addRestaurant);

// PUT to update a restaurant
router.put('/restaurants/:id', joiValidation(restaurants.updateOne), restaurantsController.updateRestaurant);


module.exports = router;
