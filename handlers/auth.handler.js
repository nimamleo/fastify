import { fastify } from "./../server.js";
import { User } from "../model/user.model.js";

export const registerHandler = async (req, reply) => {
    const { username, password, first_name, last_name } = req.body;
    const newUser = await User.create({
        first_name,
        last_name,
        username,
        password: await fastify.bcrypt.hash(password),
    });
    await newUser.save();
    reply.send(newUser);
};
export const loginHandler = async (req, reply) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return reply.status(404).send({message:"user not found"})
    const compareResult = await fastify.bcrypt.compare(password, user.password);
    if (compareResult) {
        return reply.status(200).send({ message: "login success" });
    }
    reply.status(401).send({
        message: "username or password is incorrect",
    });
};
