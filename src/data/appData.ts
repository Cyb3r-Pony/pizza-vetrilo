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
  /** true = show in "Chef's Favorites" on the Home page; false = never show there. */
  popular?: boolean;
}

/** An item is a Chef's Favorite if "popular": true, or it has the "popular" tag (unless "popular": false). */
export function isPopular(item: MenuItem): boolean {
  if (item.popular === true) return true;
  if (item.popular === false) return false;
  return !!item.tags?.includes('popular');
}

/** Tags to display as badges — includes "popular" for items marked "popular": true, excludes it for "popular": false. */
export function displayTags(item: MenuItem): string[] {
  const tags = (item.tags ?? []).filter(t => t !== 'popular');
  return isPopular(item) ? ['popular', ...tags] : tags;
}

// MenuData mirrors the shape of /public/menu/menu.json.
// Besides "categories" and "categoryLabels", every other key is a list of dishes.
export interface MenuData {
  /** Order of categories shown in the menu. Remove a name to hide that category. */
  categories: string[];
  /** Display names per language, e.g. { "Pizza": { "bg": "Пица", "en": "Pizza" } } */
  categoryLabels?: Record<string, { bg?: string; en?: string }>;
  [section: string]: unknown;
}

// Original categories use short section keys ("Main Dishes" -> "main-dishes").
const LEGACY_SECTION_KEYS: Record<string, string> = {
  'Pizza': 'pizza', 'Salads': 'salads', 'Starters': 'starters', 'Soups': 'soups',
  'Pasta': 'pasta', 'Risotto': 'risotto', 'Fish': 'fish', 'BBQ': 'bbq',
  'Main Dishes': 'main-dishes', 'Oven Dishes': 'oven-dishes', 'Burgers': 'burgers',
  'Breads': 'breads', 'Garnishes': 'garnishes', 'Sauces': 'sauces', 'Desserts': 'desserts',
};

/**
 * Returns the dishes of a category. The dish list can be stored under:
 *   - the exact category name   ("Grill Specials": [...])   <- recommended for new categories
 *   - its lowercase-dash form   ("grill-specials": [...])
 *   - the legacy short key      ("main-dishes" for "Main Dishes")
 */
export function getCategoryItems(data: MenuData | null | undefined, category: string): MenuItem[] {
  if (!data) return [];
  const slug = category.trim().toLowerCase().replace(/\s+/g, '-');
  for (const key of [category, slug, LEGACY_SECTION_KEYS[category]]) {
    const arr = key ? data[key] : undefined;
    if (Array.isArray(arr)) return arr.filter((i): i is MenuItem => !!i && typeof i === 'object');
  }
  return [];
}

/** Category display name: categoryLabels from menu.json → built-in translation → the raw name. */
export function categoryLabel(
  data: MenuData | null | undefined,
  category: string,
  language: string,
  t: (key: string) => string,
): string {
  const custom = data?.categoryLabels?.[category]?.[language as 'bg' | 'en']?.trim();
  if (custom) return custom;
  const key = `cat.${category}`;
  const tr = t(key);
  return tr === key ? category : tr;
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
