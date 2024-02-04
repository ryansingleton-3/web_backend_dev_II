const swaggerAutogen = require("swagger-autogen")();
const local = "localhost:8080";
const render = "reviews-ya3k.onrender.com";

const doc = {
  info: {
    title: "Reviews and Users API",
    description:
      "This API allows you to create, read, update, and delete reviews and users.",
  },
  host: render,
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
