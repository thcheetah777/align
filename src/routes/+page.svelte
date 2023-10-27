<script lang="ts">
  import type { PageData } from "./$types";
  import { Button } from "$lib/components/ui/button";
  import Logo from "$lib/components/Logo.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>Align</title>
</svelte:head>

<main class="h-screen flex flex-col justify-evenly items-center">
  <Logo href="/" />

  <div class="space-y-6 text-center">
    <h1 class="font-bold text-6xl leading-[4.5rem]">
      The Whiteboard
      <br>
      For
      <span class="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
        Thinkers
      </span>
    </h1>

    <h2 class="text-2xl text-muted-foreground font-light">
      A whiteboard for organizing ideas, not for brainstorming them.
    </h2>
  </div>

  {#if data.session}
    <Button size="lg" href="/dashboard">
      <iconify-icon icon="lucide:home" class="text-lg mr-2"></iconify-icon>
      <span>Go To Dashboard</span>
    </Button>
  {:else}
    <div class="space-x-2">
      <Button size="lg" class="group" href="/signup">
        Get Started
        <iconify-icon icon="lucide:arrow-right" class="text-xl ml-1 group-hover:translate-x-1 duration-200"></iconify-icon>
      </Button>

      <Button size="lg" variant="outline" href="/login">
        Log in
      </Button>
    </div>
  {/if}
</main>
