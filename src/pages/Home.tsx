import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Calendar, ShoppingBag, UtensilsCrossed, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { MENU_ITEMS, LOCATIONS } from '../data/appData';
import { useTranslation } from '../contexts/LanguageContext';

export function Home() {
  const { t, language } = useTranslation();
  const featuredDishes = MENU_ITEMS.filter(item => item.tags?.includes('popular')).slice(0, 6);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
              {t('hero.title')} <br />
              <span className="text-brand-secondary">{t('hero.subtitle')}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/80 max-w-2xl mx-auto font-light">
              {t('hero.tagline')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/menu/Lunch_Menu_Vetrilo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full text-lg font-bold uppercase tracking-widest hover:bg-white/20 transition-all hover:-translate-y-1"
              >
                {t('hero.viewLunch')}
              </a>
              <Link
                to="/menu"
                className="w-full sm:w-auto bg-brand-accent text-white px-10 py-4 rounded-full text-lg font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all hover:-translate-y-1"
              >
                {t('hero.viewMenu')}
              </Link>
              <Link
                to="/locations"
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full text-lg font-bold uppercase tracking-widest hover:bg-white/20 transition-all hover:-translate-y-1"
              >
                {t('hero.findLocation')}
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Quick Actions Bar */}
      <div className="bg-white shadow-xl relative z-20 -mt-12 mx-4 lg:mx-auto max-w-5xl rounded-2xl grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 overflow-hidden">
        <a href={`tel:${LOCATIONS[0].phone.replace(/[\s\/]/g, '')}`} className="p-6 flex flex-col items-center gap-2 hover:bg-brand-bg transition-colors group">
          <Phone className="text-brand-accent group-hover:scale-110 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-bold">{t('quick.call')}</span>
        </a>
        <Link to="/locations" className="p-6 flex flex-col items-center gap-2 hover:bg-brand-bg transition-colors group">
          <Calendar className="text-brand-accent group-hover:scale-110 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-bold">{t('quick.reserve')}</span>
        </Link>
        <Link to="/locations" className="p-6 flex flex-col items-center gap-2 hover:bg-brand-bg transition-colors group">
          <Truck className="text-brand-accent group-hover:scale-110 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-bold">{t('quick.delivery')}</span>
        </Link>
        <Link to="/menu" className="p-6 flex flex-col items-center gap-2 hover:bg-brand-bg transition-colors group">
          <UtensilsCrossed className="text-brand-accent group-hover:scale-110 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-bold">{t('quick.menu')}</span>
        </Link>
      </div>

      {/* Categories Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">{t('section.exploreMenu')}</h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800' },
            { name: 'BBQ', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800' },
            { name: 'Pasta', img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800' },
            { name: 'Salads', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800' },
            { name: 'Desserts', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800' },
            { name: 'Lunch Menu', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800', href: '/menu/Lunch_Menu_Vetrilo.pdf' },
          ].map((cat) => {
            const cardContent = (
              <>
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-3xl md:text-4xl">{t(`cat.${cat.name}`)}</h3>
                </div>
              </>
            );
            return cat.href ? (
              <a key={cat.name} href={cat.href} target="_blank" rel="noopener noreferrer" className="group relative h-64 md:h-80 rounded-2xl overflow-hidden">
                {cardContent}
              </a>
            ) : (
              <Link key={cat.name} to={`/menu?category=${cat.name}`} className="group relative h-64 md:h-80 rounded-2xl overflow-hidden">
                {cardContent}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl mb-4">{t('section.chefsFavorites')}</h2>
              <p className="text-brand-muted max-w-md">{t('section.chefsFavoritesDesc')}</p>
            </div>
            <Link to="/menu" className="flex items-center gap-2 text-brand-accent font-bold uppercase tracking-widest hover:gap-4 transition-all">
              {t('section.viewFullMenu')} <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <div key={dish.id} className="group bg-brand-bg rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={dish.image}
                    alt={dish.name[language]}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {dish.tags?.map(tag => (
                      <span key={tag} className="bg-brand-accent text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl">{dish.name[language]}</h3>
                    <span className="text-brand-accent font-bold text-xl">{dish.price.toFixed(2)} lv.</span>
                  </div>
                  <p className="text-brand-muted text-sm leading-relaxed mb-6 line-clamp-2">
                    {dish.description[language]}
                  </p>
                  <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <span className="text-xs text-brand-muted font-medium uppercase tracking-widest">{dish.weight}</span>
                    <Link to="/menu" className="text-brand-ink font-bold text-sm uppercase tracking-widest hover:text-brand-accent transition-colors">
                      {t('menu.moreInfo')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Preview */}
      <section className="relative py-28 overflow-hidden">
        {/* Background image — warm restaurant interior */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Dark brand-ink base overlay */}
          <div className="absolute inset-0 bg-brand-ink/82" />
          {/* Warm amber glow from left, golden tint from right */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/18 via-transparent to-brand-secondary/12" />
          {/* Soft vignette at edges */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.45)_100%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-brand-secondary text-xs font-black uppercase tracking-[0.3em] mb-3 opacity-80">
              {t('footer.ourLocations')}
            </p>
            <h2 className="text-4xl md:text-5xl text-white mb-4">{t('section.visitUs')}</h2>
            <div className="w-24 h-px bg-brand-secondary mx-auto mb-4 opacity-50" />
            <p className="text-white/55 max-w-lg mx-auto text-sm leading-relaxed">{t('section.visitUsDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                className="group relative bg-white/6 backdrop-blur-sm border border-white/12 hover:border-brand-secondary/60 p-9 rounded-3xl transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(0,0,0,0.4)]"
              >
                {/* Subtle top accent line that appears on hover */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

                <h3 className="text-xl font-bold text-white mb-6 tracking-tight">{loc.name[language]}</h3>

                <div className="space-y-3 mb-9">
                  <p className="text-white/60 text-sm flex items-start gap-3 leading-relaxed">
                    <Calendar size={16} className="shrink-0 mt-0.5 text-brand-secondary" />
                    {loc.hours[language]}
                  </p>
                  <p className="text-white/60 text-sm flex items-start gap-3">
                    <Phone size={16} className="shrink-0 mt-0.5 text-brand-secondary" />
                    {loc.phone}
                  </p>
                  <p className="text-white/60 text-sm flex items-start gap-3 leading-relaxed">
                    <UtensilsCrossed size={16} className="shrink-0 mt-0.5 text-brand-secondary" />
                    {loc.address[language]}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    to="/locations"
                    className="w-full bg-brand-accent text-white py-3 rounded-xl text-center font-bold uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all"
                  >
                    {t('locations.reserve')}
                  </Link>
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white/10 text-white py-3 rounded-xl text-center font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all block"
                  >
                    {t('locations.directions')}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catering Promo */}
      <section className="py-24 bg-brand-ink text-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200"
              alt="Catering"
              loading="lazy"
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl text-brand-secondary">{t('section.cateringTitle')}</h2>
            <p className="text-white/70 text-lg leading-relaxed">
              {t('section.cateringDesc')}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Weddings', 'Corporate events', 'Team building', 'Kids parties'].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-accent rounded-full" />
                  <span className="font-medium">{t(`event.${item}`)}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/catering"
              className="inline-block bg-brand-accent text-white px-10 py-4 rounded-full text-lg font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
            >
              {t('section.requestOffer')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
