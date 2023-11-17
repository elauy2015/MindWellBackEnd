import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-configs.js";
import { OpenAIApi } from "openai";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        const currentDate = new Date();
        const userChatsPerDay = user?.chatsPerDay;
        if (!user)
            return res.status(401).send("User not found or Token malfunctioned");
        if (user?.chatsPerDay?.numberOfChats > 48) {
            if (userChatsPerDay?.endDay &&
                new Date(userChatsPerDay.endDay) <= currentDate) {
                user.chatsPerDay = {
                    endDay: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
                    numberOfChats: 1,
                };
            }
            else {
                return res.status(201).send("Maximum chats per day recharted");
            }
        }
        else if (userChatsPerDay?.endDay) {
            user.chatsPerDay = {
                endDay: userChatsPerDay.endDay,
                numberOfChats: (userChatsPerDay.numberOfChats ?? 0) + 1,
            };
        }
        else {
            user.chatsPerDay = {
                endDay: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
                numberOfChats: 1,
            };
        }
        const chats = user.chats.map(({ role, content }) => ({
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
            return res.status(401).send("User not found or Token malfunctioned");
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