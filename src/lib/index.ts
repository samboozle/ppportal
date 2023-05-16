// components
import ChatBubble from "./components/ChatBubble.svelte";
import Footer from "./components/Footer.svelte";
import SidebarPage from "./components/SidebarPage.svelte";
import Tab from "./components/Tab.svelte";
import wiki from "wikipedia";
// import { dummy } from "./server";

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

const friendlyDate = (date: Date) =>
  date.toLocaleString("en-US", {
    month: "long",
    day: "numeric"
  });

export { ChatBubble, Footer, SidebarPage, Tab, images, getThisDayInHistory, friendlyDate };
