import type { PageServerLoad } from "./$types";

export const load = (async ({ locals: { supabase } }) => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("last_updated", { ascending: false });

  return { projects };
}) satisfies PageServerLoad;
