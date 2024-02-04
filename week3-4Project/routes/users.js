const routes = require("express").Router();
const usersController = require("../controllers/users");
const { isAuthenticated } = require("../middleware/authenticate");

routes.get("/", usersController.getAllUsers);
routes.get("/:user_id", usersController.getOneUser);

// create a user
routes.post("/", isAuthenticated, usersController.create);

// update a user
/**
 * @route PUT /users/:_id
 * @param {string} _id.path.required - the user ID - application/json
 * @param {object} user.body.required - the user object to update - application/json
 * @group Users - Operations about user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
routes.put("/:_id", isAuthenticated, usersController.update);

// delete a user or all users
routes.delete("/:_id", isAuthenticated, usersController.deleteOne);
routes.delete("/", isAuthenticated, usersController.deleteAll);

module.exports = routes;