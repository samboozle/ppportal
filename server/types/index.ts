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
    holidays: Set<string>;
    shortStoriesTopics: Set<string>;
    deepDiveOneTopic: string | null;
    deepDiveTwoTopic: string | null;
    popCultureTopics: Set<string>;
};

export type YesteryearSegment =
    | "intro"
    | "shortStories"
    | "deepDiveOne"
    | "deepDiveTwo"
    | "popCulture"
    | "outro";
