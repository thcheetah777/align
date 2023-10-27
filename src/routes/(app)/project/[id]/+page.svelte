<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount, type ComponentEvents } from "svelte";
  import type { CardPartial, Enums } from "$src/database.types";
  import UtilityBar from "$lib/components/UtilityBar.svelte";
  import Card from "$lib/components/Card.svelte";
  import { fly } from "svelte/transition";
  import { backInOut } from "svelte/easing";
  import * as UICard from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
	import EmojiPicker from "$lib/components/EmojiPicker.svelte";

  export let data: PageData;

  let whiteboard: HTMLDivElement;
  let panning = false;
  let sidebarOpen = true;

  let cards = data.cards!;
  let project = data.project;

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

  // Card management
  async function deleteCard(event: ComponentEvents<Card>["delete"]): Promise<void> {
    // Event detail is card id
    cards = cards.filter(card => card.id !== event.detail);

    await data.supabase
      .from("cards")
      .delete()
      .eq("id", event.detail);

    console.log("❌ Card deleted!");
  }

  async function createCard(event: ComponentEvents<UtilityBar>["click"]): Promise<void> {
    const type = event.detail as Enums<"card_type">;
    const { data: result } = await data.supabase
      .from("cards")
      .insert({
        content: type === "image" ? "/image-placeholder.png" : "",
        project_id: project.id,
        type
      } satisfies CardPartial)
      .select();

    cards = [...cards, ...result ?? []];
  }

  // Project management
  async function saveProject(): Promise<void> {
    await data.supabase
      .from("projects")
      .update({
        icon: project.icon,
        name: project.name,
        description: project.description,
        status: project.status,
      })
      .eq("id", project.id);
  }

  function setIcon(event: ComponentEvents<EmojiPicker>["pick"]) {
    project.icon = event.detail;
    saveProject();
  }

  onMount(() => {
    document.addEventListener("mouseup", mouseUp);
    return () => document.removeEventListener("mouseup", mouseUp);
  });
</script>

<svelte:head>
  <title>Align - {project.name}</title>
</svelte:head>

<div class="flex h-full">
  <UtilityBar on:click={createCard} />

  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="overflow-auto flex-1 relative dotted-background skinny-scrollbar p-4"
    bind:this={whiteboard}
    on:mousedown={mouseDown}
    on:mousemove={mouseMove}>
    <!-- Cards -->
    {#if cards}
      {#each cards as card (card.id)}
        <Card
          {card}
          supabase={data.supabase}
          session={data.session}
          on:delete={deleteCard} />
      {/each}
    {/if}

    <!-- Open sidebar button -->
    {#if !sidebarOpen}
      <button
        on:click={() => sidebarOpen = true}
        transition:fly={{ x: 24, duration: 350 }}
        class="fixed -right-6 top-1/2 -translate-y-1/2 rounded-full bg-background aspect-square w-12 flex items-center px-1 border border-border">
        <iconify-icon icon="lucide:chevron-left" class="text-xl text-primary"></iconify-icon>
      </button>
    {/if}

    <!-- Project sidebar -->
    {#if sidebarOpen}
      <div
        class="py-6 right-6 h-[calc(100vh-theme('spacing.nav'))] fixed w-80 bottom-0"
        transition:fly={{ x: 320 + 16, duration: 450, opacity: 1, easing: backInOut }}>
        <UICard.Root class="border border-border bg-background rounded-xl overflow-auto w-full h-full">
          <UICard.Header>
            <UICard.Title tag="h1" class="flex justify-between items-center">
              <div class="flex items-center gap-1">
                <EmojiPicker on:pick={setIcon}>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="w-8 h-8 text-lg">
                    {project.icon}
                  </Button>
                </EmojiPicker>
                <span>{project.name}</span>
              </div>

              <button on:click={() => sidebarOpen = false}>
                <iconify-icon icon="lucide:x" class="text-2xl"></iconify-icon>
              </button>
            </UICard.Title>
            <UICard.Description>
              {project.description}
            </UICard.Description>
          </UICard.Header>
          <UICard.Content>

          </UICard.Content>
        </UICard.Root>
      </div>
    {/if}
  </div>
</div>
