import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/utils';

export interface LocationInfo {
  id: string;
  name: Record<string, string>;
  address: Record<string, string>;
  phone: string;
  ordersPhone: string;
  reservationPhone: string;
  hours: Record<string, string>;
  coordinates: { lat: number; lng: number };
  googleMapsUrl: string;
  /** Optional photo for the location card, e.g. "images/restaurant/restaurant-3/image-1.jpeg". */
  image?: string;
}

export interface RestaurantInfo {
  locations: LocationInfo[];
  social: {
    facebook: string;
    instagram: string;
    email: string;
  };
  delivery: {
    wolt: string;
    takeaway: string;
    glovo: string;
    bolt: string;
  };
}

/** Text that may be written as "text" or { "bg": "...", "en": "..." } → always { bg, en }. */
function i18n(v: unknown): Record<string, string> {
  if (typeof v === 'string') return { bg: v, en: v };
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>;
    const bg = typeof o.bg === 'string' ? o.bg : typeof o.en === 'string' ? o.en : '';
    const en = typeof o.en === 'string' ? o.en : bg;
    return { bg, en };
  }
  return { bg: '', en: '' };
}
const str = (v: unknown) => (typeof v === 'string' ? v : v == null ? '' : String(v));

/**
 * Fills in missing fields so a deleted/mistyped line in restaurant-info.json
 * can never crash the whole site — at worst that piece of info is just empty.
 */
function normalize(raw: any): RestaurantInfo | null {
  if (!raw || typeof raw !== 'object') return null;
  const locations: LocationInfo[] = (Array.isArray(raw.locations) ? raw.locations : [])
    .filter((l: any) => l && typeof l === 'object')
    .map((l: any, i: number) => ({
      ...l,
      id: str(l.id) || `loc${i + 1}`,
      name: i18n(l.name),
      address: i18n(l.address),
      hours: i18n(l.hours),
      phone: str(l.phone),
      ordersPhone: str(l.ordersPhone || l.phone),
      reservationPhone: str(l.reservationPhone || l.phone),
      googleMapsUrl: str(l.googleMapsUrl),
      coordinates: {
        lat: Number(l.coordinates?.lat) || 0,
        lng: Number(l.coordinates?.lng) || 0,
      },
      image: l.image ? str(l.image) : undefined,
    }));
  const s = raw.social ?? {}, d = raw.delivery ?? {};
  return {
    ...raw,
    locations,
    social: { facebook: str(s.facebook), instagram: str(s.instagram), email: str(s.email) },
    delivery: { wolt: str(d.wolt), takeaway: str(d.takeaway), glovo: str(d.glovo), bolt: str(d.bolt) },
  };
}

// Module-level cache: fetched once, shared across all component instances.
let _cached: RestaurantInfo | null = null;
let _promise: Promise<RestaurantInfo> | null = null;

function load(): Promise<RestaurantInfo> {
  if (!_promise) {
    _promise = fetchJson('restaurant-info.json')
      .then(normalize)
      .catch(err => {
        console.error('restaurant-info.json could not be read — check the JSON syntax.', err);
        return null;
      });
  }
  return _promise!;
}

/**
 * Returns the parsed restaurant-info.json (locations, social links, delivery links).
 * Returns null while loading. Falls back to null on error.
 * Safe to call from multiple components — only one HTTP request is ever made.
 * Edit /public/restaurant-info.json on the server to update phones, hours, addresses, etc.
 */
export function useRestaurantInfo(): RestaurantInfo | null {
  const [info, setInfo] = useState<RestaurantInfo | null>(_cached);

  useEffect(() => {
    if (_cached) return;
    load().then(data => {
      _cached = data;
      setInfo(data);
    });
  }, []);

  return info;
}
