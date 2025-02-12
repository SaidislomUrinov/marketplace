import { Schema } from "mongoose";

const schema = new Schema({
    id: Number,
    title: String,
    desc: String,
    price: Number,
    discount: Number,
    images: Array,
    mainImage: Number,
})