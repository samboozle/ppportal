<script lang="ts">
  import YYCSegment from "./../../../lib/components/YYCSegment.svelte";
  import { yesteryearEpisode } from "$lib/stores";
  import type { YesteryearSegment } from "$lib/data/yesteryear";
  import { socketManager } from "$lib/stores";
  import { friendlyDate } from "$lib";

  const { socket } = $socketManager;

  let loading = false;

  $: {
    console.log($yesteryearEpisode);
  }

  const writeYesteryearChronicles = () => {
    socket.emit("writeYesteryearChronicles", {
      date: $yesteryearEpisode.date,
      holidays: [...$yesteryearEpisode.holidays],
      popCultureTopics: [...$yesteryearEpisode.popCultureTopics],
      shortStoriesTopics: [...$yesteryearEpisode.shortStoriesTopics],
      deepDiveOneTopic: $yesteryearEpisode.deepDiveOneTopic,
      deepDiveTwoTopic: $yesteryearEpisode.deepDiveTwoTopic
    });
  };

  const yesteryearSegmentTitles: YesteryearSegment[] = [
    "intro",
    "shortStories",
    "deepDiveOne",
    "deepDiveTwo",
    "popCulture",
    "outro",
    "summary"
  ];

  $: blob = URL.createObjectURL(
    new Blob(
      [
        yesteryearSegmentTitles.reduce((acc: string, segment) => {
          return (
            acc +
            `###${segment}###\n\n` +
            $yesteryearEpisode[segment]
              .map(({ reader, text }) => `${reader}: ${text}`)
              .join("\n\n") +
            "\n\n\n"
          );
        }, "")
      ],
      { type: "text/plain" }
    )
  );
</script>

<div class="w-full mb-2">
  {#if loading}
    writing...
  {:else}
    <button class="btn btn-xs normal-case" on:click={writeYesteryearChronicles}> write </button>
    <a
      href={blob}
      class="btn btn-xs normal-case"
      download={friendlyDate($yesteryearEpisode.date)}
      target="_blank"
      rel="noopener noreferrer"
    >
      download
    </a>
  {/if}
</div>

<div class="writing-panels">
  <div class="script-container">
    {#each yesteryearSegmentTitles as segment}
      <YYCSegment {segment} />
    {/each}
  </div>

  <div class="chat-feedback">
    <div class="code">
      <pre><code>
            {$socketManager.textBuffer}
        </code></pre>
    </div>
  </div>
</div>

<style>
  .writing-panels {
    height: 40rem;
    @apply w-full flex flex-row space-x-2;
  }

  .script-container {
    @apply flex flex-col h-full overflow-y-scroll space-y-2 w-1/2;
  }

  .chat-feedback {
    @apply mockup-code w-1/2 h-full;
  }

  .code {
    @apply h-full overflow-y-scroll p-2;
  }

  .code::-webkit-scrollbar {
    @apply bg-base-300;
  }
</style>
