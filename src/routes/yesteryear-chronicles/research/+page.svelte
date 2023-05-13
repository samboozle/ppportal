<script lang="ts">
    import { wikipediaToday, yesteryearEpisode } from "$lib/stores";
    import type { wikiSummary } from "wikipedia/dist";
    // $: formattedDate = $yesteryearEpisode.date.toISOString().split("T")[0];

    type SortableEvent = {
        pages: wikiSummary[];
        year?: number | undefined;
    };

    const sortFns = {
        rvChron: (eventA: SortableEvent, eventB: SortableEvent) =>
            eventB.year && eventA.year ? eventB.year - eventA.year : 0,
        chron: (eventA: SortableEvent, eventB: SortableEvent) =>
            eventA.year && eventB.year ? eventA.year - eventB.year : 0,
        numPages: (eventA: SortableEvent, eventB: SortableEvent) =>
            eventB.pages.length - eventA.pages.length
    };

    let sortFn: "rvChron" | "chron" | "numPages" = "rvChron";

    const setSortFn = (kind: "year" | "pages") => {
        switch (kind) {
            case "year":
                sortFn = sortFn === "rvChron" ? "chron" : "rvChron";
                break;
            case "pages":
                sortFn = sortFn === "numPages" ? "rvChron" : "numPages";
                break;
            default:
                sortFn = "rvChron";
                break;
        }
    };
</script>

{#await $wikipediaToday}
    ...researching
{:then { events, births, holidays }}
    <div class="w-full h-1/3">
        {#if events}
            <div class="collapse collapse-arrow w-full">
                <input type="checkbox" />
                <div class="collapse-title bg-base-300 flex items-center h-8 space-x-2">
                    {events.length} Events
                </div>
                <div class="collapse-content overflow-x-auto overflow-y-scroll w-full p-0">
                    <table class="table table-compact table-zebra w-full">
                        <thead class="w-full rounded-none">
                            <tr>
                                <th> actions </th>
                                <th>
                                    <button class="sort-button" on:click={() => setSortFn("year")}>
                                        year
                                    </button>
                                </th>
                                <th>
                                    <button on:click={() => setSortFn("pages")}> pages </button>
                                </th>
                                <th> summary </th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each events.sort(sortFns[sortFn]) as { text, year, pages }}
                                <tr>
                                    <th class="space-x-0">
                                        <button
                                            class="emoji-button"
                                            on:click={() =>
                                                yesteryearEpisode.addBulkStory(
                                                    "shortStoriesTopics",
                                                    `${text} (${year})`
                                                )}>📓</button
                                        >
                                        <button
                                            class="emoji-button"
                                            on:click={() =>
                                                yesteryearEpisode.addDeepDive(
                                                    "deepDiveOneTopic",
                                                    `${text} (${year})`
                                                )}>1️⃣</button
                                        >
                                        <button
                                            class="emoji-button"
                                            on:click={() =>
                                                yesteryearEpisode.addDeepDive(
                                                    "deepDiveTwoTopic",
                                                    `${text} (${year})`
                                                )}>2️⃣</button
                                        >
                                        <button
                                            class="emoji-button"
                                            on:click={() =>
                                                yesteryearEpisode.addBulkStory(
                                                    "popCultureTopics",
                                                    `${text} (${year})`
                                                )}>🍿</button
                                        >
                                    </th>
                                    <th>{year || "N/A"}</th>
                                    <th>{pages.length}</th>
                                    <th class="text-xs">{text}</th>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}
        {#if births}
            <div class="collapse collapse-arrow w-full">
                <input type="checkbox" />
                <div class="collapse-title bg-base-300 flex items-center">
                    {births.length} Births
                </div>
                <div class="collapse-content overflow-x-auto overflow-y-scroll w-full p-0">
                    <table class="table table-compact table-zebra w-full">
                        <thead class="w-full rounded-none">
                            <tr>
                                <th> actions </th>
                                <th> year </th>
                                <th> summary </th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each births as { text, year }}
                                <tr>
                                    <th class="emoji-row">
                                        <button
                                            class="emoji-button"
                                            on:click={() =>
                                                yesteryearEpisode.addBulkStory(
                                                    "shortStoriesTopics",
                                                    `${text} (birth, ${year})`
                                                )}>📓</button
                                        >
                                        <button
                                            class="emoji-button"
                                            on:click={() =>
                                                yesteryearEpisode.addDeepDive(
                                                    "deepDiveOneTopic",
                                                    `${text} (birth, ${year})`
                                                )}>1️⃣</button
                                        >
                                        <button
                                            class="emoji-button"
                                            on:click={() =>
                                                yesteryearEpisode.addDeepDive(
                                                    "deepDiveTwoTopic",
                                                    `${text} (birth, ${year})`
                                                )}>2️⃣</button
                                        >
                                        <button
                                            class="emoji-button"
                                            on:click={() =>
                                                yesteryearEpisode.addBulkStory(
                                                    "popCultureTopics",
                                                    `${text} (birth, ${year})`
                                                )}>🍿</button
                                        >
                                    </th>
                                    <th>{year || "N/A"}</th>
                                    <th class="text-xs">{text}</th>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}
        {#if holidays}
            <div class="collapse collapse-arrow w-full">
                <input type="checkbox" />
                <div class="collapse-title bg-base-300 flex items-center">
                    {holidays.length} Holidays
                </div>
                <div class="collapse-content overflow-x-auto overflow-y-scroll w-full p-0">
                    <table class="table table-compact table-zebra w-full">
                        <thead class="w-full rounded-none">
                            <tr>
                                <th> actions </th>
                                <th> summary </th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each holidays as { text }}
                                <tr>
                                    <th>
                                        <button
                                            class="btn btn-sm px-2 btn-ghost"
                                            on:click={() =>
                                                yesteryearEpisode.addBulkStory("holidays", text)}
                                            >🎊</button
                                        >
                                    </th>
                                    <th class="text-xs">{text}</th>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}
    </div>
{/await}

<style lang="postcss">
    th {
        @apply rounded-none py-0;
    }

    .sort-button {
        @apply rounded-none px-1 h-full w-full btn btn-ghost;
    }

    .emoji-button {
        @apply btn btn-sm px-2 btn-ghost rounded-none;
    }

    .collapse-content {
        height: 36rem;
    }
</style>
