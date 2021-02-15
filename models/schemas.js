const mongoose = require('mongoose'); // MongoDB framework
const Schema = mongoose.Schema;

// ----- USERS -----
const coachSchema = Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: {
        type: { type: String, enum: ['Point'] },
        coordinates: [Number]
    },
    city: { type: String, required: true},
    phone: { type: String, default: '' },
    instant_msg: { type: Boolean, default: false },
    mail: { type: String, default: '' },
    web: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    bio: { type: String, default: '' }
}).index({ location: "2dsphere" });

const Coach = mongoose.model('coach', coachSchema);
// --------------------------------------------------------------------

exports.Coach = Coach;