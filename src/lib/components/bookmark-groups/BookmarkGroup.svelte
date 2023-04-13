<script>
  import Bookmark from "../bookmarks/Bookmark.svelte";
</script>

<div class="bg-primary-subtle rounded p-4 shadow">
  <div class="d-flex justify-content-between">
    <h2>My Favorite Bookmarks</h2>
    <button class="btn btn-success">New Bookmark</button>
  </div>
  <div class="row row-cols-2 row-gap-4 my-4">
    <Bookmark />
    <Bookmark />
    <Bookmark />
    <Bookmark />
  </div>
</div>
