const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('../backend/db/connect');

const cors = require('cors');

const port = process.env.PORT || 8080;

app.use(cors());

app.use('/', require('./routes'));

mongodb.initDb((err, db) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Connected to db and listening at port: ${port}`);
        });
    }
});

