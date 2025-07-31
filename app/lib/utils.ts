import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { expPerKg } from '../data/object-data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function countExp(weight: number) {
  const totalExp = weight * expPerKg;
  return totalExp;
}

export function getUserBadge(level: number): string {
  if (level >= 100) return 'gold';
  if (level >= 300) return 'diamond';
  if (level >= 800) return 'platinum';
  return 'empty';
}
