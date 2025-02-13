import { model, Schema } from "mongoose";
import { getNow } from "../utils/date.js";
import orderModel from "./order.model.js";
const schema = new Schema({
    id: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['new', 'shipped', 'delivered', 'rejected'],
        default: 'new'
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'paypal', 'crypto', 'click', 'payme', 'cash'],
        default: 'cash'
    },
    paymentId: {
        type: String,
        unique: true,
        sparse: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'cancelled', 'cash on delivery'],
        default: 'pending'
    },
    trackingNumber: {
        type: String,
        default: null
    },
    courier: {
        type: String,
        default: null
    },
    address: {
        fullName: String,
        phone: String,
        country: String,
        city: String,
        street: String,
        postalCode: String,
        additionalInfo: String
    },
    created: {
        type: Number,
        default: getNow
    },
});
schema.methods.amount = async function () {
    try {
        const orders = await orderModel.aggregate([
            { $match: { cart: this._id } },
            {
                $project: {
                    totalPrice: { $multiply: ["$quantity", { $subtract: ["$price", "$discount"] }] }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$totalPrice" }
                }
            }
        ]);
        const totalAmount = orders.length > 0 ? orders[0].totalAmount : 0;
        return totalAmount;
    } catch (error) {
        console.log(error.message);
        return 0;
    }
};
export default model('Cart', schema);