import { Router } from "express";
import adminRouter from "./routers/admin.router.js";
import categoryRouter from "./routers/category.router.js";
import productRouter from "./routers/product.router.js";

export default Router()
.use('/admin', adminRouter)
.use('/category', categoryRouter)
.use('/product', productRouter)