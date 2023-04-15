<script lang="ts">
  import Bookmark from "../bookmarks/Bookmark.svelte";
  import { Button, Input, Label } from "flowbite-svelte";
  import ModalButton from "../misc/ModalButton.svelte";
  export let name: string;
</script>

<div class="bg-blue-200 rounded-md p-6 max-w-screen mb-8">
  <div class="flex justify-between">
    <h1 class="text-4xl font-semibold dark:text-white">{name}</h1>
    <!-- Custom component for the ne bookmark modal -->
    <ModalButton text="New Bookmark">
      <form class="flex flex-col space-y-6" action="#">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
          Create New Bookmark
        </h3>
        <Label class="space-y-2">
          <span>Name</span>
          <Input type="text" name="name" placeholder="Example" required />
        </Label>
        <Label class="space-y-2">
          <span>URL</span>
          <Input
            type="url"
            name="link"
            placeholder="www.example.com"
            required
          />
        </Label>
        <Button type="submit" class="w-full1">Create</Button>
      </form>
    </ModalButton>
  </div>
  <div class="grid grid-cols-2 grid-rows-2 gap-4 my-8">
    <Bookmark />
    <Bookmark />
    <Bookmark />
    <Bookmark />
  </div>
</div>
