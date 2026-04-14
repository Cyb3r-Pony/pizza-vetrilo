import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared validation patterns used across Contact and Catering forms. */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^\+?[\d\s\-\/]{7,}$/;

/**
 * Splits a phone string like "02/ 958 84 51 / 0879 812145" into individual
 * numbers ["02/ 958 84 51", "0879 812145"], correctly handling area codes
 * that contain a slash (e.g. "02/").
 */
export function splitPhones(phoneStr: string): string[] {
  const parts = phoneStr.split(' / ');
  const result: string[] = [];
  let current = '';
  for (const part of parts) {
    if (!current) {
      current = part;
    } else if (current.endsWith('/')) {
      // Fragment like "02/" is an area code — rejoin with the next piece
      current = current + ' ' + part;
    } else {
      result.push(current);
      current = part;
    }
  }
  if (current) result.push(current);
  return result;
}
