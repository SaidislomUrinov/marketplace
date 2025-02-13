import { model, Schema } from "mongoose";
const schema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    variant: {
        type: Schema.Types.ObjectId,
        ref: 'Product.variants' 
    },
    quantity: Number
});

export default model('Fill', schema);
