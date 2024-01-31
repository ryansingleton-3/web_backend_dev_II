const Review = require("../models/reviews.js");

const getAllReviews = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.description = 'Endpoint to get all reviews'
  // #swagger.summary = 'Get all reviews'
  try {
    const reviews = await Review.find({});
    res.json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accessing the database", error: error });
  }
};

const getOneReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.description = 'Endpoint to get one review'
  // #swagger.summary = 'Get one review'
  const reviewId = req.params.review_id;

  if (!reviewId) {
    return res
      .status(400)
      .json({ message: "Review ID is required in the path." });
  }

  try {
    const review = await Review.findById(reviewId);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: "Review not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accessing the database: " + error.message });
  }
};

const create = (req, res) => {
  // #swagger.tags = ['Reviews']
  // #swagger.description = 'Endpoint to create a review'
  // #swagger.summary = 'Create a review'

  const { text, starRating, reviewer } = req.body;

  // Validation
  if (!text) {
    return res.status(400).send({ message: "Text field cannot be empty!" });
  }
  if (!starRating) {
    return res.status(400).send({ message: "Star rating is required!" });
  }
  if (!reviewer) {
    return res.status(400).send({ message: "Reviewer field cannot be empty!" });
  }
  if (typeof starRating !== "number" || starRating < 1 || starRating > 5) {
    return res.status(400).send({
      message: "Invalid star rating. Must be a number between 1 and 5.",
    });
  }

  // Create a Review
  const review = new Review({ text, starRating, reviewer });

  // Save Review in the database
  review
    .save()
    .then((data) => {
      res.send(
        `Success! ${data.reviewer}'s review created with the id: ${data._id}.`
      );
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occurred while creating the Review: " + err.message,
      });
    });
};

// Update a Review by the id in the request
const update = (req, res) => {
  // #swagger.tags = ['Reviews']
  // #swagger.description = 'Endpoint to update a review'
  // #swagger.summary = 'Update a review'

  const id = req.params._id;

  if (!id) {
    return res.status(400).send({
      message: "Review ID is required.",
    });
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  Review.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Review with id=${id}. Maybe Review was not found!`,
        });
      } else {
        res.send({ message: "Review was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Review with id=" + id + ": " + err.message,
      });
    });
};

// Delete a Review with the specified id in the request
const deleteOne = (req, res) => {
  // #swagger.tags = ['Reviews']
  // #swagger.description = 'Endpoint to delete a review'
  // #swagger.summary = 'Delete a review'

  const id = req.params._id;

  if (!id) {
    return res.status(400).send({
      message: "Review ID is required.",
    });
  }

  Review.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Review with id=${id}. Maybe Review was not found!`,
        });
      } else {
        res.status(200).send({
          message: "Review was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Review with id=" + id + ": " + err.message,
      });
    });
};

// Delete all Reviews from the database.
const deleteAll = (req, res) => {
  // #swagger.tags = ['Reviews']
  // #swagger.description = 'Endpoint to delete all reviews'
  // #swagger.summary = 'Delete all reviews'
  Review.deleteMany({})
    .then((data) => {
      res.status(200).send({
        message: `${data.deletedCount} Reviews were deleted successfully!`,
      });
    })
    .catch((err) => {
      console.error("Error deleting reviews: ", err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all reviews.",
      });
    });
};

const homeRoute = (req, res) => {
  // #swagger.tags = ['default']
  // #swagger.description = 'Endpoint to get the home route'
  // #swagger.summary = 'Get the home route'

  try {
    res.send("Ryan Singleton - Home Route!");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accessing the home route", error: error });
  }
};

module.exports = {
  getAllReviews,
  getOneReview,
  create,
  update,
  deleteOne,
  deleteAll,
  homeRoute,
};
