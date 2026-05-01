import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Info, ExternalLink } from 'lucide-react';
import { MenuItem, MenuData } from '../data/appData';
import { cn } from '../lib/utils';
import { useTranslation } from '../contexts/LanguageContext';
import { useSiteConfig } from '../hooks/useSiteConfig';

const ITEMS_PER_PAGE = 6;
const EUR_RATE = 1.95583; // fixed BGN/EUR rate

// Maps display category name (from menu.json "categories" array) to its key in MenuData
const CATEGORY_KEY_MAP: Record<string, keyof Omit<MenuData, 'categories'>> = {
  "Pizza": "pizza",
  "Salads": "salads",
  "Starters": "starters",
  "Soups": "soups",
  "Pasta": "pasta",
  "Risotto": "risotto",
  "Fish": "fish",
  "BBQ": "bbq",
  "Main Dishes": "main-dishes",
  "Oven Dishes": "oven-dishes",
  "Burgers": "burgers",
  "Breads": "breads",
  "Garnishes": "garnishes",
  "Sauces": "sauces",
  "Desserts": "desserts"
};

function toEur(bgn: number) {
  return (bgn / EUR_RATE).toFixed(2);
}

const LOGO_PLACEHOLDER = `${typeof window !== 'undefined' ? window.location.origin : ''}${import.meta.env.BASE_URL}images/restaurant/general/Vetrilo-logo.png`;

function resolveImage(src?: string) {
  if (!src) return LOGO_PLACEHOLDER;
  if (src.startsWith("http")) return src;
  // Use fully absolute URL to prevent iOS Safari SPA navigation path resolution failures
  return `${window.location.origin}${import.meta.env.BASE_URL}${src}`;
}

