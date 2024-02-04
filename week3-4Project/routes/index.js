const cors = require("cors");
const routes = require("express").Router();
const reviewsController = require("../controllers/reviews");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const passport = require("passport");

// use the swagger documentation
routes.use("/api-docs", swaggerUi.serve);
routes.get("/api-docs", swaggerUi.setup(swaggerDocument));

//home route
// routes.get("/", cors(), reviewsController.homeRoute);
routes.get("/", cors(), (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.fullName}`
      : "Logged Out"
  );
});

routes.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  cors(),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

// use the reviews routes
routes.use("/reviews", require("./reviews"));

// use the users routes
routes.use("/users", require("./users"));

routes.get("/login", passport.authenticate("github"), (req, res) => {
  console.log("logged in");
  res.redirect("/");
});

routes.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    } else {
      console.log("logged out");
      res.redirect("/");
    }
  });
});

module.exports = routes;
