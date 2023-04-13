<script lang="ts">
  import { Navbar, NavHamburger, NavUl, NavLi, Button } from "flowbite-svelte";
</script>

<Navbar let:hidden let:toggle>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/" active={true}>Log In</NavLi>
    <NavLi href="/">Sign Up</NavLi>
  </NavUl>
  <div class="flex md:order-2">
    <Button size="sm">Get started</Button>
  </div>
</Navbar>
