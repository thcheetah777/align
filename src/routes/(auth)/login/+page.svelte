<script lang="ts">
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";
  import toast from "svelte-french-toast";

	import Button from "$components/Button.svelte";
  import Input from "$components/Input.svelte";

  export let data: PageData;

  let email = "";
  let password = "";

  let loading = false;

  async function handleLogin() {
    loading = true;

    const { error } = await data.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Successfully logged in!");
      goto("/");
    }

    loading = false;
  }
</script>

<svelte:head>
  <title>Align - Log in</title>
</svelte:head>

<h1 class="font-medium text-xl">Login</h1>

<form class="space-y-4 text-sm" on:submit|preventDefault={handleLogin}>
  <Input
    type="email"
    id="email"
    placeholder="name@company.com"
    bind:value={email}>Email</Input>

  <Input
    type="password"
    id="password"
    placeholder="••••••••••"
    bind:value={password}>Password</Input>

  <Button type="submit" bind:loading>Login</Button>
</form>

<small class="text-center block text-faded">
  Don't have an account?
  <a href="/signup" class="text-white">Sign Up</a>
</small>
