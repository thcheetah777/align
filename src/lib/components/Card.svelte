<script lang="ts">
  import type { Card, Database } from "$src/database.types";
  import type { Session, SupabaseClient } from "@supabase/supabase-js";
  import { onMount, type ComponentEvents, createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  import { backIn } from "svelte/easing";

  import Note from "./cards/Note.svelte";
  import Image from "./cards/Image.svelte";
  import Link from "./cards/Link.svelte";

  export let card: Card;
  export let session: Session | null;
  export let supabase: SupabaseClient<Database>;

  let dragging = false;

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
    console.log("🔃 Saving card...");

    await supabase
      .from("cards")
      .update({
        x_position: x,
        y_position: y,
        ...event?.detail
      })
      .eq("id", card.id);

    console.log("✅ Card saved!");
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
  {:else if card.type === "link"}
    <Link
      content={card.content ?? ""}
      thumbnail={card.thumbnail}
      on:save={save} />
  {/if}

  <!-- Card actions -->
  <div class="flex gap-1 absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-1 duration-200">
    <button
      class="hover:text-red-500 duration-200"
      on:click={() => dispatch("delete", card.id)}>
      <iconify-icon icon="lucide:trash" class="text-base"></iconify-icon>
    </button>
    <div
      on:mousedown={startDrag}
      role="menuitem"
      tabindex="0"
      class="hover:cursor-move">
      <iconify-icon icon="lucide:move" class="text-base"></iconify-icon>
    </div>
  </div>
</div>

