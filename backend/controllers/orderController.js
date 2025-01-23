import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//place order
const placeOrder = async (req, res) => {

    const frontendUrl = "https://food-zone-frontend.onrender.com";
    try {
        const newrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {}})

        //payment
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data : {
                    name: item.name
                },
                unit_amount: item.price*100 
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data : {
                    name: "Delivery Charges"
                },
                unit_amount: 20*100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items : line_items,
            mode: 'payment',
            success_url: `${frontendUrl}/verify?success=true&orderId=${newrder._id}`,
            cancel_url: `${frontendUrl}/verify?cancel=false&orderId=${newrder._id}`
        })

        res.status(200).json({success:true, session_url: session.url})

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"Internal server error"})
    }
}

const verifyOrder = async (req, res) => {
    const {success, orderId} = req.body;

    try {
        if(success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            res.json({success:true, message:"Payment success"})
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false, message:"Payment failed"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"Internal server error"})  
    }
}

// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success:true, data: orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "internal server error"});
    }
}

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data: orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "internal server error" })
    }
}

//updating the status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
        res.json({success: true, message: "Status Updated"})
    } catch (error) {
        console.log(error );
        res.json({success: tfalserue, message: "internal server error"})
    }
}

export { placeOrder,verifyOrder, userOrders, listOrders, updateStatus };
