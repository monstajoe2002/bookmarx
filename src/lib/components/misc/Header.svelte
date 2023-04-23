<script lang="ts">
  import { Navbar, Button, Label, Input, P } from "flowbite-svelte";
  import ModalButton from "./ModalButton.svelte";
  import { createBookmarkGroup } from "../../../stores/bookmarkGroups";
  import AuthButtonGroup from "../auth/AuthButtonGroup.svelte";
  import { authStore, signOut } from "../../../stores/authStore";
  import SuccessAlert from "./SuccessAlert.svelte";
  import ErrorAlert from "./ErrorAlert.svelte";

  $: name = "";
  $: showSuccess = false;
  $: showError = false;
</script>

<Navbar let:hidden let:toggle>
  {#if !$authStore && !$authStore?.emailVerified}
    <AuthButtonGroup />
  {:else}
    <Button
      color="red"
      on:click="{() => {
        signOut();
        window.location.reload();
      }}">
      Sign Out
    </Button>
    <P size="lg">{$authStore.email}</P>
  {/if}
  <div class="flex md:order-2">
    <ModalButton text="New Bookmark Group">
      <form
        class="flex flex-col space-y-6"
        action="#"
        on:submit|preventDefault="{() =>
          createBookmarkGroup(name)
            .then(() => {
              showSuccess = true;
            })
            .catch(() => {
              showError = true;
            })}">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
          Create New Bookmark Group
        </h3>
        <Label class="space-y-2">
          <span>Name</span>
          <Input
            type="text"
            name="name"
            placeholder="Example"
            required
            bind:value="{name}" />
        </Label>
        <Button type="submit" class="w-full1">Create</Button>
        {#if showSuccess}
          <SuccessAlert message="Bookmark Group Created Successfully" />
        {:else if showError}
          <ErrorAlert>
            <svelte:fragment slot="message">
              Something went wrong. Please try again.
            </svelte:fragment>
          </ErrorAlert>
        {/if}
      </form>
    </ModalButton>
  </div>
</Navbar>
