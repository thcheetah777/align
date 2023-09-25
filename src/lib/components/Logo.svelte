<script lang="ts">
  import { cn } from "$lib/utils";

  let className = "";
  export { className as class };
</script>

<div class={cn("flex items-end font-logo text-4xl cursor-pointer group", className)}>
  <iconify-icon
    icon="ic:round-dashboard"
    class="relative bottom-1.5">
  </iconify-icon>
  <span class="font-bold ">Align</span>
</div>
