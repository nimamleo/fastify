const indexRouter = {
    schema: {
        tags: ["home"],
        security: [{ apiKey: [] }],
        response: {
            200: {
                type: "object",
                properties: {
                    header: {
                        type: "object",
                        properties: { authorization: { type: "string" } },
                    },
                    message: { type: "string" },
                },
            },
        },
    },
    handler: (req, reply) => {
        reply.send({
            header: req.headers,
            message: "hello",
        });
    },
};

export default function indexRoute(fastify, options, done) {
    fastify.get("/", indexRouter);
    done();
}
