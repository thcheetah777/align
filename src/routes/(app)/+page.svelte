<script lang="ts">
	import ProjectStatus from "./../../lib/components/ProjectStatus.svelte";
  import type { PageData } from "./$types";
  import Input from "$components/Input.svelte";
  import Button from "$components/Button.svelte";

  export let data: PageData;
</script>

<div class="space-y-xs m-sm">
  <div class="flex items-stretch gap-xs">
    <Input id="search" label={false} containerClass="flex-grow h-full" placeholder="Search projects..." />
    <Button class="w-auto px-xs flex items-center gap-1 justify-center">
      <span>Create Project</span>
      <iconify-icon icon="ic:sharp-add" class="text-xl"></iconify-icon>
    </Button>
  </div>

  {#if data.projects}
    <div class="grid grid-cols-3 gap-xs">
      {#each data.projects as project}
        <a
          href="/project/{project.id}"
          class="border border-border hover:border-white bg-black rounded-lg p-6 duration-200">
          <div class="flex gap-xxs">
            <i class="text-4xl not-italic">{project.icon}</i>

            <!-- Besides icon -->
            <div class="flex-grow">
              <div class="flex justify-between items-center">
                <h1 class="text-base font-bold">{project.name}</h1>
                {#if project.status}
                  <small>
                    <ProjectStatus status={project.status} />
                  </small>
                {/if}
              </div>

              <small class="text-faded">Last edited at 8:32</small>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <p>Start by creating a project!</p>
  {/if}
</div>
