const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    numberOfRooms: {
        type: Number,
        required: true
    },
    address: {
        type: String, 
        required: true
    },
    ownerName: {
        type: String, 
        required: true
    },
    ownerPhone: {
        type: Number, 
        required: true
    },
    rent: {
        type: Number, 
        required: true
    },
    roomImageUrl: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('room', RoomSchema);