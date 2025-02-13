import { model, Schema } from "mongoose";
import { getNow } from "../utils/date.js";
import fillModel from "./fill.model.js";
import orderModel from "./order.model.js";
const schema = new Schema({
    id: Number,
    title: String,
    desc: String,
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    images: Array,
    mainImage: Number,
    type: {
        type: String,
        enum: ["simple", "variant"]
    },
    video: String,
    created: {
        type: Number,
        default: getNow
    },
    active: {
        type: Boolean,
        default: true
    },
    variants: [{
        title: String,
        price: Number,
        color: String,
        image: Number,
        size: String,
        discount: Number,
    }],
});
schema.methods.quantity = async function () {
    try {
        const fillsData = await fillModel.aggregate([
            { $match: { product: this._id } },
            { $group: { _id: null, quantity: { $sum: '$quantity' } } }
        ]);
        const fills = fillsData.length > 0 ? fillsData[0].quantity : 0;
        const ordersData = await orderModel.aggregate([
            {
                $lookup: {
                    from: "carts",
                    localField: "cart",
                    foreignField: "_id",
                    as: "cartData"
                }
            },
            { $unwind: "$cartData" },
            { $match: { "cartData.status": { $ne: "rejected" }, product: this._id } },
            { $group: { _id: null, quantity: { $sum: '$quantity' } } }
        ]);
        const sold = ordersData.length > 0 ? ordersData[0].quantity : 0;
        return fills - sold;
    } catch (error) {
        console.log(error.message);
        return 0;
    }
};
schema.methods.variantsQuantity = async function () {
    try {
        const variantsData = await fillModel.aggregate([
            { $match: { product: this._id } },
            { $group: { _id: '$variant', quantity: { $sum: '$quantity' } } },
            { $lookup: { from: 'variants', localField: '_id', foreignField: '_id', as: 'variantData' } },
            { $unwind: '$variantData' },
            {
                $group: {
                    _id: null,
                    variants: {
                        $push: {
                            _id: '$variantData._id',
                            title: '$variantData.title',
                            price: '$variantData.price',
                            color: '$variantData.color',
                            size: '$variantData.size',
                            stock: '$quantity'
                        }
                    }
                }
            }
        ]);
        const ordersData = await orderModel.aggregate([
            {
                $lookup: {
                    from: "carts",
                    localField: "cart",
                    foreignField: "_id",
                    as: "cartData"
                }
            },
            { $unwind: "$cartData" },
            {
                $match: {
                    "cartData.status": { $ne: "rejected" },
                    product: this._id,
                    type: "variant"
                }
            },
            { $group: { _id: '$variant', quantity: { $sum: '$quantity' } } }
        ]);
        const variants = variantsData.length > 0 ? variantsData[0].variants.map(variant => {
            const soldVariant = ordersData.find(order =>
                order._id && order._id.toString() === variant._id.toString()
            );
            return {
                ...variant,
                sold: soldVariant ? soldVariant.quantity : 0,
                available: variant.stock - (soldVariant ? soldVariant.quantity : 0)
            };
        }) : [];

        return variants;

    } catch (error) {
        console.log(error.message);
        return [];
    }
};
export default model('Product', schema);
