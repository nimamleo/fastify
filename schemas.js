export const product = {
    type: "object",
    properties: {
        id: { type: "integer" },
        name: { type: "string" },
    },
};
export const getProductsItems = {
    schema: {
        response: {
            200: {
                type: "array",
                items: product,
            },
        },
    },
};
export const getOneProductItems = {
    schema: {
        response: {
            201: product,
        },
    },
};
