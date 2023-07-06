import {
    changeProfileHandler,
    getProfileHandler,
} from "../handlers/user.handler.js";
import { GetUserMidlleware } from "../utils/get-user.js";

const changeProfileRoute = {
    schema: {
        tags: ["user"],
        summary: "chnage user profile",
        security: [{ apiKey: [] }],
        body: {
            type: "object",
            properties: {
                address: {
                    type: "string",
                },
                latitudes: {
                    type: "string",
                },
                longitudes: {
                    type: "string",
                },
            },
        },
        response: {
            201: {
                type: "object",
            },
        },
    },
    handler: changeProfileHandler,
    preHandler: [GetUserMidlleware],
};
const getProfileRoute = {
    schema: {
        tags: ["user"],
        summary: "get user profile ",
        security: [{ apiKey: [] }],
        
    },
    handler: getProfileHandler,
    preHandler: [GetUserMidlleware],
};
export default function userRouters(fastify, options, done) {
    fastify.patch("/change", changeProfileRoute);
    fastify.get("/get", getProfileRoute);
    done();
}
