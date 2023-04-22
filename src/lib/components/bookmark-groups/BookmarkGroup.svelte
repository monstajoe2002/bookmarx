<script lang="ts">
  import BookmarkCard from "../bookmarks/BookmarkCard.svelte";
  import { Alert, Button, Input, Label } from "flowbite-svelte";
  import ModalButton from "../misc/ModalButton.svelte";
  import { bookmarks, createBookmark } from "../../../stores/bookmarks";
  import BookmarkFallback from "../bookmarks/BookmarkFallback.svelte";
  import ErrorAlert from "../misc/ErrorAlert.svelte";
  import ModalButtonWithIcon from "../misc/ModalButtonWithIcon.svelte";
  import {
    deleteBookmarkGroup,
    updateBookmarkGroup,
  } from "../../../stores/bookmarkGroups";
  export let name: string;
  export let id: string;
  $: bookmarkName = "";
  $: bookmarkUrl = "";
  $: showError = false;
  $: showSuccess = false;
</script>

<div class="bg-blue-200 rounded-md p-6 max-w-screen my-6">
  <div class="flex justify-between">
    <div class="flex gap-4">
      <h1 class="text-4xl font-semibold dark:text-white">{name}</h1>
      <ModalButtonWithIcon>
        <svelte:fragment slot="icon">
          <i class="bi bi-pencil-fill" />
        </svelte:fragment>
        <svelte:fragment slot="content">
          <form
            class="flex flex-col space-y-6"
            action="#"
            on:submit|preventDefault={() => updateBookmarkGroup(id, name).then(() => {
              showSuccess = true;
              showError = false;
            }).catch(() => {
              showError = true;
            })}
          >
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Edit Group Name
            </h3>
            <Label class="space-y-2">
              <span>Name</span>
              <Input
                type="text"
                name="name"
                placeholder="Example"
                required
                bind:value={name}
              />
            </Label>
            <Button type="submit" class="w-full1">Save Changes</Button>
          </form>
          {#if showSuccess}
            <Alert border color="green">
              <span slot="icon">
                <i class="bi bi-check-circle-fill" />
              </span>
              <span class="font-medium">Bookmark name updated!</span>
            </Alert>
          {/if}
          {#if showError}
            <ErrorAlert>
              <svelte:fragment slot="message">
                An error occured while saving changes.
              </svelte:fragment>
            </ErrorAlert>
          {/if}
        </svelte:fragment>
      </ModalButtonWithIcon>
    </div>
    <div class="flex gap-4">
      <!-- Custom component for the new bookmark modal -->
      <ModalButton text="New Bookmark">
        <form
          class="flex flex-col space-y-6"
          action="#"
          on:submit|preventDefault={() => {
            createBookmark(bookmarkName, bookmarkUrl, id)
              .then(() => {
                showSuccess = true;
                showError = false;
              })
              .catch(() => {
                showError = true;
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
        {#if showSuccess}
          <Alert border color="green">
            <span slot="icon">
              <i class="bi bi-check-circle-fill" />
            </span>
            <span class="font-medium">Bookmark saved!</span>
          </Alert>
        {/if}
        {#if showError}
          <ErrorAlert>
            <svelte:fragment slot="message">
              An error occured while creating the bookmark.
            </svelte:fragment>
          </ErrorAlert>
        {/if}
      </ModalButton>

      <!-- Delete Group -->
      <ModalButtonWithIcon color="red">
        <svelte:fragment slot="icon">
          <i class="bi bi-trash-fill" />
        </svelte:fragment>
        <svelte:fragment slot="content">
          <div class="text-center">
            <svg
              aria-hidden="true"
              class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3
              class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
              Are you sure you want to delete this group?
            </h3>
            <Button
              color="red"
              class="mr-2"
              on:click={() => {
                deleteBookmarkGroup(id);
              }}
            >
              Yes, I'm sure
            </Button>
            <Button color="alternative">No, cancel</Button>
          </div>
        </svelte:fragment>
      </ModalButtonWithIcon>
    </div>
  </div>
  {#if !$bookmarks.length || !$bookmarks.filter((b) => b.groupId === id).length}
    <BookmarkFallback />
  {:else}
    <div class="grid grid-cols-2 grid-rows-2 gap-4 my-8">
      {#each $bookmarks.filter((b) => b.groupId === id) as { name, id, url }}
        <BookmarkCard {name} {id} {url} />
      {/each}
    </div>
  {/if}
</div>
