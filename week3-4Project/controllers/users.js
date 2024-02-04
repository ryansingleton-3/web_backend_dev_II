const User = require("../models/users.js");

const getAllUsers = async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Endpoint to get all users'
  // #swagger.summary = 'Get all users'
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accessing the database", error: error });
  }
};

const getOneUser = async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Endpoint to get one user'
  // #swagger.summary = 'Get one user'

  const userId = req.params.user_id;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "User ID is required in the path." });
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accessing the database: " + error.message });
  }
};

const create = (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Endpoint to create a user'
  // #swagger.summary = 'Create a user'

  const { fullName, githubId, url } = req.body;

  // Validation
  if (!githubId) {
    return res.status(400).send({ message: "Github ID field cannot be empty!" });
  }
  if (!fullName) {
    return res.status(400).send({ message: "Full name is required!" });
  }
  if (!url) {
    return res.status(400).send({ message: "Url field cannot be empty!" });
  }

  // Create a User
  const user = new User({  fullName, githubId, url });

  // Save User in the database
  user
    .save()
    .then((data) => {
      res.send(
        `Success! ${data.fullName}'s account created with the id: ${data._id}.`
      );
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occurred while creating the User: " + err.message,
      });
    });
};

// Update a User by the id in the request
const update = (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Endpoint to update a user'
  // #swagger.summary = 'Update a user'
  /**
 * User model
 * @typedef {object} User
 * @property {string} fullName.required - Full name of the user
 * @property {string} githubId.required - GitHub ID of the user
 * @property {string} url.required - Profile URL of the user
 */


  const id = req.params._id;

  if (!id) {
    return res.status(400).send({
      message: "User ID is required.",
    });
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({ message: "User was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id + ": " + err.message,
      });
    });
};

// Delete a User with the specified id in the request
const deleteOne = (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Endpoint to delete a user'
  // #swagger.summary = 'Delete a user'

  const id = req.params._id;

  if (!id) {
    return res.status(400).send({
      message: "User ID is required.",
    });
  }

  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.status(200).send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id + ": " + err.message,
      });
    });
};

// Delete all Users from the database.
const deleteAll = (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Endpoint to delete all users'
  // #swagger.summary = 'Delete all users'
  User.deleteMany({})
    .then((data) => {
      res.status(200).send({
        message: `${data.deletedCount} Users were deleted successfully!`,
      });
    })
    .catch((err) => {
      console.error("Error deleting users: ", err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users.",
      });
    });
};



module.exports = {
  getAllUsers,
  getOneUser,
  create,
  update,
  deleteOne,
  deleteAll,
};
