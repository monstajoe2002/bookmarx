<script lang="ts">
  import { Card, Button } from "flowbite-svelte";
  import { switchToTab } from "../../../stores/activeTabs";
  export let name:string;
  export let id:number;
</script>

<Card horizontal class="flex justify-between w-72" >
  <h4
    class="my-auto text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1"
  >
    {name}
  </h4>

  <Button class="w-fit ml-4" on:click={()=>{switchToTab(id)}}>
    <i class="bi bi-arrow-right" />
  </Button>
</Card>
