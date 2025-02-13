import { model, Schema } from "mongoose";
import { getNow } from "../utils/date.js";
const schema = new Schema({
    id: Number,
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    type: {
        type: String,
        enum: ['simple', 'variant']
    },
    variant: {
        type: Schema.Types.ObjectId,
        ref: 'Product.variants'
    },
    quantity: Number,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    created: {
        type: Number,
        default: getNow
    },
    updated: {
        type: Number,
        default: getNow
    },
});
export default model('Order', schema);