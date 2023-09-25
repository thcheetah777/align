<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  interface $$Props extends HTMLButtonAttributes {
    class?: string;
    loading?: boolean;
    outline?: boolean;
  };

  let className = "";
  export { className as class };

  export let loading = false;
  export let outline = false;
</script>

<button class={cn(
  "w-full font-medium duration-200 text-sm outline-none p-3",
  (
    outline ?
    "border border-border hover:border-white rounded-md bg-black text-white" :
    "bg-white text-black rounded-md hover:bg-neutral-200 active:scale-smaller"
  ),
  className,
)} on:click {...$$restProps}>
  {#if loading}
    <iconify-icon icon="gg:spinner" class="animate-spin text-base"></iconify-icon>
  {:else}
    <slot />
  {/if}
</button>
