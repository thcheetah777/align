<script lang="ts">
  import type { CardPartial } from "$src/database.types";
  import { createEventDispatcher } from "svelte";

  export let content: string;

  let savedContent = content;
  let contentInput = content;

  const dispatch = createEventDispatcher();

  function save() {
    if (savedContent === contentInput) return;

    dispatch("save", {
      content: contentInput
    } satisfies CardPartial);

    savedContent = contentInput;
  }
</script>

<textarea
  class="w-[20rem] h-[5rem] border border-border bg-background rounded-sm p-4 resize-none overflow-hidden outline-none duration-200 text-sm"
  on:focusout={save}
  bind:value={contentInput}
></textarea>
