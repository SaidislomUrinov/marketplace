if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv');
    dotenv.config();
}
export const { PORT, MONGO_URI, ADMIN_USER, ADMIN_PASS, ADMIN_JWT, USER_JWT } = process.env;