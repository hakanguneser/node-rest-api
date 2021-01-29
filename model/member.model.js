const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    }
});

const MemberModel = mongoose.model('Member', MemberSchema);
module.exports = MemberModel;