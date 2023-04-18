<script lang="ts">
  import { Card, Button, Label, Input } from "flowbite-svelte";
  import ModalButtonWithIcon from "../misc/ModalButtonWithIcon.svelte";
  import { deleteBookmark } from "../../../stores/bookmarks";
  import ErrorAlert from "../misc/ErrorAlert.svelte";
  export let name: string;
  export let id: string;
  $: showError = false;
  $:autoclose = true;
</script>

<Card horizontal class="flex justify-between">
  <h4
    class="my-auto text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1"
  >
    {name}
  </h4>

  <div>
    <ModalButtonWithIcon color="alternative">
      <svelte:fragment slot="icon">
        <i class="bi bi-pencil-fill" />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <form class="flex flex-col space-y-6" action="#">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Edit Bookmark
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
          <Button type="submit" class="w-full1">Edit</Button>
        </form>
      </svelte:fragment>
    </ModalButtonWithIcon>
    <ModalButtonWithIcon color="red" {autoclose}>
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
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this bookmark?
          </h3>
          <Button
            color="red"
            class="mr-2"
            on:click={() => {
              deleteBookmark(id).catch(() => {
                showError = true;
                autoclose = false;
              });
            }}
          >
            Yes, I'm sure
          </Button>
          <Button color="alternative">No, cancel</Button>
        </div>
      </svelte:fragment>
      {#if showError}
        <ErrorAlert>
          <svelte:fragment slot="message">
            An error occured while deleting the bookmark.
          </svelte:fragment>
        </ErrorAlert>
      {/if}
    </ModalButtonWithIcon>
  </div>
</Card>
