<script lang="ts">
	import { goto } from "$app/navigation";
  import type { LayoutData } from "./$types";
  import Logo from "$components/Logo.svelte";
  import { fade } from "svelte/transition";
  import toast from "svelte-french-toast";

  export let data: LayoutData;

  let profileDropdown = false;

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

<nav class="flex items-center justify-between h-nav fixed top-0 w-full px-sm border-b bg-black border-border z-20">
  <header>
    <a href="/" class="hover:border-opacity-100 border-opacity-0 border border-border p-1 rounded-lg flex justify-center items-center duration-200">
      <iconify-icon icon="ic:round-dashboard" class="text-3xl"></iconify-icon>
    </a>
  </header>

  <div class="relative flex items-center">
    <button
      on:click={() => profileDropdown = !profileDropdown}
      class="aspect-square w-10">
      <img
        src="https://api.dicebear.com/7.x/lorelei/svg?seed={data.session?.user.id}"
        alt={data.session?.user.email}
        class="rounded-full w-full h-full bg-border">
    </button>

    {#if profileDropdown}
      <div
        class="absolute py-xs w-64 right-0 rounded-lg top-12 border border-border bg-black text-sm z-30"
        transition:fade={{ duration: 200 }}>
        <div class="px-xs mb-xs">
          <h1>{data.session?.user.user_metadata.first_name} {data.session?.user.user_metadata.last_name}</h1>
          <h2 class="text-faded">{data.session?.user.email}</h2>
        </div>

        <a
          href="/"
          class="flex items-center justify-between w-full px-xs py-xxs text-faded hover:bg-lighter hover:text-white duration-200">
          <span>Dashboard</span>
          <iconify-icon icon="material-symbols:home-outline" class="text-xl"></iconify-icon>
        </a>

        <a
          href="/settings"
          class="flex items-center justify-between w-full px-xs py-xxs text-faded hover:bg-lighter hover:text-white duration-200">
          <span>Settings</span>
          <iconify-icon icon="mdi:cog-outline" class="text-xl"></iconify-icon>
        </a>

        <button
          on:click={handleLogOut}
          class="flex items-center justify-between w-full px-xs py-xxs text-faded hover:bg-lighter hover:text-white duration-200">
          <span>Log Out</span>
          <iconify-icon icon="mdi:logout" class="text-xl"></iconify-icon>
        </button>
      </div>
    {/if}
  </div>
</nav>

<main class="pt-nav overflow-auto h-screen bg-background">
  <slot />
</main>
