import { getOneProduct, getAllProducts } from "../handlers/product.handler.js";
import { GetUserMidlleware } from "../utils/get-user.js";

const product = {
    type: "object",
    properties: {
        id: { type: "integer" },
        name: { type: "string" },
    },
};
const getProductsItems = {
    schema: {
        tags: ["products"],
        security: [{ apiKey: [] }],
        response: {
            200: {
                type: "object",
                properties: {
                    products: { type: "array" },
                    user: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            username: { type: "string" },
                        },
                    },
                },
            },
        },
    },
    handler: getAllProducts,
    preHandler: [GetUserMidlleware],
};
const getOneProductItems = {
    schema: {
        tags: ["products"],
        security: [{ apiKey: [] }],
        summary: "anything can be written here",
        params: {
            type: "object",
            properties: {
                id: { type: "string", description: "the id of product" },
            },
        },
        response: {
            201: product,
        },
    },
    handler: getOneProduct,
    preHandler: [GetUserMidlleware],
};

export default function productRoutes(fastify, options, done) {
    // fastify.addHook("onRequest", (request) => request.jwtVerify());
    fastify.get("/", getProductsItems);
    fastify.get("/:id", getOneProductItems);
    done();
}
