<script lang="ts">
  import type { YesteryearLine, YesteryearSegment } from "$lib/data/yesteryear";
  import { yesteryearEpisode } from "$lib/stores";
  import { ChatBubble } from "$lib";
  import { socketManager } from "$lib/stores";

  const { socket } = $socketManager;

  export let segment: YesteryearSegment;

  let adjustments = "";
  let rewriting = false;
  $: buttonText = rewriting ? "edit" : "rewrite";

  $: wordCount = $yesteryearEpisode[segment].reduce((acc: number, { text }: YesteryearLine) => {
    const wordCount = text.split(/\s+/g).length;
    return acc + wordCount;
  }, 0);

  const rewriteSegment = () => {
    socket.emit("rewriteSegment", {
      segment,
      original: $yesteryearEpisode[segment].reduce(
        (acc: string, line: YesteryearLine) => acc + `${line.reader}: ${line.text}\n\n`,
        ""
      ),
      adjustments
    });
  };
</script>

<div class="script-segment">
  <div class="command-bar">
    <p class="text-sm">{segment} ({wordCount} words)</p>
    <button class="btn btn-xs normal-case" on:click={() => (rewriting = !rewriting)}>
      {buttonText}
    </button>
  </div>
  {#if rewriting}
    <p>
      {#each $yesteryearEpisode[segment] as { reader, text }}
        {reader}: {text}
        <br />
        <br />
      {/each}
    </p>
    <div class="divider">feedback</div>
    <div class="flex justify-between items-end">
      <textarea class="chat-bubble w-5/6 text-2xs" bind:value={adjustments} />
      <button class="btn btn-xs normal-case" on:click={rewriteSegment}> submit </button>
    </div>
  {:else}
    {#each $yesteryearEpisode[segment] as _, index}
      <ChatBubble {segment} {index} />
    {/each}
  {/if}
</div>

<style>
  .command-bar {
    @apply flex flex-row w-full pb-1 items-center justify-between;
  }

  .script-segment {
    @apply p-2 rounded-md bg-base-200;
  }
</style>
