import Fastify from "fastify";
import { products } from "./products.js";
import { getOneProductItems, getProductsItems } from "./schemas.js";

const PORT = 5000;
const fastify = Fastify({ logger: true });

fastify.get("/", (req, reply) => {
    reply.send({
        message: "hello",
    });
});

fastify.get("/products",getProductsItems, (req, reply) => {
    reply.send(products);
});

fastify.get("/products/:id", getOneProductItems,(req, reply) => {
    const { id } = req.params;
    const product = products.find((p) => p.id == id);
    if (!product) reply.code(404).send({ message: "product not found" });
    reply.send(product);
});

const main = async () => {
    try {
        await fastify.listen(PORT);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

main();
