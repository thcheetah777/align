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
  let firstName = "";
  let lastName = "";
  let email = "";
  let password = "";

  async function signUp(): Promise<void> {
    loading = true;

    const { error } = await data.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    loading = false;

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Signed up successfully!");
      goto("/dashboard");
    }
  }
</script>

<svelte:head>
  <title>Align - Sign Up</title>
</svelte:head>

<main class="h-screen flex flex-col justify-evenly items-center">
  <Logo href="/" />

  <form class="space-y-4 w-[28rem]" on:submit|preventDefault={signUp}>
    <div>
      <Label for="name">Your Name</Label>
      <div class="flex gap-2" id="name">
        <Input
          type="text"
          id="first-name"
          placeholder="John"
          bind:value={firstName} />
        <Input
          type="text"
          id="last-name"
          placeholder="Doe"
          bind:value={lastName} />
      </div>
    </div>

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
        Sign Up
      {/if}
    </Button>
  </form>

  <p class="text-muted-foreground text-sm">
    or <a href="/login" class="hover:underline">log in</a>
  </p>
</main>
