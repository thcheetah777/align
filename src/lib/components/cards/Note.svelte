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
  class="w-full h-full border border-border bg-lighter rounded-sm p-xs resize-none overflow-hidden outline-none"
  on:focusout={save}
  bind:value={contentInput}
></textarea>
