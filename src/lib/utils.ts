import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Turns an admin-supplied path from a JSON file into a full URL.
 * Accepts "images/x.jpg", "/images/x.jpg" or a full "https://..." link.
 */
export function resolveAsset(src?: string | null): string {
  if (!src) return '';
  const s = src.trim();
  if (/^https?:\/\//i.test(s)) return s;
  return `${window.location.origin}${import.meta.env.BASE_URL}${s.replace(/^\/+/, '')}`;
}

/**
 * Converts a price from menu.json into a number. Tolerates common admin
 * mistakes like "5.49" (string) or "5,49" (comma) instead of crashing the page.
 */
export function toPrice(value: unknown): number | null {
  if (value == null || value === '') return null;
  const n = typeof value === 'number' ? value : parseFloat(String(value).replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

/** Fetch options for admin-editable JSON: always revalidate so edits show up immediately. */
export const NO_CACHE: RequestInit = { cache: 'no-cache' };

/** Shared validation patterns used across Contact and Catering forms. */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^\+?[\d\s\-\/]{7,}$/;

/**
 * Splits a phone string like "02/ 958 84 51 / 0879 812145" into individual
 * numbers ["02/ 958 84 51", "0879 812145"], correctly handling area codes
 * that contain a slash (e.g. "02/").
 */
export function splitPhones(phoneStr?: string | null): string[] {
  if (!phoneStr || typeof phoneStr !== 'string') return [];
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
  return result.map(p => p.trim()).filter(Boolean);
}
