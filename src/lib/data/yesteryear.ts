export type YesteryearLine = {
    reader: "Adrian" | "Becca";
    text: string;
};

export type YesteryearEpisode = {
    date: Date;
    intro: YesteryearLine[];
    shortStories: YesteryearLine[];
    deepDiveOne: YesteryearLine[];
    deepDiveTwo: YesteryearLine[];
    popCulture: YesteryearLine[];
    outro: YesteryearLine[];
    summary: YesteryearLine[];
    holidays: Set<string>;
    shortStoriesTopics: Set<string>;
    deepDiveOneTopic: string | null;
    deepDiveTwoTopic: string | null;
    popCultureTopics: Set<string>;
};

export const defaultYesteryearEpisode: YesteryearEpisode = {
    date: new Date(),
    intro: [],
    shortStories: [],
    deepDiveOne: [],
    deepDiveTwo: [],
    popCulture: [],
    outro: [],
    summary: [],
    holidays: new Set(),
    shortStoriesTopics: new Set(),
    deepDiveOneTopic: null,
    deepDiveTwoTopic: null,
    popCultureTopics: new Set()
};

export type YesteryearSegment =
    | "intro"
    | "shortStories"
    | "deepDiveOne"
    | "deepDiveTwo"
    | "popCulture"
    | "outro"
    | "summary";
