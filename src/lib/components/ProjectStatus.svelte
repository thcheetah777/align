<script lang="ts">
	import type { Enums } from "$src/database.types";
  import { cn } from "$lib/utils";

  export let status: Enums<"project_status">;
</script>

<div class={cn(
  "aspect-square w-2 rounded-full inline-block",
  {
    "bg-neutral-500": status === "Backlog",
    "bg-blue-500": status === "Todo",
    "bg-yellow-500": status === "In Progress",
    "bg-green-500": status === "Finished",
    "bg-red-500": status === "Canceled",
  }
)}></div>
