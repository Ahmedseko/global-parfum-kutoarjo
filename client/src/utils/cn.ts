import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combines conditional classes (clsx) with correct Tailwind conflict
// resolution (twMerge), so a caller-supplied className like `w-24`
// reliably overrides a component's built-in `w-full` regardless of
// Tailwind's generated stylesheet order.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
