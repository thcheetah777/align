<script lang="ts">
  import type { LayoutData } from "./$types";
  import * as Avatar from "$lib/components/ui/avatar";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button";
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";
  import Logo from "$lib/components/Logo.svelte";
  import { currentProject } from "$lib/stores";

  export let data: LayoutData;

  async function logOut(): Promise<void> {
    await toast.promise(
      data.supabase.auth.signOut(),
      {
        loading: "Logging out...",
        success: "Logged out successfully!",
        error: "There was an error logging you out",
      },
    );

    goto("/");
  }
</script>

<!-- Navbar -->
<nav class="flex fixed top-0 w-full justify-between items-center px-8 border-b border-border h-nav">
  <header class="flex items-center">
    <Logo href="/dashboard" class="w-20" />

    {#if $currentProject}
      <iconify-icon icon="lucide:chevron-right" class="text-base ml-3 mr-1"></iconify-icon>
      <a class="flex gap-0.5" href="/project/{$currentProject.id}">
        <span>{$currentProject.icon}</span>
        <span class="font-semibold">{$currentProject.name}</span>
      </a>
    {/if}
  </header>

  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button builders={[builder]} variant="ghost" size="icon" class="rounded-full">
        <Avatar.Root>
          <Avatar.Image
            src="https://api.dicebear.com/7.x/lorelei/svg?seed={data.session?.user.email}"
            alt="{data.session?.user.email}" />
          <Avatar.Fallback>
            {data.session?.user.user_metadata.first_name.charAt(0)}
            {data.session?.user.user_metadata.last_name.charAt(1)}
          </Avatar.Fallback>
        </Avatar.Root>
      </Button>
    </DropdownMenu.Trigger>

    <DropdownMenu.Content class="w-64">
      <DropdownMenu.Label class="p-3">
        <h1>
          {data.session?.user.user_metadata.first_name}
          {data.session?.user.user_metadata.last_name}
        </h1>
        <h2 class="font-light text-muted-foreground">{data.session?.user.email}</h2>
      </DropdownMenu.Label>

      <DropdownMenu.Separator />

      <DropdownMenu.Group class="space-y-1">
        <DropdownMenu.Item href="/dashboard">
          <iconify-icon icon="lucide:home" class="text-base mr-2"></iconify-icon>
          <span>Dashboard</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item href="/profile">
          <iconify-icon icon="lucide:user" class="text-base mr-2"></iconify-icon>
          <span>Profile</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item href="/settings">
          <iconify-icon icon="lucide:settings" class="text-base mr-2"></iconify-icon>
          <span>Settings</span>
        </DropdownMenu.Item>
      </DropdownMenu.Group>

      <DropdownMenu.Separator />

      <DropdownMenu.Group class="space-y-1">
        <a href="https://github.com/thcheetah777/align" target="_blank">
          <DropdownMenu.Item>
            <iconify-icon icon="lucide:github" class="text-base mr-2"></iconify-icon>
            <span>GitHub</span>
            <DropdownMenu.Shortcut>
              <iconify-icon icon="lucide:external-link" class="text-base"></iconify-icon>
            </DropdownMenu.Shortcut>
          </DropdownMenu.Item>
        </a>
        <DropdownMenu.Item on:click={logOut}>
          <iconify-icon icon="lucide:log-out" class="text-base mr-2"></iconify-icon>
          <span>Log Out</span>
        </DropdownMenu.Item>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</nav>

<div class="pt-nav overflow-auto h-screen">
  <slot />
</div>
