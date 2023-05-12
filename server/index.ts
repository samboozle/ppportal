import { Server } from "socket.io";
import dotenv from "dotenv";

import { rewriteSegment, writeYesteryearChronicles } from "./socket-callbacks";
import { createPodcastAuthor } from "./helpers";

dotenv.config();

const configureServer = (server: { httpServer: any }) => {
    const io = new Server(server.httpServer);

    io.on("connect", (socket) => {
        const podcastAuthor = createPodcastAuthor(socket);
        socket.on("writeYesteryearChronicles", writeYesteryearChronicles(socket, podcastAuthor));
        socket.on("rewriteSegment", rewriteSegment(socket, podcastAuthor));
    });
};

export const webSocketServer = {
    name: "webSocketServer",
    configureServer
};
