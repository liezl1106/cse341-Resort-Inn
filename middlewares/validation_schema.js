const Joi = require('joi');

// Clients
const getClientsSchema = Joi.object({});
const getClientByIdSchema = Joi.object({
  id: Joi.string().required(),
});

const deleteClientSchema = Joi.object({
  id: Joi.string().required(),
});

const createClientSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  membershipLevel: Joi.string().required(),
  preferences: Joi.object().required(),
  loyaltyPoints: Joi.number().required(),
});

const updateClientSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  membershipLevel: Joi.string().required(),
  preferences: Joi.object().required(),
  loyaltyPoints: Joi.number().required(),
});

// Activities
const getActivitiesSchema = Joi.object({});
const getActivityByIdSchema = Joi.object({
  id: Joi.string().required(),
});

const deleteActivitySchema = Joi.object({
  id: Joi.string().required(),
});

const createActivitySchema = Joi.object({
  activityName: Joi.string().required(),
  description: Joi.string().required(),
  schedule: Joi.object().required(),
  capacity: Joi.number().required(),
  price: Joi.number().required(),
  status: Joi.string().required(),
});

const updateActivitySchema = Joi.object({
  activityName: Joi.string().required(),
  description: Joi.string().required(),
  schedule: Joi.object().required(),
  capacity: Joi.number().required(),
  price: Joi.number().required(),
  status: Joi.string().required(),
});

// Reservations
const getReservationsSchema = Joi.object({});
const getReservationByIdSchema = Joi.object({
  id: Joi.string().required(),
});

const getReservationsByClientIdSchema = Joi.object({
  clientId: Joi.string().required(),
});

const deleteReservationSchema = Joi.object({
  id: Joi.string().required(),
});

const createReservationSchema = Joi.object({
  clientId: Joi.string().required(),
  roomType: Joi.string().required(),
  checkInDate: Joi.string().required(),
  checkOutDate: Joi.string().required(),
  status: Joi.string().required(),
  totalPrice: Joi.number().required(),
  paymentStatus: Joi.string().required(),
});

const updateReservationSchema = Joi.object({
  clientId: Joi.string().required(),
  roomType: Joi.string().required(),
  checkInDate: Joi.string().required(),
  checkOutDate: Joi.string().required(),
  status: Joi.string().required(),
  totalPrice: Joi.number().required(),
  paymentStatus: Joi.string().required(),
});

// Restaurants
const getRestaurantsSchema = Joi.object({});
const getRestaurantByIdSchema = Joi.object({
  id: Joi.string().required(),
});

const deleteRestaurantSchema = Joi.object({
  id: Joi.string().required(),
});

const createRestaurantSchema = Joi.object({
  restaurantName: Joi.string().required(),
  cuisineType: Joi.string().required(),
  menu: Joi.object().required(),
  reservations: Joi.object().required(),
  location: Joi.string().required(),
});

const updateRestaurantSchema = Joi.object({
    restaurantName: Joi.string().required(),
    cuisineType: Joi.string().required(),
    menu: Joi.object().required(),
    reservations: Joi.object().required(),
    location: Joi.string().required(),
});



module.exports = {
  clients: {
    getAll: getClientsSchema,
    getOne: getClientByIdSchema,
    deleteOne: deleteClientSchema,
    createOne: createClientSchema,
    updateOne: updateClientSchema,
  },
  activities: {
    getAll: getActivitiesSchema,
    getOne: getActivityByIdSchema,
    deleteOne: deleteActivitySchema,
    createOne: createActivitySchema,
    updateOne: updateActivitySchema,
  },
  reservations: {
    getAll: getReservationsSchema,
    getOne: getReservationByIdSchema,
    getByClientId: getReservationsByClientIdSchema,
    deleteOne: deleteReservationSchema,
    createOne: createReservationSchema,
    updateOne: updateReservationSchema,
  },
  restaurants: {
    getAll: getRestaurantsSchema,
    getOne: getRestaurantByIdSchema,
    deleteOne: deleteRestaurantSchema,
    createOne: createRestaurantSchema,
    updateOne: updateRestaurantSchema,
  },
};