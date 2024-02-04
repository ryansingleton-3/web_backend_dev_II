const cors = require("cors");
const routes = require("express").Router();
const usersController = require("../controllers/users");
const { isAuthenticated } = require("../middleware/authenticate");

routes.get("/", cors(), usersController.getAllUsers);
routes.get("/:user_id", cors(), usersController.getOneUser);

// create a user
routes.post("/", cors(), isAuthenticated, usersController.create);

// update a user
routes.put("/:_id", cors(), isAuthenticated, usersController.update);

// delete a user or all users
routes.delete("/:_id", cors(), isAuthenticated, usersController.deleteOne);
routes.delete("/", cors(), isAuthenticated, usersController.deleteAll);

module.exports = routes;