const chatModel = require('../models/chat')

const createChat = async(req, res) => {
    try{
        const { firstId, secondId } = req.body

        const chat = await chatModel.findOne({
            members: {$all : [firstId, secondId]}
        });
    
        if (chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [firstId, secondId]
        });

        const response = await newChat.save()

        res.status(200).json(response)

    } catch(err){
        res.status(500).json("Internal Error:", err)
    }
}

const findUserChats = async (req, res) => {
    try{
        const userId = req.params.userId

        const chats = await chatModel.find({
            members: {$in : [userId]}
        });

        res.status(200).json(chats)

    } catch(err){
        res.status(500).json("Internal Error:", err)
    }
};

const findChat = async (req, res) => {
    try{
        const { firstId, secondId } = req.params

        const chat = await chatModel.findOne({
            members: {$all : [firstId, secondId]}
        });

        res.status(200).json(chat)

    } catch(err){
        res.status(500).json("Internal Error:", err)
    }
};

module.exports = { createChat, findUserChats, findChat }