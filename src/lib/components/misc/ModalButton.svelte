<script lang="ts">
    import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte'
    let formModal = false;
    export let text:string;
  </script>
  
  <Button on:click={() => formModal = true}>{text}</Button>
  <Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
    <slot/>
  </Modal>