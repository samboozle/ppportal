import type { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { yesteryearDirective } from "../prompts/yesteryear-chronicles";
import type { YesteryearLine, YesteryearEpisode } from "../types";
import type { Socket } from "socket.io";

export default (socket: Socket, chat: ChatOpenAI) => async (message: YesteryearEpisode) => {
    await chat.call([new SystemChatMessage(yesteryearDirective)]);

    const response = {
        intro: [] as YesteryearLine[],
        shortStories: [] as YesteryearLine[],
        popCulture: [] as YesteryearLine[],
        deepDiveOne: [] as YesteryearLine[],
        deepDiveTwo: [] as YesteryearLine[],
        outro: [] as YesteryearLine[]
    };
};
