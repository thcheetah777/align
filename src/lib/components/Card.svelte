<script lang="ts">
  import type { Database, Tables } from "$src/database.types";
  import type { SupabaseClient } from "@supabase/supabase-js";
  import { onMount } from "svelte";
  import { cn } from "../utils";

  export let card: Tables<"cards">;
  export let supabase: SupabaseClient<Database>;

  let elementName: "div" | "textarea" = "div";
  let cardElement: HTMLDivElement | HTMLTextAreaElement;
  let dragging = false;
  let selected = false;

  let previousContent = card.content;
  let x = card.x_position;
  let y = card.y_position;
  let previousPosition: [number, number] = [x, y];

  function mouseDown(e: MouseEvent) {
    if (e.button === 0 && cardElement instanceof HTMLDivElement) {
      dragging = true;

      previousPosition = [x, y];
    }
  }

  function mouseMove(e: MouseEvent) {
    if (dragging) {
      document.body.style.cursor = "move";

      x = +(cardElement.style.left.slice(0, cardElement.style.left.length - 2)) + e.movementX;
      y = +(cardElement.style.top.slice(0, cardElement.style.top.length - 2)) + e.movementY;
    }
  }

  async function mouseUp(e: MouseEvent) {
    if (e.button === 0) {
      dragging = false;
      document.body.style.cursor = "default";

      if /* not the card */ (e.target !== cardElement) return;

      if /* card didn't move */ (
        previousPosition[0] === x ||
        previousPosition[1] === y
      ) {
        elementName = "textarea";
        cardElement.focus();
        return;
      };

      await saveCard();
    }
  }

  async function focusOut() {
    if (cardElement instanceof HTMLTextAreaElement) {
      elementName = "div";

      if (previousContent === cardElement.value) return;

      await saveCard();

      previousContent = cardElement.value;
    }
  }

  async function saveCard() {
    await supabase
      .from("cards")
      .update({
        x_position: x,
        y_position: y,
        content: cardElement instanceof HTMLTextAreaElement ? cardElement.value : card.content,
      })
      .eq("id", card.id);

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
  <svelte:element
    id="content"
    class={cn(
      "bg-lighter resize outline-none absolute border border-border rounded-sm p-xs min-w-[20rem] min-h-[5rem] text-sm select-none",
      {
        "border-white": elementName === "textarea",
      },
    )}
    style="left: {x}px; top: {y}px;"
    on:mousedown={mouseDown}
    on:focusout={focusOut}
    bind:this={cardElement}
    this={elementName}
  >{previousContent}</svelte:element>
{/if}
