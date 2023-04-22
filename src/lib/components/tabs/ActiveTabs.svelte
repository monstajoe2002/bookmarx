<script lang="ts">
  import { activeTabs } from "../../../stores/activeTabs";
  import Tab from "./Tab.svelte";
</script>

{#if !$activeTabs.length}
  <h1
    class="text-4xl text-center font-medium text-gray-500 dark:text-gray-400 max-w-full justify-start overflow-x-auto shadow-xl p-8 gap-4 rounded-md mb-8 bg-slate-200 dark:bg-slate-100"
  >
    No active tabs
  </h1>
{:else}
  <div
    class="flex max-w-full overflow-x-auto shadow-xl p-6 gap-4 rounded-md mb-8 bg-slate-200 dark:bg-slate-100"
  >
    {#each $activeTabs as { name, id,url } (id)}
      {#if name}
        <Tab {name} {id} {url} />
      {/if}
    {/each}
  </div>
{/if}
