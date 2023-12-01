const messageModel = require('../models/message')

const createMessage = async (req, res) => {
    const {chatId, senderId, content} = req.body

    const message = new messageModel({chatId, senderId, content});

    try{
        const response = await message.save();
        res.status(200).json(response);
    } catch(err){
        res.status(500).json("Internal Error:", err)
    }
};

const getMessages = async (req, res) => {
    const { chatId } = req.params;

    try{
        const messages = await messageModel.findOne({chatId});
        res.status(200).json(messages);
    } catch(err){
        res.status(500).json("Internal Error:", err)
    }
}

module.exports = { createMessage, getMessages }