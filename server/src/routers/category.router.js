import { Router } from "express";
import { admin } from "../middlewares/auth.js";
import categoryController from "../controllers/category.controller.js";

export default Router()
    .post('/add', admin, categoryController.create)
    .get('/list', admin, categoryController.list)
    .put('/update', admin, categoryController.update)
    .delete('/delete', admin, categoryController.delete)
    .put('/switchStatus', admin, categoryController.switchStatus)