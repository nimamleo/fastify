import { products } from "../db/products.js";
import { Category } from "../model/category.model.js";

export const createCategory = async (req, reply) => {
    const { name, parentID } = req.body;
    const newCategory = await Category.create({ name, parentID });
    await newCategory.save();
    return reply.status(201).send({
        message: "categoru created",
    });
};
export const getOneCategory = async (req, reply) => {
    const { id } = req.params;
    const category = await findCategory(id);
    console.log(category);
    return reply.status(200).send({
        category,
    });
};
export const getAllCategory = async (req, reply) => {
    const categories = await Category.findAll({});
    if (!categories) {
        return reply.status(404).send({
            message: "categoru not found",
        });
    }
    return reply.status(200).send({
        categories,
    });
};
export const updateCategory = async (req, reply) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await findCategory(id);
    category.setDataValue("name", name);
    await category.save();
    return reply.status(200).send({
        message: "categornoy update",
    });
};
export const deleteCategory = async (req, reply) => {
    const { id } = req.params;
    const category = await findCategory(id);
    category.destroy();
    return reply.status(200).send({
        message: "categornoy deleted",
    });
};

async function findCategory(id) {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
        return reply.status(404).send({
            message: "categornoy found",
        });
    }
    return category;
}
