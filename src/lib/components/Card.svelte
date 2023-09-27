<script lang="ts">
  import type { Database, Tables } from "$src/database.types";
  import type { SupabaseClient } from "@supabase/supabase-js";
  import { onMount } from "svelte";

  export let card: Tables<"cards">;
  export let supabase: SupabaseClient<Database>;
  let cardElement: HTMLTextAreaElement;

  let dragging = false;
  let previousPosition: [string, string] = ["", ""];
  let previousContent = card.content.text;

  function mouseDown(e: MouseEvent) {
    if (e.button === 0) {
      dragging = true;

      document.body.style.cursor = "move";
      previousPosition = [cardElement.style.left, cardElement.style.top];
    }
  }

  function mouseMove(e: MouseEvent) {
    if (dragging) {
      cardElement.style.left = `${
        +(cardElement.style.left.slice(0, cardElement.style.left.length - 2)) +
        e.movementX}px`;
      cardElement.style.top = `${
        +(cardElement.style.top.slice(0, cardElement.style.top.length - 2)) +
        e.movementY}px`;
    }
  }

  async function mouseUp(e: MouseEvent) {
    if (e.button === 0) {
      dragging = false;
      document.body.style.cursor = "default";

      if (
        previousPosition[0] === cardElement.style.left ||
        previousPosition[1] === cardElement.style.top ||
        e.target != cardElement
      ) return;

      await autoSave();
    }
  }

  async function autoSave() {
    await supabase
      .from("cards")
      .update({
        x_position: +cardElement.style.left.toString().slice(0, cardElement.style.left.length - 2),
        y_position: +cardElement.style.top.toString().slice(0, cardElement.style.top.length - 2),
      })
      .eq("id", card.id);

    console.log("✅ Saved!");
  }

  async function saveContent() {
    if (previousContent === cardElement.value) return;

    await supabase
      .from("note_content")
      .update({ text: cardElement.value })
      .eq("id", card.content.id);

    previousContent = cardElement.value;

    console.log("📝 Card content saved!");
  }

  onMount(() => {
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("mousemove", mouseMove);

    return () => {
      document.removeEventListener("mouseup", mouseUp);
      document.removeEventListener("mousemove", mouseMove);
    }
  });
</script>

{#if card.type === "note"}
  <textarea
    name="content"
    id="content"
    class="bg-lighter hover:resize focus:resize resize-none outline-none absolute bg-lighter border border-border rounded-sm p-xs min-w-[20rem] min-h-[5rem] text-sm"
    style="left: {card.x_position}px; top: {card.y_position}px;"
    on:mousedown={mouseDown}
    on:focusout={saveContent}
    on:click={() => cardElement.focus()}
    bind:this={cardElement}
  >{card.content.text}</textarea>
{/if}
