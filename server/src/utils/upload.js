import path from 'path';
import fs from 'fs';

/**
 * Rasmni yuklash va saqlash funksiyasi
 * @param {Object} image - Fayl obyekti
 * @param {Object} video - Fayl obyekti
 * @param {String} folder - Saqlash kerak bo'lgan papka
 * @returns {String} filePath - Fayl yo'li
 */
export const uploadImage = async (image, folder) => {
    if (!image || !image.mimetype.startsWith('image/')) {
        throw new Error('Invalid or missing image');
    }
    const ext = path.extname(image.name);
    const fileName = `${image.md5}${ext}`;
    const filePath = `/public/${folder}/${fileName}`;
    const fullPath = `.${filePath}`;

    const dirPath = path.dirname(fullPath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    await image.mv(fullPath);
    return filePath;
};
export const uploadVideo = async (image, folder) => {
    if (!image || !image.mimetype.startsWith('video/')) {
        throw new Error('Invalid or missing image');
    }
    const ext = path.extname(image.name);
    const fileName = `${image.md5}${ext}`;
    const filePath = `/public/${folder}/${fileName}`;
    const fullPath = `.${filePath}`;

    const dirPath = path.dirname(fullPath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    await image.mv(fullPath);
    return filePath;
};