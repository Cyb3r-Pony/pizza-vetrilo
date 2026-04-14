import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { ScrollText, ChevronDown, ChevronUp, Mail } from 'lucide-react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

function Section({ id, title, children }: SectionProps) {
  const [open, setOpen] = useState(true);
  return (
    <div id={id} className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <h2 className="text-lg font-bold text-brand-ink group-hover:text-brand-accent transition-colors">
          {title}
        </h2>
        {open ? <ChevronUp size={18} className="text-brand-accent shrink-0" /> : <ChevronDown size={18} className="text-brand-muted shrink-0" />}
      </button>
      {open && (
        <div className="pb-7 space-y-4 text-brand-muted text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

const UPDATED_BG = '13 април 2026 г.';
const UPDATED_EN = 'April 13, 2026';

export function TermsOfService() {
  const { language } = useTranslation();

  if (language === 'bg') {
    return (
      <div className="pt-0 pb-24 min-h-screen">
        {/* Hero */}
        <div className="bg-brand-ink text-white py-20 mb-12">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-accent/20 rounded-full mb-6">
              <ScrollText size={28} className="text-brand-secondary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif mb-3">Условия за ползване</h1>
            <p className="text-white/50 text-sm">Последна актуализация: {UPDATED_BG}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-3xl">
          {/* Intro box */}
          <div className="bg-brand-bg border-l-4 border-brand-accent rounded-xl p-6 mb-10 text-sm text-brand-muted leading-relaxed">
            Моля, прочетете внимателно тези Условия за ползване, преди да използвате уебсайта на Пицария „Ветрило". Използването на сайта означава, че приемате и се задължавате да спазвате тези условия. Ако не сте съгласни с тях, моля, не използвайте уебсайта.
          </div>

          <div className="divide-y divide-gray-100">

            <Section id="parties" title="1. Страни по договора">
              <p>Тези условия регулират взаимоотношенията между:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-brand-ink">Пицария „Ветрило"</strong> — доставчик на услугата, с адрес жк. Борово, ул. Солун, с/у блок 43, гр. София (наричана по-долу „Ветрило", „ние", „нас");</li>
                <li>и <strong className="text-brand-ink">Потребителят</strong> — всяко физическо или юридическо лице, което посещава или използва уебсайта (наричан „вие" или „потребителят").</li>
              </ul>
            </Section>

            <Section id="scope" title="2. Обхват на уебсайта">
              <p>Уебсайтът на Пицария „Ветрило" е <strong className="text-brand-ink">информационен ресурс</strong>. Той предоставя информация за менюто, локациите, работното време, кетъринг услугите и начините за контакт, но <strong className="text-brand-ink">не обработва онлайн плащания и не сключва обвързващи търговски договори</strong> директно чрез сайта.</p>
              <p>Изпращането на контактна форма или кетъринг запитване не представлява потвърдена резервация или сключен договор и не поражда задължения за нас до изричното ни писмено потвърждение.</p>
            </Section>

            <Section id="reservations" title="3. Резервации и посещения">
              <p className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-orange-800 text-xs">
                <strong>Важно:</strong> Резервациите се правят единствено по телефон или имейл и се считат за потвърдени само при изрично устно или писмено потвърждение от наш представител.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Резервации се приемат до 23:00 ч. в деня на посещението, в рамките на работното ни време.</li>
                <li>При неявяване без предварително уведомление в рамките на <strong className="text-brand-ink">15 минути</strong> след резервирания час, „Ветрило" си запазва правото да предостави масата на друг гост.</li>
                <li>За групи над 10 лица или специални поводи може да се изисква предварителен депозит. Условията за депозита се уговарят индивидуално.</li>
                <li>„Ветрило" не носи отговорност за вреди, претърпени от гости поради невъзможност за настаняване при липса на резервация или при пиково натоварване.</li>
              </ul>
            </Section>

            <Section id="allergens" title="4. Алергени и хранителна информация">
              <p className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-xs">
                <strong>⚠ Предупреждение за алергени:</strong> Ястията, приготвяни в нашите кухни, може да съдържат или да са в контакт с алергени, включително глутен, млечни продукти, яйца, ядки, фъстъци, соя, риба, ракообразни, целина, горчица, сусам, серен диоксид и сулфити.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Информацията за алергени на уебсайта е предоставена добросъвестно и е актуална към момента на публикуване, но може да се промени без предизвестие поради промяна в рецептурата или доставчиците.</li>
                <li>Гостите с хранителни алергии или непоносимости <strong className="text-brand-ink">са длъжни да уведомят персонала ни преди поръчката</strong>. „Ветрило" не носи отговорност за алергични реакции, настъпили при непредоставена информация за алергии.</li>
                <li>Въпреки предпазните мерки, не можем да гарантираме пълно отсъствие на кръстосано замърсяване в нашата кухня.</li>
                <li>Снимките на ястията в менюто са илюстративни и може да се различават от действителното им поднасяне.</li>
              </ul>
            </Section>

            <Section id="pricing" title="5. Наличност на ястия">
              <ul className="list-disc pl-5 space-y-1">
                <li>„Ветрило" си запазва правото да <strong className="text-brand-ink">актуализира менюто по всяко време без предизвестие</strong>. Актуалното меню е достъпно в самия ресторант.</li>
                <li>Наличността на ястия зависи от сезонните продукти и може да варира. Запазваме правото да откажем поръчка за изчерпана позиция.</li>
                <li>Акционните и промоционалните оферти са валидни за ограничен период и при наличност, освен ако не е посочено друго.</li>
              </ul>
            </Section>

            <Section id="catering" title="6. Кетъринг услуги">
              <ul className="list-disc pl-5 space-y-1">
                <li>Кетъринг запитванията, изпратени чрез уебсайта, са <strong className="text-brand-ink">предварителни запитвания</strong> и не представляват потвърдена поръчка.</li>
                <li>Кетъринг услугата се потвърждава само след <strong className="text-brand-ink">писмен договор</strong>, подписан от двете страни.</li>
                <li>„Ветрило" не носи отговорност за вреди, произтичащи от отказ на кетъринг услуга при липса на подписан договор.</li>
                <li>Анулирането на потвърдена кетъринг поръчка подлежи на условията, договорени в индивидуалния договор.</li>
              </ul>
            </Section>

            <Section id="ip" title="7. Интелектуална собственост">
              <p>Всички материали, публикувани на уебсайта — включително текстове, изображения, лога, графики, видео и дизайн — са <strong className="text-brand-ink">собственост на Пицария „Ветрило"</strong> или се използват с разрешение и са защитени от законодателството за авторски права и интелектуална собственост.</p>
              <p>Забранено е:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Копирането, разпространението или публичното показване на материали от сайта без изрично писмено разрешение;</li>
                <li>Използването на марките, логата или търговските наименования на „Ветрило" за търговски цели;</li>
                <li>Модифицирането или декомпилирането на кода на уебсайта.</li>
              </ul>
            </Section>

            <Section id="third-party-links" title="8. Препратки към трети страни">
              <p>Уебсайтът съдържа препратки към услуги на трети страни (Google Maps, Wolt, Takeaway.com, jobs.bg и др.). Тези услуги се управляват от съответните дружества, а не от „Ветрило".</p>
              <p>„Ветрило" не носи отговорност за:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Съдържанието, точността или наличността на уебсайтовете на третите страни;</li>
                <li>Нарушения на поверителността или сигурността на данните от страна на тези услуги;</li>
                <li>Финансови загуби или вреди, произтичащи от сделки, сключени с трети страни.</li>
              </ul>
            </Section>

            <Section id="disclaimer" title="9. Отказ от отговорност">
              <p>Информацията на уебсайта се предоставя <strong className="text-brand-ink">„в съществуващия вид"</strong>. Въпреки че полагаме усилия за точност, „Ветрило" не дава гаранции относно:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Пълнотата, точността или актуалността на публикуваната информация;</li>
                <li>Непрекъснатата наличност на уебсайта или отсъствието на технически грешки;</li>
                <li>Пригодността на информацията за конкретна цел.</li>
              </ul>
              <p>„Ветрило" не носи отговорност за преки или косвени вреди, произтичащи от употребата или невъзможността за употреба на уебсайта.</p>
            </Section>

            <Section id="liability" title="10. Ограничаване на отговорността">
              <p>В максималната степен, допустима от приложимото право, <strong className="text-brand-ink">„Ветрило" изключва всякаква отговорност</strong> за:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Пропуснати ползи, пропуснати приходи или косвени загуби;</li>
                <li>Загуба на данни или прекъсване на бизнес дейност;</li>
                <li>Вреди, причинени от вируси или злонамерен софтуер, придобити при използване на сайта;</li>
                <li>Вреди от несъответствие между очакванията на потребителя и предоставената информация на уебсайта.</li>
              </ul>
              <p>Общата отговорност на „Ветрило" при всякакви обстоятелства не може да надхвърля сумата, платена от потребителя за конкретната услуга, породила претенцията, или <strong className="text-brand-ink">100 евро</strong>, което от двете е по-малко.</p>
            </Section>

            <Section id="conduct" title="11. Поведение на потребителите">
              <p>При използване на уебсайта е забранено:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Изпращането на фалшиви, злонамерени или обидни съобщения чрез формите за контакт;</li>
                <li>Автоматизираното сканиране или скрейпинг на сайта;</li>
                <li>Опитите за нарушаване на сигурността на уебсайта;</li>
                <li>Представянето за друго лице или организация.</li>
              </ul>
              <p>„Ветрило" си запазва правото да предприеме правни действия срещу лица, нарушаващи тези условия.</p>
            </Section>

            <Section id="governing-law" title="12. Приложимо право и юрисдикция">
              <p>Тези Условия за ползване се уреждат и тълкуват в съответствие със <strong className="text-brand-ink">законодателството на Република България</strong> и приложимото право на Европейския съюз.</p>
              <p>Всички спорове, произтичащи от или свързани с тези условия, ще се разглеждат от компетентните съдилища в <strong className="text-brand-ink">гр. София, Република България</strong>, освен ако задължителни разпоредби на потребителското право не предвиждат друга юрисдикция.</p>
              <p>Потребители-потребители (физически лица) имат право да отнасят спорове до <strong className="text-brand-ink">Комисия за защита на потребителите</strong> или платформата за онлайн решаване на спорове на ЕС (ОДС): <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">ec.europa.eu/consumers/odr</a>.</p>
            </Section>

            <Section id="changes" title="13. Промени в условията">
              <p>„Ветрило" си запазва правото да изменя тези Условия за ползване по всяко време. Промените влизат в сила от момента на публикуването им на уебсайта. Продължаването на ползването на сайта след публикуване на промените означава приемането им.</p>
              <p>При съществени промени ще актуализираме датата в горната част на документа.</p>
            </Section>

            <Section id="contact" title="14. Контакт">
              <p>При въпроси, свързани с тези Условия за ползване, свържете се с нас:</p>
              <div className="flex items-center gap-3 mt-2">
                <Mail size={16} className="text-brand-accent" />
                <a href="mailto:vetrilo2005@abv.bg" className="text-brand-accent hover:underline font-medium">vetrilo2005@abv.bg</a>
              </div>
            </Section>

          </div>

          <p className="text-xs text-brand-muted/50 text-center mt-12">
            © {new Date().getFullYear()} Пицария „Ветрило". Всички права запазени.
          </p>
        </div>
      </div>
    );
  }

  // English version
  return (
    <div className="pt-0 pb-24 min-h-screen">
      {/* Hero */}
      <div className="bg-brand-ink text-white py-20 mb-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-accent/20 rounded-full mb-6">
            <ScrollText size={28} className="text-brand-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif mb-3">Terms of Service</h1>
          <p className="text-white/50 text-sm">Last updated: {UPDATED_EN}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl">
        {/* Intro box */}
        <div className="bg-brand-bg border-l-4 border-brand-accent rounded-xl p-6 mb-10 text-sm text-brand-muted leading-relaxed">
          Please read these Terms of Service carefully before using the Pizza Vetrilo website. By using this site, you agree to be bound by these terms. If you do not agree, please do not use the website.
        </div>

        <div className="divide-y divide-gray-100">

          <Section id="parties" title="1. Parties">
            <p>These terms govern the relationship between:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-brand-ink">Pizza Vetrilo</strong> — service provider, address: Borovo District, Solun Street, opp. Block 43, Sofia, Bulgaria (hereinafter "Vetrilo", "we", "us");</li>
              <li>and the <strong className="text-brand-ink">User</strong> — any natural or legal person visiting or using the website (hereinafter "you" or "user").</li>
            </ul>
          </Section>

          <Section id="scope" title="2. Scope of the Website">
            <p>The Pizza Vetrilo website is an <strong className="text-brand-ink">informational resource</strong>. It provides information about the menu, locations, opening hours, catering services, and contact details, but does <strong className="text-brand-ink">not process online payments and does not enter into binding commercial contracts</strong> directly through the site.</p>
            <p>Submitting a contact form or catering inquiry does not constitute a confirmed reservation or binding contract and creates no obligations for us until we have issued explicit written confirmation.</p>
          </Section>

          <Section id="reservations" title="3. Reservations & Visits">
            <p className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-orange-800 text-xs">
              <strong>Important:</strong> Reservations are made by phone or email only and are considered confirmed solely upon explicit verbal or written confirmation from our representative.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Reservations are accepted until 23:00 on the day of the visit, within our operating hours.</li>
              <li>If a party fails to arrive without prior notice within <strong className="text-brand-ink">15 minutes</strong> of the reserved time, Vetrilo reserves the right to release the table to another guest.</li>
              <li>For groups of more than 10 persons or special occasions, a deposit may be required. Deposit terms are agreed individually.</li>
              <li>Vetrilo accepts no liability for losses suffered by guests due to inability to be seated where no reservation was made or during peak periods.</li>
            </ul>
          </Section>

          <Section id="allergens" title="4. Allergens & Food Information">
            <p className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-xs">
              <strong>⚠ Allergen Warning:</strong> Dishes prepared in our kitchens may contain or come into contact with allergens, including gluten, dairy, eggs, tree nuts, peanuts, soy, fish, crustaceans, celery, mustard, sesame, sulphur dioxide, and sulphites.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Allergen information on this website is provided in good faith and is accurate at the time of publication but may change without notice due to recipe or supplier changes.</li>
              <li>Guests with food allergies or intolerances <strong className="text-brand-ink">must inform our staff before ordering</strong>. Vetrilo accepts no liability for allergic reactions where allergy information was not disclosed.</li>
              <li>Despite precautions, we cannot guarantee the complete absence of cross-contamination in our kitchen.</li>
              <li>Food photography on the website is for illustrative purposes only and may differ from actual presentation.</li>
            </ul>
          </Section>

          <Section id="pricing" title="5. Menu Availability">
            <ul className="list-disc pl-5 space-y-1">
              <li>Vetrilo reserves the right to <strong className="text-brand-ink">update the menu at any time without notice</strong>. The current menu is available in-restaurant.</li>
              <li>Dish availability depends on seasonal produce and may vary. We reserve the right to decline an order for an out-of-stock item.</li>
              <li>Promotional offers are valid for a limited period and while stocks last, unless otherwise stated.</li>
            </ul>
          </Section>

          <Section id="catering" title="6. Catering Services">
            <ul className="list-disc pl-5 space-y-1">
              <li>Catering inquiries submitted through the website are <strong className="text-brand-ink">preliminary requests only</strong> and do not constitute a confirmed order.</li>
              <li>Catering services are confirmed only upon execution of a <strong className="text-brand-ink">written contract</strong> signed by both parties.</li>
              <li>Vetrilo accepts no liability for losses arising from the refusal of a catering service where no signed contract exists.</li>
              <li>Cancellation of a confirmed catering order is subject to the terms agreed in the individual contract.</li>
            </ul>
          </Section>

          <Section id="ip" title="7. Intellectual Property">
            <p>All materials published on the website — including texts, images, logos, graphics, video, and design — are the <strong className="text-brand-ink">property of Pizza Vetrilo</strong> or are used with permission and are protected by copyright and intellectual property law.</p>
            <p>The following are prohibited:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Copying, distributing, or publicly displaying website materials without express written permission;</li>
              <li>Using Vetrilo's trademarks, logos, or trade names for commercial purposes;</li>
              <li>Modifying or decompiling the website's source code.</li>
            </ul>
          </Section>

          <Section id="third-party-links" title="8. Third-Party Links">
            <p>The website contains links to third-party services (Google Maps, Wolt, Takeaway.com, jobs.bg, etc.). These services are operated by their respective companies, not by Vetrilo.</p>
            <p>Vetrilo accepts no responsibility for:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The content, accuracy, or availability of third-party websites;</li>
              <li>Privacy or data security breaches by those services;</li>
              <li>Financial losses or damages arising from transactions with third parties.</li>
            </ul>
          </Section>

          <Section id="disclaimer" title="9. Disclaimer of Warranties">
            <p>Information on the website is provided <strong className="text-brand-ink">"as is"</strong>. While we strive for accuracy, Vetrilo makes no warranties regarding:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The completeness, accuracy, or currency of published information;</li>
              <li>The uninterrupted availability of the website or the absence of technical errors;</li>
              <li>The fitness of the information for any particular purpose.</li>
            </ul>
            <p>Vetrilo accepts no liability for direct or indirect damages arising from the use or inability to use the website.</p>
          </Section>

          <Section id="liability" title="10. Limitation of Liability">
            <p>To the maximum extent permitted by applicable law, <strong className="text-brand-ink">Vetrilo excludes all liability</strong> for:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Loss of profits, loss of revenue, or indirect losses;</li>
              <li>Loss of data or business interruption;</li>
              <li>Damages caused by viruses or malware acquired while using the site;</li>
              <li>Damages resulting from a discrepancy between user expectations and information provided on the website.</li>
            </ul>
            <p>Vetrilo's total liability under any circumstances shall not exceed the amount paid by the user for the specific service giving rise to the claim, or <strong className="text-brand-ink">€100</strong>, whichever is lower.</p>
          </Section>

          <Section id="conduct" title="11. User Conduct">
            <p>When using the website, the following are prohibited:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Sending false, malicious, or offensive messages through contact forms;</li>
              <li>Automated scanning or scraping of the website;</li>
              <li>Attempts to breach the security of the website;</li>
              <li>Impersonating another person or organisation.</li>
            </ul>
            <p>Vetrilo reserves the right to take legal action against persons who violate these terms.</p>
          </Section>

          <Section id="governing-law" title="12. Governing Law & Jurisdiction">
            <p>These Terms of Service are governed by and construed in accordance with the <strong className="text-brand-ink">laws of the Republic of Bulgaria</strong> and applicable European Union law.</p>
            <p>Any disputes arising from or related to these terms shall be referred to the competent courts of <strong className="text-brand-ink">Sofia, Republic of Bulgaria</strong>, unless mandatory consumer protection provisions provide for a different jurisdiction.</p>
            <p>Consumer users (natural persons) have the right to refer disputes to the <strong className="text-brand-ink">Bulgarian Consumer Protection Commission</strong> or the EU Online Dispute Resolution platform: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">ec.europa.eu/consumers/odr</a>.</p>
          </Section>

          <Section id="changes" title="13. Changes to These Terms">
            <p>Vetrilo reserves the right to amend these Terms of Service at any time. Changes take effect upon publication on the website. Continued use of the website following publication of changes constitutes acceptance of those changes.</p>
            <p>For material changes, we will update the date at the top of this document.</p>
          </Section>

          <Section id="contact" title="14. Contact">
            <p>For questions relating to these Terms of Service, please contact us:</p>
            <div className="flex items-center gap-3 mt-2">
              <Mail size={16} className="text-brand-accent" />
              <a href="mailto:vetrilo2005@abv.bg" className="text-brand-accent hover:underline font-medium">vetrilo2005@abv.bg</a>
            </div>
          </Section>

        </div>

        <p className="text-xs text-brand-muted/50 text-center mt-12">
          © {new Date().getFullYear()} Pizza Vetrilo. All rights reserved.
        </p>
      </div>
    </div>
  );
}
