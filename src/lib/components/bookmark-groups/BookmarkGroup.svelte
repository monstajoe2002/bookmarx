<script>
  import Bookmark from "../bookmarks/Bookmark.svelte";
  import { Button } from "flowbite-svelte";
  import BookmarkFallback from "../bookmarks/BookmarkFallback.svelte";
</script>

<div class="bg-blue-200 rounded-md p-8 max-w-screen">
  <div class="flex justify-between">
    <h1 class="text-4xl font-semibold dark:text-white">Docs</h1>
    <Button>New Bookmark</Button>
  </div>
  <BookmarkFallback/>
</div>
