<script lang="ts">
  import { cn } from "$lib/utils";

  export let href: string;

  let className = "";
  export { className as class };
</script>

<a {href}>
  <img src="/logo.svg" alt="Align Logo" class={cn("dark:block hidden", className)}>
  <img src="/logo-dark.svg" alt="Align Logo Dark" class={cn("block dark:hidden", className)}>
</a>
