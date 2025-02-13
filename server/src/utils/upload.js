import path from 'path';
import fs from 'fs';

/**
 * Rasmni yuklash va saqlash funksiyasi
 * @param {Object} image - Fayl obyekti
 * @param {String} folder - Saqlash kerak bo'lgan papka
 * @returns {String} filePath - Fayl yo'li
 */
export const uploadImage = async (image, folder) => {
    if (!image || !image.mimetype.startsWith('image/')) {
        throw new Error('Invalid or missing image');
    }

    const ext = path.extname(image.name); // Fayl kengaytmasi (.jpg, .png, ...)
    const fileName = `${image.md5}${ext}`; // Unikal nom yaratish
    const filePath = `/public/${folder}/${fileName}`;
    const fullPath = `.${filePath}`;

    // Papka mavjudligini tekshiramiz, bo'lmasa yaratamiz
    const dirPath = path.dirname(fullPath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    // Faylni saqlaymiz
    await image.mv(fullPath);
    
    return filePath;
};
