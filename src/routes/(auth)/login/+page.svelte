<script lang="ts">
  import type { PageData } from "./$types";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";
  import { goto } from "$app/navigation";
	import toast from "svelte-french-toast";
  import Logo from "$lib/components/Logo.svelte";

  export let data: PageData;

  let loading = false;
  let email = "";
  let password = "";

  async function logIn(): Promise<void> {
    loading = true;

    const { error } = await data.supabase.auth.signInWithPassword({
      email,
      password,
    });

    loading = false;

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in successfully!");
      goto("/dashboard");
    }
  }
</script>

<svelte:head>
  <title>Log In - Align</title>
</svelte:head>

<main class="h-screen flex flex-col justify-evenly items-center">
  <Logo href="/" />

  <form class="space-y-4 w-[28rem]" on:submit|preventDefault={logIn}>
    <div>
      <Label for="email">Email</Label>
      <Input
        type="email"
        id="email"
        placeholder="name@company.com"
        bind:value={email} />
    </div>

    <div>
      <Label for="email">Password</Label>
      <Input
        type="password"
        id="password"
        placeholder="•••••••••••••"
        bind:value={password} />
    </div>

    <Button type="submit" class="w-32" disabled={loading}>
      {#if loading}
        <iconify-icon icon="lucide:loader-2" class="text-lg animate-spin"></iconify-icon>
      {:else}
        Log In
      {/if}
    </Button>
  </form>

  <p class="text-muted-foreground text-sm">
    or <a href="/signup" class="hover:underline">sign up</a>
  </p>
</main>
