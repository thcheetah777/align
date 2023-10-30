<script lang="ts">
  import * as Popover from "$lib/components/ui/popover";
  import { createEventDispatcher } from "svelte";
  import * as emojis from "node-emoji";
  import Button from "./ui/button/button.svelte";
  import { Input } from "./ui/input";

  let search = "";
  let selected: null | string = null;

  const dispatch = createEventDispatcher();

  function setSelected(emoji: string): void {
    dispatch("pick", emoji);
    selected = emoji;
  }
</script>

<Popover.Root>
  <Popover.Trigger><slot {selected} /></Popover.Trigger>
  <Popover.Content class="h-80 w-96 flex flex-col gap-2">
    <Input class="h-8 placeholder:text-xs" placeholder="Search..." bind:value={search} />
    <div class="grid grid-cols-10 gap-0 overflow-auto w-full skinny-scrollbar">
      {#each emojis.search(search) as emoji}
        <Button
          variant="ghost"
          size="icon"
          class="w-8 h-8"
          title=":{emoji.name}:"
          on:click={() => setSelected(emoji.emoji)}>
          {emoji.emoji}
        </Button>
      {/each}
    </div>
  </Popover.Content>
</Popover.Root>
