const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({

    patientName: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    doctor: {
        type: String,
        required: true
    },

    appointmentDate: {
        type: String,
        required: true
    },

    timeSlot: {
        type: String,
        required: true
    },

    symptoms: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Appointment = mongoose.model(
    "Appointment",
    appointmentSchema
);

module.exports = Appointment;