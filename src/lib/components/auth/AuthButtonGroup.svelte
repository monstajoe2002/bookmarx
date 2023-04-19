<script lang="ts">
  import {
    Button,
    ButtonGroup,
    Checkbox,
    Input,
    Label,
    Modal,
  } from "flowbite-svelte";

  let toggleLoginModal = false;
  let toggleSignupModal = false;
</script>

<ButtonGroup>
  <Button color="blue" on:click={() => (toggleLoginModal = true)}>
    Log In
  </Button>
  <Button outline color="blue" on:click={() => (toggleSignupModal = true)}>Sign Up</Button>
</ButtonGroup>

<!-- Login Modal -->
<Modal bind:open={toggleLoginModal} size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" action="#">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      Sign in to Bookmarx
    </h3>
    <Label class="space-y-2">
      <span>Email</span>
      <Input
        type="email"
        name="email"
        placeholder="name@example.com"
        required
      />
    </Label>
    <Label class="space-y-2">
      <span>Your password</span>
      <Input type="password" name="password" placeholder="•••••" required />
    </Label>

    <Button type="submit" class="w-full1">Continue</Button>
  </form>
</Modal>

<!-- Signup modal -->
<Modal bind:open={toggleSignupModal} size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" action="#">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      Create a new Bookmarx account
    </h3>
    <Label class="space-y-2">
      <span>Email</span>
      <Input
        type="email"
        name="email"
        placeholder="name@example.com"
        required
      />
    </Label>
    <Label class="space-y-2">
      <span>Your password</span>
      <Input type="password" name="password" placeholder="•••••" required />
    </Label>

    <Button type="submit" class="w-full1">Continue</Button>
  </form>
</Modal>
