<script lang="ts">
  import { Alert } from "flowbite-svelte";
  import Container from "./layout/Container.svelte";
  import BookmarkGroup from "./lib/components/bookmark-groups/BookmarkGroup.svelte";
  import BookmarkGroupFallback from "./lib/components/bookmark-groups/BookmarkGroupFallback.svelte";
  import ActiveTabs from "./lib/components/tabs/ActiveTabs.svelte";
  import { authStore } from "./stores/authStore";
  import { bookmarkGroups } from "./stores/bookmarkGroups";
  import { auth } from "./config/firebase";
</script>

<Container>
  <ActiveTabs />
  {#if !$authStore}
    <Alert color="red">
      <span slot="icon">
        <i class="bi bi-exclamation-circle-fill"></i>
      </span>
      <span class="text-lg font-medium">No user account</span>
      <div slot="extra">
        <div class="mt-2 mb-4 text-sm">
          You must be signed in to use this app. Click on one of the buttons
          above to sign in or create a new account if you're a new user.
        </div>
      </div>
    </Alert>
  {:else if !$bookmarkGroups.length || !$bookmarkGroups.filter((b) => b.userId === auth.currentUser.uid).length}
    <BookmarkGroupFallback />
  {:else}
    {#each $bookmarkGroups.filter((b) => b.userId === auth.currentUser.uid) as { name, id }}
      <svelte:component this="{BookmarkGroup}" name="{name}" id="{id}" />
    {/each}
  {/if}
</Container>
