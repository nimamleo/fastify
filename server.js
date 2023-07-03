import Fastify from "fastify";
import productRoutes from "./routers/product.routes.js";
import indexRoute from "./routers/index.routes.js";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const PORT = 5000;
const fastify = Fastify({ logger: true });

fastify.register(fastifySwagger);
fastify.register(fastifySwaggerUi, {
    prefix: "swagger",
    swagger: {
        info: { title: "fastify sawgger" },
        tags: [{ name: "products", description: "products Routes" }],
    },
});
fastify.register(indexRoute);
fastify.register(productRoutes, { prefix: "/products" });

const main = async () => {
    try {
        await fastify.listen(PORT);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

main();
