const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
    name: String,
    surname: String,
    alias: {type: String, unique: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);