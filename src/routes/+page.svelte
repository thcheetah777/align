<script lang="ts">
  import type { LayoutData } from "./$types";
  import { Button } from "$lib/components/ui/button";
  import { onMount } from "svelte";
  import { invalidate } from "$app/navigation";

  export let data: LayoutData;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => subscription.unsubscribe();
  });
</script>

<svelte:head>
  <title>Align</title>
</svelte:head>

<main class="h-screen flex flex-col justify-evenly items-center">
  <a href="/">
    <img src="/logo.svg" alt="Align Logo">
  </a>

  <div class="space-y-6 text-center">
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

  {#if data.session}
    <Button size="lg" href="/dashboard">
      <iconify-icon icon="mdi:home" class="text-xl mr-1"></iconify-icon>
      <span>Go To Dashboard</span>
    </Button>
  {:else}
    <div class="space-x-2">
      <Button size="lg" class="group" href="/signup">
        Get Started
        <iconify-icon icon="mdi:arrow-right" class="text-xl ml-1 group-hover:translate-x-1 duration-200"></iconify-icon>
      </Button>

      <Button size="lg" variant="outline" href="/login">
        Log in
      </Button>
    </div>
  {/if}
</main>
