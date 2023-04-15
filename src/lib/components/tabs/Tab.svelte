<script lang="ts">
  import { Card, Button } from "flowbite-svelte";
  export let name:string;
</script>

<Card horizontal class="flex justify-between w-72" >
  <h4
    class="my-auto text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1"
  >
    {name}
  </h4>

  <Button class="w-fit ml-4">
    <i class="bi bi-arrow-right" />
  </Button>
</Card>
