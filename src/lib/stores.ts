import { writable } from "svelte/store";
import { getThisDayInHistory } from "$lib";

// types
import type { eventResult } from "wikipedia/dist";
import {
    defaultYesteryearEpisode,
    type YesteryearEpisode,
    type YesteryearLine,
    type YesteryearSegment
} from "./data/yesteryear";
import { io } from "socket.io-client";

const socket = io();

const makeSocketManager = () => {
    const { subscribe, set, update } = writable({
        socket,
        currentlyWriting: false,
        currentTask: "none",
        textBuffer: ""
    });

    return {
        subscribe,
        set,
        update
    };
};

const socketManager = makeSocketManager();

const makeYesteryearEpisode = () => {
    const { subscribe, set, update } = writable<YesteryearEpisode>(defaultYesteryearEpisode);

    return {
        subscribe,
        set,
        update,
        setDate: (event: any) => {
            const date = event.target.value ? new Date(event.target.value) : new Date();
            update((episode) => {
                episode.date = date;
                return episode;
            });
        },
        addBulkStory: (
            target: "holidays" | "shortStoriesTopics" | "popCultureTopics",
            topic: string
        ) => {
            update((episode) => {
                episode[target].add(topic);
                return episode;
            });
        },
        addDeepDive: (target: "deepDiveOneTopic" | "deepDiveTwoTopic", topic: string) => {
            update((episode) => {
                episode[target] = topic;
                return episode;
            });
        },
        deleteBulkStory: (
            target: "holidays" | "shortStoriesTopics" | "popCultureTopics",
            topic: string
        ) => {
            update((episode) => {
                episode[target].delete(topic);
                return episode;
            });
        },
        deleteDeepDive: (target: "deepDiveOneTopic" | "deepDiveTwoTopic") => {
            update((episode) => {
                episode[target] = null;
                return episode;
            });
        }
        // toPrettyScript: () => {}
    };
};

const makeWikipediaToday = () => {
    const { subscribe, set } = writable<Promise<eventResult>>(
        new Promise((resolve) =>
            resolve({
                births: [{ text: "", pages: [] }],
                deaths: [{ text: "", pages: [] }],
                events: [{ text: "", pages: [] }],
                holidays: [{ text: "", pages: [] }]
            })
        )
    );
    return {
        subscribe,
        researchDate: (date: Date) => set(getThisDayInHistory(date))
    };
};

const yesteryearEpisode = makeYesteryearEpisode();
const wikipediaToday = makeWikipediaToday();

socket.on("updateYesteryearEpisode", (message) => {
    yesteryearEpisode.update((episode) => {
        episode[message.segment as YesteryearSegment] = message.lines;
        return episode;
    });
});

socket.on("addTokenToBuffer", (message) => {
    socketManager.update((manager) => {
        manager.textBuffer += message;
        return manager;
    });
});

socket.on("setBuffer", (message) => {
    socketManager.update((manager) => {
        manager.textBuffer = message;
        return manager;
    });
});

export { socketManager, yesteryearEpisode, wikipediaToday };
