<script lang="ts">
  import { Button, Modal, Label, Input, Checkbox } from "flowbite-svelte";
  let formModal = false;
</script>

<Button {...$$restProps} on:click={() => (formModal = true)}>
  <slot name="icon" />
</Button>
<Modal bind:open={formModal} size="xs" {...$$restProps} class="w-full">
  <slot name="content" />
</Modal>
