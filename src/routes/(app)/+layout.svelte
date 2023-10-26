<script lang="ts">
  import type { LayoutData } from "./$types";
  import * as Avatar from "$lib/components/ui/avatar";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button";
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";
  import Logo from "$lib/components/Logo.svelte";

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

<svelte:head>
  <title>Align - Dashboard</title>
</svelte:head>

<!-- Navbar -->
<nav class="flex justify-between items-center px-8 border-b border-border h-14">
  <header>
    <Logo href="/dashboard" class="w-20" />
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

    <DropdownMenu.Content class="w-64 bg-opacity-95 backdrop-blur-md">
      <DropdownMenu.Label>
        <h1>
          {data.session?.user.user_metadata.first_name}
          {data.session?.user.user_metadata.last_name}
        </h1>
        <h2 class="font-light">{data.session?.user.email}</h2>
      </DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
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
      <DropdownMenu.Group>
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

<slot />
