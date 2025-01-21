import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user 

const loginUser = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({success: false, message: "Email and password are required"});
    }
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success:false, message:"Invalid credentials"})
        }
        const token = createToken(user._id);
        res.json({success:true, token});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Internal server error"}) 
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user

const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        // checking is user already exist
        const exists = await userModel.findOne({email});
        if(exists){
            return res.status(400).json({success:false, message:"User already exists"})
        }

        // validating email & strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false, message:"Invalid email"})
        } else if(password.length < 8){
            return res.status(400).json({success:false, message:"Password must be atleast 8 characters"})
        } 

        // hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newuser = new userModel({
            name: name,
            email : email,
            password: hashedPassword
        });

        const user = await newuser.save();
        const token = createToken(user._id);
        res.json({success:true, user, token});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Internal server error"})
    }
}

export { loginUser, registerUser };