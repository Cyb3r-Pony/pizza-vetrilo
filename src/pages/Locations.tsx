import React from 'react';
import { MapPin, Phone, Clock, FileText, ExternalLink } from 'lucide-react';
import { LOCATIONS, DELIVERY_LINKS } from '../data/appData';
import { useTranslation } from '../contexts/LanguageContext';
import { splitPhones } from '../lib/utils';

/** Parses a hours string like "11:00 - 23:00" or "11:00 – 23:00" and returns whether we are currently within that range. */
function isOpenNow(hoursStr: string): boolean {
  const match = hoursStr.match(/(\d{1,2}):(\d{2})\s*[-–]\s*(\d{1,2}):(\d{2})/);
  if (!match) return false;
  const openMinutes = parseInt(match[1]) * 60 + parseInt(match[2]);
  const closeMinutes = parseInt(match[3]) * 60 + parseInt(match[4]);
  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  // Handle midnight-crossing ranges (e.g. 11:00 – 01:00)
  if (closeMinutes < openMinutes) {
    return totalMinutes >= openMinutes || totalMinutes < closeMinutes;
  }
  return totalMinutes >= openMinutes && totalMinutes < closeMinutes;
}

export function Locations() {
  const { t, language } = useTranslation();

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <section className="bg-brand-ink text-white py-12 sm:py-20 mb-10 sm:mb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">{t('locations.title')}</h1>
          <p className="text-brand-secondary text-base sm:text-xl max-w-2xl mx-auto font-light">
            {t('locations.subtitle')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Delivery Partners */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-6 mb-16 p-5 sm:p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold mb-1">{t('locations.deliveryTitle')}</h2>
            <p className="text-brand-muted text-sm">{t('locations.deliveryDesc')}</p>
          </div>
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-3">
            <a
              href={DELIVERY_LINKS.wolt}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#009DE0] text-white px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all"
            >
              Wolt <ExternalLink size={14} />
            </a>
            <a
              href={DELIVERY_LINKS.takeaway}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#E96B2B] text-white px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all"
            >
              Takeaway <ExternalLink size={14} />
            </a>
            <a
              href={DELIVERY_LINKS.glovo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#FFC244] text-brand-ink px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all"
            >
              Glovo <ExternalLink size={14} />
            </a>
            <a
              href={DELIVERY_LINKS.bolt}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#34D186] text-white px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all"
            >
              Bolt Food <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {LOCATIONS.map((loc) => (
            <div key={loc.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={
                    loc.id === 'v1'
                      ? 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800'
                      : loc.id === 'v2'
                      ? 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800'
                      : 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800'
                  }
                  alt={loc.name[language]}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4">
                  {(() => {
                    const open = isOpenNow(loc.hours['en']);
                    return (
                      <span className={`text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${open ? 'bg-green-600' : 'bg-gray-500'}`}>
                        {open ? t('locations.openNow') : (language === 'bg' ? 'Затворено' : 'Closed')}
                      </span>
                    );
                  })()}
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl mb-6 font-bold">{loc.name[language]}</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 text-brand-muted">
                    <MapPin size={20} className="shrink-0 text-brand-secondary" />
                    <span className="text-sm">{loc.address[language]}</span>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent">{t('locations.orders')}</span>
                      <div className="flex flex-col gap-1">
                        {splitPhones(loc.ordersPhone).map((num) => (
                          <div key={num} className="flex items-center gap-3 text-brand-muted">
                            <Phone size={18} className="shrink-0 text-brand-secondary" />
                            <span className="text-sm font-medium">{num}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent">{t('nav.reserve')}</span>
                      <div className="flex flex-col gap-1">
                        {splitPhones(loc.reservationPhone).map((num) => (
                          <div key={num} className="flex items-center gap-3 text-brand-muted">
                            <Phone size={18} className="shrink-0 text-brand-secondary" />
                            <span className="text-sm font-medium">{num}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-brand-muted">
                    <Clock size={20} className="shrink-0 text-brand-secondary" />
                    <span className="text-sm">{loc.hours[language]}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-brand-accent text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all"
                  >
                    <ExternalLink size={16} /> {t('locations.directions')}
                  </a>
                  <a
                    href={`${import.meta.env.BASE_URL}Obslujvani_rayoni.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-brand-bg text-brand-ink py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
                  >
                    <FileText size={16} /> {t('locations.servedAreas')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps — one per restaurant */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-serif">{t('locations.mapTitle')}</h2>
            <a
              href="https://www.google.com/maps/search/Pizza+Vetrilo+Sofia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-accent hover:text-brand-ink transition-colors"
            >
              {t('locations.openGoogleMaps')} <ExternalLink size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {LOCATIONS.map((loc) => (
              <div key={loc.id} className="rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                <div className="bg-brand-ink text-white px-5 py-3 flex items-center gap-2">
                  <MapPin size={16} className="text-brand-secondary shrink-0" />
                  <span className="font-bold text-sm tracking-wide">{loc.name[language]}</span>
                </div>
                <iframe
                  title={loc.name[language]}
                  src={`https://maps.google.com/maps?q=${loc.coordinates.lat},${loc.coordinates.lng}&z=16&output=embed`}
                  width="100%"
                  height="340"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="bg-white px-5 py-3 flex justify-end">
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-brand-accent hover:text-brand-ink transition-colors"
                  >
                    {t('locations.directions')} <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
