import { Sequelize } from "sequelize";
import env from "dotenv";
env.config();

export const sequelize = new Sequelize(
    `postgres://postgres:${process.env.DB_PASS}@localhost:5432/fastify`
);

export const DBConnection = async () => {
    await sequelize.authenticate();
    console.log("connection is connected");
};
DBConnection()
