<script lang="ts">
  import type { Tables } from "$src/database.types";
  import { onMount } from "svelte";

  export let card: Tables<"cards">;

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
    on:mousemove={mouseMove}>
    {card.content}
  </div>
{/if}
