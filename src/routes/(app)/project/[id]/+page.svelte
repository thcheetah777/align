<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount, type ComponentEvents } from "svelte";
  import { currentProject } from "$lib/utils";
  import { fly } from "svelte/transition";
  import { backInOut } from "svelte/easing";

	import UtilityBar from "$components/UtilityBar.svelte";
  import Card from "$components/Card.svelte";

  export let data: PageData;

  let whiteboard: HTMLDivElement;
  let panning = false;
  let sidebarOpen = true;

  let cards = data.cards;

  // Whiteboard panning mouse events
  function mouseDown(e: MouseEvent): void {
    if (e.button === 1) {
      e.preventDefault();
      panning = true;
      document.body.style.cursor = "grabbing";
    }
  }

  function mouseMove(e: MouseEvent): void {
    if (panning) {
      e.preventDefault();
      whiteboard.scrollTop -= e.movementY;
      whiteboard.scrollLeft -= e.movementX;
    }
  }

  function mouseUp(e: MouseEvent): void {
    if (e.button === 1 && panning) {
      panning = false;
      document.body.style.cursor = "auto";
    }
  }

  // Card managing
  async function deleteCard(event: ComponentEvents<Card>["delete"]): Promise<void> {
    if (!cards) return;
    // Event detail is card id
    cards = cards.filter(card => card.id !== event.detail);
    await data.supabase
      .from("cards")
      .delete()
      .eq("id", event.detail);

    console.log("❌ Card deleted!");
  }

  onMount(() => {
    // Setting layout breadcrumb
    currentProject.set(data.project);
    document.addEventListener("mouseup", mouseUp);

    return async () => {
      currentProject.set(null);
      document.removeEventListener("mouseup", mouseUp);

      // Set last edited time
      await data.supabase
        .from("projects")
        .update({ last_updated: new Date().toISOString() })
        .eq("id", data.project.id);

      console.log("Updated last edited time");
    }
  });
</script>

<svelte:head>
  <title>Align - {data.project.name}</title>
</svelte:head>

<div class="flex h-full">
  <UtilityBar />

  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="overflow-auto flex-grow relative dotted-background skinny-scrollbar p-md"
    bind:this={whiteboard}
    on:mousedown={mouseDown}
    on:mousemove={mouseMove}>
    <!-- Cards -->
    {#if cards}
      {#each cards as card}
        <Card
          {card}
          supabase={data.supabase}
          on:delete={deleteCard} />
      {/each}
    {/if}

    <!-- Open sidebar button -->
    {#if !sidebarOpen}
      <button
        on:click={() => sidebarOpen = true}
        transition:fly={{ x: 24, duration: 350 }}
        class="fixed -right-6 top-1/2 -translate-y-1/2 rounded-full bg-black aspect-square w-12 flex items-center px-1">
        <iconify-icon icon="ic:baseline-chevron-left" class="text-xl text-white"></iconify-icon>
      </button>
    {/if}

    <!-- Project sidebar -->
    {#if sidebarOpen}
      <div
        class="py-xs right-xs h-[calc(100vh-theme('spacing.nav'))] fixed w-80 bottom-0"
        transition:fly={{ x: 320 + 16, duration: 450, opacity: 1, easing: backInOut }}>
        <div class="border border-border bg-black rounded-xl p-6 overflow-auto w-full h-full">
          <div class="space-y-xxs">
            <div class="flex justify-between items-center">
              <span class="font-bold text-xl">
                <button class="rounded-md hover:bg-lighter p-0.5 duration-200">
                  <i class="not-italic">{data.project.icon}</i>
                </button>
                <h1 class="inline">{data.project.name}</h1>
              </span>
              <button on:click={() => sidebarOpen = false}>
                <iconify-icon icon="ic:baseline-close" class="text-2xl"></iconify-icon>
              </button>
            </div>

            <h2 class="text-faded text-sm">{data.project.description}</h2>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
