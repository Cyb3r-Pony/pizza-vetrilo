import { resolveAsset } from './utils';

/**
 * Self-healing image paths.
 *
 * The server only finds a photo if the name in the JSON matches the file EXACTLY
 * (upper/lower case, .jpg vs .jpeg, hidden spaces...). When a photo fails to load,
 * the site tries the most common variants of the name before giving up:
 *   - other extensions:        .jpg / .jpeg / .png / .webp (also in capitals)
 *   - first letter case:       pileshko_vreteno ↔ Pileshko_vreteno, all lowercase
 *   - a stray space:           "Tarator.jpg" ↔ "Tarator .jpg" (space before the extension)
 *   - Cyrillic look-alikes:    ".jpеg" typed with a Cyrillic "е" → ".jpeg"
 */

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG'];
const CYR_TO_LAT: Record<string, string> = {
  'а': 'a', 'е': 'e', 'о': 'o', 'р': 'p', 'с': 'c', 'х': 'x', 'у': 'y', 'к': 'k', 'м': 'm', 'т': 't', 'н': 'h', 'в': 'b', 'г': 'r', 'і': 'i',
  'А': 'A', 'Е': 'E', 'О': 'O', 'Р': 'P', 'С': 'C', 'Х': 'X', 'К': 'K', 'М': 'M', 'Т': 'T', 'Н': 'H', 'В': 'B',
};
const MAX_CANDIDATES = 40;

/** All relative paths worth trying for an admin-supplied image path, most likely first. */
export function imagePathCandidates(src?: string | null): string[] {
  if (!src) return [];
  const raw = src.trim();
  if (!raw) return [];
  if (/^https?:\/\//i.test(raw)) return [raw];

  const path = raw.replace(/^\/+/, '');
  const slash = path.lastIndexOf('/');
  const dir = slash >= 0 ? path.slice(0, slash + 1) : '';
  const file = path.slice(slash + 1);
  const dot = file.lastIndexOf('.');
  const baseRaw = dot > 0 ? file.slice(0, dot) : file;
  const extRaw = dot > 0 ? file.slice(dot + 1) : '';

  const ext = extRaw.split('').map(c => CYR_TO_LAT[c] ?? c).join('').trim();
  const base = baseRaw.trim();
  const lowerFirst = base.charAt(0).toLowerCase() + base.slice(1);
  const upperFirst = base.charAt(0).toUpperCase() + base.slice(1);
  const bases = [base, upperFirst, lowerFirst, base.toLowerCase()];
  const exts = [ext, ...EXTENSIONS].filter(Boolean);

  const out: string[] = [path];
  const add = (b: string, e: string) => { const p = `${dir}${b}${e ? '.' + e : ''}`; if (!out.includes(p)) out.push(p); };
  // 1) same name, fixed/alternative extension   2) other first-letter case   3) stray space before the extension
  for (const e of exts) add(base, e);
  for (const b of bases) for (const e of exts) add(b, e);
  for (const b of bases) for (const e of exts) add(`${b} `, e);
  return out.slice(0, MAX_CANDIDATES);
}

/** Full URLs to try, in order. */
export function imageUrlCandidates(src?: string | null): string[] {
  return imagePathCandidates(src).map(p => resolveAsset(p));
}

/**
 * onError handler for <img>: moves to the next candidate URL; when none are left,
 * calls onGiveUp (e.g. show the logo, or hide the card).
 */
export function makeImageFallback(src: string | undefined | null, onGiveUp: (img: HTMLImageElement) => void, label?: string) {
  const urls = imageUrlCandidates(src);
  return (e: { currentTarget: HTMLImageElement }) => {
    const img = e.currentTarget;
    const tried = Number(img.dataset.fallbackIndex ?? '0') + 1;
    if (tried < urls.length) {
      img.dataset.fallbackIndex = String(tried);
      img.src = urls[tried];
      if (tried === 1) {
        img.addEventListener('load', () => {
          console.warn(`Image${label ? ` for "${label}"` : ''}: "${src}" was not found; showing "${decodeURI(new URL(img.src).pathname)}" instead. Please correct the path in the JSON file.`);
        }, { once: true });
      }
    } else {
      img.dataset.fallbackIndex = String(urls.length);
      onGiveUp(img);
    }
  };
}

/** Finds which candidate actually loads (used by the image check page). */
export function findWorkingImage(src: string): Promise<{ url: string; index: number } | null> {
  const urls = imageUrlCandidates(src);
  return new Promise(resolve => {
    let i = 0;
    const next = () => {
      if (i >= urls.length) return resolve(null);
      const img = new Image();
      const idx = i++;
      img.onload = () => resolve({ url: urls[idx], index: idx });
      img.onerror = next;
      img.src = urls[idx];
    };
    next();
  });
}
