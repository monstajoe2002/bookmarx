<script lang="ts">
  import Container from "./layout/Container.svelte";
  import BookmarkGroup from "./lib/components/bookmark-groups/BookmarkGroup.svelte";
  import BookmarkGroupFallback from "./lib/components/bookmark-groups/BookmarkGroupFallback.svelte";
  import ActiveTabs from "./lib/components/tabs/ActiveTabs.svelte";
</script>




<Container>
  <ActiveTabs/>
  <BookmarkGroup/>
  <!-- <BookmarkGroupFallback/> -->
</Container>

