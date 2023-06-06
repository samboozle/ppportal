import { Server } from "socket.io";
import dotenv from "dotenv";

import { rewriteSegment, writeYesteryearChronicles, voiceEleven } from "./socket-callbacks";
import { createPodcastAuthor } from "./helpers";

dotenv.config();

const configureServer = (server: { httpServer: any }) => {
  const io = new Server(server.httpServer);

  io.on("connect", (socket) => {
    // TODO -> entity memory and a dedicated chat window for adding adrian / becca lines
    const podcastAuthor = createPodcastAuthor(socket);
    socket.on("writeYesteryearChronicles", writeYesteryearChronicles(socket, podcastAuthor));
    socket.on("rewriteSegment", rewriteSegment(socket, podcastAuthor));
    socket.on("generateVoiceLine", voiceEleven(socket));
  });
};

export const webSocketServer = {
  name: "webSocketServer",
  configureServer
};
