<script lang="ts">
  import type { LayoutData } from "./$types";
  import "@fontsource-variable/inter";
  import "@fontsource-variable/josefin-sans";
  import "../app.postcss";
  import "iconify-icon";
  import { Toaster } from "svelte-french-toast";
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

<Toaster />

<slot />
