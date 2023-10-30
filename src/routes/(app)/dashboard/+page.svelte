<script lang="ts">
  import type { PageData } from "./$types";
  import { getDate, getTime } from "$lib/utils";
  import ProjectStatus from "$lib/components/ProjectStatus.svelte";
  import toast from "svelte-french-toast";
  import type { ComponentEvents } from "svelte";
  import type { ProjectPartial } from "$src/database.types";
  import { goto } from "$app/navigation";
  import { random } from "node-emoji";

  import * as Dialog from "$lib/components/ui/dialog";
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import EmojiPicker from "$lib/components/EmojiPicker.svelte";

  export let data: PageData;

  let creatingProject = false;
  let renamingProject = false;
  let newProjectIcon = random().emoji;
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
      goto(`/project/${result.id}`);
    }
  }

  async function deleteProject(id: string): Promise<void> {
    await data.supabase
      .from("projects")
      .delete()
      .eq("id", id)

    toast.success("Project deleted!");
    window.location = window.location;
  }

  async function renameProject(id: string, newName: string): Promise<void> {
    renamingProject = true;

    const { data: result } = await data.supabase
      .from("projects")
      .update({ name: newName })
      .eq("id", id);

    renamingProject = false;

    if (result) {
      toast.success("Project renamed!");
    }
  }

  function setIcon(event: ComponentEvents<EmojiPicker>["pick"]): void {
    newProjectIcon = event.detail;
  }
</script>

<svelte:head>
  <title>Dashboard - Align</title>
</svelte:head>

<main class="p-8 space-y-4">
  <div class="flex w-full items-center space-x-4">
    <Input type="search" placeholder="Search..." />

    <!-- Create project dialog -->
    <Dialog.Root>
      <Dialog.Trigger class={buttonVariants({ variant: "default" })}>
        New Project
        <iconify-icon icon="lucide:plus" class="text-lg ml-1"></iconify-icon>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Create a new project</Dialog.Title>
          <Dialog.Description>
            Choose a name and icon for your new project.
          </Dialog.Description>
        </Dialog.Header>
        <div class="px-4 space-y-4">
          <div class="flex gap-4 items-center">
            <Label class="w-16 text-right">Icon</Label>
            <div class="w-full">
              <EmojiPicker on:pick={setIcon}>
                <Button
                  variant="ghost"
                  size="icon"
                  class="w-8 h-8 text-lg">
                  {newProjectIcon}
                </Button>
              </EmojiPicker>
            </div>
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
  </div>

  <!-- Project list -->
  {#if data.projects}
    <div class="grid grid-cols-3 gap-4">
      {#each data.projects as project}
        <ContextMenu.Root>
          <ContextMenu.Trigger class="border border-border hover:border-primary rounded-lg duration-200">
            <a class="flex gap-2 p-6" href="/project/{project.id}">
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
            </a>
          </ContextMenu.Trigger>
          <ContextMenu.Content class="w-64">
            <ContextMenu.Item inset on:click={() => goto(`/project/${project.id}`)}>
              Edit
              <ContextMenu.Shortcut>
                <iconify-icon icon="lucide:edit" class="text-base"></iconify-icon>
              </ContextMenu.Shortcut>
            </ContextMenu.Item>
            <ContextMenu.Item inset>
              Rename
              <ContextMenu.Shortcut>
                <iconify-icon icon="lucide:text-cursor-input" class="text-base"></iconify-icon>
              </ContextMenu.Shortcut>
            </ContextMenu.Item>
            <ContextMenu.Item inset on:click={() => deleteProject(project.id)}>
              Delete
              <ContextMenu.Shortcut>
                <iconify-icon icon="lucide:trash" class="text-base"></iconify-icon>
              </ContextMenu.Shortcut>
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      {/each}
    </div>
  {/if}
</main>
