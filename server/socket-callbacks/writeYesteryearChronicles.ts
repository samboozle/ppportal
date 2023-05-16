import type { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import {
  yesteryearDirective,
  intro,
  shortStories,
  deepDive,
  popCulture,
  outro,
  summary
} from "../prompts/yesteryear-chronicles";
import type { YesteryearEpisode } from "../types";
import type { Socket } from "socket.io";
import { sleep } from "../helpers";

export default (socket: Socket, chat: ChatOpenAI) => async (message: YesteryearEpisode) => {
  await chat.call([new SystemChatMessage(yesteryearDirective)]);
  // await chat.call({ input: yesteryearDirective });

  await sleep(1500);

  socket.emit("setBuffer", "");

  for (const [segment, prompt] of [
    ["intro", intro(message)],
    ["shortStories", shortStories(message)],
    ["deepDiveOne", deepDive(message, "One")],
    ["deepDiveTwo", deepDive(message, "Two")],
    ["popCulture", popCulture(message)],
    ["outro", outro(message)],
    ["summary", summary(message)]
  ]) {
    socket.emit("addTokenToBuffer", `writing ${segment}\n\n`);

    console.log("prompt for", segment, prompt);

    const { text } = await chat.call([new HumanChatMessage(prompt)]);
    // const { text } = await chat.call({ input: prompt });

    const json = JSON.parse(text);

    socket.emit("updateYesteryearEpisode", {
      segment,
      lines: json.lines
    });

    socket.emit("setBuffer", "");
  }
};
