<script lang="ts">
  import BookmarkCard from "../bookmarks/BookmarkCard.svelte";
  import { Alert, Button, Input, Label } from "flowbite-svelte";
  import ModalButton from "../misc/ModalButton.svelte";
  import { bookmarks, createBookmark } from "../../../stores/bookmarks";
  import BookmarkFallback from "../bookmarks/BookmarkFallback.svelte";
  import ErrorAlert from "../misc/ErrorAlert.svelte";
  export let name: string;
  export let id: string;
  $: bookmarkName = "";
  $: bookmarkUrl = "";
  $: showError = false;
</script>

<div class="bg-blue-200 rounded-md p-6 max-w-screen mb-8">
  <div class="flex justify-between">
    <h1 class="text-4xl font-semibold dark:text-white">{name}</h1>
    <!-- Custom component for the ne bookmark modal -->
    <ModalButton text="New Bookmark">
      <form
        class="flex flex-col space-y-6"
        action="#"
        on:submit|preventDefault={() => {
          createBookmark(bookmarkName, bookmarkUrl, id).catch((err) => {
            showError = true;
            console.error(err)
          });
        }}
      >
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
          Create New Bookmark
        </h3>
        <Label class="space-y-2">
          <span>Name</span>
          <Input
            type="text"
            name="name"
            placeholder="Example"
            required
            bind:value={bookmarkName}
          />
        </Label>
        <Label class="space-y-2">
          <span>URL</span>
          <Input
            type="url"
            name="link"
            placeholder="www.example.com"
            required
            bind:value={bookmarkUrl}
          />
        </Label>
        <Button type="submit" class="w-full1">Create</Button>
      </form>
      {#if showError}
        <ErrorAlert>
          <svelte:fragment slot="message">
            An error occured while creating the bookmark.
          </svelte:fragment>
        </ErrorAlert>
      {/if}
    </ModalButton>
  </div>
  {#if !$bookmarks.length}
    <BookmarkFallback />
  {:else}
    <div class="grid grid-cols-2 grid-rows-2 gap-4 my-8">
      {#each $bookmarks as { name }}
        <BookmarkCard {name} />
      {/each}
    </div>
  {/if}
</div>
