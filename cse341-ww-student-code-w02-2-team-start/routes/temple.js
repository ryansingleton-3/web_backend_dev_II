const routes = require('express').Router();
const temples = require('../controllers/temple.js');
const cors = require('cors');

routes.get('/', cors(), temples.findAll);
routes.get('/published', cors(), temples.findAllPublished);
routes.get('/:temple_id', cors(), temples.findOne);

routes.put('/', temples.update);
routes.post('/', temples.create);

routes.delete('/:temple_id', temples.delete);
routes.delete('/', temples.deleteAll);

module.exports = routes;
