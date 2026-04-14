export interface MenuItem {
  id: string;
  name: Record<string, string>;
  category: string;
  description: Record<string, string>;
  price: number;
  weight: string;
  tags?: string[];
  image?: string;
}

export const MENU_CATEGORIES = [
  "All", "Pizza", "Salads", "Starters", "Soups", "Pasta", "Risotto", "Fish", "BBQ", "Main Dishes", "Oven Dishes", "Burgers", "Sides", "Desserts", "Lunch Menu"
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "p1",
    name: { bg: "Маргарита", en: "Margherita" },
    category: "Pizza",
    description: {
      bg: "Доматен сос, прясна моцарела, босилек, зехтин екстра върджин.",
      en: "Tomato sauce, fresh mozzarella, basil, extra virgin olive oil."
    },
    price: 12.90,
    weight: "450g",
    tags: ["popular", "vegetarian"],
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p2",
    name: { bg: "Дявола", en: "Diavola" },
    category: "Pizza",
    description: {
      bg: "Доматен сос, моцарела, пикантен салам, люти чушки.",
      en: "Tomato sauce, mozzarella, spicy salami, chili peppers."
    },
    price: 14.50,
    weight: "480g",
    tags: ["popular", "spicy"],
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "s1",
    name: { bg: "Шопска салата", en: "Shopska Salad" },
    category: "Salads",
    description: {
      bg: "Домати, краставици, чушки, лук, магданоз и българско бяло саламурено сирене.",
      en: "Tomatoes, cucumbers, peppers, onions, parsley, and Bulgarian white brine cheese."
    },
    price: 9.80,
    weight: "350g",
    tags: ["popular", "vegetarian"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "b1",
    name: { bg: "Мешана скара (BBQ)", en: "Mixed Grill (BBQ)" },
    category: "BBQ",
    description: {
      bg: "Кюфте, кебапче, свинска пържола и пилешко шишче, поднесени с пържени картофи и лютеница.",
      en: "Kyufte, kebabche, pork steak, and chicken skewer served with fries and lyutenitsa."
    },
    price: 22.00,
    weight: "600g",
    tags: ["popular"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "pa1",
    name: { bg: "Карбонара", en: "Carbonara" },
    category: "Pasta",
    description: {
      bg: "Спагети с гуанчале, яйчен жълтък, пекорино романо и черен пипер.",
      en: "Spaghetti with guanciale, egg yolk, pecorino romano, and black pepper."
    },
    price: 15.20,
    weight: "400g",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "d1",
    name: { bg: "Тирамису", en: "Tiramisu" },
    category: "Desserts",
    description: {
      bg: "Класически италиански десерт с бишкоти, напоени с кафе и маскарпоне крем.",
      en: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream."
    },
    price: 8.50,
    weight: "180g",
    tags: ["new"],
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800"
  }
];

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
    googleMapsUrl: "https://www.google.de/maps/place/%D0%9F%D0%B8%D1%86%D0%B0%D1%80%D0%B8%D1%8F+%E2%80%9E%D0%92%D0%B5%D1%82%D1%80%D0%B8%D0%BB%D0%BE%E2%80%9C+-+%D0%91%D0%BE%D1%80%D0%BE%D0%B2%D0%BE/@42.6711153,23.2901427,17z/data=!3m1!5s0x40aa84dd41c5aef3:0xa19534e9de07a769!4m15!1m8!3m7!1s0x40aa84dd1563e985:0xe0cf9705af70955d!2z0LYu0LouINCa0YDQsNGB0L3QviDRgdC10LvQviAtINC60LIuINCR0L7RgNC-0LLQviwg0YPQuy4g4oCe0KHQvtC70YPQveKAnCA0MywgMTY4MCDQodC-0YTQuNGP!3b1!8m2!3d42.6711153!4d23.2901427!16s%2Fg%2F11bw43mpkp!3m5!1s0x40aa84dd5d2c908b:0x56f28a758fb57b32!8m2!3d42.6714478!4d23.289468!16s%2Fg%2F1tj5p6xj?hl=bg&entry=ttu&g_ep=EgoyMDI2MDMwOS4wIKXMDSoASAFQAw%3D%3D"
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
    googleMapsUrl: "https://www.google.de/maps/place/Пицария+„Ветрило“+-+Стрелбище/@42.6676556,23.2778209,17z/data=!3m1!4b1!4m6!3m5!1s0x40aa85716eb5c75d:0x8563bd6a12198e00!8m2!3d42.6676556!4d23.2803958!16s%2Fg%2F1tj94y0j?hl=bg&entry=ttu&g_ep=EgoyMDI2MDMwOS4wIKXMDSoASAFQAw%3D%3D"
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
    googleMapsUrl: "https://www.google.de/maps/place/%D0%9F%D0%B8%D1%86%D0%B0%D1%80%D0%B8%D1%8F+%E2%80%9E%D0%92%D0%B5%D1%82%D1%80%D0%B8%D0%BB%D0%BE%E2%80%9C+-+%D0%9C%D0%BB%D0%B0%D0%B0%D0%B4%D0%BE%D1%81%D1%82/@42.6568393,23.3750389,17.14z/data=!4m6!3m5!1s0x40aa872290bfa85d:0xd19acc2a1e866ebf!8m2!3d42.6572079!4d23.3745705!16s%2Fg%2F11g4jh5mhk?hl=bg&entry=ttu&g_ep=EgoyMDI2MDMwOS4wIKXMDSoASAFQAw%3D%3D"
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
  wolt: "https://wolt.com/bg/bgr/sofia/restaurant/vetrilomladost?pid=google&c=BGR_Web_FTU_Search_DSA_BG_All&af_adset=BGR_Web_FTU_Search_DSA_BG&af_keywords=&keyword_match_type=&matchtype=&device=c&utm_source=google&utm_medium=cpc&utm_campaign=BGR_Web_FTU_Search_DSA_BG_All&utm_adgroup=BGR_Web_FTU_Search_DSA_BG&utm_keyword=&utm_term=&utm_id=22697842285&adgroup_id=179915463583&keyword_id=dsa-1456167871416&ad_id=792573016207&gad_source=1&gad_campaignid=22697842285&gbraid=0AAAAADDYnypxHcXeT0s8KKNzknTh5-7Hf"
};

export interface GalleryItem {
  id: string;
  url: string;
  category: "Food" | "Interior" | "Events" | "Atmosphere";
  caption: Record<string, string>;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1200", category: "Food", caption: { bg: "Прясно изпечена пица на дърва", en: "Freshly baked wood-fired pizza" } },
  { id: "g2", url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200", category: "Interior", caption: { bg: "Уютна зона за хранене", en: "Cozy dining area" } },
  { id: "g3", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200", category: "Atmosphere", caption: { bg: "Вечерна атмосфера", en: "Evening atmosphere" } },
  { id: "g4", url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200", category: "Events", caption: { bg: "Подготовка за частно парти", en: "Private party setup" } },
];
