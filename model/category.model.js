import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequeliza.config.js";

export const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    parentID: {
        type: DataTypes.STRING,
        unique: true,
    },
});

// Category.hasMany(Category , {as:"children" , foreignKey:"parentID"})
// Category.belongsTo(Category , {as:"children" , foreignKey:"parentID"})

// Category.sync({ alter: true }).then(() => {
//     console.log("User Sync completed");
// });
