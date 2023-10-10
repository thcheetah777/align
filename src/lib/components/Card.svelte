<script lang="ts">
  import type { Card, Database } from "$src/database.types";
  import type { SupabaseClient } from "@supabase/supabase-js";
  import { onMount, type ComponentEvents } from "svelte";

	import Note from "./cards/Note.svelte";

  export let card: Card;
  export let supabase: SupabaseClient<Database>;

  let isDragging = false;
  let isSelected = false;

  let x = card.x_position;
  let y = card.y_position;

  function startDrag(e: MouseEvent): void {
    if (e.button === 0) {
      isDragging = true;
      document.body.style.cursor = "move";
    }
  }

  function dragging(e: MouseEvent): void {
    if (isDragging) {
      x += e.movementX;
      y += e.movementY;
    }
  }

  async function stopDrag(e: MouseEvent): Promise<void> {
    if (isDragging && e.button === 0) {
      isDragging = false;
      document.body.style.cursor = "default";

      await save();
    }
  }

  async function save(event?: ComponentEvents<Note>["save"]): Promise<void> {
    console.log("🔃 Saving...");

    await supabase
      .from("cards")
      .update({
        x_position: x,
        y_position: y,
        ...event?.detail
      })
      .eq("id", card.id);

    console.log("✅ Saved!");
  }

  onMount(() => {
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("mousemove", dragging);

    return () => {
      document.removeEventListener("mouseup", stopDrag);
      document.addEventListener("mousemove", dragging);
    }
  });
</script>

<div
  class="group absolute w-[20rem] h-[5rem]"
  class:border-white={isSelected}
  style="left: {x}px; top: {y}px;">
  <!-- Content -->
  {#if card.type === "note"}
    <Note
      content={card.content ?? ""}
      on:save={save} />
  {/if}

  <!-- Card actions -->
  <div class="flex gap-1 absolute top-1 right-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-1 duration-200">
    <button class="hover:text-red-500 duration-200">
      <iconify-icon icon="mdi:trash-can-outline" class="text-lg"></iconify-icon>
    </button>
    <div on:mousedown={startDrag} role="menuitem" tabindex="0">
      <iconify-icon icon="material-symbols:drag-pan-rounded" class="text-lg"></iconify-icon>
    </div>
  </div>
</div>
