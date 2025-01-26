import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'

export const signup = async (req, res)=>{
    const {username, password, email} = req.body;

    if(!username || !password || !email) return res.json({error: 'All feild requied'});

    const user = await userModel.findOne({email});
    if(user) return res.json({error: 'User already exists'});

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    await userModel.create({
        username,
        password:hash,
        email
    });

    res.json({message: 'Signup successfull'})

};
export const login = async (req, res)=>{
    const {email, password} = req.body;
    
    if(!email || !password) return res.json({error: 'All feild requied'});

    const user = await userModel.findOne({email});
    if(!user) return res.json({error: 'user not found'});

    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword) return res.json({error: 'Password is wrong'})
    
    const token = jwt.sign({email,userID: user._id}, process.env.JWT_SCERET);
    
    res.cookie('token', token);
    
    res.json({message: 'Login successfull', token, user })

};
