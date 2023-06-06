<script lang="ts">
  import YYCSegment from "./../../../lib/components/YYCSegment.svelte";
  import { yesteryearEpisode } from "$lib/stores";
  import type { YesteryearLine, YesteryearSegment } from "$lib/data/yesteryear";
  import { socketManager } from "$lib/stores";
  import { friendlyDate } from "$lib";
  import JSZip from "jszip";

  const { socket } = $socketManager;
  const segments: YesteryearSegment[] = [
    "intro",
    "shortStories",
    "deepDiveOne",
    "deepDiveTwo",
    "popCulture",
    "outro"
  ];

  let loading = false;

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

  const downloadVoiceLines = () => {
    let zip = new JSZip();
    for (const segment of segments) {
      const lines: YesteryearLine[] = $yesteryearEpisode[segment];
      for (const lineIdx in lines) {
        const line = lines[lineIdx];
        const flattened = line.recording.reduce(
          (acc: Uint8Array, el: Uint8Array) => new Uint8Array([...acc, ...el]),
          new Uint8Array([])
        );

        const blob = new Blob([flattened], { type: "audio/mpeg" });
        zip.file(`${segment}-${lineIdx}-${line.reader}.mp3`, blob);
      }
    }
    zip.generateAsync({ type: "blob" }).then((content) => {
      let url = URL.createObjectURL(content);
      let a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${friendlyDate($yesteryearEpisode.date)} voice lines`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    });
  };
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
      download script
    </a>
    <button on:click={downloadVoiceLines} class="btn btn-xs normal-case"> download voices </button>
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

<style lang="postcss">
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
