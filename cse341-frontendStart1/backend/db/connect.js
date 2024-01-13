const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');


let _db;


const initDb = (callback) => {
    if (_db) {
        console.log('Database is already connected!');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then(client => {
            console.log('Connected!');
            _db = client;
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

module.exports = {
    initDb,
    getDb
};
