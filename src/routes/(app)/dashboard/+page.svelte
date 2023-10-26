<script lang="ts">
  import type { PageData } from "./$types";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Label } from "$lib/components/ui/label";
  import type { ProjectPartial } from "$src/database.types";
  import { goto } from "$app/navigation";
  import ProjectStatus from "$lib/components/ProjectStatus.svelte";
  import { getDate, getTime } from "$lib/utils";
  import toast from "svelte-french-toast";

  export let data: PageData;

  let creatingProject = false;
  let newProjectIcon = "😆";
  let newProjectName = "Untitled Project";

  async function createProject(): Promise<void> {
    creatingProject = true;

    const { data: result } = await data.supabase
      .from("projects")
      .insert({
        name: newProjectName,
        icon: newProjectIcon,
        last_updated: new Date().toISOString(),
      } satisfies ProjectPartial)
      .select()
      .single();

    creatingProject = false;

    if (result) {
      toast.success("Project created!");
      console.log(result);
      goto(`/project/${result.id}`);
    }
  }
</script>

<main class="p-8 space-y-4">
  <div class="flex w-full items-center space-x-4">
    <Input type="search" placeholder="Search..." />

    <!-- Create project dialog -->
    <Dialog.Root>
      <Dialog.Trigger class={buttonVariants({ variant: "default" })}>
        New Project
        <iconify-icon icon="lucide:plus" class="text-lg ml-1"></iconify-icon>
      </Dialog.Trigger>
      <Dialog.Content class="bg-opacity-80">
        <Dialog.Header>
          <Dialog.Title>Create a new project</Dialog.Title>
          <Dialog.Description>
            Choose a name and icon for your new project.
          </Dialog.Description>
        </Dialog.Header>
        <div class="px-4 space-y-4">
          <div class="flex gap-4 items-center">
            <Label class="w-16 text-right">Icon</Label>
            <Input id="icon" bind:value={newProjectIcon} />
          </div>
          <div class="flex gap-4 items-center">
            <Label class="w-16 text-right">Name</Label>
            <Input id="name" bind:value={newProjectName} />
          </div>
        </div>
        <Dialog.Footer>
          <Button on:click={createProject} disabled={creatingProject}>
            {#if creatingProject}
              <iconify-icon icon="lucide:loader-2" class="text-lg animate-spin mr-2"></iconify-icon>
            {/if}
            Create
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
    <!-- <AlertDialog.Root>
      <AlertDialog.Trigger asChild let:builder>
        <Button builders={[builder]}>
          New Project
          <iconify-icon icon="lucide:plus" class="text-lg ml-1"></iconify-icon>
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Create a new project</AlertDialog.Title>
          <AlertDialog.Description>
            Choose a name and icon for your new project.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <div class="px-4 space-y-4">
          <div class="flex gap-4 items-center">
            <Label class="w-16 text-right">Icon</Label>
            <Input id="icon" bind:value={newProjectIcon} />
          </div>
          <div class="flex gap-4 items-center">
            <Label class="w-16 text-right">Name</Label>
            <Input id="name" bind:value={newProjectName} />
          </div>
        </div>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action on:click={createProject} disabled={creatingProject}>
            {#if creatingProject}
              <iconify-icon icon="lucide:loader-2" class="text-lg"></iconify-icon>
            {:else}
              Create
            {/if}
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root> -->
  </div>

  {#if data.projects}
    <div class="grid grid-cols-3 gap-4">
      {#each data.projects as project}
        <a
          href="/project/{project.id}"
          class="border border-border hover:border-white rounded-lg p-6 duration-200">
          <div class="flex gap-2">
            <i class="text-4xl not-italic">{project.icon}</i>

            <!-- Besides icon -->
            <div class="flex-1">
              <div class="flex justify-between items-center">
                <h1 class="text-base font-bold">{project.name}</h1>
                {#if project.status}
                  <small>
                    <ProjectStatus status={project.status} />
                    <span>{project.status}</span>
                  </small>
                {/if}
              </div>

              {#if project.last_updated}
                <small class="text-muted-foreground">
                  Last edited on {getDate(project.last_updated)} at {getTime(project.last_updated)}
                </small>
              {/if}
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</main>
