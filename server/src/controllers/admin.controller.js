import md5 from "md5";
import adminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { ADMIN_JWT } from "../utils/env.js";

export default {
    signIn: async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                throw new Error("fill_the_rows");
            }
            const admin = await adminModel.findOne({ username: username.toLowerCase().trim(), password: md5(password) });
            if (!admin) {
                throw new Error("invalid_user");
            }
            const access = jwt.sign({ _id: admin._id }, ADMIN_JWT, { expiresIn: '1d' });
            return res.send({
                ok: true,
                msg: "login_success",
                access,
                data: {
                    _id: admin._id,
                    role: admin.role,
                    username: admin.username
                }
            });
        } catch (error) {
            return res.status(401).send({
                ok: false,
                msg: error.message
            });
        }
    },
    verify: async (req,res)=>{
        const admin = req.admin;
        return res.send({
            ok: true,
            data: {
                _id: admin._id,
                role: admin.role,
                username: admin.username
            }
        })
    }
}