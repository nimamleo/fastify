import Fastify from "fastify";
import productRoutes from "./routers/product.routes.js";
import indexRoute from "./routers/index.routes.js";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
    fastifySwaggerConfig,
    fastifySwaggerUIConfig,
} from "./config/swagger.config.js";
import "./config/sequeliza.config.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 5000;
const fastify = Fastify({ logger: true });
dotenv.config();

fastify.register(fastifySwagger, fastifySwaggerConfig);
fastify.register(fastifySwaggerUi, fastifySwaggerUIConfig);
fastify.register(indexRoute);
fastify.register(productRoutes, { prefix: "/products" });

const main = async () => {
    fastify.listen(
        {
            port: PORT,
        },
        (err) => {
            if (err) console.log(err);
            console.log(
                `server is running on port ${fastify.server.address().port}`
            );
        }
    );
};

main();
