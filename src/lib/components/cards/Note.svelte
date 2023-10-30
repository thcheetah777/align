<script lang="ts">
  import type { CardPartial } from "$src/database.types";
  import { createEventDispatcher } from "svelte";

  export let content: string;

  let contentInput = content;

  const dispatch = createEventDispatcher();

  function save() {
    dispatch("save", {
      content: contentInput
    } satisfies CardPartial);
  }
</script>

<textarea
  class="w-full h-full border border-border bg-background rounded-sm p-4 resize-none overflow-hidden outline-none duration-200 text-sm"
  on:change={save}
  bind:value={contentInput}
></textarea>
