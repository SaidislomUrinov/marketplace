import { model, Schema } from "mongoose";

const schema = new Schema({
    id: Number,
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (email) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email),
            message: "Invalid email format"
        }
    },
    password: String,
});
export default model('User', schema);