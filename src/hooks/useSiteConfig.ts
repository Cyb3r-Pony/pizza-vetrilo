import { useState, useEffect } from 'react';
import { NO_CACHE, resolveAsset } from '../lib/utils';

export interface SiteConfig {
  /** Set to false to hide the Lunch Menu button site-wide without a rebuild. */
  lunchMenuEnabled: boolean;
  /** General contact email shown in the footer / contact page. */
  email?: string;
  /**
   * Optional site-wide announcement banner text (reserved, not shown yet).
   */
  announcement?: Record<string, string>;
  /**
   * Hero section text on the Home page.
   * Edit in site-config.json — no rebuild needed.
   */
  heroText?: {
    bg?: { title?: string; subtitle?: string };
    en?: { title?: string; subtitle?: string };
  };
  /**
   * Path to the Catering page hero banner image, e.g. "images/catering/hero.jpg"
   * (or a full https:// link). No rebuild needed.
   */
  cateringHeroImage?: string;
  /**
   * Extra PDF buttons shown next to "Lunch Menu" (header, home page, menu page).
   * Use for seasonal offers: New Year, Easter, St. George's Day, proms, etc.
   */
  specialButtons?: SpecialButtonConfig[];
  /** True once site-config.json has been fetched (or failed). Set by the hook. */
  loaded?: boolean;
}

export interface SpecialButtonConfig {
  /** false = hidden. */
  enabled?: boolean;
  /** Button text per language. */
  label?: { bg?: string; en?: string };
  /** Path to the PDF, e.g. "menu/Novogodishen_kuvert_Vetrilo_2027.pdf", or a full https:// link. */
  pdf?: string;
}

export interface SpecialButton {
  label: string;
  url: string;
}

/** Enabled special buttons with a label and a PDF, ready to render in the given language. */
export function getSpecialButtons(config: SiteConfig, language: string): SpecialButton[] {
  if (!Array.isArray(config.specialButtons)) return [];
  return config.specialButtons
    .filter(b => b && b.enabled !== false && b.pdf)
    .map(b => ({
      label: (b.label?.[language as 'bg' | 'en'] || b.label?.bg || b.label?.en || '').trim(),
      url: resolveAsset(b.pdf),
    }))
    .filter(b => b.label && b.url);
}

const DEFAULT_CONFIG: SiteConfig = {
  lunchMenuEnabled: true,
};

// Module-level cache: fetched once, shared across all component instances.
let _cached: SiteConfig | null = null;
let _promise: Promise<SiteConfig> | null = null;

function load(): Promise<SiteConfig> {
  if (!_promise) {
    _promise = fetch(`${import.meta.env.BASE_URL}site-config.json`, NO_CACHE)
      .then(r => (r.ok ? r.json() : DEFAULT_CONFIG))
      .then((c: SiteConfig) => ({ ...DEFAULT_CONFIG, ...c, loaded: true }))
      .catch(err => {
        // Most common cause: a typo in site-config.json (missing comma, stray quote).
        console.error('site-config.json could not be read — check the JSON syntax.', err);
        return { ...DEFAULT_CONFIG, loaded: true };
      });
  }
  return _promise;
}

/**
 * Returns the parsed site-config.json.
 * Falls back to DEFAULT_CONFIG (loaded: false) while loading, or on error (loaded: true).
 * Safe to call from multiple components — only one HTTP request is ever made.
 */
export function useSiteConfig(): SiteConfig {
  const [config, setConfig] = useState<SiteConfig>(_cached ?? DEFAULT_CONFIG);

  useEffect(() => {
    if (_cached) return; // already loaded
    load().then(c => {
      _cached = c;
      setConfig(c);
    });
  }, []);

  return config;
}
