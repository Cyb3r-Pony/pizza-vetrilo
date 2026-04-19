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

const SALAD_IMG = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800";

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
  { id: "s1", name: { bg: "Салата с киноа и прошуто", en: "Quinoa & Prosciutto Salad" }, category: "Salads", description: { bg: "Айсберг, лолоросо, киноа, авокадо, прошуто, лимонов дресинг.", en: "Iceberg, lollo rosso, quinoa, avocado, prosciutto, lemon dressing." }, price: 17.97, weight: "", image: "images/proshuto_salad.jpg" },
  { id: "s2", name: { bg: "Салата с киноа и сьомга", en: "Quinoa & Salmon Salad" }, category: "Salads", description: { bg: "Айсберг, лолоросо, киноа, авокадо, сьомга, лимонов дресинг.", en: "Iceberg, lollo rosso, quinoa, avocado, salmon, lemon dressing." }, price: 17.97, weight: "", image: "images/kinoa_siomga_salad.jpg" },
  { id: "s3", name: { bg: "Салата с киноа и сушени домати", en: "Quinoa & Sun-dried Tomato Salad" }, category: "Salads", description: { bg: "Айсберг, лолоросо, авокадо, киноа, сушени домати, пармезан, лимонов дресинг.", en: "Iceberg, lollo rosso, avocado, quinoa, sun-dried tomatoes, parmesan, lemon dressing." }, price: 17.97, weight: "", image: "images/kinoa_domat.jpg" },
  { id: "s4", name: { bg: "Салата София", en: "Sofia Salad" }, category: "Salads", description: { bg: "Айсберг, лолоросо, печено на скара сирене Халуми, дресинг.", en: "Iceberg, lollo rosso, grilled halloumi cheese, dressing." }, price: 15.04, weight: "", image: "images/sofia_salad.jpg" },
  { id: "s5", name: { bg: "Салата Цезар", en: "Caesar Salad" }, category: "Salads", description: { bg: "Айсберг, прошуто, чери домати, печено пилешко филе, пармезан, кротони, цезар сос.", en: "Iceberg, prosciutto, cherry tomatoes, grilled chicken breast, parmesan, croutons, Caesar sauce." }, price: 17.97, weight: "", tags: ["popular"], image: "images/cesar_salad.jpg" },
  { id: "s6", name: { bg: "Лятна салата", en: "Summer Salad" }, category: "Salads", description: { bg: "Розов домат, краставици, овче сирене, печена зелена чушка.", en: "Pink tomato, cucumbers, sheep cheese, roasted green pepper." }, price: 15.04, weight: "", image: "images/lqtna.jpg" },
  { id: "s7", name: { bg: "Зелена салата с риба тон", en: "Green Salad with Tuna" }, category: "Salads", description: { bg: "Маруля, краставица, риба тон, маслини.", en: "Lettuce, cucumber, tuna, olives." }, price: 13.08, weight: "", image: "images/riba_ton.jpg" },
  { id: "s8", name: { bg: "Патладжан натюр", en: "Aubergine Nature" }, category: "Salads", description: { bg: "Печен патладжан, зехтин, чесън, риган, магданоз.", en: "Roasted aubergine, olive oil, garlic, oregano, parsley." }, price: 12.11, weight: "", image: "images/patladjan.jpg" },
  { id: "s9", name: { bg: "Капрезе", en: "Caprese" }, category: "Salads", description: { bg: "Домати, моцарела и сос песто.", en: "Tomatoes, mozzarella and pesto sauce." }, price: 14.06, weight: "", tags: ["popular"], image: "images/kapreze.jpg" },
  { id: "s10", name: { bg: "Салата от патладжан с домати и сирене", en: "Aubergine Salad with Tomatoes & Cheese" }, category: "Salads", description: { bg: "Печен патладжан, домат, сирене, зехтин, чесън, риган, магданоз.", en: "Roasted aubergine, tomato, white cheese, olive oil, garlic, oregano, parsley." }, price: 14.06, weight: "", image: "images/salata_ot_patladjan.jpg" },
  { id: "s11", name: { bg: "Манастирска салата", en: "Monastery Salad" }, category: "Salads", description: { bg: "Домат, боб, пресен лук, филе Елена, пастърма, сминдух, чеснова паста.", en: "Tomato, beans, spring onion, Elena fillet, pastrama, fenugreek, garlic paste." }, price: 15.04, weight: "", image: "images/manastirska.jpg" },
  { id: "s12", name: { bg: "Катък с печени чушки", en: "Katak with Roasted Peppers" }, category: "Salads", description: { bg: "", en: "" }, price: 10.74, weight: "", image: "images/katak.jpg" },
  { id: "s13", name: { bg: "Яйчена салата", en: "Egg Salad" }, category: "Salads", description: { bg: "Яйца, маруля, млечен сос, чеснова паста.", en: "Eggs, lettuce, milk sauce, garlic paste." }, price: 11.72, weight: "", image: "images/qichena.jpg" },
  { id: "s14", name: { bg: "Зелена салата с репички", en: "Green Salad with Radishes" }, category: "Salads", description: { bg: "Маруля, краставица, пресен лук, репички, яйце, маслини.", en: "Lettuce, cucumber, spring onion, radishes, egg, olives." }, price: 11.13, weight: "", image: "images/repichki.jpg" },
  { id: "s15", name: { bg: "Шопска салата", en: "Shopska Salad" }, category: "Salads", description: { bg: "", en: "" }, price: 10.99, weight: "", tags: ["popular"], image: "images/shopska.jpg" },
  { id: "s16", name: { bg: "Овчарска салата", en: "Shepherd's Salad" }, category: "Salads", description: { bg: "Домати, краставици, лук, гъби, сирене, яйце, чушки, шунка.", en: "Tomatoes, cucumbers, onion, mushrooms, white cheese, egg, peppers, ham." }, price: 14.06, weight: "", image: "images/ovcharska.jpg" },
  { id: "s17", name: { bg: "Гръцка салата", en: "Greek Salad" }, category: "Salads", description: { bg: "Маруля, краставици, домати, мариновано сирене, печена чушка, червен лук, маслини.", en: "Lettuce, cucumbers, tomatoes, marinated cheese, roasted pepper, red onion, olives." }, price: 14.06, weight: "", tags: ["popular"], image: "images/gracka.jpg" },
  { id: "s18", name: { bg: "Салата от цвекло, морков и ябълка", en: "Beetroot, Carrot & Apple Salad" }, category: "Salads", description: { bg: "Овкусено със сос Лежур.", en: "Seasoned with Lejour sauce." }, price: 8.98, weight: "", image: "images/cveklo.jpg" },
  { id: "s19", name: { bg: "Трите ракии", en: "The Three Rakias" }, category: "Salads", description: { bg: "Краставици, пресен лук, чушка, гъби, шунка, домати, млечен сос, снежанка, орехи, маслини.", en: "Cucumbers, spring onion, pepper, mushrooms, ham, tomatoes, milk sauce, snejanka, walnuts, olives." }, price: 14.06, weight: "", image: "images/trite_rakii.jpg" },
  { id: "s20", name: { bg: "Веселото село", en: "The Merry Village" }, category: "Salads", description: { bg: "Хлебче на пещ, катък с печени чушки, домати, краставици, пресни чушки, пресен лук, сос песто.", en: "Oven bread, katak with roasted peppers, tomatoes, cucumbers, fresh peppers, spring onion, pesto sauce." }, price: 15.43, weight: "", image: SALAD_IMG },
  { id: "s21", name: { bg: "Чеснови домати", en: "Garlic Tomatoes" }, category: "Salads", description: { bg: "Домати, сирене, чесън, босилек.", en: "Tomatoes, white cheese, garlic, basil." }, price: 11.13, weight: "", image: SALAD_IMG },
  { id: "s22", name: { bg: "Медени (люти чушки)", en: "Honey Hot Peppers" }, category: "Salads", description: { bg: "Люти чушки с мед, копър, олио, чесън.", en: "Hot peppers with honey, dill, oil, garlic." }, price: 4.67, weight: "", image: SALAD_IMG },
  { id: "s23", name: { bg: "Краставици със сирене", en: "Cucumbers with Cheese" }, category: "Salads", description: { bg: "", en: "" }, price: 10.15, weight: "", image: SALAD_IMG },
  { id: "s24", name: { bg: "Моркови с лимон", en: "Carrots with Lemon" }, category: "Salads", description: { bg: "", en: "" }, price: 8.98, weight: "", image: SALAD_IMG },
  { id: "s25", name: { bg: "Печени чушки", en: "Roasted Peppers" }, category: "Salads", description: { bg: "", en: "" }, price: 11.13, weight: "", image: SALAD_IMG },
  { id: "s26", name: { bg: "Зелева салата", en: "Cabbage Salad" }, category: "Salads", description: { bg: "", en: "" }, price: 7.61, weight: "", image: SALAD_IMG },
  { id: "s27", name: { bg: "Снежанка", en: "Snejanka" }, category: "Salads", description: { bg: "", en: "" }, price: 8.98, weight: "", image: SALAD_IMG },
  { id: "s28", name: { bg: "Италианска салата", en: "Italian Salad" }, category: "Salads", description: { bg: "Рукола, чери домат, айсберг, пармезан, дресинг.", en: "Rocket, cherry tomato, iceberg, parmesan, dressing." }, price: 13.67, weight: "", image: SALAD_IMG },
  { id: "s29", name: { bg: "Домати, печени чушки и сирене", en: "Tomatoes, Roasted Peppers & Cheese" }, category: "Salads", description: { bg: "", en: "" }, price: 13.08, weight: "", image: SALAD_IMG },
  { id: "s30", name: { bg: "Салата Гонзо", en: "Gonzo Salad" }, category: "Salads", description: { bg: "Шунка, кашкавал, домати, краставици, зеле, сос.", en: "Ham, yellow cheese, tomatoes, cucumbers, cabbage, sauce." }, price: 13.08, weight: "", image: SALAD_IMG },
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

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800", caption: { bg: "Пица", en: "Pizza" }, category: "Food" },
  { id: "g2", url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", caption: { bg: "Барбекю", en: "BBQ" }, category: "Food" },
  { id: "g3", url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800", caption: { bg: "Салата", en: "Salad" }, category: "Food" },
  { id: "g4", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800", caption: { bg: "Интериор", en: "Restaurant Interior" }, category: "Interior" },
  { id: "g5", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800", caption: { bg: "Ресторант", en: "Restaurant" }, category: "Interior" },
  { id: "g6", url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800", caption: { bg: "Зала", en: "Dining Area" }, category: "Atmosphere" },
  { id: "g7", url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800", caption: { bg: "Кетъринг събитие", en: "Catering Event" }, category: "Events" },
  { id: "g8", url: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800", caption: { bg: "Десерт", en: "Dessert" }, category: "Food" },
  { id: "g9", url: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800", caption: { bg: "Паста", en: "Pasta" }, category: "Food" },
  { id: "g10", url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800", caption: { bg: "Атмосфера", en: "Atmosphere" }, category: "Atmosphere" },
  { id: "g11", url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", caption: { bg: "Събитие", en: "Event" }, category: "Events" },
  { id: "g12", url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800", caption: { bg: "Дърва пица", en: "Wood Fired Pizza" }, category: "Food" }
];
