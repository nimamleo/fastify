import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequeliza.config.js";

export class User extends Model {}

User.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        first_name: { type: DataTypes.STRING },
        last_name: { type: DataTypes.STRING },
        username: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        avtive: { type: DataTypes.BOOLEAN, defaultValue: false },
        birthday: { type: DataTypes.DATE },
        token: { type: DataTypes.STRING, defaultValue: "" },
    },
    { sequelize, name: "user" }
);

// User.sync({ force: true });
