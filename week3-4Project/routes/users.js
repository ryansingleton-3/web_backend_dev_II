const routes = require("express").Router();
const usersController = require("../controllers/users");
const { isAuthenticated } = require("../middleware/authenticate");

routes.get("/", usersController.getAllUsers);
routes.get("/:user_id", usersController.getOneUser);

// create a user
routes.post("/", isAuthenticated, usersController.create);

// update a user
routes.put("/:_id", isAuthenticated, usersController.update);

// delete a user or all users
routes.delete("/:_id", isAuthenticated, usersController.deleteOne);
routes.delete("/", isAuthenticated, usersController.deleteAll);

module.exports = routes;