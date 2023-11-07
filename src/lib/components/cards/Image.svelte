<script lang="ts">
	import type { CardPartial, Database } from "$src/database.types.ts";
  import type { Session, SupabaseClient } from "@supabase/supabase-js";
  import { createEventDispatcher } from "svelte";

  export let content: string;
  export let session: Session | null;
  export let supabase: SupabaseClient<Database>;

  let fileInput: HTMLInputElement;
  let selectedFiles: FileList;
  let imageSource = content;

  const dispatch = createEventDispatcher();

  $: if (selectedFiles) {
    (async () => {
      await setImage(selectedFiles[0]);
    })();
  }

  function pickFile() {
    fileInput.click();
  }

  async function setImage(image: File) {
    imageSource = URL.createObjectURL(image);

    const { data } = await supabase
      .storage
      .from("images")
      .upload(`public/${session?.user.id}:${image.name}`, image, {
        cacheControl: "3600",
      });

    if (!data) return;

    const url = supabase.storage.from("images").getPublicUrl(data?.path).data.publicUrl;

    dispatch("save", {
      content: url
    } satisfies CardPartial);
  }
</script>

<input
  type="file"
  class="hidden"
  accept="image/*"
  bind:this={fileInput}
  bind:files={selectedFiles} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<img
  src={imageSource}
  alt="Caption Here"
  class="rounded-sm shadow-lg"
  on:click={pickFile} />
