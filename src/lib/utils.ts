import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { writable } from "svelte/store";
import type { Tables } from "$src/database.types";

export function cn(...input: ClassValue[]) {
  return twMerge(clsx(input))
}

export function getDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}

export function getTime(date: string) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  })
}

export const currentProject = writable<Tables<"projects"> | null>();
