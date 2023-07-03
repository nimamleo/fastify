import Fastify from "fastify";
import productRoutes from "./routers/product.routes.js";
import indexRoute from "./routers/index.routes.js";

const PORT = 5000;
const fastify = Fastify({ logger: true });

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
