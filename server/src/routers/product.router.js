import { Router } from "express";
import { admin } from "../middlewares/auth.js";
import productController from "../controllers/product.controller.js";

export default Router()
    .post('/add', admin, productController.create)
    .get('/list', admin, productController.list)