const swaggerAutogen = require('swagger-autogen')();

console.log('process.env.PORT', process.env.PORT);
const host = process.env.PORT == 8080? 'localhost:8080' : 'https://reviews-ya3k.onrender.com';
const doc = {
  info: {
    title: 'Reviews and Users API',
    description: 'This API allows you to create, read, update, and delete reviews and users.'
  },
  host: host,
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);