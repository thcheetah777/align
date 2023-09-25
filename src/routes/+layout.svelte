<script lang="ts">
  import type { LayoutData } from "./$types";
  import { onMount } from "svelte";
  import { invalidate } from "$app/navigation";
  import { Toaster } from "svelte-french-toast";

  import "../global.css";
  import "iconify-icon";

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

<slot />

<Toaster />
