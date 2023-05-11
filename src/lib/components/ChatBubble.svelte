<script lang="ts">
    import type { YesteryearSegment } from "$lib/data/yesteryear";
    import { yesteryearEpisode } from "$lib/stores";
    export let index: number;
    export let segment: YesteryearSegment;

    $: line = $yesteryearEpisode[segment][index];
    $: rowCount = Math.ceil(line.text.length / 115);

    const updateLineText = (e: any) => {
        yesteryearEpisode.update((ep) => {
            ep[segment][index].text = e.target.value;
            return ep;
        });
    };
</script>

<div class="chat chat-start w-full flex items-center">
    <div class="avatar">
        <div class="letter-avatar">
            {line.reader[0]}
        </div>
    </div>
    <textarea
        class="chat-bubble w-full text-2xs"
        wrap="soft"
        rows={rowCount}
        bind:value={line.text}
        on:change={updateLineText}
    />
</div>

<style>
    .letter-avatar {
        @apply w-10 flex items-center justify-center text-2xl rounded-full bg-yellow-700 text-base-100;
    }
</style>
