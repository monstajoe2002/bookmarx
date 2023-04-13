<script>
  import Bookmark from "../bookmarks/Bookmark.svelte";
  import { Button } from "flowbite-svelte";
</script>

<div class="bg-blue-200 rounded-md p-8 max-w-screen">
  <div class="flex justify-between">
    <h1 class="text-4xl font-semibold dark:text-white">Docs</h1>
    <Button>New Bookmark</Button>
  </div>
  <div class="grid grid-cols-2 my-8 gap-4 items-center">
    <Bookmark />
    <Bookmark />
    <Bookmark />
    <Bookmark />
  </div>
</div>
