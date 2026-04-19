import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/appData';
import { cn } from '../lib/utils';
import { useTranslation } from '../contexts/LanguageContext';

const CATEGORIES = ['All', 'Food', 'Interior', 'Events', 'Atmosphere'];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t, language } = useTranslation();

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <section className="bg-brand-ink text-white py-12 sm:py-20 mb-8 sm:mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">{t('gallery.title')}</h1>
          <p className="text-brand-secondary text-base sm:text-xl max-w-2xl mx-auto font-light">
            {t('gallery.subtitle')}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="container mx-auto px-4 mb-12 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all",
              activeCategory === cat
                ? "bg-brand-accent text-white shadow-lg shadow-brand-accent/20"
                : "bg-brand-bg text-brand-ink hover:bg-gray-200"
            )}
          >
            {t(`cat.${cat}`)}
          </button>
        ))}
      </div>

      {/* Masonry-like Grid */}
      <div className="container mx-auto px-4">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all"
                onClick={() => setSelectedImage(item.url)}
              >
                <img
                  src={item.url}
                  alt={item.caption[language]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform">
                    <span className="text-brand-secondary text-[10px] uppercase tracking-widest font-bold mb-2 block">
                      {t(`cat.${item.category}`)}
                    </span>
                    <p className="text-white text-lg font-serif">{item.caption[language]}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-8 right-8 text-white hover:text-brand-accent transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Full view"
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
