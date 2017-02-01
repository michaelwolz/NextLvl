const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const ratingAttrsSchema = new Schema({
    Title: String
});

module.exports = mongoose.model('RatingAttrs', ratingAttrsSchema);

/*
 nerdness: {type: Number, default: 0},
 techSkill: {type: Number, default: 0},
 socialSkill: {type: Number, default: 0},
 style: {type: Number, default: 0},
 appearance: {type: Number, default: 0},
 viability: {type: Number, default: 0},
 weirdness: {type: Number, default: 0},
 width: {type: Number, default: 0},
*/