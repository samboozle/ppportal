<script lang="ts">
    // @ts-nocheck
    import { yesteryearEpisode } from "$lib/stores";

    const writeYesteryearChronicles = async () => {
        const response = await fetch("/api/yesteryear-chronicles/write-script", {
            method: "POST",
            body: JSON.stringify({
                func: "writeYesteryearChronicles",
                details: {
                    episode: $yesteryearEpisode
                }
            }),
            headers: {
                "content-type": "application/json"
            }
        });
    };

    const rewriteSegment = async (segment: any, adjustments: string[]) => {
        const response = await fetch("/api/yesteryear-chronicles/write-script", {
            method: "POST",
            body: JSON.stringify({
                func: "writeYesteryearChronicles",
                details: {
                    segment,
                    adjustments
                }
            }),
            headers: {
                "content-type": "application/json"
            }
        });
    };
</script>

<div>
    <button on:click={() => writeYesteryearChronicles($yesteryearEpisode)}> WRITE </button>
</div>

<div>
    {#each ["intro", "shortStories", "deepDiveOne", "deepDiveTwo", "popCulture"] as segment}
        <div>
            <h4>{segment}</h4>
            <ul>
                {#each $yesteryearEpisode[segment] as { reader, text }}
                    <li>{reader}: {text}</li>
                {/each}
            </ul>
        </div>
    {/each}
</div>
