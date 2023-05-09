import { writable } from "svelte/store";
import { textTransformations } from "$lib";

const id = (n: string) => n;

const makeSillyText = () => {
    const { subscribe, set, update } = writable(id);

    return {
        subscribe,
        randomize: () =>
            update((fn) =>
                fn("Test Phrase") === "Test Phrase"
                    ? textTransformations[Math.floor(Math.random() * textTransformations.length)]
                    : id
            ),
        reset: () => set(id)
    };
};

export const sillyText = makeSillyText();
