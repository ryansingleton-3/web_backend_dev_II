const data = require('../models/model');
const mongodb = require('../db/connect');


const professionalRoute = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('user').find()
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });

}
    

const homeRoute = (req, res) => {
    res.send('Hello Home!');
}


module.exports = {
    professionalRoute,
    homeRoute,
}
