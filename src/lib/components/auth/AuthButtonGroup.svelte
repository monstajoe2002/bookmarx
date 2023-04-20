<script lang="ts">
  import {
    Alert,
    Button,
    ButtonGroup,
    Input,
    Label,
    Modal,
  } from "flowbite-svelte";
  import { authStore, logIn, signUp } from "../../../stores/authStore";
  import ErrorAlert from "../misc/ErrorAlert.svelte";
  import { sendEmailVerification } from "firebase/auth";
  import { auth } from "../../../config/firebase";
  let toggleLoginModal = false;
  let toggleSignupModal = false;
  $: showError = false;
  $: showSuccess = false;
  $: email = "";
  $: password = "";
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
  <form
    class="flex flex-col space-y-6"
    action="#"
    on:submit|preventDefault={() => {
      logIn(email, password)
        .then(() => {
          showSuccess = true;
        })
        .catch(() => {
          showError = true;
        });
    }}
  >
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
  </form>
</Modal>

<!-- Signup modal -->
<Modal bind:open={toggleSignupModal} size="xs" autoclose={false} class="w-full">
  <form
    class="flex flex-col space-y-6"
    action="#"
    on:submit|preventDefault={() => {
      signUp(email, password)
        .then(() => {
          if (!$authStore?.emailVerified) {
            sendEmailVerification(auth.currentUser);
          }
          showSuccess = true;
        })
        .catch(() => {
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
  </form>
  {#if showError}
    <ErrorAlert>
      <svelte:fragment slot="message">
        Something went wrong. Please try again.
      </svelte:fragment>
    </ErrorAlert>
  {:else if showSuccess}
    <Alert color="green" dismissable>
      <span slot="icon">
        <i class="bi bi-check-circle-fill" />
      </span>
      Your account has been created. Please check your inbox for a verification link.
    </Alert>
  {/if}
</Modal>
