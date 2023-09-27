<script lang="ts">
  import type { Database, Tables } from "$src/database.types";
  import type { SupabaseClient } from "@supabase/supabase-js";
  import { onMount } from "svelte";

  export let card: Tables<"cards">;
  export let supabase: SupabaseClient<Database>;
  let cardElement: HTMLElement;

  let dragging = false;
  let previousPosition: [string, string] = ["", ""];

  function mouseDown(e: MouseEvent) {
    if (e.button === 0) {
      e.preventDefault();

      dragging = true;
      document.body.style.cursor = "move";

      previousPosition = [cardElement.style.left, cardElement.style.top];
    }
  }

  function mouseMove(e: MouseEvent) {
    if (dragging) {
      e.preventDefault();

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
      e.preventDefault();

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

      await supabase
      .from("projects")
      .update({ last_updated: new Date().toISOString() })
      .eq("id", card.project_id);

    console.log("✅ Saved!");
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
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="absolute bg-lighter border border-border rounded-sm p-xs w-80 h-20 text-sm"
    style="left: {card.x_position}px; top: {card.y_position}px;"
    on:mousedown={mouseDown}
    bind:this={cardElement}>
    {card.content}
  </div>
{/if}
