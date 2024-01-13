const mongodb = require("../db/connect");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('cse341').collection("contacts").find();
    result.toArray().then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts);
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accessing the database", error: error });
  }
};

const getOneContact = async (req, res, next) => {
  const firstName = req.params.firstName;


  if (!firstName) {
    return res
      .status(400)
      .json({ message: "First name is required in the path." });
  }

  try {
    const caseInsensitiveQuery = new RegExp(`^${firstName}$`, "i");

    const result = await mongodb
      .getDb()
      .db('cse341')
      .collection("contacts")
      .findOne({ firstName: caseInsensitiveQuery });
    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Contact not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accessing the database", error: error });
  }
};

const homeRoute = (req, res) => {
  res.send("Hello Home!");
};

module.exports = {
  getAllContacts,
  getOneContact,
  homeRoute,
};
