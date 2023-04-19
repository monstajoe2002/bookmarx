<script lang="ts">
  import { Navbar, Button, Label, Input } from "flowbite-svelte";
  import ModalButton from "./ModalButton.svelte";
  import { createBookmarkGroup } from "../../../stores/bookmarkGroups";
  import AuthButtonGroup from "../auth/AuthButtonGroup.svelte";
  $: name = "";
</script>

<Navbar let:hidden let:toggle>
  <AuthButtonGroup/>
  <div class="flex md:order-2">
    <ModalButton text="New Bookmark Group">
      <form
        class="flex flex-col space-y-6"
        action="#"
        on:submit|preventDefault={() => createBookmarkGroup(name)}
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
            bind:value={name}
          />
        </Label>
        <Button type="submit" class="w-full1">Create</Button>
      </form>
    </ModalButton>
  </div>
</Navbar>
