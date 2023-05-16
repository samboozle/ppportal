import type { Socket } from "socket.io";
import type { YesteryearLine, YesteryearSegment } from "../types";
import dotenv from "dotenv";

dotenv.config();

const { ELEVEN_LABS_API_KEY } = process.env;

const voices = {
  Adrian: "S6uokV5dQkL6I2HcK7dq",
  Becca: "48OILxL2ECHMA1GF7egb"
};

const voiceId = (reader: "Adrian" | "Becca") =>
  `https://api.elevenlabs.io/v1/text-to-speech/${voices[reader]}/stream`;

const stability = 0.25;
const similarity = 0.8;

export default (socket: Socket) =>
  async ({
    segment,
    index,
    line
  }: {
    segment: YesteryearSegment;
    index: number;
    line: YesteryearLine;
  }) => {
    console.log("called...");

    socket.emit("setBuffer", `Auditioning line for ${line.reader}`);

    const headers = {
      Accept: "audio/mpeg",
      "xi-api-key": ELEVEN_LABS_API_KEY || "",
      "Content-Type": "application/json"
    };

    const body = JSON.stringify({
      text: line.text,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability,
        similarity_boost: similarity
      }
    });

    const audio = await fetch(voiceId(line.reader), {
      method: "POST",
      headers,
      body
    })
      .then((res) => res.body)
      .catch((err) => console.error(err));

    const reader = (audio as ReadableStream).getReader();

    let completed = false;
    let chunkCount = 0;

    while (!completed) {
      const { value, done } = await reader.read();

      chunkCount++;
      if (done) {
        // avoid eslint shouting for `while(true)`
        completed = true;
        break;
      }

      console.log(new Uint8Array(value));

      socket.emit("addTokenToBuffer", `\n${chunkCount} chunks...`);
      socket.emit("voiceLineChunkGenerated", {
        segment,
        index,
        chunk: value
      });
    }
  };
