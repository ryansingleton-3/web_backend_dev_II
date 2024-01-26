const cors = require("cors");
const routes = require("express").Router();
const reviewsController = require("../controllers/reviews");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

routes.use("/api-docs", swaggerUi.serve);
routes.get("/api-docs", swaggerUi.setup(swaggerDocument));

routes.get("/", cors(), reviewsController.homeRoute);
routes.get("/reviews", cors(), reviewsController.getAllReviews);
routes.get("/reviews/:review_id", cors(), reviewsController.getOneReview);

// create a review
routes.post("/reviews", cors(), reviewsController.create);

// update a review
routes.put("/reviews/:_id", cors(), reviewsController.update);

// delete a review or all reviews
routes.delete("/reviews/:_id", cors(), reviewsController.deleteOne);
routes.delete("/reviews", cors(),reviewsController.deleteAll);

module.exports = routes;

