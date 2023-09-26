<script lang="ts">
  import type { Tables } from "$src/database.types";

  export let card: Tables<"cards">;
</script>

{#if card.type === "note"}
  <div
    class="absolute bg-black border border-border rounded-lg p-xs"
    style="left: {card.x_position}px; top: {card.y_position}px;">
    {card.content}
  </div>
{/if}
