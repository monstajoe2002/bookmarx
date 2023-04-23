<script lang="ts">
  import { Button, Modal } from "flowbite-svelte";
  let formModal = false;
  export let text: string;
</script>

<Button {...$$restProps} on:click="{() => (formModal = true)}">{text}</Button>
<Modal bind:open="{formModal}" size="xs" autoclose="{false}" class="w-full">
  <slot />
</Modal>
