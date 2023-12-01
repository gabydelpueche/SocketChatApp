const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const key = process.env.SECRET_KEY;
    return jwt.sign({_id}, key, {expiresIn: "1hr"})
}

const registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body

        let user = await userModel.findOne({email});
    
        if (user) return res.status(400).json("User already exists");
    
        if (!name || !email || !password) return res.status(400).json("All fields are required");
    
        if (!validator.isEmail(email)) return res.status(400).json("Must use a valid email");
    
        if (!validator.isStrongPassword(password)) return res.status(400).json("Must use a strong password");
    
        user = new userModel({name, email, password})
    
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt);
        await user.save()
    
        const token = createToken(user._id)
    
        res.status(200).json({_id: user._id, name, email, token})
    } catch(err){
        res.status(500).json("Internal Error:", err)
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
        let user = await userModel.findOne({email});

        if(!user) return res.status(400).json('Invalid email or password')

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).json('Invalid email or password')

        const token = createToken(user._id);
    
        res.status(200).json({_id: user._id, name: user.name, email, token})

    } catch(err){
        res.status(500).json("Internal Error:", err)
    };
};

const findUser = async(req, res) => {
    const userId = req.params.userId;

    try{
        const user = await userModel.findById(userId);
        res.status(200).json(user)

    } catch(err){
        res.status(500).json("Internal Error:", err)
    }
};

const getUsers = async(req, res) => {
    try{
        const users = await userModel.find();
        res.status(200).json(users)

    } catch(err){
        res.status(500).json("Internal Error:", err)
    }
};

module.exports = { registerUser, loginUser, findUser, getUsers } 