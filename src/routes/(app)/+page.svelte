<script lang="ts">
  import type { PageData } from "./$types";
	import { goto } from "$app/navigation";

  export let data: PageData;

  async function handleLogOut() {
    await data.supabase.auth.signOut();

    goto("/login");
  }
</script>

<h1>Home</h1>

<button on:click={handleLogOut}>Log out</button>
