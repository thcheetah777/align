<script lang="ts">
  import type { Enums } from "$src/database.types";

  interface Utility {
    cardType: Enums<"card_type">;
    name: string;
    icon: string;
  }

  const utilities: Utility[] = [
    {
      cardType: "note",
      name: "Note",
      icon: "material-symbols:sticky-note-2-outline",
    },
    {
      cardType: "image",
      name: "Image",
      icon: "material-symbols:imagesmode-outline",
    },
    {
      cardType: "color",
      name: "Color",
      icon: "mdi:palette",
    },
    {
      cardType: "column",
      name: "Column",
      icon: "material-symbols:table-rows-narrow-outline-sharp"
    },
    {
      cardType: "row",
      name: "Row",
      icon: "material-symbols:view-column-outline"
    }
  ];
</script>

<aside class="flex flex-col gap-xs p-xs bg-black border-r border-border w-md">
  {#each utilities as utility}
    <div class="text-white flex flex-col items-center relative hover:pl-2 pl-0 duration-100 hover:cursor-pointer">
      <iconify-icon icon={utility.icon} class="text-2xl"></iconify-icon>
      <small class="text-xxs">{utility.name}</small>
    </div>
  {/each}
</aside>
