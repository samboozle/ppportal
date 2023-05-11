<script lang="ts">
    import YYCSegment from "./../../../lib/components/YYCSegment.svelte";
    import { yesteryearEpisode } from "$lib/stores";
    import type { YesteryearSegment } from "$lib/data/yesteryear";

    let loading = false;
    let response;

    const writeYesteryearChronicles = async () => {
        loading = true;
        const response = await fetch("/api/write-podcast", {
            method: "POST",
            body: JSON.stringify({
                episode: {
                    ...$yesteryearEpisode,
                    holidays: [...$yesteryearEpisode.holidays],
                    popCultureTopics: [...$yesteryearEpisode.popCultureTopics],
                    shortStoriesTopics: [...$yesteryearEpisode.shortStoriesTopics]
                }
            }),
            headers: {
                "content-type": "application/json"
            }
        });

        const changes = await response.json();
        loading = false;

        yesteryearEpisode.update((ep) => ({
            ...ep,
            intro: changes.intro,
            shortStories: changes.shortStories,
            popCulture: changes.popCulture
        }));
    };

    $: {
        console.log($yesteryearEpisode["intro"]);
    }

    const yesteryearSegmentTitles: YesteryearSegment[] = [
        "intro",
        "shortStories",
        "deepDiveOne",
        "deepDiveTwo",
        "popCulture"
    ];
</script>

<div class="w-full mb-2">
    {#if loading}
        writing...
    {:else}
        <button class="btn btn-xs normal-case" on:click={writeYesteryearChronicles}> write </button>
        <button class="btn btn-xs normal-case"> download </button>
    {/if}
</div>

<div class="script-container">
    {#each yesteryearSegmentTitles as segment}
        <YYCSegment {segment} />
    {/each}
</div>

<style>
    .script-container {
        height: 36rem;
        @apply flex flex-col overflow-y-scroll space-y-2;
    }
</style>
