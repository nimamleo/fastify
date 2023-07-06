// const indexRouter = {
//     schema: {
//         tags: ["home"],
//         security: [{ apiKey: [] }],
//         response: {
//             200: {
//                 type: "object",
//                 properties: {
//                     header: {
//                         type: "object",
//                         properties: { authorization: { type: "string" } },
//                     },
//                     message: { type: "string" },
//                 },
//             },
//         },
//     },
//     handler: (req, reply) => {
//         reply.send({
//             header: req.headers,
//             message: "hello",
//         });
//     },
// };

const middleware1 = (req, res, next) => {
    console.log("hi form middle ware 1");
    next();
};
const middleware2 = (req, res, next) => {
    console.log("hi form middle ware 2");
    next();
};

export default function indexRoute(fastify, options, done) {
    fastify.get(
        "/",
        { preHandler: [middleware1, middleware2] },
        (req, reply) => {
            reply.send({
                header: req.headers,
                message: "hello",
            });
        }
    );
    done();
}
