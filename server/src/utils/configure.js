import md5 from "md5";
import adminModel from "../models/admin.model.js";
import { ADMIN_PASS, ADMIN_USER } from "./env.js";
import path from 'path';
import fs from 'fs';
(async function () {
    try {
        const admin = await adminModel.findOne({ role: 'owner' });
        if (!admin) {
            new adminModel({
                username: ADMIN_USER,
                password: md5(ADMIN_PASS),
                role: 'owner'
            }).save();
        };
        const basePath = path.resolve("public");
        const folders = ["products", "categories", "videos"];

        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath);
        }

        folders.forEach(folder => {
            const folderPath = path.join(basePath, folder);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
        });
    } catch (error) {
        console.log(error.message);
    }
})()