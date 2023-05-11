import fs from "fs";
import { yesteryearEpisode } from "$lib/stores";
import type { YesteryearEpisode, YesteryearLine } from "../data/yesteryear";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
// import { OPEN_AI_API_KEY } from "$env/static/private";

// For each segment of the episode, ask it to write a target length about a target topic

export const writeYesteryearChronicles = async (episode: YesteryearEpisode) => {
    const llm = new ChatOpenAI({
        temperature: 0.6,
        openAIApiKey: "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",
        modelName: "gpt-3.5-turbo"
    });

    const systemMessage = `
You are the writer for the podcast The Yesteryear Chronicles. This podcast is a "this day in history"-style show,
covering events that share a the month and day components of a date (e.g., May 9th).

The podcast has two hosts, Adrian and Becca.
Adrian is a middle-aged man, a history professor, and a lover of sports and film. Adrian is warm and professorial and tends to take topics more seriously than Becca does.
Becca, in her mid-20s, is peppy and relatable but also whip-smart and very knowledgable on the topics of science and music. She is naturally funny. She also loves to dig into conspiracy theories when the topic of discussion permits.

The show always follows this sequence of segments:
- Introduction
- Short Stories
- Deep Dive 1
- Deep Dive 2
- Pop Culture Discussion
- Outro

The reading level of the podcast is high. The podcast is written with good style.
`;

    const intro = `
Write the introduction to today's episode, introducing the concept and mentioning three of the topics.
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

Please format your response as a JSON object with:
- a field for the segment (segment: "intro")
- a field for the hosts' lines (lines: [...])
- the "lines" property should be an array of objects with the name of the reader and the reader's line (e.g., { reader: "Becca", text: "And I'm Becca..." })
`;

    const shortStories = `
Write the Short Stories segment for ${episode.date}. This will cover several topics (listed below).

Here are today's topics:
${[...episode.shortStoriesTopics].map((topic) => `- ${topic}`).join("\n")}
    
Write the segment surveying these topics with banter between Adrian and Becca. Please write a LONG segment, covering each story with at least 5 sentences. Your output should be at least 250 tokens. Use only reliable sources.

Please format your response as a JSON object with:
- a field for the segment (segment: "shortStories")
- a field for the hosts' lines (lines: [...])
- the "lines" property should be an array of objects with the name of the reader and the reader's line (e.g., { reader: "Becca", text: "And I'm Becca..." })
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

    await llm.call([new SystemChatMessage(systemMessage)]);

    for (const [segment, prompt] of [
        ["intro", intro],
        ["shortStories", shortStories]
    ]) {
        console.log("asking ", prompt);

        const { text } = await llm.call([new HumanChatMessage(prompt)]);

        const json = JSON.parse(text);

        console.log("got ", text);

        yesteryearEpisode.update((ep) => {
            ep[segment as "intro" | "shortStories"] = json.lines as YesteryearLine[];
            return ep;
        });
    }
    return;
};

export {};
