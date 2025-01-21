import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item
const addFood = async (req, res) => {

    if (!req.file || !req.file.filename) {
        return res.status(400).json({ success: false, message: "Image file is required" });
    }

    try {
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.file.filename,
            category: req.body.category
        });
        await food.save();
        res.json({ success: true, message: "Item added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Item not added" });
    }
};


//list food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data: foods});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Items not found"})
    }
}

//remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=> {});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Item removed successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Item not removed"})
    }
}

export { addFood, listFood, removeFood };
