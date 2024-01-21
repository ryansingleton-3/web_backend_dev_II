const Contact = require("../models/contacts.js");

const getAllContacts = async (req, res, next) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Endpoint to get all contacts'
  // #swagger.summary = 'Get all contacts'
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accessing the database", error: error });
  }
};

const getOneContact = async (req, res, next) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Endpoint to get one contact'
  // #swagger.summary = 'Get one contact'
  const contactId = req.params.contact_id;

  if (!contactId) {
    return res
      .status(400)
      .json({ message: "Contact ID is required in the path." });
  }

  try {
    const contact = await Contact.findById(contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Contact not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accessing the database", error: error });
  }
};

const create = (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Endpoint to create a contact'
  // #swagger.summary = 'Create a contact'
  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Contact
  const contact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  });
  // Save Contact in the database
  contact
    .save()
    .then((data) => {
      res.send(
        `Success! ${data.firstName} ${data.lastName} contact created with the id: ${data._id}.`
      );
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact.",
      });
    });
};

/**
 * @swagger
 * /contacts/{_id}:
 *   put:
 *     summary: Update a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */

// Update a Contact by the id in the request
const update = (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Endpoint to update a contact'
  // #swagger.summary = 'Update a contact'

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  console.log(req.params._id);
  console.log(req.body);

  const id = req.params._id;

  Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else res.send({ message: "Contact was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Contact with id=" + id,
      });
    });
};

// Delete a Contact with the specified id in the request
const deleteOne = (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Endpoint to delete a contact'
  // #swagger.summary = 'Delete a contact'

  const id = req.params._id;

  Contact.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else {
        res.status(200).send({
          message: "Contact was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id,
      });
    });
};

// Delete all Contacts from the database.
const deleteAll = (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Endpoint to delete all contacts'
  // #swagger.summary = 'Delete all contacts'
  Contact.deleteMany({})
    .then((data) => {
      res.status(200).send({
        message: `${data.deletedCount} Contacts were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all contacts.",
      });
    });
};

const homeRoute = (req, res) => {
  // #swagger.tags = ['default']
  // #swagger.description = 'Endpoint to get the home route'
  // #swagger.summary = 'Get the home route'
  res.send("Ryan Singleton - Home Route!");
};

module.exports = {
  getAllContacts,
  getOneContact,
  create,
  update,
  deleteOne,
  deleteAll,
  homeRoute,
};
