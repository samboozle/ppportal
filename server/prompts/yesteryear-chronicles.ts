import { friendlyDate } from "../helpers";
import { yesteryearChronicles031 } from "./example-episodes";
import type { YesteryearEpisode, YesteryearSegment } from "../types";

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

If you understand your mission, respond with "Getting ready to write a podcast..."
`;

const goodExample = (segment: YesteryearSegment) => `
Below delimited by triple quotes is a good example of a segment.

"""
${yesteryearChronicles031[segment]}
""'

Model your own answer after this example's length, tone, and pace, but do not use any of its factual content.
`;

const yesteryearFormatting = (segment: YesteryearSegment) => `
Please format your response as a JSON object with:
- a field for the segment (segment: ${segment})
- a field for the hosts' lines (lines: [...])
- the "lines" property should be an array of objects with the name of the reader and the reader's line (e.g., { reader: "Becca", text: "And I'm Becca..." })
- properly escape or omit characters that could interrupt JSON parsing
`;

const intro = (episode: YesteryearEpisode) => `
Write the introduction to today's episode, starting with "Welcome to 'The Yesteryear Chronicles'...".
Offer an overview of the show, mentioning three of the topics.
Adrian and Becca should play off of each other in this introduction.
Write each host's line in his or her voice based on their personalities and preferences.
The date is ${friendlyDate(episode.date)}. Include a joke about time.

Below delimted by triple quotes are today's topics:
"""
${[
    episode.deepDiveOneTopic,
    episode.deepDiveTwoTopic,
    ...episode.shortStoriesTopics,
    ...episode.popCultureTopics
]
    .map((topic) => `- ${topic}`)
    .join("\n")}
"""

${goodExample("intro")}

${yesteryearFormatting("intro")}
`;

const shortStories = (episode: YesteryearEpisode) => `
Write the Short Stories segment for ${friendlyDate(
    episode.date
)}. This will cover several topics (listed below).

Below delimited by triple quotes are today's topics:
"""
${[...episode.shortStoriesTopics].map((topic) => `- ${topic}`).join("\n")}
"""

This segment should not have a "welcome" or "goodbye" section.

Write the segment surveying these topics with banter between Adrian and Becca. Use only reliable sources.

${goodExample("shortStories")}

Write at least 500 words.

${yesteryearFormatting("shortStories")}
`;

const deepDive = (episode: YesteryearEpisode, number: "One" | "Two") => `
Write the Deep Dive ${number} segment for ${friendlyDate(episode.date)}.

Below delimited by triple quotes is the topic for this deep dive:
""" 
${episode[`deepDive${number}Topic`]}
"""
    
This segment should not have a "welcome" or "goodbye" section.

Write the segment surveying these topics with banter between Adrian and Becca. Use only reliable sources.

${goodExample(`deepDive${number}`)}

Write at least 500 words.

${yesteryearFormatting(`deepDive${number}`)}
`;

const popCulture = (episode: YesteryearEpisode) => `
Write the Pop Culture segment for ${friendlyDate(
    episode.date
)}. This will cover several topics (listed below).

Below delimited by triple quotes are today's topics:
"""
${[...episode.popCultureTopics].map((topic) => `- ${topic}`).join("\n")}
"""

This segment should not have a "welcome" or "goodbye" section.

Write the segment surveying these topics with banter between Adrian and Becca. Use only reliable sources.

${goodExample("popCulture")}

Write at least 500 words.

${yesteryearFormatting("popCulture")}
`;

const rewrite = (segment: YesteryearSegment, original: string, adjustments: string) => `
Please help me rewrite segment - it needs some work.

This is the segment name: """${segment}"""

Below, delimited by triple quotes, is the original text to be edited. 
  
"""
${original}
"""

Below, delimited by triple quotes, are the adjustments you are to make to this piece of text, preserving as much of the original text as possible unless instructed otherwise.
  
"""
${adjustments}
"""

${yesteryearFormatting(segment)}
`;

const outro = (episode: YesteryearEpisode) => `
Write the outro to today's episode.
Include something about today's holiday(s):
"""
${[...episode.holidays].map((h) => `- ${h}`).join("\n")}
"""
The date is ${friendlyDate(episode.date)}.

Below delimted by triple quotes are today's topics:
"""
${[episode.deepDiveOneTopic, episode.deepDiveTwoTopic, ...episode.popCultureTopics]
    .map((topic) => `- ${topic}`)
    .join("\n")}
"""

${goodExample("intro")}

${yesteryearFormatting("intro")}
`;

const summary = (episode: YesteryearEpisode) => `
Write a two- or three-sentence summary about today's episode of "The Yesteryear Chronicles" for use in a youtube description.
The date is ${friendlyDate(episode.date)}.

Below delimted by triple quotes are today's topics:
"""
${[
    episode.deepDiveOneTopic,
    episode.deepDiveTwoTopic,
    ...episode.shortStoriesTopics,
    ...episode.popCultureTopics
]
    .map((topic) => `- ${topic}`)
    .join("\n")}
"""

${goodExample("intro")}

${yesteryearFormatting("intro")}
`;

export {
    intro,
    shortStories,
    deepDive,
    popCulture,
    outro,
    summary,
    rewrite,
    yesteryearDirective,
    yesteryearFormatting
};
