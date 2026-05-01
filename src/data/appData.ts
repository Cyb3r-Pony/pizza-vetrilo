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

export const LOCATIONS: Location[] = [
  {
    id: "v1",
    name: { bg: "Ресторант 1 - Борово", en: "Restaurant 1 - Borovo" },
    address: { bg: "жк. Борово, ул. Солун, с/у блок 43", en: "Borovo, Solun str., opposite bl. 43" },
    phone: "02/ 958 84 51",
    ordersPhone: "02/ 958 84 51 / 0879 812145",
    reservationPhone: "0884884021",
    hours: { bg: "11:00 - 23:00", en: "11:00 - 23:00" },
    coordinates: { lat: 42.6714478, lng: 23.289468 },
    googleMapsUrl: "https://www.google.com/maps/place/Pizza+Vetrilo/@42.6714597,23.2894599,19.02z/data=!3m1!5s0x40aa84dd41c5aef3:0xa19534e9de07a769!4m6!3m5!1s0x40aa84dd5d2c908b:0x56f28a758fb57b32!8m2!3d42.6714407!4d23.2894065!16s%2Fg%2F1tj5p6xj!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDQxMi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    id: "v2",
    name: { bg: "Ресторант 2 - Стрелбище", en: "Restaurant 2 - Strelbishte" },
    address: { bg: "жк. Стрелбище, ул. Орехова гора 42А", en: "Strelbishte, Orehova gora str. 42A" },
    phone: "02/ 850 47 60",
    ordersPhone: "0884 554 455 / 02/ 850 47 60 / 02 850 47 61",
    reservationPhone: "0884 87 40 40",
    hours: { bg: "11:00 - 23:00", en: "11:00 - 23:00" },
    coordinates: { lat: 42.6676556, lng: 23.2803958 },
    googleMapsUrl: "https://www.google.com/maps/place/Vetrilo/@42.6701864,23.2968743,17z/data=!3m1!4b1!4m6!3m5!1s0x40aa85716eb5c75d:0x8563bd6a12198e00!8m2!3d42.6701864!4d23.2994492!16s%2Fg%2F1tj94y0j!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDQxMi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    id: "v3",
    name: { bg: "Ресторант 3 - Младост", en: "Restaurant 3 - Mladost" },
    address: { bg: "жк. Младост 1, бл. 144", en: "Mladost 1, bl. 144" },
    phone: "02/ 955 05 95",
    ordersPhone: "02/ 955 05 95 / 02/ 955 05 92 / 0898 777 656",
    reservationPhone: "0879 555 333",
    hours: { bg: "11:00 - 23:00", en: "11:00 - 23:00" },
    coordinates: { lat: 42.6572079, lng: 23.3745705 },
    googleMapsUrl: "https://www.google.com/maps/place/Vetrilo/@42.6571125,23.3748755,18.86z/data=!4m6!3m5!1s0x40aa872290bfa85d:0xd19acc2a1e866ebf!8m2!3d42.6572079!4d23.3745705!16s%2Fg%2F11g4jh5mhk!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDQxMi4wIKXMDSoASAFQAw%3D%3D"
  }
];

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/p/Vetrilo-Pizza-Restaurants-Sofia-100095243170863/",
  instagram: "https://www.instagram.com/restaurants.vetrilo/",
  jobs: "https://www.jobs.bg/company/68817",
  email: "vetrilo2005@abv.bg"
};

export const DELIVERY_LINKS = {
  takeaway: "https://www.takeaway.com/bg/menu/vetrilovetrilo",
  wolt: "https://wolt.com/bg/bgr/sofia/restaurant/vetrilomladost",
  glovo: "https://glovoapp.com/bg/bg/sofia/stores/vetrilo-sof",
  bolt: "https://food.bolt.eu/bg-bg/328-sofia/p/143961-vetrilo/"
};

export function splitPhones(str: string): string[] {
  return str.split("/").map(s => s.trim()).filter(Boolean);
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: Record<string, string>;
  category: string;
}

// Gallery items are now managed via /public/gallery.json — editable via FTP without a rebuild.
