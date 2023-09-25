<script lang="ts">
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";

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
      console.error(error.message);
    } else {
      goto("/");
    }

    loading = false;
  }
</script>

<h1 class="font-medium text-xl">Login</h1>

<form class="space-y-6 text-sm" on:submit|preventDefault={handleLogin}>
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

<small class="text-center block text-white text-opacity-50">
  Don't have an account?
  <a href="/signup" class="text-white text-opacity-100">Sign Up</a>
</small>
