<script lang="ts">
  import Container from "./layout/Container.svelte";
  import BookmarkGroup from "./lib/components/bookmark-groups/BookmarkGroup.svelte";
  import BookmarkGroupFallback from "./lib/components/bookmark-groups/BookmarkGroupFallback.svelte";
  import ActiveTabs from "./lib/components/tabs/ActiveTabs.svelte";
  import { bookmarkGroups } from "./stores/bookmarkGroups";
</script>

<Container>
  <ActiveTabs />
  {#if !$bookmarkGroups.length}
    <BookmarkGroupFallback />
  {:else}
    {#each $bookmarkGroups as { name, id, bookmarks }}
      <svelte:component
        this={BookmarkGroup}
        {name}
        {id}
      />
    {/each}
  {/if}
</Container>
