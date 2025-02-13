import { model, Schema } from "mongoose";
import { getNow } from "../utils/date.js";
const schema = new Schema({
    id: Number,
    title: String,
    desc: String,
    price: Number,
    discount: Number,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    images: Array,
    mainImage: Number,
    video: String,
    created: {
        type: Number,
        default: getNow
    }
});
export default model('Product', schema);