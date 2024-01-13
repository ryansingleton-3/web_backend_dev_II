const cors = require('cors');

const routes = require("express").Router();
const lesson1Controller = require("../controllers/professional");

routes.get("/", lesson1Controller.homeRoute);

routes.get("/professional", cors(), lesson1Controller.professionalRoute);

module.exports = routes;
