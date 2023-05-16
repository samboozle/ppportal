import type { YesteryearEpisode, YesteryearLine } from "$lib/data/yesteryear";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { OPEN_AI_API_KEY } from "$env/static/private";
import { json } from "@sveltejs/kit";
import {
  intro,
  yesteryearDirective,
  yesteryearFormatting
} from "$lib/prompts/yesteryear-chronicles";

const yesteryearAuthor = new ChatOpenAI({
  temperature: 0.75,
  openAIApiKey: OPEN_AI_API_KEY,
  modelName: "gpt-3.5-turbo"
});

const writeYesteryearChronicles = async (episode: YesteryearEpisode) => {
  await yesteryearAuthor.call([new SystemChatMessage(yesteryearDirective)]);

  const response = {
    intro: [] as YesteryearLine[],
    shortStories: [] as YesteryearLine[],
    popCulture: [] as YesteryearLine[],
    deepDiveOne: [] as YesteryearLine[],
    deepDiveTwo: [] as YesteryearLine[],
    outro: [] as YesteryearLine[]
  };

  for (const [segment, prompt] of [
    ["intro", intro(episode)]
    // ["shortStories", shortStories]
    // ["deepDiveOne", deepDiveOne]
  ]) {
    const { text } = await yesteryearAuthor.call([new HumanChatMessage(prompt)]);

    const json = JSON.parse(text);

    response[segment as "intro" | "shortStories"] = json.lines as YesteryearLine[];
  }

  return response;
};

export const POST = async ({ request }) => {
  const { episode } = await request.json();
  const written = await writeYesteryearChronicles(episode);
  return json(written);
};
