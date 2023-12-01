require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const userRoute = require('./routes/userRoutes')
const chatRoute = require('./routes/chatRoutes')
const messageRoute = require('./routes/messageRoutes')
const port = process.env.PORT || 3000

mongoose.connect(`mongodb+srv://gdelpu720:${process.env.MONGODB_PASSWORD}@cluster0.g7epr1c.mongodb.net/SocketChatApp`)
    .then(() => {
        console.log('Connected to Database');
    })
    .catch(err => {
        console.log('Failed to connect to database:', err.message)
    });

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', userRoute)
app.use('/chat', chatRoute)
app.use('/message', messageRoute)

app.get('/home', (req, res) =>{
    res.send("welcome to the chat app api")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});