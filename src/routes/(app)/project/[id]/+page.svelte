<script lang="ts">
  import type { PageData } from "./$types";

  import Card from "$components/Card.svelte";
  import { onMount } from "svelte";
  import { currentProject } from "$lib/utils";

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
    currentProject.set(data.project);
    document.addEventListener("mouseup", mouseUp);

    return () => {
      document.removeEventListener("mouseup", mouseUp);
      currentProject.set(null);
    }
  });
</script>

<div class="flex h-full">
  <aside class="flex flex-col gap-xs p-xs bg-black border-r border-border w-md">
    {#each utilities as utility}
      <div class="text-white text-opacity-60 hover:text-opacity-100 flex flex-col items-center relative hover:left-1 left-0 duration-100 hover:cursor-pointer">
        <iconify-icon icon={utility.icon} class="text-2xl"></iconify-icon>
        <small class="text-xxs">{utility.name}</small>
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
