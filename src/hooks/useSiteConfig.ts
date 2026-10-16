import { useState, useEffect } from 'react';

export interface SiteConfig {
  /** Set to false to hide the Lunch Menu button site-wide without a rebuild. */
  lunchMenuEnabled: boolean;
  /** General contact email shown in the footer / contact page. */
  email?: string;
  /**
   * Optional site-wide announcement banner text.
   * Leave both values empty ("") to hide the banner.
   */
  announcement?: Record<string, string>;
  /**
   * Hero section text on the Home page.
   * Edit in site-config.json — no rebuild needed.
   */
  heroText?: {
    bg: { title: string; subtitle: string };
    en: { title: string; subtitle: string };
  };
  /**
   * Path to the Catering page hero banner image.
   * Use a local path like "images/catering/hero.jpg" — upload the file via
   * Superhosting File Manager and update this value, no rebuild needed.
   */
  cateringHeroImage?: string;
}

const DEFAULT_CONFIG: SiteConfig = {
  lunchMenuEnabled: true,
};

// Module-level cache: fetched once, shared across all component instances.
let _cached: SiteConfig | null = null;
let _promise: Promise<SiteConfig> | null = null;

function load(): Promise<SiteConfig> {
  if (!_promise) {
    _promise = fetch(`${import.meta.env.BASE_URL}site-config.json`)
      .then(r => (r.ok ? r.json() : DEFAULT_CONFIG))
      .catch(() => DEFAULT_CONFIG);
  }
  return _promise;
}

/**
 * Returns the parsed site-config.json.
 * Falls back to DEFAULT_CONFIG while loading or on error.
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
