const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const personSchema = new Schema({
    name: String,
    surname: String,
    alias: {type: String, required: true, unique: true},
    level: {
        type: Number,
        default: 1
    },
    created_at: Date,
    updated_at: Date,
    attrs: {
        multiplier: Number,
        nerdness: Number,
        techSkill: Number,
        socialSkill: Number,
        weirdness: Number,
        width: Number
    },
    profileImages: [{
        url: String
    }]
});

personSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;

    //TODO: Implement rating algorithm here

    next();
});

module.exports = mongoose.model('Person', personSchema);