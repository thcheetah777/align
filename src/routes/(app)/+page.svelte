<script lang="ts">
  import type { PageData } from "./$types";
  import Input from "$components/Input.svelte";
  import Button from "$components/Button.svelte";

  export let data: PageData;
</script>

<div class="space-y-xs m-sm">
  <div class="flex items-stretch gap-xs">
    <Input id="search" label={false} containerClass="flex-grow" placeholder="Search projects..." />
    <Button class="w-36 flex items-center gap-xxs justify-center">
      <span>Create Project</span>
      <iconify-icon icon="ic:sharp-add" class="text-xl"></iconify-icon>
    </Button>
  </div>

  {#if data.projects}
    <div class="grid grid-cols-3 gap-xs">
      {#each data.projects as project}
        <a
          href="/project/{project.id}"
          class="border border-border hover:border-white bg-black rounded-lg p-sm duration-200">
          <div class="flex gap-xxs">
            <i class="text-4xl not-italic">{project.icon}</i>
            <div>
              <h1 class="text-lg font-bold">{project.name}</h1>
              <h2 class="text-sm">{project.created_at}</h2>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <p>Start by creating a project!</p>
  {/if}
</div>
