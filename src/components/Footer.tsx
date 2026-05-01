import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, ExternalLink, Mail, Truck } from 'lucide-react';
import { LOCATIONS, SOCIAL_LINKS, DELIVERY_LINKS } from '../data/appData';
import { useTranslation } from '../contexts/LanguageContext';
import { splitPhones } from '../lib/utils';

export function Footer() {
  const { t, language } = useTranslation();

  return (
    <footer className="bg-brand-ink text-white pt-16 pb-8">
      <div className="container mx-auto px-4">

        {/* Top section: Brand + Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="text-3xl font-serif font-bold tracking-tight text-brand-secondary leading-none">
              PIZZA VETRILO
            </Link>
            <p className="text-white/55 leading-relaxed text-sm">
              {t('footer.brandInfo')}
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-white/5 rounded-full hover:bg-brand-accent transition-colors">
                <Facebook size={17} />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-white/5 rounded-full hover:bg-brand-accent transition-colors">
                <Instagram size={17} />
              </a>
              <a href={`mailto:${SOCIAL_LINKS.email}`}
                className="w-9 h-9 flex items-center justify-center bg-white/5 rounded-full hover:bg-brand-accent transition-colors">
                <Mail size={17} />
              </a>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Delivery Links */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary flex items-center gap-2 opacity-80">
                <Truck size={13} /> {t('footer.delivery')}
              </p>
              <a href={DELIVERY_LINKS.wolt} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-brand-accent transition-colors">
                Wolt <ExternalLink size={11} />
              </a>
              <a href={DELIVERY_LINKS.takeaway} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-brand-accent transition-colors">
                Takeaway.com <ExternalLink size={11} />
              </a>
              <a href={DELIVERY_LINKS.glovo} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-brand-accent transition-colors">
                Glovo <ExternalLink size={11} />
              </a>
              <a href={DELIVERY_LINKS.bolt} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-brand-accent transition-colors">
                Bolt Food <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* Locations – 3 columns */}
          <div className="lg:col-span-3">

            {/* Section header */}
            <div className="flex items-center gap-5 mb-8 pb-6 border-b border-white/10">
              <h4 className="text-lg font-serif font-semibold text-brand-secondary tracking-wide">
                {t('footer.ourLocations')}
              </h4>
              <a
                href={`${import.meta.env.BASE_URL}Obslujvani_rayoni.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-brand-accent hover:text-white transition-colors"
              >
                {t('locations.servedAreas')} <ExternalLink size={11} />
              </a>
            </div>

            {/* Location cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {LOCATIONS.map((loc) => (
                <div key={loc.id} className="flex flex-col gap-5 md:px-8 first:pl-0 last:pr-0 py-4 md:py-0">

                  {/* Name */}
                  <h5 className="font-bold text-white text-base tracking-tight leading-snug">
                    {loc.name[language]}
                  </h5>

                  {/* Address */}
                  <p className="text-sm text-white/60 flex items-start gap-2.5 leading-relaxed">
                    <MapPin size={15} className="shrink-0 mt-0.5 text-brand-secondary" />
                    {loc.address[language]}
                  </p>

                  {/* Orders phones */}
                  <div className="flex flex-col gap-1.5">
                    <p className="text-[9px] font-black uppercase tracking-[0.22em] text-brand-secondary opacity-75">
                      {t('locations.orders')}
                    </p>
                    <div className="flex flex-col gap-1">
                      {splitPhones(loc.ordersPhone).map((num) => (
                        <p key={num} className="text-sm text-white/85 flex items-center gap-2.5 font-medium leading-snug">
                          <Phone size={13} className="shrink-0 text-brand-secondary" />
                          {num}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Reservation phones */}
                  <div className="flex flex-col gap-1.5">
                    <p className="text-[9px] font-black uppercase tracking-[0.22em] text-brand-secondary opacity-75">
                      {t('nav.reserve')}
                    </p>
                    <div className="flex flex-col gap-1">
                      {splitPhones(loc.reservationPhone).map((num) => (
                        <p key={num} className="text-sm text-white/85 flex items-center gap-2.5 font-medium">
                          <Phone size={13} className="shrink-0 text-brand-secondary" />
                          {num}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Google Maps */}
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-brand-accent hover:text-white transition-colors"
                  >
                    Google Maps <ExternalLink size={11} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/35">
          <p>© {new Date().getFullYear()} Pizza Vetrilo. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white/70 transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-white/70 transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
