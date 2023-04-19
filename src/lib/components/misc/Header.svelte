<script lang="ts">
  import {
    Navbar,
    NavHamburger,
    NavUl,
    NavLi,
    Button,
    Label,
    Input,
    ButtonGroup,
  } from "flowbite-svelte";
  import ModalButton from "./ModalButton.svelte";
  import { createBookmarkGroup } from "../../../stores/bookmarkGroups";
  $: name = "";

  let autoclose: boolean;
</script>

<Navbar let:hidden let:toggle>
  <!-- <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/" active={true}>Log In</NavLi>
    <NavLi href="/">Sign Up</NavLi>
  </NavUl> -->
  <ButtonGroup>
    <Button color="blue">Sign Up</Button>
    <Button outline color="blue">Log In</Button>
  </ButtonGroup>
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
