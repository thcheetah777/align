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

  async function handleSignUp() {
    loading = true;

    const { error } = await data.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Successfully signed up in!");
      goto("/");
    }

    loading = false;
  }
</script>

<h1 class="font-medium text-xl">Sign Up</h1>

<form class="space-y-6 text-sm" on:submit|preventDefault={handleSignUp}>
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

  <div class="block">
    <input type="checkbox" name="Agreement" id="agreement" required>
    <label for="agreement">
      I agree to the
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        class="underline">terms of use</a>
    </label>
  </div>

  <Button type="submit" bind:loading>Create Account</Button>
</form>

<small class="text-center block text-faded">
  Already have an account?
  <a href="/login" class="text-white">Login</a>
</small>
