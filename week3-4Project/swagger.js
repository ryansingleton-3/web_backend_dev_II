const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Reviews and Users API",
    description:
      "This API allows you to create, read, update, and delete reviews and users.",
  },
  host: "reviews-ya3k.onrender.com",
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
