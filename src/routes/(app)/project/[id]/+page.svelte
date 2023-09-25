<script lang="ts">
  import type { PageData } from "./$types";

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
      console.log(e.movementX, e.movementY);
      whiteboard.scrollTop -= e.movementY;
      whiteboard.scrollLeft -= e.movementX;
    }
  }

  function mouseUp(e: MouseEvent) {
    if (e.button === 1) {
      e.preventDefault();
      mouseState = false;
      document.body.style.cursor = "default";
    }
  }
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
    class="overflow-auto flex-grow relative dotted-background"
    bind:this={whiteboard}
    on:mousedown={mouseDown}
    on:mousemove={mouseMove}
    on:mouseup={mouseUp}>
    <div class="absolute top-[40rem] left-[80rem] w-80 bg-black p-xs border border-border rounded-lg">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo magni sit placeat odit impedit dolore. Animi aliquam doloremque nostrum cumque labore delectus enim molestiae? Ad rem perspiciatis earum eaque tempore.
    </div>
  </div>
</div>
