import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import "./config/sequeliza.config.js";
import cors from "cors";
import {
    fastifySwaggerConfig,
    fastifySwaggerUiConfig,
} from "./config/swagger.config.js";
import indexRoute from "./routers/index.routes.js";
import productRoutes from "./routers/product.routes.js";
import authRouters from "./routers/auth.routes.js";
import fastifyBcrypt from "fastify-bcrypt";
import fastifyJwt from "@fastify/jwt";
import fastifyExpress from "@fastify/express";
import userRouters from "./routers/user.routes.js";
import categoryRoutes from "./routers/category.routes.js";

export const fastify = Fastify({
    logger: true,
});
const PORT = 5000;
const main = async () => {
    fastify.register(fastifyBcrypt, {
        saltWorkFactor: 12,
    });
    fastify.register(fastifyJwt, {
        secret: "secret",
    });
    await fastify.register(fastifyExpress);
    fastify.register(fastifySwagger, fastifySwaggerConfig);
    fastify.register(fastifySwaggerUi, fastifySwaggerUiConfig);
    fastify.use(cors());
    fastify.use((req, res, next) => {
        console.log("middleware");
        next();
    });
    fastify.register(indexRoute);
    fastify.register(authRouters, { prefix: "/auth" });
    fastify.register(productRoutes, { prefix: "/products" });
    fastify.register(userRouters, { prefix: "/user" });
    fastify.register(categoryRoutes, { prefix: "/category" });

    fastify.listen(
        {
            port: PORT,
        },
        (err) => {
            if (err) console.log(err);
            console.log(`server run on port ${fastify.server.address().port}`);
        }
    );
};
main();
