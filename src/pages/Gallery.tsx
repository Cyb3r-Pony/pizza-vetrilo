import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { GalleryItem } from '../data/appData';
import { cn } from '../lib/utils';
import { useTranslation } from '../contexts/LanguageContext';

interface GalleryData {
  categories: string[];
  items: GalleryItem[];
}

function resolveUrl(src: string): string {
  if (!src) return '';
  if (src.startsWith('http')) return src;
  // Local path — relative to public root (e.g. "images/restaurant/general/exterior.jpg")
  return `${window.location.origin}${import.meta.env.BASE_URL}${src}`;
}

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Food');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t, language } = useTranslation();

  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}gallery.json`)
      .then(r => (r.ok ? r.json() : null))
      .then((data: GalleryData | null) => {
        if (data) setGalleryData(data);
      })
      .catch(() => { /* silently fail */ });
  }, []);

  const navCategories = galleryData ? galleryData.categories : [];
  const allItems = galleryData?.items ?? [];

  const filteredItems = allItems.filter(item => item.category === activeCategory);

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
        {navCategories.map((cat) => (
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

      {/* Loading state */}
      {!galleryData && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Masonry-like Grid */}
      {galleryData && (
        <div className="container mx-auto px-4">
          {/* key={activeCategory} makes the whole grid fade out/in on category change
              instead of animating individual cards repositioning (which looks jittery). */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item, i) => {
                const src = resolveUrl(item.url);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-shadow"
                    onClick={() => setSelectedImage(src)}
                  >
                    <img
                      src={src}
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
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

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
