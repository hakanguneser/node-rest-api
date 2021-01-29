const express = require('express');
const memberRoutes = require('./routes/member.routes');
const mongoDB = require('./mongodb/mongodb.connect');
const app = express();

mongoDB.connect();

app.use(express.json());
app.use('/members', memberRoutes);
app.use('/', (req, res, next) => {res.json("Welcome to base URL");});

app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message
    });
});

module.exports = app;