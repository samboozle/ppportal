<script lang="ts">
    import { wikipediaToday, yesteryearEpisode } from "$lib/stores";
    // $: formattedDate = $yesteryearEpisode.date.toISOString().split("T")[0];
</script>

{#await $wikipediaToday}
    ...researching
{:then { events, births, holidays }}
    <div class="w-full h-1/3">
        {#if events}
            <div class="collapse collapse-arrow w-full">
                <input type="checkbox" />
                <div class="collapse-title bg-base-300 flex items-center h-8">
                    {events.length} Events
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
                            {#each events as { text, year }}
                                <tr>
                                    <th>
                                        <button
                                            class="btn btn-sm px-2 btn-ghost"
                                            on:click={() =>
                                                yesteryearEpisode.addBulkStory(
                                                    "shortStoriesTopics",
                                                    `${text} (${year})`
                                                )}>📓</button
                                        >
                                        <button
                                            class="btn btn-sm px-2 btn-ghost"
                                            on:click={() =>
                                                yesteryearEpisode.addDeepDive(
                                                    "deepDiveOneTopic",
                                                    `${text} (${year})`
                                                )}>1️⃣</button
                                        >
                                        <button
                                            class="btn btn-sm px-2 btn-ghost"
                                            on:click={() =>
                                                yesteryearEpisode.addDeepDive(
                                                    "deepDiveTwoTopic",
                                                    `${text} (${year})`
                                                )}>2️⃣</button
                                        >
                                        <button
                                            class="btn btn-sm px-2 btn-ghost"
                                            on:click={() =>
                                                yesteryearEpisode.addBulkStory(
                                                    "popCultureTopics",
                                                    `${text} (${year})`
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
                                    <th>
                                        <button
                                            class="btn btn-sm px-2 btn-ghost"
                                            on:click={() =>
                                                yesteryearEpisode.addBulkStory(
                                                    "shortStoriesTopics",
                                                    `${text} (birth, ${year})`
                                                )}>📓</button
                                        >
                                        <button
                                            class="btn btn-sm px-2 btn-ghost"
                                            on:click={() =>
                                                yesteryearEpisode.addDeepDive(
                                                    "deepDiveOneTopic",
                                                    `${text} (birth, ${year})`
                                                )}>1️⃣</button
                                        >
                                        <button
                                            class="btn btn-sm px-2 btn-ghost"
                                            on:click={() =>
                                                yesteryearEpisode.addDeepDive(
                                                    "deepDiveTwoTopic",
                                                    `${text} (birth, ${year})`
                                                )}>2️⃣</button
                                        >
                                        <button
                                            class="btn btn-sm px-2 btn-ghost"
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
                            {#each holidays as { pages, text }}
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

<style>
    th {
        @apply rounded-none;
    }

    .collapse-content {
        height: 36rem;
    }
</style>
