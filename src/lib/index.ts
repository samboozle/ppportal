// components
import Footer from "./components/Footer.svelte";
import SidebarPage from "./components/SidebarPage.svelte";
import Tab from "./components/Tab.svelte";
import wiki from "wikipedia";

// images

const images = {};

const getThisDayInHistory = async (date: Date) => {
    const events = await wiki.onThisDay({
        month: date.getMonth() + 1 + "",
        day: date.getDate() + 1 + ""
    });

    // Todo - sort each piece of this by number of pages
    return events;
};

export { Footer, SidebarPage, Tab, images, getThisDayInHistory };
