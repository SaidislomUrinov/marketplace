import fillModel from "../models/fill.model.js";
import productModel from "../models/product.model.js";

export default {
    create: async (req, res) => {
        try {
            const { title, desc, quantity, discount, mainImage, category, price, type, variants } = req.body;
            const images = req?.files?.images;
            const video = req?.files?.video;

            if (!title || !desc || !category || !type) {
                throw new Error('Fill the required fields');
            }
            if (!images?.[1]) {
                throw new Error('At least 2 image is required');
            }
            if (type === 'simple' && (!price || !quantity)) {
                throw new Error('Price and quantity are required for simple products');
            }
            if (type === 'variant' && (!variants?.[0])) {
                throw new Error('At least 1 variant is required');
            }

            const imagePaths = [];
            for (let i of images) {
                const filePath = await uploadImage(i, 'products');
                imagePaths.push(filePath);
            }
            const videoPath = video ? await uploadVideo(video, 'videos') : null;
            const id = await productModel.countDocuments() + 1;
            const product = new productModel({
                id,
                title,
                desc,
                images: imagePaths,
                video: videoPath,
                mainImage: mainImage || 0,
                category,
                type,
            });

            if (type === 'simple') {
                product.price = price;
                product.discount = discount || 0;
                await product.save();
                await new fillModel({
                    product: product._id,
                    quantity
                }).save();
            }

            if (type === 'variant') {
                for (let v of variants) {
                    const variantData = {
                        title: v?.title,
                        price: v?.price,
                        color: v?.color || '',
                        image: v?.image,
                        size: v?.size || '',
                        discount: v?.discount || 0,
                    };
                    product.variants.push(variantData);
                }
                await product.save();
                for (let i = 0; i < product.variants.length; i++) {
                    await new fillModel({
                        product: product._id,
                        variantId: product.variants[i]._id,
                        quantity: variants[i]?.quantity || 0
                    }).save();
                }
            }
            const data = {
                _id: product._id,
                id: product.id,
                title: product.title,
                image: product.images[product.mainImage || 0],
                category: product.category,
                type: product.type,
                price: product.type === 'simple' ? product.price : product?.variants?.[0]?.price,
                discount: product.type === 'simple' ? product.discount : product?.variants?.[0]?.discount,
                variants: product.variants.length
            }
            res.send({
                ok: true,
                msg: "Product successfully created",
                data
            });
        } catch (error) {
            res.send({
                ok: false,
                msg: error.message
            });
        }
    }
};
