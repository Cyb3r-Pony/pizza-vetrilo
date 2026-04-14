import React from 'react';
import { Link } from 'react-router-dom';
import { Home, UtensilsCrossed } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

export function NotFound() {
  const { language } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg px-4">
      <div className="text-center max-w-lg">
        {/* Big pizza emoji as visual */}
        <div className="text-8xl mb-6">🍕</div>

        <h1 className="text-8xl font-serif font-bold text-brand-accent mb-4">404</h1>

        <h2 className="text-3xl font-serif mb-4 text-brand-ink">
          {language === 'bg' ? 'Страницата не е намерена' : 'Page Not Found'}
        </h2>

        <p className="text-brand-muted text-lg mb-10 leading-relaxed">
          {language === 'bg'
            ? 'Изглежда тази страница е изчезнала като последното парче пица. Върнете се обратно!'
            : "Looks like this page disappeared like the last slice of pizza. Head back!"}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-brand-accent text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all hover:-translate-y-0.5"
          >
            <Home size={20} />
            {language === 'bg' ? 'Начало' : 'Home'}
          </Link>
          <Link
            to="/menu"
            className="flex items-center justify-center gap-2 bg-brand-ink text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all hover:-translate-y-0.5"
          >
            <UtensilsCrossed size={20} />
            {language === 'bg' ? 'Виж менюто' : 'View Menu'}
          </Link>
        </div>
      </div>
    </div>
  );
}
