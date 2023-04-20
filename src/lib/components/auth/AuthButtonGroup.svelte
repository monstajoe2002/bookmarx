<script lang="ts">
  import { Button, ButtonGroup, Input, Label, Modal } from "flowbite-svelte";
  import { authStore, signUp } from "../../../stores/authStore";
  import ErrorAlert from "../misc/ErrorAlert.svelte";
  import { onDestroy, onMount } from "svelte";
  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from "../../../config/firebase";
  let toggleLoginModal = false;
  let toggleSignupModal = false;
  $: showError = false;
  $: email = "";
  $: password = "";
  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      authStore.set(user);
      console.log($authStore);
    });
    return () => {
      unsubscribe();
    };
  });
</script>

<ButtonGroup>
  <Button color="blue" on:click={() => (toggleLoginModal = true)}>
    Log In
  </Button>
  <Button outline color="blue" on:click={() => (toggleSignupModal = true)}>
    Sign Up
  </Button>
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
  <form
    class="flex flex-col space-y-6"
    action="#"
    on:submit|preventDefault={() => {
      signUp(email, password).catch(() => {
        showError = true;
      });
    }}
  >
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
        bind:value={email}
      />
    </Label>
    <Label class="space-y-2">
      <span>Your password</span>

      <Input
        type="password"
        name="password"
        placeholder="•••••"
        required
        bind:value={password}
      />
    </Label>

    <Button type="submit" class="w-full1">Continue</Button>
    {#if showError}
      <ErrorAlert>
        <svelte:fragment slot="message">
          There was an error signing up. Please try again.
        </svelte:fragment>
      </ErrorAlert>
    {/if}
  </form>
</Modal>

{#if $authStore }
  {$authStore.email}
{/if}