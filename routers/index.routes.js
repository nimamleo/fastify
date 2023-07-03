import { index } from "../handlers/index.handler.js";

export default function indexRoute(fastify, options, done) {
    fastify.get("/", index);
    done()
}
