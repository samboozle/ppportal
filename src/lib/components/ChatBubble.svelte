<script lang="ts">
    import type { YesteryearSegment } from "$lib/data/yesteryear";
    import { socketManager, yesteryearEpisode } from "$lib/stores";
    export let index: number;
    export let segment: YesteryearSegment;

    const { socket } = $socketManager;

    $: line = $yesteryearEpisode[segment][index];
    $: rowCount = Math.ceil(line.text.length / 100);

    const updateLineText = (e: any) => {
        yesteryearEpisode.update((ep) => {
            ep[segment][index].text = e.target.value;
            return ep;
        });
    };

    const generateVoiceLine = () => {
        socket.emit("generateVoiceLine", { line, index, segment });
    };
</script>

<div class="chat chat-start w-full flex items-center">
    <div class="avatar">
        <div class="letter-avatar">
            {line.reader[0]}
        </div>
    </div>
    <textarea
        class="chat-bubble w-4/5 text-2xs"
        wrap="soft"
        rows={rowCount}
        bind:value={line.text}
        on:change={updateLineText}
    />
    <div>
        {#if line.recording}
            <button class="btn btn-xs btn-ghost p-1"> ▶️ </button>
        {/if}
        <button class="btn btn-xs btn-ghost p-1" on:click={generateVoiceLine}> 🔄 </button>
    </div>
</div>

<style lang="postcss">
    .letter-avatar {
        @apply w-10 flex items-center justify-center text-2xl rounded-full bg-yellow-700 text-base-100;
    }
</style>
