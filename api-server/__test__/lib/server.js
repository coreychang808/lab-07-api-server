'use strict';

const express = require('express');

const notFound = require('./middleWare/404.js');

const serverError = require('./middleWare/500.js');

const app = express();

let db = [];

// Get current time
let timeStamp = (req, res, next) => {
    req.requestedTime = new Date();
    next();
}

let logger = (req, res, next) => {
    console.log(` This request was made at ${req.requestedTime} using a ${req.method} method at ${req.path}`);
    next();
}

let valid = (res, req, next) =>{
    req.trueOrFalse = Math.random() >= 0.5;
    if (Math.random() >= 0.5) {
        next();
    }
    next("500");
}

app.use(express.json());

app.use(timeStamp);

app.use(logger);

// app.use(valid);

// Route to Get All Categories
app.get('/categories', valid, (req, res, next) => {
  let count = db.length;
  let results = db;
  res.json({ count, results });
//   next();
});

// Route to Create a Category
app.post('/categories', valid, (req, res, next) => {
    let record = req.body;
    record.id = Math.random();
    db.push(record);
    res.json(record);
});


// 404 Route
// This will get called on any route we don't have defined
app.use('*', notFound);

app.use(serverError);

module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`listening on ${PORT}`));
    },
};