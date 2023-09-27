import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load = (async ({ params, locals: { supabase } }) => {
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .limit(1)
    .single();

  if (!project) throw error(404, {
    message: "Not found",
  });

  const { data: cards } = await supabase
    .from("cards")
    .select("*, content(*)")
    .eq("project_id", project.id);

  return { project, cards };
}) satisfies PageServerLoad;
