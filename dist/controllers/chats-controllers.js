import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-configs.js";
import { OpenAIApi } from "openai";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).send("User not found or Token malfuntioned");
        const chats = user.chats.slice(-4).map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        const config = configureOpenAI();
        const openIA = new OpenAIApi(config);
        const chatResponse = await openIA.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        const numTokensUsed = chatResponse.data.usage.total_tokens;
        console.log(`Número total de tokens utilizados: ${numTokensUsed}`);
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const getUserChats = async (req, res, next) => {
    try {
        //check if token is valid
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).send("User not found or Token malfuntioned");
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission denied");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        //response
        return res.status(400).json({ message: "Error", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //check if token is valid
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).send("User not found or Token malfuntioned");
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission denied");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        //response
        return res.status(400).json({ message: "Error", cause: error.message });
    }
};
//# sourceMappingURL=chats-controllers.js.map