export function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const [expandedDish, setExpandedDish] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { t, language } = useTranslation();
  const { lunchMenuEnabled } = useSiteConfig();

  // Fetch menu data from /menu/menu.json (lives in public/, copied as-is to dist/)
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}menu/menu.json`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: MenuData) => {
        setMenuData(data);
        setLoading(false);
      })
      .catch(() => {
        setFetchError(true);
        setLoading(false);
      });
  }, []);

  // Auto-hide category nav on scroll down, show on scroll up
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setNavVisible(current < lastScrollY.current || current < 120);
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Flatten all category arrays into one list, injecting `category` and skipping hidden items
  const allItems = useMemo<MenuItem[]>(() => {
    if (!menuData) return [];
    const items: MenuItem[] = [];
    for (const cat of menuData.categories) {
      const key = CATEGORY_KEY_MAP[cat];
      if (!key) continue;
      const arr = menuData[key];
      if (!Array.isArray(arr)) continue;
      for (const item of arr) {
        if (!item.hidden) {
          items.push({ ...item, category: cat });
        }
      }
    }
    return items;
  }, [menuData]);

  // Nav: Lunch Menu first (if enabled) + categories from JSON. No "All" button.
  const navCategories = useMemo<string[]>(() => {
    const cats = menuData ? [...menuData.categories] : [];
    return lunchMenuEnabled ? ['Lunch Menu', ...cats] : cats;
  }, [menuData, lunchMenuEnabled]);

  // Auto-select first category when menu loads and no category is in URL
  useEffect(() => {
    if (!activeCategory && navCategories.length > 0) {
      setSearchParams({ category: navCategories[0] }, { replace: true });
    }
  }, [activeCategory, navCategories, setSearchParams]);

  const filteredItems = useMemo(() => {
    if (!activeCategory) return [];
    return allItems.filter(item => item.category === activeCategory);
  }, [activeCategory, allItems]);

  // Reset to page 1 when category changes
  useEffect(() => { setCurrentPage(1); }, [activeCategory]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const pageItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setSearchParams({ category: cat });
    setExpandedDish(null);
  };

  const handlePage = (p: number) => {
    setCurrentPage(p);
    setExpandedDish(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-24 min-h-screen">
      {/* Header */}
      <section className="bg-brand-ink text-white py-12 sm:py-20 mb-8 sm:mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">{t('menu.title')}</h1>
          <p className="text-brand-secondary text-base sm:text-xl max-w-2xl mx-auto font-light">
            {t('menu.subtitle')}
          </p>
        </div>
      </section>

      {/* Category Navigation — auto-hides on scroll down, wraps to multiple rows */}
      <div
        className={cn(
          "sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-transform duration-300",
          navVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {navCategories.map((cat) => {
              if (cat === 'Lunch Menu') {
                return (
                  <a
                    key={cat}
                    href={`${import.meta.env.BASE_URL}menu/Lunch_Menu_Vetrilo.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all inline-flex items-center gap-1.5 bg-brand-secondary text-white hover:bg-opacity-90"
                  >
                    {t(`cat.${cat}`)} <ExternalLink size={11} />
                  </a>
                );
              }
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    "whitespace-nowrap px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                    activeCategory === cat
                      ? "bg-brand-accent text-white shadow-lg shadow-brand-accent/20"
                      : "bg-brand-bg text-brand-ink hover:bg-gray-200"
                  )}
                >
                  {t(`cat.${cat}`)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="container mx-auto px-4 mt-8">

        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center items-center py-32">
            <div className="w-10 h-10 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Fetch error */}
        {fetchError && (
          <div className="text-center py-20">
            <p className="text-brand-muted text-lg">
              Менюто не може да бъде заредено. Моля, опитайте отново.
            </p>
          </div>
        )}

        {/* Loaded */}
        {!loading && !fetchError && (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {pageItems.map((item) => (
                  <DishCard
                    key={item.id}
                    item={item}
                    isExpanded={expandedDish === item.id}
                    onToggle={() => setExpandedDish(expandedDish === item.id ? null : item.id)}
                    language={language}
                    t={t}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredItems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-brand-muted text-lg">{t('menu.noItems')}</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14">
                <button
                  onClick={() => handlePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full bg-brand-bg text-brand-ink hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePage(p)}
                    className={cn(
                      "w-10 h-10 rounded-full text-sm font-bold uppercase tracking-widest transition-all",
                      p === currentPage
                        ? "bg-brand-accent text-white shadow-md shadow-brand-accent/30"
                        : "bg-brand-bg text-brand-ink hover:bg-gray-200"
                    )}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => handlePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full bg-brand-bg text-brand-ink hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={20} />
                </button>

                <span className="ml-3 text-xs text-brand-muted font-medium uppercase tracking-widest">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} / {filteredItems.length}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function DishCard({ item, isExpanded, onToggle, language, t }: {
  item: MenuItem;
  isExpanded: boolean;
  onToggle: () => void;
  language: string;
  t: (key: string) => string;
}) {
  const hasDual = item.price_small != null && item.price_large != null;
  const singlePrice = item.price ?? 0;

  return (
    <div className={cn(
      "group bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-300",
      isExpanded ? "ring-2 ring-brand-accent shadow-2xl" : "hover:shadow-xl"
    )}>
      <div className="h-56 overflow-hidden relative cursor-pointer" onClick={onToggle}>
        <img
          src={resolveImage(item.image)}
          alt={item.name[language]}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes('Vetrilo-logo')) {
              target.src = LOGO_PLACEHOLDER;
            }
          }}
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {item.tags?.map(tag => (
            <span key={tag} className={cn(
              "text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full text-white",
              tag === 'spicy' ? 'bg-red-600' : 'bg-brand-accent'
            )}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-xl font-serif leading-snug">{item.name[language]}</h3>
          {/* Price: dual (small/large) or single */}
          <div className="flex flex-col items-end shrink-0">
            {hasDual ? (
              <>
                <span className="text-brand-accent font-bold text-base leading-tight">
                  {item.price_small!.toFixed(2)} / {item.price_large!.toFixed(2)} лв.
                </span>
                <span className="text-brand-muted text-xs font-medium leading-tight">
                  {toEur(item.price_small!)} / {toEur(item.price_large!)} €
                </span>
              </>
            ) : singlePrice > 0 ? (
              <>
                <span className="text-brand-accent font-bold text-base leading-tight">{singlePrice.toFixed(2)} лв.</span>
                <span className="text-brand-muted text-xs font-medium leading-tight">{toEur(singlePrice)} €</span>
              </>
            ) : (
              <span className="text-brand-muted text-sm font-medium">—</span>
            )}
          </div>
        </div>
        <p className="text-brand-muted text-sm mb-4 line-clamp-2">{item.description[language]}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <span className="text-xs text-brand-muted font-medium uppercase tracking-widest">{item.weight}</span>
          <button
            onClick={onToggle}
            className="flex items-center gap-1 text-brand-ink font-bold text-xs uppercase tracking-widest hover:text-brand-accent transition-colors"
          >
            {isExpanded ? t('menu.lessInfo') : t('menu.moreInfo')}
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-4 border-t border-gray-100 space-y-4">
                <div className="flex items-start gap-3 p-4 bg-brand-bg rounded-xl">
                  <Info size={16} className="text-brand-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-ink mb-1">{t('menu.allergens').split('.')[0]}</p>
                    <p className="text-[11px] text-brand-muted leading-relaxed">{t('menu.allergens')}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs text-brand-muted font-medium">
                  <span className="uppercase tracking-widest">{item.weight}</span>
                  <div className="text-right">
                    {hasDual ? (
                      <>
                        <span className="font-bold text-brand-accent block">
                          {item.price_small!.toFixed(2)} / {item.price_large!.toFixed(2)} лв.
                        </span>
                        <span className="text-brand-muted">
                          {toEur(item.price_small!)} / {toEur(item.price_large!)} €
                        </span>
                      </>
                    ) : singlePrice > 0 ? (
                      <>
                        <span className="font-bold text-brand-accent block">{singlePrice.toFixed(2)} лв.</span>
                        <span className="text-brand-muted">{toEur(singlePrice)} €</span>
                      </>
                    ) : (
                      <span>—</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
