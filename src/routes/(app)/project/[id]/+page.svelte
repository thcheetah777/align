<script lang="ts">
  import type { PageData } from "./$types";

  import Card from "$components/Card.svelte";
  import { onMount } from "svelte";

  export let data: PageData;

  interface Utility {
    name: string;
    icon: string;
  }

  const utilities: Utility[] = [
    {
      name: "Note",
      icon: "material-symbols:sticky-note-2-outline",
    },
    {
      name: "Image",
      icon: "material-symbols:imagesmode-outline",
    },
    {
      name: "Color",
      icon: "mdi:palette",
    },
    {
      name: "Column",
      icon: "material-symbols:table-rows-narrow-outline-sharp"
    },
    {
      name: "Row",
      icon: "material-symbols:view-column-outline"
    }
  ];

  let whiteboard: HTMLDivElement;
  let mouseState = false;

  function mouseDown(e: MouseEvent) {
    if (e.button === 1) {
      e.preventDefault();
      mouseState = true;
      document.body.style.cursor = "grabbing";
    }
  }

  function mouseMove(e: MouseEvent) {
    if (mouseState) {
      e.preventDefault();
      whiteboard.scrollTop -= e.movementY;
      whiteboard.scrollLeft -= e.movementX;
    }
  }

  function mouseUp(e: MouseEvent) {
    if (e.button === 1) {
      e.preventDefault();
      mouseState = false;
      document.body.style.cursor = "auto";
    }
  }

  onMount(() => {
    document.addEventListener("mouseup", mouseUp);
    return () => document.removeEventListener("mouseup", mouseUp);
  });
</script>

<div class="flex h-full">
  <aside class="flex flex-col gap-xs p-xs bg-black border-r border-border w-md">
    {#each utilities as utility}
      <div class="flex flex-col items-center">
        <iconify-icon icon={utility.icon} class="text-2xl"></iconify-icon>
        <small class="text-xs">{utility.name}</small>
      </div>
    {/each}
  </aside>

  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="overflow-auto flex-grow relative dotted-background skinny-scrollbar"
    bind:this={whiteboard}
    on:mousedown={mouseDown}
    on:mousemove={mouseMove}>
    {#if data.cards}
      {#each data.cards as card}
        <Card {card} supabase={data.supabase} />
      {/each}
    {/if}
  </div>
</div>
