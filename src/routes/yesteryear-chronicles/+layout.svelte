<script lang="ts">
  import { Tab } from "$lib";
  import { wikipediaToday, yesteryearEpisode } from "$lib/stores";
</script>

<nav class="tabs">
  <Tab href="/yesteryear-chronicles/research">research</Tab>
  <Tab href="/yesteryear-chronicles/write-script">write script</Tab>
</nav>
<div class="mt-2 flex flex-col md:flex-row w-full h-full">
  <!-- Pane for configuring the episode -->
  <div
    id="episode-topics"
    class="w-full flex flex-col space-y-2 md:w-1/4 md:pr-2 overflow-y-scroll"
  >
    <div class="w-full">
      <label for="date-picker" class="text-sm"> date: </label>
      <input type="date" id="date-picker" class="text-sm" on:change={yesteryearEpisode.setDate} />
      <button
        class="btn btn-sm normal-case"
        on:click={() => wikipediaToday.researchDate($yesteryearEpisode.date)}
      >
        research
      </button>
    </div>
    <div>
      <h4>Short Stories</h4>
      <ul>
        {#each [...$yesteryearEpisode.shortStoriesTopics] as story}
          <li class="border-b border-neutral-400 w-full flex p-1">
            <p class="text-xs w-5/6">{"-  " + story}</p>
            <button
              class="btn btn-sm btn-ghost px-2 ml-auto"
              on:click={() => yesteryearEpisode.deleteBulkStory("shortStoriesTopics", story)}
            >
              🙅
            </button>
          </li>
        {/each}
      </ul>
      <h4>Deep Dive 1</h4>
      {#if $yesteryearEpisode.deepDiveOneTopic}
        <div class="w-full flex p-1">
          <p class="text-xs w-5/6">- {$yesteryearEpisode.deepDiveOneTopic}</p>
          <button
            class="btn btn-sm btn-ghost px-2 ml-auto"
            on:click={() => yesteryearEpisode.deleteDeepDive("deepDiveOneTopic")}
          >
            🙅
          </button>
        </div>
      {/if}
      <h4>Deep Dive 2</h4>
      {#if $yesteryearEpisode.deepDiveTwoTopic}
        <div class="w-full flex p-1">
          <p class="text-xs w-5/6">- {$yesteryearEpisode.deepDiveTwoTopic}</p>
          <button
            class="btn btn-sm btn-ghost px-2 ml-auto"
            on:click={() => yesteryearEpisode.deleteDeepDive("deepDiveTwoTopic")}
          >
            🙅
          </button>
        </div>
      {/if}
      <h4>Pop culture</h4>
      <ul>
        {#each [...$yesteryearEpisode.popCultureTopics] as pop}
          <li class="border-b border-neutral-400 w-full flex p-1">
            <p class="text-xs w-5/6">{"-  " + pop}</p>
            <button
              class="btn btn-sm btn-ghost px-2 ml-auto"
              on:click={() => yesteryearEpisode.deleteBulkStory("popCultureTopics", pop)}
            >
              🙅
            </button>
          </li>
        {/each}
      </ul>
      <h4>Holidays</h4>
      <ul>
        {#each [...$yesteryearEpisode.holidays] as holiday}
          <li class="border-b border-neutral-400 w-full flex p-1">
            <p class="text-xs w-5/6">{"-  " + holiday}</p>
            <button
              class="btn btn-sm btn-ghost px-2 ml-auto"
              on:click={() => yesteryearEpisode.deleteBulkStory("holidays", holiday)}
            >
              🙅
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <div class="text-xs w-full md:w-3/4">
    <slot />
  </div>
</div>

<style>
  #episode-topics {
    height: 42rem;
  }

  h4 {
    @apply border-b border-neutral-700;
  }
</style>
