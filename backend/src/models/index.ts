import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";
import mysql2 from 'mysql2';
import { initTaskModel } from './task.js';


const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, DIALECT } = process.env;

if (!DATABASE_NAME || !DATABASE_USERNAME || !DATABASE_PASSWORD || !DATABASE_HOST) {
    throw new Error("Missing required environment variables: DATABASE_NAME, ADMIN_USERNAME, ADMIN_PASSWORD, DATABASE_HOST")
}

export const sequelize = new Sequelize(
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    {
        host: DATABASE_HOST,
        port: Number(DATABASE_PORT),
        dialect: DIALECT as any,
        dialectModule: mysql2,
        logging: false,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    }

);

initTaskModel(sequelize);

export default sequelize;