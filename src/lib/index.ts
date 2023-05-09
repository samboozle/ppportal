// components
import Footer from "./components/Footer.svelte";
import SidebarPage from "./components/SidebarPage.svelte";
import Tab from "./components/Tab.svelte";

// images
import sam from "./images/face.png";
import samboozle from "./images/painting.jpeg";

const images = {
    sam,
    samboozle
};

const textTransformations = [
    (text: string) => [...text].map((_: string) => "" + Math.round(Math.random())).join(""),
    (text: string) =>
        text
            .split(/\s+/)
            .map((word) => {
                const puncs = [...word.matchAll(/\W/g)];

                const segments = word
                    .split(/\W/)
                    .filter((seg) => seg !== "")
                    .map((segment) => {
                        const vIdx = segment.search(/[aeiou]/i);
                        return vIdx === 0
                            ? `${segment}way`
                            : `${segment.slice(vIdx)}${segment.slice(0, vIdx)}ay`;
                    });

                return segments.join(" ");
            })
            .join(" ")
];

export { Footer, SidebarPage, Tab, images, textTransformations };
