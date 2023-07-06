import {
    createCategory,
    deleteCategory,
    getAllCategory,
    getOneCategory,
    updateCategory,
} from "../handlers/category.handler.js";
import { GetUserMidlleware } from "../utils/get-user.js";

const addCategoryRoute = {
    schema: {
        tags: ["Category"],
        summary: "add category",
        security: [{ apiKey: [] }],
        body: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                },
                parentID: {
                    type: "integer",
                },
            },
        },
    },
    handler: createCategory,
    preHandler: [GetUserMidlleware],
};
const getAllCategoryRoute = {
    schema: {
        tags: ["Category"],
        summary: "add category",
        security: [{ apiKey: [] }],
    },
    handler: getAllCategory,
    preHandler: [GetUserMidlleware],
};
const getOneCategoryRoute = {
    schema: {
        tags: ["Category"],
        summary: "get categpry ",
        security: [{ apiKey: [] }],
        params: {
            type: "object",
            properties: {
                id: { type: "string" },
            },
        },
    },
    handler: getOneCategory,
    preHandler: [GetUserMidlleware],
};
const removeCategoryRoute = {
    schema: {
        tags: ["Category"],
        summary: "remove categpry ",
        security: [{ apiKey: [] }],
        params: {
            type: "object",
            properties: {
                id: { type: "string" },
            },
        },
    },
    handler: deleteCategory,
    preHandler: [GetUserMidlleware],
};
const updateCategoryRoute = {
    schema: {
        tags: ["Category"],
        summary: "change categpry ",
        security: [{ apiKey: [] }],
        params: {
            type: "object",
            properties: {
                id: { type: "string" },
            },
        },
        body: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                },
            },
        },
    },
    handler: updateCategory,
    preHandler: [GetUserMidlleware],
};
export default function categoryRoutes(fastify, options, done) {
    fastify.post("/add", addCategoryRoute);
    fastify.patch("/update:id", updateCategoryRoute);
    fastify.get("/list", getAllCategoryRoute);
    fastify.get("/:id", getOneCategoryRoute);
    fastify.delete("/:id", removeCategoryRoute);
    done();
}
