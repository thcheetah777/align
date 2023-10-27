<script lang="ts">
  import type { CardPartial } from "$src/database.types";
  import { createEventDispatcher } from "svelte";

  export let content: string;
  export let thumbnail: string | null;

  const dispatch = createEventDispatcher();

  function save() {
    // dispatch("save", {
    //   content: contentInput
    // } satisfies CardPartial);
  }
</script>

<div class="border border-border bg-background rounded-sm p-4 duration-200 text-sm flex flex-col">
  <img src={thumbnail} alt={content}>
</div>
