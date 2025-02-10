import jwt from 'jsonwebtoken';
import { ADMIN_JWT } from '../utils/env.js';
import adminModel from '../models/admin.model.js';
export const admin = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new Error('auth_error');
        }
        const access = authorization.split(' ')[1];
        const decoded = jwt.verify(access, ADMIN_JWT);
        const admin = await adminModel.findOne({ _id: decoded._id });
        if (!admin) {
            throw new Error('auth_error');
        }
        req.admin = admin;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).send({
            ok: false,
            msg: error.message
        });
    }
}