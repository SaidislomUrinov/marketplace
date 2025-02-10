import { model, Schema } from "mongoose";
const schema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    access: String,
    role: {
        type: String,
        enum: ["owner", "admin"]
    }
});
export default model('Admin', schema);