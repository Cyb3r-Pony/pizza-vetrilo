import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, CheckCircle, ExternalLink } from 'lucide-react';
import { LOCATIONS, SOCIAL_LINKS } from '../data/appData';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import { EMAIL_REGEX } from '../lib/utils';

export function Contact() {
  const { t, language } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('form.required');
    if (!formData.email.trim()) newErrors.email = t('form.required');
    else if (!EMAIL_REGEX.test(formData.email)) newErrors.email = t('form.invalidEmail');
    if (!formData.subject.trim()) newErrors.subject = t('form.required');
    if (!formData.message.trim()) newErrors.message = t('form.required');
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const body = encodeURIComponent(
        `От: ${formData.name}\nИмейл: ${formData.email}\n\n${formData.message}`
      );
      const subject = encodeURIComponent(formData.subject);
      window.location.href = `mailto:vetrilo2005@abv.bg?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setSubmitted(false);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
  };

  const inputClass = (field: string) =>
    `w-full bg-brand-bg border-0 rounded-xl p-4 focus:ring-2 focus:ring-brand-accent transition-all ${errors[field] ? 'ring-2 ring-red-500' : ''}`;

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
        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-12">
            <div>
              <h2 className="text-3xl mb-8">{t('contact.getInTouch')}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-accent shadow-sm shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-1">{t('nav.call')}</p>
                    <a href={`tel:${LOCATIONS[0].phone.replace(/[\s\/]/g, '')}`} className="text-lg font-semibold hover:text-brand-accent transition-colors">{LOCATIONS[0].phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-accent shadow-sm shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-1">{t('contact.email')}</p>
                    <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-lg font-semibold hover:text-brand-accent transition-colors">{SOCIAL_LINKS.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-accent shadow-sm shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-1">{t('contact.mainOffice')}</p>
                    <p className="text-lg font-semibold">{t('contact.mainOfficeLoc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl mb-6">{t('contact.followUs')}</h3>
              <div className="flex gap-4">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-brand-ink text-white rounded-2xl flex items-center justify-center hover:bg-brand-accent transition-colors">
                  <Facebook size={24} />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-brand-ink text-white rounded-2xl flex items-center justify-center hover:bg-brand-accent transition-colors">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl mb-8">{t('contact.sendMessage')}</h2>
            {submitted ? (
              <div className="text-center py-12 space-y-6">
                <CheckCircle size={64} className="text-green-500 mx-auto" />
                <h4 className="text-2xl font-bold">{t('form.successTitle')}</h4>
                <p className="text-brand-muted text-lg">{t('form.successContact')}</p>
                <button
                  onClick={handleReset}
                  className="bg-brand-accent text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
                >
                  {t('form.sendAnother')}
                </button>
              </div>
            ) : (
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-1">{t('catering.formName')}</label>
                  <input type="text" name="name" value={formData.name} onChange={(e) => updateField('name', e.target.value)} className={inputClass('name')} placeholder={t('catering.formPlaceholderName')} />
                  {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-1">{t('contact.email')}</label>
                  <input type="email" name="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} className={inputClass('email')} placeholder="email@example.com" />
                  {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-1">{t('contact.formSubject')}</label>
                <input type="text" name="subject" value={formData.subject} onChange={(e) => updateField('subject', e.target.value)} className={inputClass('subject')} placeholder={t('contact.formPlaceholderSubject')} />
                {errors.subject && <p className="text-red-500 text-xs ml-1">{errors.subject}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-1">{t('contact.formMessage')}</label>
                <textarea rows={6} name="message" value={formData.message} onChange={(e) => updateField('message', e.target.value)} className={inputClass('message')} placeholder={t('contact.formPlaceholderMessage')}></textarea>
                {errors.message && <p className="text-red-500 text-xs ml-1">{errors.message}</p>}
              </div>
              <button type="submit" className="bg-brand-accent text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all">
                <Send size={18} /> {t('contact.formSend')}
              </button>
            </form>
            )}
          </div>
        </div>

        {/* Quick Location Links */}
        <div className="text-center mb-24">
          <h2 className="text-3xl mb-12">{t('contact.quickLinks')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.id}
                to="/locations"
                className="p-8 bg-brand-bg rounded-3xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-brand-accent group"
              >
                <h3 className="text-xl mb-2 group-hover:text-brand-accent transition-colors">{loc.name[language]}</h3>
                <p className="text-sm text-brand-muted">{loc.address[language]}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Careers Section */}
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
