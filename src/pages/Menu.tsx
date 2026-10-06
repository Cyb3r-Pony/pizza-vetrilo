import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Info, ExternalLink } from 'lucide-react';
import { MenuItem, MenuData } from '../data/appData';
import { cn } from '../lib/utils';
import { useTranslation } from '../contexts/LanguageContext';
import { useSiteConfig } from '../hooks/useSiteConfig';

const EUR_RATE = 1.95583;

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
  return `${window.location.origin}${import.meta.env.BASE_URL}${src}`;
}

export function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const [expandedDish, setExpandedDish] = useState<string | null>(null);
  const { t, language } = useTranslation();
  const { lunchMenuEnabled } = useSiteConfig();

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

  // Auto-hide category nav: hide when scrolling down past threshold, show when scrolling up.
  // Uses a larger threshold and slower transition for a smoother feel on mobile.
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollDelta = useRef(0);
  const HIDE_THRESHOLD = 80;  // px of downward scroll before hiding
  const SHOW_THRESHOLD = 20;  // px of upward scroll before showing

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const diff = current - lastScrollY.current;
      scrollDelta.current += diff;

      if (current < 120) {
        // Always show near the top of the page
        setNavVisible(true);
        scrollDelta.current = 0;
      } else if (scrollDelta.current > HIDE_THRESHOLD) {
        setNavVisible(false);
        scrollDelta.current = 0;
      } else if (scrollDelta.current < -SHOW_THRESHOLD) {
        setNavVisible(true);
        scrollDelta.current = 0;
      }

      lastScrollY.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ref for horizontal-scroll category strip — auto-scrolls active button into view on mobile
  const navScrollRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (activeBtnRef.current && navScrollRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeCategory]);

  const allItems = useMemo<MenuItem[]>(() => {
    if (!menuData) return [];
    const items: MenuItem[] = [];
    for (const cat of menuData.categories) {
      const key = CATEGORY_KEY_MAP[cat];
      if (!key) continue;
      const arr = menuData[key];
      if (!Array.isArray(arr)) continue;
      for (const item of arr) {
        if (!item.hidden) items.push({ ...item, category: cat });
      }
    }
    return items;
  }, [menuData]);

  const navCategories = useMemo<string[]>(() => {
    const cats = menuData ? [...menuData.categories] : [];
    return lunchMenuEnabled ? ['Lunch Menu', ...cats] : cats;
  }, [menuData, lunchMenuEnabled]);

  useEffect(() => {
    const first = navCategories.find(c => c !== 'Lunch Menu');
    if (!activeCategory && first) {
      setSearchParams({ category: first }, { replace: true });
    }
  }, [activeCategory, navCategories, setSearchParams]);

  const filteredItems = useMemo(() => {
    if (!activeCategory) return [];
    return allItems.filter(item => item.category === activeCategory);
  }, [activeCategory, allItems]);

  const handleCategoryChange = (cat: string) => {
    setSearchParams({ category: cat });
    setExpandedDish(null);
    // Only scroll to top if the user is far down the page
    if (window.scrollY > 300) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

      {/* Category Navigation
          Mobile: single scrollable row (no wrap, hidden scrollbar)
          Desktop: wraps naturally to multiple rows */}
      <div
        className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100"
        style={{
          transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="container mx-auto px-4 py-3">
          <div
            ref={navScrollRef}
            className="flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-x-visible pb-1 sm:pb-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {navCategories.map((cat) => {
              const isActive = activeCategory === cat;
              if (cat === 'Lunch Menu') {
                return (
                  <a
                    key={cat}
                    ref={isActive ? (el) => { activeBtnRef.current = el; } : undefined}
                    href={`${import.meta.env.BASE_URL}menu/Lunch_Menu_Vetrilo.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all inline-flex items-center gap-1.5 bg-brand-secondary text-white hover:bg-opacity-90"
                  >
                    {t(`cat.${cat}`)} <ExternalLink size={11} />
                  </a>
                );
              }
              return (
                <button
                  key={cat}
                  ref={isActive ? (el) => { activeBtnRef.current = el; } : undefined}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    "whitespace-nowrap shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                    isActive
                      ? "bg-brand-accent text-white shadow-lg shadow-brand-accent/20"
                      : "bg-brand-bg text-brand-ink hover:bg-gray-200 active:bg-gray-300"
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
      <div className="container mx-auto px-4 mt-6 sm:mt-8">

        {loading && (
          <div className="flex justify-center items-center py-32">
            <div className="w-10 h-10 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {fetchError && (
          <div className="text-center py-20">
            <p className="text-brand-muted text-lg">
              Менюто не може да бъде заредено. Моля, опитайте отново.
            </p>
          </div>
        )}

        {!loading && !fetchError && (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
              >
                {filteredItems.map((item) => (
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
      "group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 transition-all duration-300",
      isExpanded ? "ring-2 ring-brand-accent shadow-2xl" : "hover:shadow-xl active:shadow-md"
    )}>
      {/* Image — tappable on mobile */}
      <div className="h-48 sm:h-56 overflow-hidden relative cursor-pointer" onClick={onToggle}>
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
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
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

      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-lg sm:text-xl font-serif leading-snug">{item.name[language]}</h3>
          <div className="flex flex-col items-end shrink-0">
            {hasDual ? (
              <>
                <span className="text-brand-accent font-bold text-sm sm:text-base leading-tight">
                  {item.price_small!.toFixed(2)} / {item.price_large!.toFixed(2)} лв.
                </span>
                <span className="text-brand-muted text-xs font-medium leading-tight">
                  {toEur(item.price_small!)} / {toEur(item.price_large!)} €
                </span>
              </>
            ) : singlePrice > 0 ? (
              <>
                <span className="text-brand-accent font-bold text-sm sm:text-base leading-tight">{singlePrice.toFixed(2)} лв.</span>
                <span className="text-brand-muted text-xs font-medium leading-tight">{toEur(singlePrice)} €</span>
              </>
            ) : (
              <span className="text-brand-muted text-sm font-medium">—</span>
            )}
          </div>
        </div>
        <p className="text-brand-muted text-sm mb-3 sm:mb-4 line-clamp-2">{item.description[language]}</p>

        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-50">
          <span className="text-xs text-brand-muted font-medium uppercase tracking-widest">{item.weight}</span>
          {/* Larger tap target on mobile */}
          <button
            onClick={onToggle}
            className="flex items-center gap-1 text-brand-ink font-bold text-xs uppercase tracking-widest hover:text-brand-accent active:text-brand-accent transition-colors py-1 -my-1 px-1 -mx-1"
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
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 sm:pt-6 mt-3 sm:mt-4 border-t border-gray-100 space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 p-3 sm:p-4 bg-brand-bg rounded-xl">
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
