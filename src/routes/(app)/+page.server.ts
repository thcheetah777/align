import type { PageServerLoad } from "./$types";

export const load = (async ({ locals: { supabase } }) => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*");

  return { projects };
}) satisfies PageServerLoad;
