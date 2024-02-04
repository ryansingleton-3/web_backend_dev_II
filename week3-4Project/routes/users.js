const cors = require("cors");
const routes = require("express").Router();
const usersController = require("../controllers/users");
const { isAuthenticated } = require("../middleware/authenticate");

routes.get("/", cors(), usersController.getAllUsers);
routes.get("/:review_id", cors(), usersController.getOneUser);

// create a review
routes.post("/", cors(), isAuthenticated, usersController.create);

// update a review
routes.put("/:_id", cors(), isAuthenticated, usersController.update);

// delete a review or all users
routes.delete("/:_id", cors(), isAuthenticated, usersController.deleteOne);
routes.delete("/", cors(), isAuthenticated, usersController.deleteAll);

module.exports = routes;