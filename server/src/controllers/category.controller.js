import categoryModel from "../models/category.model.js";
import { formatDate } from "../utils/date.js";
import { uploadImage } from "../utils/upload.js";
import fs from 'fs'
export default {
    create: async (req, res) => {
        try {
            const { title } = req.body;
            const image = req?.files?.image;
            if (!title || !image) {
                throw new Error('Fill the required fields');
            }
            const filePath = await uploadImage(image, 'categories');
            const id = await categoryModel.countDocuments() + 1;
            const category = new categoryModel({
                id,
                title,
                image: filePath
            });
            await category.save();
            return res.status(201).send({
                ok: true,
                msg: 'Category created successfully',
                data: {
                    _id: category._id,
                    id: category.id,
                    title: category.title,
                    image: category.image,
                    active: category.active,
                    created: formatDate(category.created),
                    products: await category.productsCount()
                }
            });
        } catch (error) {
            return res.status(400).send({
                ok: false,
                msg: error.message
            });
        }
    },
    list: async (_, res) => {
        try {
            const categories = await categoryModel.find().sort({ created: -1 }).select('title image active id created');
            const data = [];
            for (let c of categories) {
                data.push({
                    _id: c._id,
                    id: c.id,
                    title: c.title,
                    image: c.image,
                    active: c.active,
                    created: formatDate(c.created),
                    products: await c.productsCount()
                })
            }
            return res.send({
                ok: true,
                data
            });
        } catch (error) {
            res.send({
                ok: false,
                msg: error.message
            })
        }
    },
    update: async (req, res) => {
        try {
            const { _id } = req.query;
            const { title } = req.body;
            const image = req?.files?.image;
            const category = await categoryModel.findById(_id);
            if (!category) {
                throw new Error('Category not found');
            }
            if (image) {
                if (fs.existsSync(`.${category.image}`)) {
                    fs.unlinkSync(`.${category.image}`);
                }
                category.image = await uploadImage(image, 'categories');
            }
            category.title = title ?? category.title;
            await category.save();
            return res.send({
                ok: true,
                msg: 'Category updated successfully',
                data: {
                    _id: category._id,
                    title: category.title,
                    image: category.image,
                }
            });
        } catch (error) {
            res.status(400).send({
                ok: false,
                msg: error.message
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { _id } = req.query;
            const category = await categoryModel.findById(_id);
            if (!category) {
                throw new Error('Category not found');
            }
            if (fs.existsSync(`.${category.image}`)) {
                fs.unlinkSync(`.${category.image}`);
            }
            await category.deleteOne();
            return res.send({
                ok: true,
                msg: 'Category deleted successfully'
            });
        } catch (error) {
            res.status(400).send({
                ok: false,
                msg: error.message
            });
        }
    },
    switchStatus: async (req, res) => {
        try {
            const { _id } = req.query;
            const category = await categoryModel.findById(_id);
            if (!category) {
                throw new Error('Category not found');
            }
            category.active = !category.active;
            await category.save();
            return res.send({
                ok: true,
                msg: 'Category status switched successfully',
            });
        } catch (error) {
            return res.status(400).send({
                ok: false,
                msg: error.message
            })
        }
    }
}