import React from 'react';
import { motion } from 'motion/react';
import { History, Heart, Users, ExternalLink } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

export function About() {
  const { t } = useTranslation();

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <section className="bg-brand-ink text-white py-12 sm:py-20 mb-10 sm:mb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">{t('about.title')}</h1>
          <p className="text-brand-secondary text-base sm:text-xl max-w-2xl mx-auto font-light">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Story Block */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200"
              alt="Restaurant Interior"
              loading="lazy"
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-accent font-bold uppercase tracking-widest text-sm">
              <History size={18} /> {t('about.since')}
            </div>
            <h2 className="text-4xl md:text-5xl">{t('about.legacyTitle')}</h2>
            <p className="text-brand-muted text-lg leading-relaxed">
              {t('about.legacyDesc1')}
            </p>
            <p className="text-brand-muted text-lg leading-relaxed">
              {t('about.legacyDesc2')}
            </p>
          </div>
        </div>

        {/* Philosophy & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mx-auto text-brand-accent">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl font-bold">{t('about.philosophy')}</h3>
            <p className="text-brand-muted">
              {t('about.philosophyDesc')}
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mx-auto text-brand-accent">
              <Users size={32} />
            </div>
            <h3 className="text-2xl font-bold">{t('about.family')}</h3>
            <p className="text-brand-muted">
              {t('about.familyDesc')}
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mx-auto text-brand-accent">
              <History size={32} />
            </div>
            <h3 className="text-2xl font-bold">{t('about.reputation')}</h3>
            <p className="text-brand-muted">
              {t('about.reputationDesc')}
            </p>
          </div>
        </div>

        {/* Team/Atmosphere Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200"
            alt="Chef at work"
            loading="lazy"
            className="rounded-3xl h-96 w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200"
            alt="Happy customers"
            loading="lazy"
            className="rounded-3xl h-96 w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Careers Section */}
        <div className="bg-brand-bg rounded-3xl p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-6">{t('about.careersTitle')}</h2>
          <p className="text-brand-muted text-lg leading-relaxed mb-8">
            {t('about.careersDesc')}
          </p>
          <a
            href="https://www.jobs.bg/company/68817"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-accent text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all group"
          >
            {t('about.applyNow')}
            <ExternalLink size={16} className="shrink-0 opacity-80 group-hover:opacity-100" />
          </a>
        </div>
      </div>
    </div>
  );
}
