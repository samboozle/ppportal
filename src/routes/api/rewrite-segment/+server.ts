import { json } from "@sveltejs/kit";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { OPEN_AI_API_KEY } from "$env/static/private";
import { yesteryearDirective, yesteryearFormatting } from "$lib/prompts/yesteryear-chronicles";

const podcastEditor = new ChatOpenAI({
  temperature: 0.75,
  openAIApiKey: OPEN_AI_API_KEY,
  modelName: "gpt-3.5-turbo"
});

const rewriteSegment = async (segment: any, original: string, adjustments: string) => {
  const rewrite = `
This is the segment name: """${segment}"""

Below, delimited by triple quotes, is the original text to be edited. 
  
"""${original}"""

Below, delimited by triple quotes, are the adjustments you are to make to this piece of text, preserving as much of the original text as possible.
  
"""${adjustments}"""

${yesteryearFormatting}
`;

  const { text } = await podcastEditor.call([new HumanChatMessage(rewrite)]);

  return JSON.parse(text);
};

export const POST = async ({ request }) => {
  const { segment, original, adjustments } = await request.json();
  const written = await rewriteSegment(segment, original, adjustments);
  return json(written);
};
