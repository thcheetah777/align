import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { writable } from "svelte/store";
import type { Tables } from "$src/database.types";

export function cn(...input: ClassValue[]) {
  return twMerge(clsx(input))
}

export const currentProject = writable<Tables<"projects"> | null>();
