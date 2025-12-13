import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Used by ShadcnUI to merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
