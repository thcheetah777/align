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

  const minWidth = 320;
  const minHeight = 80;

  let moving = false;
  let resizing = false;

  let cardElement: HTMLDivElement;
  let x = card.x_position;
  let y = card.y_position;
  let width = card.width;
  let height = card.height;

  const dispatch = createEventDispatcher();

  // Moving the card
  function startMove(e: MouseEvent): void {
    if (e.button === 0) {
      moving = true;
      document.body.style.cursor = "move";
    }
  }

  // Resizing the card
  function startResize(e: MouseEvent): void {
    if (e.button === 0) {
      resizing = true;
      document.body.style.cursor = "nw-resize";
    }
  }

  async function stopDrag(e: MouseEvent): Promise<void> {
    if (e.button === 0) {
      if (moving || resizing) {
        document.body.style.cursor = "auto";
        await save();
      }

      moving = false;
      resizing = false;
    }
  }

  function whileDragging(e: MouseEvent): void {
    if (moving) {
      e.preventDefault();

      x += e.movementX;
      y += e.movementY;
    }

    if (resizing) {
      e.preventDefault();

      const cardBounds = cardElement.getBoundingClientRect();

      width = e.clientX - cardBounds.left;
      height = e.clientY - cardBounds.top;

      if (width <= minWidth) width = minWidth;
      if (height <= minHeight) height = minHeight;
    }
  }

  async function save(event?: ComponentEvents<Note>["save"]): Promise<void> {
    console.log("🔃 Saving card...");

    await supabase
      .from("cards")
      .update({
        x_position: x,
        y_position: y,
        width,
        height,
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
      document.removeEventListener("mousemove", whileDragging);
    }
  });
</script>

<div
  class="group absolute w-auto h-auto duration-0"
  style="left: {x}px; top: {y}px; width: {width}px; height: {height}px;"
  transition:scale={{ easing: backIn }}
  bind:this={cardElement}>
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

  <!-- Delete and move card actions -->
  <div class="flex gap-1 absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-1 duration-200">
    <button
      class="hover:text-red-500 duration-200"
      on:click={() => dispatch("delete", card.id)}>
      <iconify-icon icon="lucide:trash" class="text-base"></iconify-icon>
    </button>
    <div
      on:mousedown={startMove}
      role="menuitem"
      tabindex="0"
      class="hover:cursor-move">
      <iconify-icon icon="lucide:move" class="text-base"></iconify-icon>
    </div>
  </div>

  <!-- Resize card action -->
  <div
    on:mousedown={startResize}
    role="menuitem"
    tabindex="0"
    class="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 duration-200 w-6 h-6 hover:cursor-nw-resize">
    <iconify-icon icon="mdi:resize-bottom-right" class="text-xl"></iconify-icon>
  </div>
</div>
