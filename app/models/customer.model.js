const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    _id: String,
    firstname: String,
    lastname: String,
	age: { type: Number, min: 18, max: 65, required: true }
});

module.exports = mongoose.model('Customer', CustomerSchema);