const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const personSchema = new Schema({
    name: String,
    surname: String,
    alias: {type: String, required: true, unique: true},
    notes: String,
    level: {
        type: Number,
        default: 1
    },
    created_at: Date,
    updated_at: Date,
    //TODO: make attributes dynamic
    attrs: {
        nerdness: {type: Number, default: 0},
        techSkill: {type: Number, default: 0},
        socialSkill: {type: Number, default: 0},
        style: {type: Number, default: 0},
        appearance: {type: Number, default: 0},
        viability: {type: Number, default: 0},
        weirdness: {type: Number, default: 0},
        width: {type: Number, default: 0},
    },
    attrsVeriefied: {type: Boolean, default: true},
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