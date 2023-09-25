<script lang="ts">
  import type { PageData } from "./$types";
	import { goto } from "$app/navigation";
  import toast from "svelte-french-toast";

  export let data: PageData;

  async function handleLogOut() {
    await toast.promise(
      data.supabase.auth.signOut(),
      {
        loading: "Logging out...",
        success: "Successfully logged out!",
        error: "There was an error logging you out",
      },
    );

    goto("/login");
  }
</script>

<h1>Home</h1>

<button on:click={handleLogOut}>Log out</button>
