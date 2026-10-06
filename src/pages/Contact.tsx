import React from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import { useRestaurantInfo } from '../hooks/useRestaurantInfo';
import { splitPhones } from '../lib/utils';

export function Contact() {
  const { t, language } = useTranslation();
  const info = useRestaurantInfo();
  const locations = info?.locations ?? [];
  const social = info?.social;

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <section className="bg-brand-ink text-white py-12 sm:py-20 mb-10 sm:mb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">{t('contact.title')}</h1>
          <p className="text-brand-secondary text-base sm:text-xl max-w-2xl mx-auto font-light">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">

        {/* General contact info */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl mb-10 text-center">{t('contact.getInTouch')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-accent">
                <Phone size={26} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-2">{t('nav.call')}</p>
                <a href={`tel:${(locations[0]?.phone ?? '').replace(/[\s\/]/g, '')}`} className="text-base font-semibold hover:text-brand-accent transition-colors">{locations[0]?.phone ?? ''}</a>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-accent">
                <Mail size={26} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-2">{t('contact.email')}</p>
                <a href={social?.email ? `mailto:${social.email}` : '#'} className="text-base font-semibold hover:text-brand-accent transition-colors break-all">{social?.email ?? ''}</a>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-accent">
                <MapPin size={26} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-2">{t('contact.mainOffice')}</p>
                <p className="text-base font-semibold">{t('contact.mainOfficeLoc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Per-location contact details */}
        <div className="mb-16">
          <h2 className="text-3xl mb-10 text-center">{t('footer.ourLocations')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {locations.map((loc) => (
              <div key={loc.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-5">
                <h3 className="text-xl font-bold">{loc.name[language]}</h3>

                <div className="flex items-start gap-3 text-brand-muted">
                  <MapPin size={18} className="shrink-0 mt-0.5 text-brand-secondary" />
                  <span className="text-sm">{loc.address[language]}</span>
                </div>

                <div className="flex items-start gap-3 text-brand-muted">
                  <Clock size={18} className="shrink-0 mt-0.5 text-brand-secondary" />
                  <span className="text-sm">{loc.hours[language]}</span>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-brand-accent">{t('locations.orders')}</p>
                  {splitPhones(loc.ordersPhone).map((num) => (
                    <a key={num} href={`tel:${num.replace(/[\s\/]/g, '')}`} className="flex items-center gap-2.5 text-sm font-medium text-brand-muted hover:text-brand-accent transition-colors">
                      <Phone size={15} className="shrink-0 text-brand-secondary" /> {num}
                    </a>
                  ))}
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-brand-accent">{t('nav.reserve')}</p>
                  {splitPhones(loc.reservationPhone).map((num) => (
                    <a key={num} href={`tel:${num.replace(/[\s\/]/g, '')}`} className="flex items-center gap-2.5 text-sm font-medium text-brand-muted hover:text-brand-accent transition-colors">
                      <Phone size={15} className="shrink-0 text-brand-secondary" /> {num}
                    </a>
                  ))}
                </div>

                <a
                  href={loc.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-accent hover:text-brand-ink transition-colors"
                >
                  {t('locations.directions')} <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center mb-16">
          <h2 className="text-3xl mb-8">{t('contact.followUs')}</h2>
          <div className="flex justify-center gap-4">
            <a
              href={social?.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-brand-ink text-white px-6 py-3 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-accent transition-colors"
            >
              <Facebook size={20} /> Facebook
            </a>
            <a
              href={social?.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-brand-ink text-white px-6 py-3 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-accent transition-colors"
            >
              <Instagram size={20} /> Instagram
            </a>
          </div>
        </div>

        {/* Careers */}
        <div className="bg-brand-ink text-white rounded-3xl p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-6 text-brand-secondary">{t('about.careersTitle')}</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            {t('about.careersDesc')}
          </p>
          <a
            href="https://www.jobs.bg/company/68817"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-secondary text-brand-ink px-8 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all group"
          >
            {t('about.applyNow')}
            <ExternalLink size={16} className="shrink-0 opacity-80 group-hover:opacity-100" />
          </a>
        </div>

      </div>
    </div>
  );
}
