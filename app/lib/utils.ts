import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
<<<<<<< HEAD

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
=======
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
>>>>>>> feature/object-detection
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
