<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface $$Props extends HTMLInputAttributes {
    class?: string;
    containerClass?: string;
    id: string;
    optional?: boolean;
    label?: boolean;
  };

  let className = "";
  export { className as class };

  export let containerClass = "";
  export let id = "";
  export let value = "";
  export let optional = false;
  export let label = true;
</script>

<div class={cn("space-y-2", containerClass)}>
  {#if label}
    <label for={id} class="block">
      <slot />
    </label>
  {/if}

  <input class={cn(
    "block w-full h-full border border-border focus:border-white bg-black py-xxs px-xs outline-none rounded-md duration-200 placeholder:text-faded",
    className
  )} bind:value required={!optional} {...$$restProps}>
</div>
