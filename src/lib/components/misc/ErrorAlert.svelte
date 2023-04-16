<script>
  import { Alert } from "flowbite-svelte";
</script>

<Alert color="red" dismissable>
  <slot name="icon" />
  <slot name="message" />
</Alert>
