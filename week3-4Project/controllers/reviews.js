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
      .json({ message: "Error accessing the database", error: error });
  }
};

const create = (req, res) => {
  // #swagger.tags = ['Reviews']
  // #swagger.description = 'Endpoint to create a review'
  // #swagger.summary = 'Create a review'
  // Validate request
  if (!req.body.text || !req.body.starRating || !req.body.reviewer) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Review
  const review = new Review({
    text: req.body.text,
    starRating: req.body.starRating,
    reviewer: req.body.reviewer,
  });
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
        message:
          err.message || "Some error occurred while creating the Review.",
      });
    });
};

/**
 * @swagger
 * /reviews/{_id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the review
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
 *         description: Review updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */

// Update a Review by the id in the request
const update = (req, res) => {
  // #swagger.tags = ['Reviews']
  // #swagger.description = 'Endpoint to update a review'
  // #swagger.summary = 'Update a review'

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  console.log(req.params._id);
  console.log(req.body);

  const id = req.params._id;

  Review.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Review with id=${id}. Maybe Review was not found!`,
        });
      } else res.send({ message: "Review was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Review with id=" + id,
      });
    });
};

// Delete a Review with the specified id in the request
const deleteOne = (req, res) => {
  // #swagger.tags = ['Reviews']
  // #swagger.description = 'Endpoint to delete a review'
  // #swagger.summary = 'Delete a review'

  const id = req.params._id;

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
        message: "Could not delete Review with id=" + id,
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
  res.send("Ryan Singleton - Home Route!");
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
