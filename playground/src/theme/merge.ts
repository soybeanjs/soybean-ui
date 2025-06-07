import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
