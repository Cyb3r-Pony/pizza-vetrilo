import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Info, ExternalLink } from 'lucide-react';
import { MENU_ITEMS, MENU_CATEGORIES, MenuItem } from '../data/appData';
import { cn } from '../lib/utils';
import { useTranslation } from '../contexts/LanguageContext';

export function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const [expandedDish, setExpandedDish] = useState<string | null>(null);
  const { t, language } = useTranslation();

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return MENU_ITEMS;
    return MENU_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const toggleExpand = (id: string) => {
    setExpandedDish(expandedDish === id ? null : id);
  };

  return (
    <div className="pt-24 pb-24 min-h-screen">
      {/* Header */}
      <section className="bg-brand-ink text-white py-20 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl mb-6">{t('menu.title')}</h1>
          <p className="text-brand-secondary text-xl max-w-2xl mx-auto font-light">
            {t('menu.subtitle')}
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 mb-12 overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-4 flex items-center gap-2 py-4">
          {MENU_CATEGORIES.map((cat) => {
            if (cat === 'Lunch Menu') {
              return (
                <a
                  key={cat}
                  href="/menu/Lunch_Menu_Vetrilo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all inline-flex items-center gap-1.5",
                    "bg-brand-secondary text-white hover:bg-opacity-90"
                  )}
                >
                  {t(`cat.${cat}`)} <ExternalLink size={13} />
                </a>
              );
            }
            return (
              <button
                key={cat}
                onClick={() => setSearchParams({ category: cat })}
                className={cn(
                  "whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all",
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

      {/* Menu Grid */}
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item) => (
              <DishCard
                key={item.id}
                item={item}
                isExpanded={expandedDish === item.id}
                onToggle={() => toggleExpand(item.id)}
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
      </div>
    </div>
  );
}

function DishCard({ item, isExpanded, onToggle, language, t }: { item: MenuItem, isExpanded: boolean, onToggle: () => void, language: string, t: (key: string) => string }) {
  return (
    <div className={cn(
      "group bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-300",
      isExpanded ? "ring-2 ring-brand-accent shadow-2xl" : "hover:shadow-xl"
    )}>
      <div className="h-56 overflow-hidden relative cursor-pointer" onClick={onToggle}>
        <img
          src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"}
          alt={item.name[language]}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
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
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif">{item.name[language]}</h3>
          <span className="text-brand-accent font-bold">{item.price.toFixed(2)} lv.</span>
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
                    <p className="text-[11px] text-brand-muted leading-relaxed">
                      {t('menu.allergens')}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-brand-muted font-medium">
                  <span className="uppercase tracking-widest">{item.weight}</span>
                  <span className="font-bold text-brand-accent">{item.price.toFixed(2)} lv.</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
