import { User } from "../model/user.model.js";
import { fastify } from "../server.js";

export const GetUserMidlleware = async (req, reply, next) => {
    const authorization = req?.headers?.authorization;
    if (!authorization)
        return reply
            .status(401)
            .send({ statusCode: 401, message: "U need to auth" });
    const [bearer, token] = authorization.toString().split(" ");
    if (bearer && bearer.toLowerCase() == "bearer") {
        const result = fastify.jwt.verify(token);
        if (typeof result == "string")
            return reply.status(400).send({ statusCode: 400, message: result });
        const { username } = result;
        const user = await User.findOne({ where: { username } });
        if (!user)
            return reply
                .status(401)
                .send({ statusCode: 401, message: "plz try again" });
        req.user = user.dataValues;
        next();
    } else {
        return reply.send(401).send({
            statusCode: 401,
            mesage: "Ur token not valid",
        });
    }
};
