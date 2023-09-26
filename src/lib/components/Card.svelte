<script lang="ts">
  import type { Database, Tables } from "$src/database.types";
  import type { SupabaseClient } from "@supabase/supabase-js";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";

  export let card: Tables<"cards">;
  export let supabase: SupabaseClient<Database>;
  let cardElement: HTMLElement;

  let dragging = false;

  function mouseDown(e: MouseEvent) {
    if (e.button === 0) {
      e.preventDefault();
      dragging = true;
      document.body.style.cursor = "move";
    }
  }

  function mouseMove(e: MouseEvent) {
    if (dragging) {
      e.preventDefault();
      const target = e.target as HTMLElement;
      target.style.left = `${+(target.style.left.slice(0, target.style.left.length - 2)) + e.movementX}px`;
      target.style.top = `${+(target.style.top.slice(0, target.style.top.length - 2)) + e.movementY}px`;
    }
  }

  function mouseUp(e: MouseEvent) {
    if (e.button === 0) {
      e.preventDefault();
      dragging = false;
      document.body.style.cursor = "default";
      const target = e.target as HTMLElement;
      if (target == cardElement) {
        toast.promise(
          new Promise<void>(async resolve => {
            await supabase
              .from("cards")
              .update({
                x_position: +target.style.left.toString().slice(0, target.style.left.length - 2),
                y_position: +target.style.top.toString().slice(0, target.style.top.length - 2),
              })
              .eq("id", card.id);
            resolve();
          }),
          {
            loading: "Saving...",
            success: "Saved!",
            error: "There was an error saving",
          }
        );
      }
    }
  }

  onMount(() => {
    document.addEventListener("mouseup", mouseUp);
    return () => document.removeEventListener("mouseup", mouseUp);
  });
</script>

{#if card.type === "note"}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="absolute bg-black border border-border rounded-lg p-xs w-80 h-20"
    style="left: {card.x_position}px; top: {card.y_position}px;"
    on:mousedown={mouseDown}
    on:mousemove={mouseMove}
    bind:this={cardElement}>
    {card.content}
  </div>
{/if}
