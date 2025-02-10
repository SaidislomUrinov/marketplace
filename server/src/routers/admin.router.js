import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import { admin } from "../middlewares/auth.js";

export default Router()
    .post('/signin', adminController.signIn)
    .get('/verify', admin, adminController.verify)