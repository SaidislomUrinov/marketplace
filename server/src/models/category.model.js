import { model, Schema } from "mongoose";
import productModel from "./product.model.js";
import { getNow } from "../utils/date.js";
const schema = new Schema({
    id: Number,
    title: String,
    image: String,
    active: {
        type: Boolean,
        default: true
    },
    created: {
        type: Number,
        default: getNow
    }
});
schema.methods.productsCount = async function () {
    try {
        const products = await productModel.countDocuments({ category: this._id });
        return products;
    } catch (error) {
        console.log(error.message);
        return 0;
    }
}
export default model('Category', schema);