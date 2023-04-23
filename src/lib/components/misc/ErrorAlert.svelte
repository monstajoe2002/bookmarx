<script>
  import { Alert } from "flowbite-svelte";
</script>

<Alert color="red" dismissable>
  <span slot="icon">
    <i class="bi bi-exclamation-circle-fill"></i>
  </span>
  <slot name="message" />
</Alert>
