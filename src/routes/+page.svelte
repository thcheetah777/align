<script lang="ts">
  import { Button } from "$lib/components/ui/button";
</script>

<svelte:head>
  <title>Align</title>
</svelte:head>

<main class="h-screen flex flex-col justify-evenly items-center">
  <img src="/logo.svg" alt="Align Logo">

  <div class="space-y-6e text-center">
    <h1 class="font-bold text-6xl leading-[4.5rem]">
      The Whiteboard
      <br>
      For
      <span class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
        Perfectionists
      </span>
    </h1>

    <h2 class="text-2xl text-muted-foreground font-light">
      A whiteboard for organizing ideas, not for brainstorming them.
    </h2>
  </div>

  <div class="space-x-2">
    <Button size="lg" class="group" href="/signup">
      Get Started
      <iconify-icon icon="mdi:arrow-right" class="text-xl ml-1 group-hover:translate-x-1 duration-200"></iconify-icon>
    </Button>

    <Button size="lg" variant="outline" href="/login">
      Log in
    </Button>
  </div>
</main>
