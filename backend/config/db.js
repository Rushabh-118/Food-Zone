import mongoose from "mongoose";

export const connectDB = async () => {
    const conn = await mongoose.connect("mongodb+srv://RushabhMistry:Rushu118@cluster0.tkkt5.mongodb.net/Tomato").then(() => console.log(`MongoDB Connected`));
} 
