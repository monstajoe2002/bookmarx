<script>
  import { Card, Button } from "flowbite-svelte";
</script>

<Card horizontal class="flex justify-between">
  <h4
    class="my-auto text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1"
  >
    Bookmark
  </h4>

  <div>
    <Button color="alternative">
      <i class="bi bi-pencil-fill" />
    </Button>
    <Button color="red">
      <i class="bi bi-trash-fill" />
    </Button>
  </div>
</Card>
