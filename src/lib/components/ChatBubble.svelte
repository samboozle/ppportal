<script lang="ts">
  import type { YesteryearSegment } from "$lib/data/yesteryear";
  import { socketManager, yesteryearEpisode } from "$lib/stores";
  import { onMount } from "svelte";
  export let index: number;
  export let segment: YesteryearSegment;

  const { socket } = $socketManager;
  let audio: HTMLAudioElement;
  let mediaSource: MediaSource;
  let sourceBuffer: SourceBuffer;
  let chunksAppended = 0;
  let isAppending = false;
  let isClearing = false;

  $: line = $yesteryearEpisode[segment][index];
  $: rowCount = Math.ceil(line.text.length / 100);
  $: recording = line.recording;

  $: {
    appendChunk(recording);
  }

  const appendChunk = (rec: Uint8Array[]) => {
    if (chunksAppended >= rec.length || isAppending) return;

    isAppending = true;
    if (sourceBuffer) {
      sourceBuffer.appendBuffer(rec[chunksAppended]);
      chunksAppended++;
    }
  };

  const updateLineText = (e: any) => {
    yesteryearEpisode.update((ep) => {
      ep[segment][index].text = e.target.value;
      return ep;
    });
  };

  onMount(async () => {
    console.log("onMount called");
    audio = document.createElement("audio");
    mediaSource = new MediaSource();
    audio.src = URL.createObjectURL(mediaSource);
    audio.play();
    mediaSource.addEventListener("sourceopen", () => {
      sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
      sourceBuffer.addEventListener("updateend", () => {
        if (!isClearing) {
          isAppending = false;
          appendChunk(recording);
          audio.play();
        }
      });
    });
  });

  const generateVoiceLine = () => {
    isClearing = true;
    chunksAppended = 0;
    audio.currentTime = 0;
    yesteryearEpisode.update((episode) => {
      episode[segment][index].recording = [];
      return episode;
    });
    if (sourceBuffer && sourceBuffer.buffered.length) sourceBuffer.remove(0, Infinity);
    socket.emit("generateVoiceLine", { line, index, segment });
    isClearing = false;
  };

  const playVoiceLine = () => {
    audio.currentTime = 0;
    audio.play();
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
    <button class="btn btn-xs btn-ghost p-1" on:click={playVoiceLine}> play </button>
    <button class="btn btn-xs btn-ghost p-1" on:click={generateVoiceLine}> 🔄 </button>
  </div>
</div>

<style lang="postcss">
  .letter-avatar {
    @apply w-10 flex items-center justify-center text-2xl rounded-full bg-yellow-700 text-base-100;
  }
</style>
