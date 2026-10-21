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
  const rel = s.replace(/^\/+/, '');
  // Encode spaces / Cyrillic in file names (e.g. "images/menu/нова снимка.jpg"); keep already-encoded paths as they are.
  let encoded = rel;
  try { encoded = encodeURI(decodeURI(rel)); } catch { encoded = encodeURI(rel); }
  return `${window.location.origin}${import.meta.env.BASE_URL}${encoded}`;
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

/**
 * Parses JSON written by hand. If strict parsing fails, it repairs the most common
 * editing mistakes and tries again, so one typo doesn't take the whole menu offline:
 *   - invisible BOM character at the start (saved by Notepad)
 *   - a missing comma between two lines / two { } blocks
 *   - an extra comma before } or ]
 * A warning is logged so the mistake can still be found and fixed.
 */
export function parseJsonLenient<T = unknown>(text: string, fileName = 'JSON'): T {
  const clean = text.replace(/^﻿/, '');
  try {
    return JSON.parse(clean) as T;
  } catch (firstError) {
    const repaired = clean
      // extra comma before a closing bracket:  "a": 1, }
      .replace(/,(\s*[}\]])/g, '$1')
      // missing comma between a value and the next "key" / "value" on a new line
      .replace(/("|\d|true|false|null|[}\]])(\s*\r?\n\s*)(")/g, '$1,$2$3')
      // missing comma between two blocks:  } \n {   or  ] \n [
      .replace(/([}\]])(\s*\r?\n\s*)([{[])/g, '$1,$2$3');
    try {
      const data = JSON.parse(repaired) as T;
      console.warn(`${fileName}: syntax error was auto-corrected (missing/extra comma). Please fix the file.`, firstError);
      return data;
    } catch {
      throw firstError;
    }
  }
}

/** Fetches an admin-editable JSON file (no-cache + lenient parsing). Rejects on HTTP errors or unrecoverable syntax. */
export async function fetchJson<T = unknown>(path: string): Promise<T> {
  const r = await fetch(`${import.meta.env.BASE_URL}${path}`, NO_CACHE);
  if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
  return parseJsonLenient<T>(await r.text(), path);
}

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
