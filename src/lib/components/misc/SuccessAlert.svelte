<script lang="ts">
  import { Alert } from "flowbite-svelte";
  export let message: string;
</script>

<Alert color="green" dismissable>
  <span slot="icon">
    <i class="bi bi-check-circle-fill"></i>
  </span>
  {message}
</Alert>
