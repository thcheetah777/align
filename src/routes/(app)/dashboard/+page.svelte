<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";

  function createProject(): void {

  }
</script>

<div class="p-8 space-y-4">
  <div class="flex w-full items-center space-x-4">
    <Input type="search" placeholder="Search..." />

    <!-- Create project dialog -->
    <Button on:click={createProject}>
      Create Project
      <iconify-icon icon="lucide:plus" class="text-lg ml-1"></iconify-icon>
    </Button>
  </div>
</div>
