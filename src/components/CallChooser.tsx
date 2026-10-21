import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, X, MapPin } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { useRestaurantInfo } from '../hooks/useRestaurantInfo';
import { splitPhones } from '../lib/utils';

const tel = (num: string) => `tel:${num.replace(/[\s\/]/g, '')}`;

/**
 * "Call us" window: lists every restaurant from restaurant-info.json with its
 * order and reservation numbers, so visitors call the right location.
 * Numbers are edited in restaurant-info.json (no rebuild needed).
 */
export function CallChooser({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, language } = useTranslation();
  const info = useRestaurantInfo();
  const locations = info?.locations ?? [];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={t('call.title')}
        >
          <motion.div
            className="relative w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 sm:p-8"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-brand-muted hover:bg-brand-bg hover:text-brand-ink transition-colors"
              aria-label={t('call.close')}
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl sm:text-3xl mb-1 pr-10">{t('call.title')}</h2>
            <p className="text-brand-muted text-sm mb-6">{t('call.subtitle')}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {locations.map((loc) => {
                const orders = splitPhones(loc.ordersPhone);
                const reservations = splitPhones(loc.reservationPhone);
                return (
                  <div key={loc.id} className="bg-brand-bg rounded-2xl p-5 flex flex-col gap-4">
                    <div>
                      <h3 className="text-lg font-bold leading-snug">{loc.name[language]}</h3>
                      {loc.address[language] && (
                        <p className="text-xs text-brand-muted flex items-start gap-1.5 mt-1">
                          <MapPin size={13} className="shrink-0 mt-0.5 text-brand-secondary" />
                          {loc.address[language]}
                        </p>
                      )}
                    </div>

                    {orders.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-brand-accent">{t('locations.orders')}</p>
                        {orders.map((num) => (
                          <a
                            key={num}
                            href={tel(num)}
                            className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 text-sm font-semibold text-brand-ink hover:bg-brand-accent hover:text-white transition-colors"
                          >
                            <Phone size={15} className="shrink-0" /> {num}
                          </a>
                        ))}
                      </div>
                    )}

                    {reservations.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-brand-accent">{t('nav.reserve')}</p>
                        {reservations.map((num) => (
                          <a
                            key={num}
                            href={tel(num)}
                            className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 text-sm font-semibold text-brand-ink hover:bg-brand-accent hover:text-white transition-colors"
                          >
                            <Phone size={15} className="shrink-0" /> {num}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
