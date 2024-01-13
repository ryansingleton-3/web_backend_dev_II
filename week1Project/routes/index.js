const cors = require('cors');

const routes = require("express").Router();
const contactsController = require("../controllers/contacts");

routes.get("/", cors(), contactsController.homeRoute);

routes.get("/contacts", cors(), contactsController.getAllContacts);

routes.get('/:firstName', cors(), contactsController.getOneContact);

module.exports = routes;
