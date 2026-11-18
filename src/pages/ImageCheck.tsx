import React, { useEffect, useState } from 'react';
import { fetchJson } from '../lib/utils';
import { findWorkingImage } from '../lib/images';
import { normalizeMenuData, getCategoryItems, categoryLabel, MenuData } from '../data/appData';

/**
 * Hidden admin page: /proverka-snimki
 * Checks every photo referenced in menu.json, gallery.json and site-config.json and shows
 * which ones load, which only load under a slightly different name (and what to write instead),
 * and which are missing. Not linked anywhere and not indexed by search engines.
 */

type Status = 'checking' | 'ok' | 'fixed' | 'missing';
interface Row {
  source: string;   // e.g. "Меню → Пица"
  name: string;     // dish / photo name
  path: string;     // path written in the JSON
  status: Status;
  actual?: string;  // the path that really works (when status = fixed)
}

const STATUS_LABEL: Record<Status, string> = {
  checking: '… проверява се',
  ok: '✓ Наред',
  fixed: '⚠ Грешно име',
  missing: '✗ Липсва',
};
const STATUS_CLASS: Record<Status, string> = {
  checking: 'text-brand-muted',
  ok: 'text-green-700',
  fixed: 'text-amber-700',
  missing: 'text-red-700',
};

/** Explains in plain words what differs between the JSON path and the real file. */
function explain(written: string, actual: string): string[] {
  const hints: string[] = [];
  const w = written.trim().replace(/^\/+/, '');
  const fileOf = (p: string) => p.slice(p.lastIndexOf('/') + 1);
  const extOf = (p: string) => { const f = fileOf(p); const d = f.lastIndexOf('.'); return d > 0 ? f.slice(d + 1) : ''; };
  if (/[^\x00-\x7F]/.test(extOf(w))) hints.push('В разширението има кирилска буква (напр. „е“) — напишете го наново на латиница.');
  if (/ \.[^.]+$/.test(fileOf(actual))) hints.push('Във ФАЙЛА има интервал преди точката (напр. „Tarator .jpg“) — най-добре преименувайте файла без интервала.');
  if (extOf(w).toLowerCase() !== extOf(actual).toLowerCase()) hints.push(`Разширението е различно: файлът е „.${extOf(actual)}“, а в JSON пише „.${extOf(w)}“.`);
  const bw = fileOf(w).replace(/\.[^.]+$/, '').trim(), ba = fileOf(actual).replace(/\.[^.]+$/, '').trim();
  if (bw !== ba && bw.toLowerCase() === ba.toLowerCase()) hints.push('Главни/малки букви не съвпадат (сървърът ги различава).');
  return hints;
}

function relPath(url: string): string {
  const base = import.meta.env.BASE_URL;
  try {
    const p = decodeURI(new URL(url).pathname);
    return p.startsWith(base) ? p.slice(base.length) : p;
  } catch { return url; }
}

