import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import { json } from "@sveltejs/kit";
import { ChatOpenAI } from "langchain/chat_models/openai";

import { yesteryearDirective } from "./prompts/yesteryear-chronicles";
import writeYesteryearChronicles from "./socket-callbacks/writeYesteryearChronicles";

dotenv.config();

const configureServer = (server: { httpServer: any }) => {
    const podcastAuthor = new ChatOpenAI({
        temperature: 0.75,
        openAIApiKey: process.env.OPEN_AI_API_KEY,
        modelName: "gpt-3.5-turbo",
        streaming: true
    });

    const io = new Server(server.httpServer);

    io.on("connect", (socket) => {
        socket.emit("handshake", "Connection made successfully");
        socket.on("routeChange", (message) => {
            console.log("Client route: ", message);
        });
        socket.on("writeYesteryearChronicles", writeYesteryearChronicles(socket, podcastAuthor));
    });
};

// io.on(WritePodcastEvent.WriteYesteryearChronicles, async (episode) => {
//     await yesteryearAuthor.call([new SystemChatMessage(yesteryearDirective)]);

//     const response = {
//         intro: [] as YesteryearLine[],
//         shortStories: [] as YesteryearLine[],
//         popCulture: [] as YesteryearLine[],
//         deepDiveOne: [] as YesteryearLine[],
//         deepDiveTwo: [] as YesteryearLine[],
//         outro: [] as YesteryearLine[]
//     };

//     for (const [segment, prompt] of [
//         ["intro", intro(episode)]
//         // ["shortStories", shortStories]
//         // ["deepDiveOne", deepDiveOne]
//     ]) {
//         console.log("asking ", prompt);

//         const { text } = await yesteryearAuthor.call([new HumanChatMessage(prompt)]);

//         const json = JSON.parse(text);

//         console.log("got ", text);

//         response[segment as "intro" | "shortStories"] = json.lines as YesteryearLine[];
//     }
// });

export const webSocketServer = {
    name: "webSocketServer",
    configureServer
};
