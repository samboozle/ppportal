import type { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage } from "langchain/schema";
import { rewrite } from "../prompts/yesteryear-chronicles";
import type { YesteryearSegment } from "../types";
import type { Socket } from "socket.io";

export default (socket: Socket, chat: ChatOpenAI) =>
  async ({
    segment,
    original,
    adjustments
  }: {
    segment: YesteryearSegment;
    original: string;
    adjustments: string;
  }) => {
    socket.emit("addTokenToBuffer", `rewriting ${segment}\n\n`);

    const { text } = await chat.call([
      new HumanChatMessage(rewrite(segment, original, adjustments))
    ]);

    const json = JSON.parse(text);

    socket.emit("updateYesteryearEpisode", {
      segment,
      lines: json.lines
    });

    socket.emit("setBuffer", "");
  };
