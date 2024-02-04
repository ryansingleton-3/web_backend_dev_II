const cors = require("cors");
const routes = require("express").Router();
const reviewsController = require("../controllers/reviews");
const { isAuthenticated } = require("../middleware/authenticate");

routes.get("/", cors(), reviewsController.getAllReviews);
routes.get("/:review_id", cors(), reviewsController.getOneReview);

// create a review
routes.post("/", cors(), isAuthenticated, reviewsController.create);

// update a review
routes.put("/:_id", cors(), isAuthenticated, reviewsController.update);

// delete a review or all reviews
routes.delete("/:_id", cors(), isAuthenticated, reviewsController.deleteOne);
routes.delete("/", cors(), isAuthenticated, reviewsController.deleteAll);

module.exports = routes;