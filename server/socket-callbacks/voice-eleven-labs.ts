import type { Socket } from "socket.io-client";
import type { YesteryearLine, YesteryearSegment } from "../types";

const { ELEVEN_LABS_API_KEY } = process.env;

const voices = {
    Adrian: "S6uokV5dQkL6I2HcK7dq",
    Becca: "48OILxL2ECHMA1GF7egb"
};

const voiceId = (reader: "Adrian" | "Becca") =>
    `https://api.elevenlabs.io/v1/text-to-speech/${voices[reader]}`;

const stability = 25;
const similarity = 80;

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

        const response = await fetch(voiceId(line.reader), {
            method: "POST",
            headers,
            body
        });

        console.log(response);

        socket.emit("voiceLineGenerated", {
            segment,
            index,
            audio: response.body
        });
    };
