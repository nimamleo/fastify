import { fastify } from "./../server.js";
import { User } from "../model/user.model.js";

export const registerHandler = async (req, reply) => {
    try {
        const { username, password, first_name, last_name } = req.body;
        const newUser = await User.create({
            first_name,
            last_name,
            username,
            password: await fastify.bcrypt.hash(password),
        });
        await newUser.save();
        reply.send(newUser);
    } catch (err) {
        console.log(err);
    }
};
export const loginHandler = async (req, reply) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) return reply.status(404).send({ message: "user not found" });
        const compareResult = await fastify.bcrypt.compare(
            password,
            user.password
        );
        if (compareResult) {
            const token = fastify.jwt.sign(
                {
                    username,
                },
                {
                    expiresIn: "1d",
                }
            );
            user.setDataValue("token", token);
            await user.save();
            console.log(user.dataValues);
            reply.send({
                message: "login successfully",
                user,
            });
        } else {
            reply.status(401).send({
                message: "username or password is incorrect",
            });
        }
    } catch (err) {
        console.log(err);
    }
};
