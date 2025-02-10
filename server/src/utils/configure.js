import md5 from "md5";
import adminModel from "../models/admin.model.js";
import { ADMIN_PASS, ADMIN_USER } from "./env.js";

(async function () {
    try {
        const admin = await adminModel.findOne({ role: 'owner' });
        if (!admin) {
            new adminModel({
                username: ADMIN_USER,
                password: md5(ADMIN_PASS),
                role: 'owner'
            }).save();
        }
    } catch (error) {
        console.log(error.message);
    }
})()