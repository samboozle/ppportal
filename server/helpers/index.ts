import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { ConversationSummaryMemory } from "langchain/memory";
import { PromptTemplate } from "langchain";
import type { Socket } from "socket.io";

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const friendlyDate = (date: Date) =>
  date.toLocaleString("en-US", {
    month: "long",
    day: "numeric"
  });

export const createPodcastAuthor = (socket: Socket) =>
  new ChatOpenAI({
    temperature: 0.75,
    openAIApiKey: process.env.OPEN_AI_API_KEY,
    modelName: "gpt-3.5-turbo",
    // modelName: "gpt-4",
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken: (token: string) => {
          socket.emit("addTokenToBuffer", token);
        }
      }
    ]
  });

const memory = (llm: ChatOpenAI) =>
  new ConversationSummaryMemory({
    memoryKey: "podcast_memory",
    llm
  });

const podcastChain = (llm: ChatOpenAI, memory: ConversationSummaryMemory) =>
  new ConversationChain({
    memory,
    llm,
    prompt: PromptTemplate.fromTemplate(`
This is a writing session between a human and an AI. The AI is responsible for writing good segments for a podcast based on prompting by the human.

Current conversation delimted by triple quotes:
"""
{podcast_memory}
"""

Human: {input}
AI:`)
  });
