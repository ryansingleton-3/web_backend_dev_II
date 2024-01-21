const cors = require("cors");
const routes = require("express").Router();
const contactsController = require("../controllers/contacts");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

routes.use("/api-docs", swaggerUi.serve);
routes.get("/api-docs", swaggerUi.setup(swaggerDocument));

routes.get("/", cors(), contactsController.homeRoute);
routes.get("/contacts", cors(), contactsController.getAllContacts);
routes.get("/contacts/:contact_id", cors(), contactsController.getOneContact);

// create a contact
routes.post("/contacts", cors(), contactsController.create);

// update a contact
routes.put("/contacts/:_id", cors(), contactsController.update);

// delete a contact or all contacts
routes.delete("/contacts/:_id", cors(), contactsController.deleteOne);
routes.delete("/contacts", cors(),contactsController.deleteAll);

module.exports = routes;

