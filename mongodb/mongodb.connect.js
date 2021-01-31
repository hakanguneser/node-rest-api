const mongoose = require('mongoose');

const MONGO_DB_URI = 'mongodb://mongo:27017/node-db';

async function connect() {
    try {
        await mongoose.connect(MONGO_DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }, () => {
            console.log('Mongo Connection succesfull');
        });
    } catch (error) {
        console.error('Error connecting to mongoDB');
        console.error(error);
    }
}

module.exports = {
    connect
};