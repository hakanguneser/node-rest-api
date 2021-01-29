const express = require('express');
const memberRoutes = require('./routes/member.routes');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000;
const MONGO_DB_URI = 'mongodb://localhost:27017/node-db';

app.use('/members', memberRoutes);

app.use('/', (req, res, next) => {
    console.log("123");
    res.json("Welcome to base URL");
});

mongoose.connect(MONGO_DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => {
    console.log('DB connection done');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})