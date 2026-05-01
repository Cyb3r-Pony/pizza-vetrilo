import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Send, CheckCircle, ChevronDown } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { EMAIL_REGEX, PHONE_REGEX } from '../lib/utils';

const EVENT_TYPES = [
  { name: 'Team building', img: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800' },
  { name: 'Kids parties', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800' },
  { name: 'Birthday parties', img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800' },
  { name: 'Garden parties', img: 'https://images.unsplash.com/photo-1470753937643-efeb931202a9?auto=format&fit=crop&q=80&w=800' },
  { name: 'Coffee breaks', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' },
  { name: 'Proms', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800' },
];

const SERVICES = [
  'Menu planning',
  'Food preparation',
  'Delivery & Setup',
  'Professional Staff',
  'Equipment Rental',
  'Clean up service',
];

export function Catering() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', eventType: '', guestCount: '', notes: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('form.required');
    if (!formData.phone.trim()) newErrors.phone = t('form.required');
    else if (!PHONE_REGEX.test(formData.phone)) newErrors.phone = t('form.invalidPhone');
    if (!formData.email.trim()) newErrors.email = t('form.required');
    else if (!EMAIL_REGEX.test(formData.email)) newErrors.email = t('form.invalidEmail');
    if (!formData.eventType) newErrors.eventType = t('form.required');
    if (!formData.guestCount || Number(formData.guestCount) < 1) newErrors.guestCount = t('form.minGuests');
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const body = encodeURIComponent(
        `Запитване за кетъринг\n\nИме: ${formData.name}\nТелефон: ${formData.phone}\nИмейл: ${formData.email}\nТип събитие: ${formData.eventType}\nБрой гости: ${formData.guestCount}\n\nБележки:\n${formData.notes || '—'}`
      );
      const subject = encodeURIComponent(`Кетъринг запитване — ${formData.eventType}`);
      window.location.href = `mailto:vetrilo2005@abv.bg?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', phone: '', email: '', eventType: '', guestCount: '', notes: '' });
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    if (errors[field]) setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
  };

  const isFieldValid = (field: string) => {
    if (!touched[field]) return false;
    const val = formData[field as keyof typeof formData];
    if (!val || !String(val).trim()) return false;
    if (field === 'email') return EMAIL_REGEX.test(val);
    if (field === 'phone') return PHONE_REGEX.test(val);
    if (field === 'guestCount') return Number(val) >= 1;
    return true;
  };

  const inputClass = (field: string) =>
    `w-full bg-white border-0 rounded-xl p-4 focus:ring-2 focus:ring-brand-accent transition-all ${errors[field] ? 'ring-2 ring-red-500' : isFieldValid(field) ? 'ring-2 ring-green-400' : ''}`;

  return (
    <div className="pt-24 pb-24 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:h-[60vh] flex items-center justify-center text-white overflow-hidden py-16 sm:py-0">
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=2000"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl mb-4 sm:mb-6">{t('catering.heroTitle')}</h1>
            <p className="text-base sm:text-xl md:text-2xl text-brand-secondary max-w-2xl mx-auto font-light mb-6 sm:mb-10">
              {t('catering.heroSubtitle')}
            </p>
            <a
              href="#inquiry-form"
              className="inline-block bg-brand-accent text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
            >
              {t('section.requestOffer')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Event Types Grid */}
      <section className="py-16 sm:py-24 container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">{t('catering.eventsTitle')}</h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EVENT_TYPES.map((type) => (
            <div key={type.name} className="group relative h-64 rounded-2xl overflow-hidden">
              <img
                src={type.img}
                alt={type.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <h3 className="text-white text-2xl">{t(`event.${type.name}`)}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services & Form */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Services */}
            <div className="lg:w-1/2 space-y-12">
              <div>
                <h2 className="text-4xl mb-6">{t('catering.servicesTitle')}</h2>
                <p className="text-brand-muted text-lg leading-relaxed">
                  {t('catering.servicesDesc')}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {SERVICES.map((service) => (
                  <div key={service} className="flex items-center gap-4 p-4 bg-brand-bg rounded-2xl">
                    <CheckCircle2 className="text-brand-accent shrink-0" />
                    <span className="font-semibold text-brand-ink">{t(`service.${service}`)}</span>
                  </div>
                ))}
              </div>
              <div className="p-8 bg-brand-ink text-white rounded-3xl">
                <h4 className="text-xl text-brand-secondary mb-4">{t('catering.customMenus')}</h4>
                <p className="text-white/70 leading-relaxed">
                  {t('catering.customMenusDesc')}
                </p>
              </div>
            </div>

            {/* Form */}
            <div id="inquiry-form" className="lg:w-1/2 bg-brand-bg p-10 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-3xl mb-8">{t('catering.formTitle')}</h3>
              {submitted ? (
                <div className="text-center py-12 space-y-6">
                  <CheckCircle size={64} className="text-green-500 mx-auto" />
                  <h4 className="text-2xl font-bold">{t('form.successTitle')}</h4>
                  <p className="text-brand-muted text-lg">{t('form.successCatering')}</p>
                  <button
                    onClick={handleReset}
                    className="bg-brand-accent text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
                  >
                    {t('form.sendAnother')}
                  </button>
                </div>
              ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-1">{t('catering.formName')}</label>
                    <input type="text" name="name" value={formData.name} onChange={(e) => updateField('name', e.target.value)} className={inputClass('name')} placeholder={t('catering.formPlaceholderName')} />
                    {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-1">{t('catering.formPhone')}</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} className={inputClass('phone')} placeholder="+359 ..." />
                    {errors.phone && <p className="text-red-500 text-xs ml-1">{errors.phone}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-1">{t('catering.formEmail')}</label>
                  <input type="email" name="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} className={inputClass('email')} placeholder="email@example.com" />
                  {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-1">{t('catering.formEventType')}</label>
                    <div className="relative">
                      <select name="eventType" value={formData.eventType} onChange={(e) => updateField('eventType', e.target.value)} className={`w-full bg-white border-0 rounded-xl p-4 pr-10 focus:ring-2 focus:ring-brand-accent transition-all appearance-none ${errors.eventType ? 'ring-2 ring-red-500' : isFieldValid('eventType') ? 'ring-2 ring-green-400' : ''}`}>
                        <option value="" disabled>{t('catering.formSelectEvent')}</option>
                        {EVENT_TYPES.map((type) => (
                          <option key={type.name} value={type.name}>{t(`event.${type.name}`)}</option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
                    </div>
                    {errors.eventType && <p className="text-red-500 text-xs ml-1">{errors.eventType}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-1">{t('catering.formGuestCount')}</label>
                    <input type="number" name="guestCount" value={formData.guestCount} onChange={(e) => updateField('guestCount', e.target.value)} className={inputClass('guestCount')} placeholder="0" min="1" />
                    {errors.guestCount && <p className="text-red-500 text-xs ml-1">{errors.guestCount}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-1">{t('catering.formNotes')}</label>
                  <textarea rows={4} name="notes" value={formData.notes} onChange={(e) => updateField('notes', e.target.value)} className="w-full bg-white border-0 rounded-xl p-4 focus:ring-2 focus:ring-brand-accent transition-all" placeholder={t('catering.formPlaceholderNotes')}></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-accent text-white py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all">
                  <Send size={18} /> {t('catering.formSend')}
                </button>
              </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
