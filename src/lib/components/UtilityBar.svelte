<script lang="ts">
  import type { Enums } from "$src/database.types";
  import { createEventDispatcher } from "svelte";

  interface Utility {
    cardType: Enums<"card_type">;
    name: string;
    icon: string;
  }

  const utilities: Utility[] = [
    {
      cardType: "note",
      name: "Note",
      icon: "lucide:sticky-note",
    },
    {
      cardType: "image",
      name: "Image",
      icon: "lucide:image",
    },
    {
      cardType: "link",
      name: "Link",
      icon: "lucide:link",
    },
    {
      cardType: "column",
      name: "Column",
      icon: "lucide:rows"
    },
    {
      cardType: "row",
      name: "Row",
      icon: "lucide:columns"
    }
  ];

  const dispatch = createEventDispatcher();
</script>

<aside class="flex flex-col gap-4 p-4 bg-background border-r border-border w-16">
  {#each utilities as utility}
    <button
      class="text-primary flex flex-col items-center pl-0 hover:pl-2 duration-100"
      on:click={() => dispatch("click", utility.cardType)}>
      <iconify-icon icon={utility.icon} class="text-xl"></iconify-icon>
      <small class="text-[0.7rem] font-medium">{utility.name}</small>
    </button>
  {/each}
</aside>
