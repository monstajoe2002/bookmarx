<script lang="ts">
  import {
    Card,
    Button,
    Tooltip,
    Label,
    Input,
    Select,
  } from "flowbite-svelte";
  import { switchToTab } from "../../../stores/activeTabs";
  import ModalButtonWithIcon from "../misc/ModalButtonWithIcon.svelte";
  import { createBookmark } from "../../../stores/bookmarks";
  import { bookmarkGroups } from "../../../stores/bookmarkGroups";
  export let name: string;
  export let id: number;
  export let url: string;
  let selected: string;
  let groupNames = $bookmarkGroups.map(({ name }) => {
    return name;
  });
  let groups = groupNames.map((name) => ({
    value: name,
    name,
  }));
  $: groupId = $bookmarkGroups.find((group) => group.name === selected)?.id;
</script>

<Card horizontal class="flex justify-between w-72">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <h4
    class="my-auto text-xl font-bold tracking-tight text-blue-700 dark:text-white line-clamp-1 overflow-hidden whitespace-nowrap hover:underline cursor-pointer"
    on:click={() => {
      switchToTab(id);
    }}
  >
    {name}
  </h4>

  <!-- TODO: Change Tooltip style to auto -->
  <Tooltip>
    Switch to: {name}
  </Tooltip>

  <ModalButtonWithIcon class="w-fit ml-4" color="green">
    <svelte:fragment slot="icon">
      <i class="bi bi-bookmark-plus-fill" />
    </svelte:fragment>
    <svelte:fragment slot="content">
      <form
        class="flex flex-col space-y-6"
        action="#"
        on:submit|preventDefault={() => {
          createBookmark(name, url, groupId)
        }}
      >
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
          Add Bookmark
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
        <Label>
          Select a group
          <Select
            class="mt-2"
            items={groups}
            bind:value={selected}
            required
          />
        </Label>
        <Button type="submit" color="green" class="w-full">Add</Button>
      </form>
    </svelte:fragment>
  </ModalButtonWithIcon>
</Card>
