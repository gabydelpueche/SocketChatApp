const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: String,
    senderId: String,
    content: String
}, {
    timestamps: true,
})

module.exports = mongoose.model('SocketMessage', messageSchema);