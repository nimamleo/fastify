export const fastifySwaggerConfig = {
    swagger: {
        info: {
            title: "fastify swagger",
            description: "swagger docs on py prj",
            version: "0.1.0",
        },
        tags: [
            {
                name: "products",
                description: "admin can write and read product",
            },
        ],
        host: "http://localhost:5000",
        schemes: ["http"],
        securityDefinitions: {
            apiKey: { type: "apiKey", in: "header", name: "authorization" },
        },
        security: [{ apiKey: [] }],
    },
};



export const fastifySwaggerUIConfig = {
    prefix: "swagger",
    exposeRoute: true,
}