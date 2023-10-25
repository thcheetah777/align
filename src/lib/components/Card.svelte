<script lang="ts">
  import type { Card, Database } from "$src/database.types";
  import type { Session, SupabaseClient } from "@supabase/supabase-js";
  import { onMount, type ComponentEvents, createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  import { backIn } from "svelte/easing";

	import Note from "$components/cards/Note.svelte";
  import Image from "$components/cards/Image.svelte";

  export let card: Card;
  export let session: Session | null;
  export let supabase: SupabaseClient<Database>;

  let dragging = false;
  let selected = false;

  let x = card.x_position;
  let y = card.y_position;

  const dispatch = createEventDispatcher();

  function startDrag(e: MouseEvent): void {
    if (e.button === 0) {
      dragging = true;
      document.body.style.cursor = "move";
    }
  }

  function whileDragging(e: MouseEvent): void {
    if (dragging) {
      e.preventDefault();

      x += e.movementX;
      y += e.movementY;
    }
  }

  async function stopDrag(e: MouseEvent): Promise<void> {
    if (dragging && e.button === 0) {
      dragging = false;
      document.body.style.cursor = "auto";

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
    document.addEventListener("mousemove", whileDragging);

    return () => {
      document.removeEventListener("mouseup", stopDrag);
      document.addEventListener("mousemove", whileDragging);
    }
  });
</script>

<div
  class="group absolute w-auto h-auto duration-0"
  class:border-white={selected}
  style="left: {x}px; top: {y}px;"
  transition:scale={{ easing: backIn }}>
  <!-- Content -->
  {#if card.type === "note"}
    <Note
      content={card.content ?? ""}
      on:save={save} />
  {:else if card.type === "image"}
    <Image
      content={card.content ?? ""}
      on:save={save}
      {supabase} {session} />
  {/if}

  <!-- Card actions -->
  <div class="flex gap-1 absolute top-1 right-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-1 duration-200">
    <button
      class="hover:text-red-500 duration-200"
      on:click={() => dispatch("delete", card.id)}>
      <iconify-icon icon="mdi:trash-can-outline" class="text-lg"></iconify-icon>
    </button>
    <div
      on:mousedown={startDrag}
      role="menuitem"
      tabindex="0"
      class="hover:cursor-move">
      <iconify-icon icon="material-symbols:drag-pan-rounded" class="text-lg"></iconify-icon>
    </div>
  </div>
</div>
