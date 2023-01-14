import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    name : {
        type: String,
        required: true
    },
    mobileNo:{
        type: String,
        required: true
    },
    deliveryAddress :{
        type: String,
        required: true
    },
    paymentMode:{
        type: String
    },
    total:{
        type: Number
    },
    date:{
        type: Date,
        default: new Date().now
    },
    status:{
        type: String,
        default: "pending"
    },
    items: []
});
export const Order = mongoose.model("order",orderSchema);