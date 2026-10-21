import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useTranslation } from '../contexts/LanguageContext';
import { useRestaurantInfo } from '../hooks/useRestaurantInfo';
import { useSiteConfig, getSpecialButtons } from '../hooks/useSiteConfig';

interface NavLink {
  name: string;
  path: string;
  /** Literal text (used for special buttons from site-config.json); otherwise t(name) is used. */
  label?: string;
  isExternal?: boolean;
  hasDropdown?: boolean;
  hiddenWhenLunchOff?: boolean;
  highlight?: boolean;
}

const ALL_NAV_LINKS: NavLink[] = [
  { name: 'nav.lunch', path: `${import.meta.env.BASE_URL}menu/Lunch_Menu_Vetrilo.pdf`, isExternal: true, hiddenWhenLunchOff: true },
  { name: 'nav.menu', path: '/menu?category=Salads' },
  { name: 'nav.locations', path: '/locations', hasDropdown: true },
  { name: 'nav.delivery', path: '/locations' },
  { name: 'nav.catering', path: '/catering' },
  { name: 'nav.gallery', path: '/gallery' },
  { name: 'nav.about', path: '/about' },
  { name: 'nav.contact', path: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const { language, setLanguage, t } = useTranslation();
  const siteConfig = useSiteConfig();
  const { lunchMenuEnabled } = siteConfig;
  const restaurantInfo = useRestaurantInfo();
  const locations = restaurantInfo?.locations ?? [];
  const mainPhone = locations[0]?.phone ?? '';
  // Seasonal PDF buttons (site-config.json → "specialButtons") go right after "Lunch Menu".
  const specialLinks: NavLink[] = getSpecialButtons(siteConfig, language).map(b => ({
    name: `special:${b.url}:${b.label}`, path: b.url, label: b.label, isExternal: true, highlight: true,
  }));
  const baseLinks = ALL_NAV_LINKS.filter(l => !l.hiddenWhenLunchOff || lunchMenuEnabled);
  const lunchIdx = baseLinks.findIndex(l => l.hiddenWhenLunchOff);
  const NAV_LINKS: NavLink[] = [...baseLinks.slice(0, lunchIdx + 1), ...specialLinks, ...baseLinks.slice(lunchIdx + 1)];
  const linkText = (l: NavLink) => l.label ?? t(l.name);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className={cn(
            "text-lg sm:text-2xl font-serif font-bold tracking-tight transition-colors group-hover:text-brand-accent",
            isScrolled || location.pathname !== '/' ? "text-brand-accent" : "text-white"
          )}>
            PIZZA VETRILO
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <div
              key={link.name}
              // Special (seasonal) links only fit in the desktop bar on wide screens;
              // they are always visible in the mobile menu, the Home hero and the Menu page.
              className={cn("relative", link.highlight && "hidden 2xl:block")}
              onMouseEnter={() => link.hasDropdown && setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              onFocus={() => link.hasDropdown && setHoveredLink(link.name)}
              onBlur={(e) => {
                // Close only when focus moves completely outside this nav item
                if (link.hasDropdown && !e.currentTarget.contains(e.relatedTarget as Node)) {
                  setHoveredLink(null);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setHoveredLink(null);
              }}
            >
              {link.isExternal ? (
                <a
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "relative flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors hover:text-brand-accent whitespace-nowrap",
                    link.highlight
                      ? "!text-brand-secondary hover:!text-brand-accent"
                      : isScrolled || location.pathname !== '/' ? "text-brand-ink/80" : "text-white/80"
                  )}
                >
                  {linkText(link)}
                </a>
              ) : (
              <Link
                to={link.path}
                aria-haspopup={link.hasDropdown ? "menu" : undefined}
                aria-expanded={link.hasDropdown ? hoveredLink === link.name : undefined}
                className={cn(
                  "relative flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors hover:text-brand-accent",
                  isScrolled || location.pathname !== '/' ? "text-brand-ink/80" : "text-white/80",
                  (location.pathname === link.path.split('?')[0] || (link.hasDropdown && location.pathname === '/locations')) && "!text-brand-accent"
                )}
              >
                {t(link.name)}
                {link.hasDropdown && <ChevronDown size={14} className={cn("transition-transform", hoveredLink === link.name && "rotate-180")} aria-hidden="true" />}
                {(location.pathname === link.path.split('?')[0] || (link.hasDropdown && location.pathname === '/locations')) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-accent"
                  />
                )}
              </Link>
              )}

              {link.hasDropdown && (
                <AnimatePresence>
                  {hoveredLink === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      role="menu"
                      aria-label={t(link.name)}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max min-w-[280px] bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100"
                    >
                      <div className="py-2">
                        {locations.map((loc) => (
                          <Link
                            key={loc.id}
                            to={`/locations#${loc.id}`}
                            role="menuitem"
                            className="block px-6 py-3 text-xs font-bold uppercase tracking-widest text-brand-ink hover:bg-brand-bg hover:text-brand-accent transition-colors focus:outline-none focus:bg-brand-bg focus:text-brand-accent"
                          >
                            {loc.name[language]}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-2 mr-4">
            <button
              onClick={() => setLanguage('bg')}
              className={cn(
                "text-xs font-bold uppercase tracking-widest transition-colors hover:text-brand-accent",
                language === 'bg' ? "text-brand-accent" : (isScrolled || location.pathname !== '/' ? "text-brand-ink/60" : "text-white/60")
              )}
            >
              BG
            </button>
            <span className={cn(
              "text-xs",
              isScrolled || location.pathname !== '/' ? "text-brand-ink/20" : "text-white/20"
            )}>|</span>
            <button
              onClick={() => setLanguage('en')}
              className={cn(
                "text-xs font-bold uppercase tracking-widest transition-colors hover:text-brand-accent",
                language === 'en' ? "text-brand-accent" : (isScrolled || location.pathname !== '/' ? "text-brand-ink/60" : "text-white/60")
              )}
            >
              EN
            </button>
          </div>

          <a
            href={`tel:${mainPhone.replace(/[\s\/]/g, '')}`}
            className={cn(
              "p-2 rounded-full transition-colors",
              isScrolled || location.pathname !== '/' ? "bg-brand-bg text-brand-ink hover:bg-brand-accent hover:text-white" : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            <Phone size={20} />
          </a>
          <Link
            to="/locations"
            className="bg-brand-accent text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-opacity-90 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            {t('nav.reserve')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={() => setLanguage(language === 'bg' ? 'en' : 'bg')}
            className={cn(
              "p-2 flex items-center gap-1 text-xs font-bold uppercase tracking-widest",
              isScrolled || location.pathname !== '/' ? "text-brand-ink" : "text-white"
            )}
          >
            <Globe size={18} /> {language.toUpperCase()}
          </button>
          <button
            className={cn(
              "p-2",
              isScrolled || location.pathname !== '/' ? "text-brand-ink" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100"
          >
            <nav className="flex flex-col p-4">
              {NAV_LINKS.map((link) => (
                link.isExternal ? (
                  <a
                    key={link.name}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "py-3 text-lg font-medium border-b border-gray-50 last:border-0",
                      link.highlight ? "text-brand-secondary font-semibold" : "text-brand-ink"
                    )}
                  >
                    {linkText(link)}
                  </a>
                ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "py-3 text-lg font-medium border-b border-gray-50 last:border-0",
                    location.pathname === link.path ? "text-brand-accent" : "text-brand-ink"
                  )}
                >
                  {t(link.name)}
                </Link>
                )
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={`tel:${mainPhone.replace(/[\s\/]/g, '')}`}
                  className="flex items-center justify-center gap-2 bg-brand-bg text-brand-ink py-3 rounded-xl font-semibold"
                >
                  <Phone size={20} /> {t('nav.call')}
                </a>
                <Link
                  to="/locations"
                  className="flex items-center justify-center gap-2 bg-brand-accent text-white py-3 rounded-xl font-semibold"
                >
                  <Calendar size={20} /> {t('nav.reserve')}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
