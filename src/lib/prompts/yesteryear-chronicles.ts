import type { YesteryearEpisode } from "$lib/data/yesteryear";

const yesteryearDirective = `
You are a script writer for a podcast. This is a podcast called "The Yesteryear Chronicles".
This podcast is a "this day in history"-style show, covering events that share a the month and day components of a date.

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
Future messages will ask you to write segments for the show. Please keep the following in mind:
- Avoid adverbs and other fluff language
- When writing in the voice of a host, avoid using the other host's name
`;

const yesteryearFormatting = `
Please format your response as a JSON object with:
- a field for the segment (segment: SEGMENT_NAME)
- a field for the hosts' lines (lines: [...])
- the "lines" property should be an array of objects with the name of the reader and the reader's line (e.g., { reader: "Becca", text: "And I'm Becca..." })
- properly escape or omit characters that could interrupt JSON parsing
`;

const intro = (episode: YesteryearEpisode) => `
Write the introduction to today's episode, starting with "Welcome to 'The Yesteryear Chronicles'...".
Offer an overview of the show, mentioning three of the topics.
Adrian and Becca should play off of each other in this introduction.
Write each host's line in his or her voice based on their personalities and preferences.
The date is ${episode.date.toLocaleString("en-US", {
    month: "long",
    day: "numeric"
})}. Include a joke about time.

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

const shortStories = (episode: YesteryearEpisode) => `
Write the Short Stories segment for ${episode.date}. This will cover several topics (listed below).

Here are today's topics:
${[...episode.shortStoriesTopics].map((topic) => `- ${topic}`).join("\n")}
    
Write the segment surveying these topics with banter between Adrian and Becca. Please write a LONG segment, covering each story with at least 5 sentences. Your output should be at least 250 tokens. Use only reliable sources.

${yesteryearFormatting}
`;

export { intro, shortStories, yesteryearDirective, yesteryearFormatting };
