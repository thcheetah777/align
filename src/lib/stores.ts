import type { Project } from "$src/database.types";
import { writable } from "svelte/store";

export const currentProject = writable<Project | null>(null);
