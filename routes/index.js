const routes = require("express").Router();
const lesson1Controller = require("../controllers/lesson1");

routes.get("/", lesson1Controller.homeRoute);

routes.get("/ryan", lesson1Controller.ryanRoute);

routes.get("/alyssa", lesson1Controller.alyssaRoute);

module.exports = routes;