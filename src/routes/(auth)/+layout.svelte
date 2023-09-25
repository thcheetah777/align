<script lang="ts">
  import Logo from "$components/Logo.svelte";
</script>

<main class="flex flex-col justify-center items-center gap-xs min-h-screen py-sm">
  <Logo />

  <div class="rounded-lg px-6 py-xs w-1/3 space-y-sm">
    <slot />
  </div>
</main>
