import { useState, useEffect } from 'react';

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

// Module-level cache: fetched once, shared across all component instances.
let _cached: RestaurantInfo | null = null;
let _promise: Promise<RestaurantInfo> | null = null;

function load(): Promise<RestaurantInfo> {
  if (!_promise) {
    _promise = fetch(`${import.meta.env.BASE_URL}restaurant-info.json`)
      .then(r => (r.ok ? r.json() : null))
      .catch(() => null);
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
