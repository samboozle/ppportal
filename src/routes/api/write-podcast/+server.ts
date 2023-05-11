import type { YesteryearEpisode, YesteryearLine } from "$lib/data/yesteryear";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { OPEN_AI_API_KEY } from "$env/static/private";
import { json } from "@sveltejs/kit";
import { yesteryearDirective, yesteryearFormatting } from "$lib/prompts/yesteryear-chronicles";

const yesteryearAuthor = new ChatOpenAI({
    temperature: 0.75,
    openAIApiKey: OPEN_AI_API_KEY,
    modelName: "gpt-3.5-turbo"
});

const writeYesteryearChronicles = async (episode: YesteryearEpisode) => {
    console.log(episode);

    const intro = `
Write the introduction to today's episode, starting with "Welcome to 'The Yesteryear Chronicles'...".
Offer an overview of the show, mentioning three of the topics.
Adrian and Becca should play off of each other in this introduction.
Write each host's line in his or her voice based on their personalities and preferences.
The date is ${episode.date}. Include a joke about time.

Here are today's topics:
${[
    episode.deepDiveOneTopic,
    episode.deepDiveTwoTopic,
    ...episode.shortStoriesTopics,
    ...episode.popCultureTopics
]
    .map((topic) => `- ${topic}`)
    .join("\n")}

${yesteryearFormatting}
`;

    const shortStories = `
Write the Short Stories segment for ${episode.date}. This will cover several topics (listed below).

Here are today's topics:
${[...episode.shortStoriesTopics].map((topic) => `- ${topic}`).join("\n")}
    
Write the segment surveying these topics with banter between Adrian and Becca. Please write a LONG segment, covering each story with at least 5 sentences. Your output should be at least 250 tokens. Use only reliable sources.

${yesteryearFormatting}
`;

    const deepDiveOne = `
Create a segment for 'The Yesteryear Chronicles,' a podcast that explores historical events from a specific MM/DD date.
  - {topic_date}.
  - Host 1: Adrian, a middle-aged man, warm, professorial, enjoys world history and sports.
  - Host 2: Becca, a mid-20s woman, upbeat, relatable, enjoys science, music, and birthdays.
  - Segment type: {segment_type}.
  - Length: {word_limit} words.
  - Topic(s) to cover: .
`;

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
        ["intro", intro]
        // ["shortStories", shortStories]
        // ["deepDiveOne", deepDiveOne]
    ]) {
        console.log("asking ", prompt);

        const { text } = await yesteryearAuthor.call([new HumanChatMessage(prompt)]);

        const json = JSON.parse(text);

        console.log("got ", text);

        response[segment as "intro" | "shortStories"] = json.lines as YesteryearLine[];
    }

    return response;
};

export const POST = async ({ request }) => {
    const { episode } = await request.json();
    const written = await writeYesteryearChronicles(episode);
    return json(written);
};
