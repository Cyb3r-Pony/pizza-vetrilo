// MenuItem represents a single dish as stored in /public/menu/menu.json.
// price_small / price_large are used for dual-size items (e.g. pizza).
// When both fields are absent, use `price` for a single price.
// Set `hidden: true` to suppress an item without deleting it from the JSON.
export interface MenuItem {
  id: string;
  name: Record<string, string>;
  category: string;
  description: Record<string, string>;
  price?: number;
  price_small?: number;
  price_large?: number;
  weight: string;
  tags?: string[];
  image?: string;
  hidden?: boolean;
}

// MenuData mirrors the shape of /public/menu/menu.json.
export interface MenuData {
  categories: string[];
  pizza: MenuItem[];
  salads: MenuItem[];
  starters: MenuItem[];
  soups: MenuItem[];
  pasta: MenuItem[];
  risotto: MenuItem[];
  fish: MenuItem[];
  bbq: MenuItem[];
  "main-dishes": MenuItem[];
  "oven-dishes": MenuItem[];
  burgers: MenuItem[];
  breads: MenuItem[];
  garnishes: MenuItem[];
  sauces: MenuItem[];
  desserts: MenuItem[];
}

export interface Location {
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

// Locations, social links, and delivery links have moved to /public/restaurant-info.json.
// Edit that file on the server to update phones, hours, addresses, etc. — no rebuild needed.
// Use the useRestaurantInfo() hook (src/hooks/useRestaurantInfo.ts) to access them in components.

// splitPhones lives in src/lib/utils.ts (slash-aware version that handles "02/" area codes).

export interface GalleryItem {
  id: string;
  url: string;
  caption: Record<string, string>;
  category: string;
}

// Gallery items are now managed via /public/gallery.json — editable via FTP without a rebuild.
