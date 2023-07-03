import { getOneProduct, getAllProducts } from "../handlers/product.handler.js";

const product = {
    type: "object",
    properties: {
        id: { type: "integer" },
        name: { type: "string" },
    },
};
const getProductsItems = {
    schema: {
        response: {
            200: {
                type: "array",
                items: product,
            },
        },
    },
    handler: getAllProducts,
};
const getOneProductItems = {
    schema: {
        response: {
            201: product,
        },
    },
    handler: getOneProduct,
};

export default function productRoutes(fastify, options, done) {
    fastify.get("/", getProductsItems);
    fastify.get("/:id", getOneProductItems);
    done();
}
