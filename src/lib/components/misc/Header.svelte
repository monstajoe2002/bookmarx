<script lang="ts">
  import {
    Navbar,
    NavHamburger,
    NavUl,
    NavLi,
    Button,
    Label,
    Input,
  } from "flowbite-svelte";
  import ModalButton from "./ModalButton.svelte";
</script>

<Navbar let:hidden let:toggle>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/" active={true}>Log In</NavLi>
    <NavLi href="/">Sign Up</NavLi>
  </NavUl>
  <div class="flex md:order-2">
    <ModalButton text="New Bookmark Group">
      <form class="flex flex-col space-y-6" action="#">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
          Create New Bookmark
        </h3>
        <Label class="space-y-2">
          <span>Name</span>
          <Input type="text" name="name" placeholder="Example" required />
        </Label>
        <Button type="submit" class="w-full1">Create</Button>
      </form>
    </ModalButton>
  </div>
</Navbar>