export function ImageCheck() {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'problems' | 'all'>('problems');

  useEffect(() => {
    // Keep this page out of Google.
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { meta.remove(); };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const list: Row[] = [];
      const errors: string[] = [];
      try {
        const menu = normalizeMenuData(await fetchJson('menu/menu.json')) as MenuData;
        for (const cat of menu.categories) {
          const label = categoryLabel(menu, cat, 'bg', k => k);
          for (const item of getCategoryItems(menu, cat)) {
            if (item.image) list.push({ source: `Меню → ${label}`, name: item.name.bg || item.name.en, path: item.image, status: 'checking' });
          }
        }
      } catch (e) { errors.push(`menu.json не може да се прочете: ${(e as Error).message}`); }
      try {
        const g = await fetchJson<{ items?: { url?: string; category?: string; caption?: Record<string, string> | string }[] }>('gallery.json');
        for (const it of Array.isArray(g?.items) ? g.items : []) {
          if (!it?.url) continue;
          const cap = typeof it.caption === 'string' ? it.caption : it.caption?.bg;
          list.push({ source: it.category === 'Events' ? 'Кетъринг (gallery.json)' : `Галерия → ${it.category ?? ''}`, name: cap || '—', path: it.url, status: 'checking' });
        }
      } catch (e) { errors.push(`gallery.json не може да се прочете: ${(e as Error).message}`); }
      try {
        const c = await fetchJson<{ cateringHeroImage?: string }>('site-config.json');
        if (c?.cateringHeroImage) list.push({ source: 'site-config.json', name: 'Банер Кетъринг', path: c.cateringHeroImage, status: 'checking' });
      } catch (e) { errors.push(`site-config.json не може да се прочете: ${(e as Error).message}`); }

      if (cancelled) return;
      setError(errors.length ? errors.join(' • ') : null);
      setRows(list);

      // Check a few at a time so the page stays responsive.
      const CONCURRENCY = 6;
      let next = 0;
      const worker = async () => {
        while (next < list.length && !cancelled) {
          const idx = next++;
          const found = await findWorkingImage(list[idx].path);
          if (cancelled) return;
          const row: Row = !found
            ? { ...list[idx], status: 'missing' }
            : found.index === 0
              ? { ...list[idx], status: 'ok' }
              : { ...list[idx], status: 'fixed', actual: relPath(found.url) };
          setRows(prev => prev.map((r, i) => (i === idx ? row : r)));
        }
      };
      await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    })();
    return () => { cancelled = true; };
  }, []);

  const count = (s: Status) => rows.filter(r => r.status === s).length;
  const shown = filter === 'all' ? rows : rows.filter(r => r.status !== 'ok');

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl sm:text-4xl mb-2">Проверка на снимките</h1>
        <p className="text-brand-muted mb-6 text-sm leading-relaxed">
          Страницата проверява всяка снимка от <b>menu.json</b>, <b>gallery.json</b> и <b>site-config.json</b>.
          „⚠ Грешно име“ означава, че сайтът намира снимката сам, но името в JSON файла не съвпада точно с файла —
          препоръчително е да го поправите (знакът ␣ показва интервал в името на файла).
          Тази страница не се вижда в менюто и не се индексира от Google.
        </p>

        {error && <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>}

        <div className="flex flex-wrap gap-3 mb-6 text-sm font-semibold">
          <span className="px-4 py-2 rounded-full bg-white border">Общо: {rows.length}</span>
          <span className={`px-4 py-2 rounded-full bg-white border ${STATUS_CLASS.ok}`}>✓ Наред: {count('ok')}</span>
          <span className={`px-4 py-2 rounded-full bg-white border ${STATUS_CLASS.fixed}`}>⚠ Грешно име: {count('fixed')}</span>
          <span className={`px-4 py-2 rounded-full bg-white border ${STATUS_CLASS.missing}`}>✗ Липсва: {count('missing')}</span>
          {count('checking') > 0 && <span className="px-4 py-2 rounded-full bg-white border text-brand-muted">Проверяват се: {count('checking')}</span>}
          <button
            onClick={() => setFilter(filter === 'all' ? 'problems' : 'all')}
            className="ml-auto px-4 py-2 rounded-full bg-brand-ink text-white"
          >
            {filter === 'all' ? 'Покажи само проблемите' : 'Покажи всички'}
          </button>
        </div>

        {shown.length === 0 && count('checking') === 0 ? (
          <p className="text-green-700 font-semibold">Всички снимки се зареждат правилно. 👍</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl border">
            <table className="w-full text-sm">
              <thead className="bg-brand-bg text-left">
                <tr>
                  <th className="p-3">Състояние</th>
                  <th className="p-3">Къде</th>
                  <th className="p-3">Ястие / снимка</th>
                  <th className="p-3">Написано в JSON</th>
                  <th className="p-3">Правилно име</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((r, i) => (
                  <tr key={i} className="border-t align-top">
                    <td className={`p-3 font-semibold whitespace-nowrap ${STATUS_CLASS[r.status]}`}>{STATUS_LABEL[r.status]}</td>
                    <td className="p-3 whitespace-nowrap">{r.source}</td>
                    <td className="p-3">{r.name}</td>
                    <td className="p-3 font-mono text-xs break-all">{r.path}</td>
                    <td className="p-3 font-mono text-xs break-all">
                      {r.status === 'fixed' && r.actual && (
                        <>
                          <span>{r.actual.replace(/ /g, '␣')}</span>
                          <ul className="font-sans text-amber-800 mt-1 list-disc pl-4 space-y-0.5">
                            {explain(r.path, r.actual).map(h => <li key={h}>{h}</li>)}
                          </ul>
                        </>
                      )}
                      {r.status === 'missing' && <span className="text-red-700 font-sans">Файлът не е намерен — качете го или проверете папката</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
