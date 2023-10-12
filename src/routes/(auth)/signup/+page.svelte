<script lang="ts">
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";
  import toast from "svelte-french-toast";

	import Button from "$components/Button.svelte";
  import Input from "$components/Input.svelte";

  export let data: PageData;

  let name: [string, string] = ["", ""];
  let email = "";
  let password = "";

  let loading = false;

  async function handleSignUp() {
    loading = true;

    const { error } = await data.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: name[0] ,
          last_name: name[1],
        },
      },
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

<svelte:head>
  <title>Align - Sign up</title>
</svelte:head>

<h1 class="font-medium text-xl">Sign Up</h1>

<form class="space-y-4 text-sm" on:submit|preventDefault={handleSignUp}>
  <div class="flex gap-2">
    <Input
      id="first-name"
      containerClass="w-1/2"
      placeholder="John"
      bind:value={name[0]}>
      First name
    </Input>

    <Input
      id="last-name"
      containerClass="w-1/2"
      placeholder="Smith"
      bind:value={name[1]}>
      Last name
    </Input>
  </div>

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
