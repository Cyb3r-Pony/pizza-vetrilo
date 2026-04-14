import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { Shield, ChevronDown, ChevronUp, Mail } from 'lucide-react';

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

export function PrivacyPolicy() {
  const { language } = useTranslation();

  if (language === 'bg') {
    return (
      <div className="pt-0 pb-24 min-h-screen">
        {/* Hero */}
        <div className="bg-brand-ink text-white py-20 mb-12">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-accent/20 rounded-full mb-6">
              <Shield size={28} className="text-brand-secondary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif mb-3">Политика за поверителност</h1>
            <p className="text-white/50 text-sm">Последна актуализация: {UPDATED_BG}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-3xl">
          {/* Intro box */}
          <div className="bg-brand-bg border-l-4 border-brand-accent rounded-xl p-6 mb-10 text-sm text-brand-muted leading-relaxed">
            Пицария „Ветрило" се ангажира да защитава личните ви данни в съответствие с <strong className="text-brand-ink">Регламент (ЕС) 2016/679 (GDPR)</strong> и Закона за защита на личните данни на Република България. Моля, прочетете внимателно този документ, за да разберете как събираме, използваме и защитаваме информацията ви.
          </div>

          <div className="divide-y divide-gray-100">

            <Section id="controller" title="1. Администратор на лични данни">
              <p><strong className="text-brand-ink">Пицария „Ветрило"</strong> е администратор на личните данни, събирани чрез този уебсайт.</p>
              <p>Адрес: жк. Борово, ул. Солун, с/у блок 43, гр. София, Република България</p>
              <p>Имейл за въпроси относно лични данни: <a href="mailto:vetrilo2005@abv.bg" className="text-brand-accent hover:underline">vetrilo2005@abv.bg</a></p>
            </Section>

            <Section id="data-collected" title="2. Данни, които събираме">
              <p>Събираме само данните, необходими за конкретните цели, посочени по-долу. Категориите лични данни включват:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-brand-ink">Данни за самоличност:</strong> имена, предоставени доброволно чрез контактни и кетъринг форми.</li>
                <li><strong className="text-brand-ink">Данни за контакт:</strong> имейл адрес и телефонен номер, въведени от вас в нашите форми.</li>
                <li><strong className="text-brand-ink">Съдържание на съобщения:</strong> текстът на вашите запитвания, коментари и специални изисквания, изпратени чрез контактните ни форми.</li>
                <li><strong className="text-brand-ink">Технически данни:</strong> IP адрес, тип и версия на браузъра, операционна система, страниците, които посещавате, и времето на посещение. Тези данни се събират автоматично само за целите на сигурността и правилното функциониране на сайта.</li>
              </ul>
              <p className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-800 text-xs">
                <strong>Важно:</strong> Не събираме данни за разплащателни карти, банкови сметки или друга финансова информация. Нашият сайт не обработва онлайн плащания.
              </p>
            </Section>

            <Section id="legal-basis" title="3. Правно основание за обработката">
              <p>Обработваме личните ви данни само при наличие на законово основание по чл. 6 от GDPR:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-brand-ink">Изпълнение на договор (чл. 6, ал. 1, б. „б"):</strong> когато обработката е необходима за обработване на резервация или кетъринг запитване.</li>
                <li><strong className="text-brand-ink">Съгласие (чл. 6, ал. 1, б. „а"):</strong> когато сте се съгласили да получавате маркетингови съобщения или сте попълнили доброволно контактна форма.</li>
                <li><strong className="text-brand-ink">Легитимен интерес (чл. 6, ал. 1, б. „е"):</strong> за подобряване на уебсайта, осигуряване на неговата сигурност и предотвратяване на злоупотреби.</li>
                <li><strong className="text-brand-ink">Законово задължение (чл. 6, ал. 1, б. „в"):</strong> когато законодателството на ЕС или България изисква съхранение или предоставяне на данни.</li>
              </ul>
            </Section>

            <Section id="how-we-use" title="4. Цели на обработката">
              <p>Вашите данни се използват единствено за следните цели:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Обработване и потвърждение на резервации и кетъринг запитвания;</li>
                <li>Отговор на въпроси, изпратени чрез контактната форма;</li>
                <li>Подобряване на функционалността и потребителското изживяване на уебсайта;</li>
                <li>Осигуряване на техническата сигурност на системата;</li>
                <li>Спазване на приложимото законодателство.</li>
              </ul>
              <p>Не продаваме, не отдаваме под наем и не споделяме личните ви данни с трети страни за рекламни или маркетингови цели.</p>
            </Section>

            <Section id="retention" title="5. Срок на съхранение на данните">
              <p>Съхраняваме личните ви данни само за срока, необходим за постигане на целите, за които са събрани:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-brand-ink">Резервации и кетъринг запитвания:</strong> до 12 месеца след датата на събитието или запитването, освен ако не е необходимо по-дълго съхранение за правни цели.</li>
                <li><strong className="text-brand-ink">Контактни съобщения:</strong> до 6 месеца след окончателния отговор.</li>
                <li><strong className="text-brand-ink">Технически данни (лог файлове):</strong> до 90 дни.</li>
                <li><strong className="text-brand-ink">Счетоводни и фискални данни:</strong> съгласно изискванията на българското счетоводно законодателство (до 10 години).</li>
              </ul>
            </Section>

            <Section id="third-parties" title="6. Трети страни и обработватели">
              <p>Уебсайтът интегрира услуги на следните трети страни, всяка от които има собствена политика за поверителност:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-brand-ink">Google Maps (Google LLC):</strong> вградени карти за показване на местоположенията ни. При зареждане на картите Google може да събира технически данни. Вж. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">Политика за поверителност на Google</a>.</li>
                <li><strong className="text-brand-ink">Wolt / DoorDash:</strong> връзките за доставка отвеждат към платформата Wolt, която обработва поръчките и плащанията. Ние не получаваме лични данни от тези взаимодействия.</li>
                <li><strong className="text-brand-ink">Takeaway.com (Just Eat Takeaway):</strong> аналогично на горното — Takeaway.com обработва самостоятелно данните при поръчки.</li>
                <li><strong className="text-brand-ink">jobs.bg:</strong> Препратките към jobs.bg са само за кандидатстване за работа. Обработката на кандидатури се извършва от jobs.bg съгласно тяхната политика.</li>
              </ul>
              <p>Не прехвърляме лични данни извън Европейското икономическо пространство (ЕИП), освен ако не са налице подходящи гаранции съгласно Глава V от GDPR.</p>
            </Section>

            <Section id="cookies" title={'7. \u201EБисквитки\u201C (Cookies)'}>
              <p>Уебсайтът може да използва технически необходими „бисквитки" за правилното си функциониране (например за запомняне на избрания от вас език). Не използваме „бисквитки" за проследяване или рекламни цели.</p>
              <p>Можете да контролирате използването на „бисквитки" чрез настройките на своя браузър. Деактивирането на необходимите „бисквитки" може да засегне функционалността на сайта.</p>
            </Section>

            <Section id="rights" title="8. Вашите права по GDPR">
              <p>Съгласно GDPR имате следните права по отношение на личните ви данни:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-brand-ink">Право на достъп (чл. 15):</strong> да получите копие от данните, които обработваме за вас.</li>
                <li><strong className="text-brand-ink">Право на коригиране (чл. 16):</strong> да поискате поправка на неточни или непълни данни.</li>
                <li><strong className="text-brand-ink">Право на изтриване (чл. 17):</strong> „правото да бъдете забравени" при определени условия.</li>
                <li><strong className="text-brand-ink">Право на ограничаване на обработката (чл. 18):</strong> при оспорване на точността или законосъобразността на обработката.</li>
                <li><strong className="text-brand-ink">Право на преносимост (чл. 20):</strong> да получите данните си в структуриран, машинно четим формат.</li>
                <li><strong className="text-brand-ink">Право на възражение (чл. 21):</strong> да възразите срещу обработка въз основа на легитимен интерес.</li>
                <li><strong className="text-brand-ink">Право на оттегляне на съгласие:</strong> по всяко време, без да се засяга законосъобразността на обработката преди оттеглянето.</li>
              </ul>
              <p>За упражняване на правата си изпратете писмено искане на: <a href="mailto:vetrilo2005@abv.bg" className="text-brand-accent hover:underline">vetrilo2005@abv.bg</a>. Ще отговорим в срок от 30 дни.</p>
            </Section>

            <Section id="supervisory" title="9. Право на жалба до надзорен орган">
              <p>Имате право да подадете жалба до <strong className="text-brand-ink">Комисията за защита на личните данни (КЗЛД)</strong>:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Адрес: бул. „Проф. Цветан Лазаров" № 2, 1592 София</li>
                <li>Уебсайт: <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">www.cpdp.bg</a></li>
                <li>Телефон: 02 915 35 18</li>
              </ul>
              <p>Насърчаваме ви да се свържете първо с нас преди подаване на жалба, за да разрешим въпроса заедно.</p>
            </Section>

            <Section id="security" title="10. Сигурност на данните">
              <p>Прилагаме технически и организационни мерки за защита на личните ви данни от неоторизиран достъп, промяна, разкриване или унищожаване. Въпреки това, нито един метод на предаване по интернет или метод за електронно съхранение не е 100% сигурен и не можем да гарантираме абсолютна сигурност.</p>
              <p>При евентуално нарушение на сигурността на данните, което представлява риск за вашите права, ще уведомим КЗЛД в рамките на 72 часа и вас — при наличие на висок риск за вашите права и свободи.</p>
            </Section>

            <Section id="changes" title="11. Промени в политиката">
              <p>Можем да актуализираме тази политика периодично. При съществени промени ще актуализираме датата в горната част на документа. Препоръчваме ви периодично да преглеждате тази страница.</p>
            </Section>

            <Section id="contact" title="12. Контакт">
              <p>За всякакви въпроси относно тази политика или обработката на вашите лични данни, свържете се с нас:</p>
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
            <Shield size={28} className="text-brand-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif mb-3">Privacy Policy</h1>
          <p className="text-white/50 text-sm">Last updated: {UPDATED_EN}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl">
        {/* Intro box */}
        <div className="bg-brand-bg border-l-4 border-brand-accent rounded-xl p-6 mb-10 text-sm text-brand-muted leading-relaxed">
          Pizza Vetrilo is committed to protecting your personal data in accordance with <strong className="text-brand-ink">Regulation (EU) 2016/679 (GDPR)</strong> and the Bulgarian Personal Data Protection Act. Please read this document carefully to understand how we collect, use, and protect your information.
        </div>

        <div className="divide-y divide-gray-100">

          <Section id="controller" title="1. Data Controller">
            <p><strong className="text-brand-ink">Pizza Vetrilo</strong> is the data controller for personal data collected through this website.</p>
            <p>Address: Borovo District, Solun Street, opp. Block 43, Sofia, Republic of Bulgaria</p>
            <p>Email for data-related inquiries: <a href="mailto:vetrilo2005@abv.bg" className="text-brand-accent hover:underline">vetrilo2005@abv.bg</a></p>
          </Section>

          <Section id="data-collected" title="2. Data We Collect">
            <p>We only collect data necessary for the specific purposes described below. Categories of personal data include:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-brand-ink">Identity Data:</strong> names voluntarily provided through contact and catering forms.</li>
              <li><strong className="text-brand-ink">Contact Data:</strong> email address and telephone number entered in our forms.</li>
              <li><strong className="text-brand-ink">Message Content:</strong> the text of your inquiries, comments, and special requirements submitted via our forms.</li>
              <li><strong className="text-brand-ink">Technical Data:</strong> IP address, browser type and version, operating system, pages visited and visit time. Collected automatically solely for security and proper site operation.</li>
            </ul>
            <p className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-800 text-xs">
              <strong>Important:</strong> We do not collect payment card numbers, bank account details, or any financial information. This website does not process online payments.
            </p>
          </Section>

          <Section id="legal-basis" title="3. Legal Basis for Processing">
            <p>We process your personal data only when a lawful basis under Art. 6 GDPR applies:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-brand-ink">Performance of a contract (Art. 6(1)(b)):</strong> where processing is necessary to handle a reservation or catering inquiry.</li>
              <li><strong className="text-brand-ink">Consent (Art. 6(1)(a)):</strong> where you have agreed to receive marketing communications or voluntarily submitted a contact form.</li>
              <li><strong className="text-brand-ink">Legitimate interests (Art. 6(1)(f)):</strong> to improve the website, ensure its security, and prevent abuse.</li>
              <li><strong className="text-brand-ink">Legal obligation (Art. 6(1)(c)):</strong> where EU or Bulgarian law requires the retention or disclosure of data.</li>
            </ul>
          </Section>

          <Section id="how-we-use" title="4. Purposes of Processing">
            <p>Your data is used solely for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Processing and confirming reservations and catering inquiries;</li>
              <li>Responding to questions submitted through the contact form;</li>
              <li>Improving the functionality and user experience of the website;</li>
              <li>Ensuring the technical security of the system;</li>
              <li>Complying with applicable legislation.</li>
            </ul>
            <p>We do not sell, rent, or share your personal data with third parties for advertising or marketing purposes.</p>
          </Section>

          <Section id="retention" title="5. Data Retention">
            <p>We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-brand-ink">Reservations and catering inquiries:</strong> up to 12 months after the event or inquiry date, unless longer retention is required for legal purposes.</li>
              <li><strong className="text-brand-ink">Contact messages:</strong> up to 6 months after the final response.</li>
              <li><strong className="text-brand-ink">Technical data (log files):</strong> up to 90 days.</li>
              <li><strong className="text-brand-ink">Accounting and fiscal data:</strong> in accordance with Bulgarian accounting legislation (up to 10 years).</li>
            </ul>
          </Section>

          <Section id="third-parties" title="6. Third Parties & Processors">
            <p>The website integrates services from the following third parties, each with their own privacy policy:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-brand-ink">Google Maps (Google LLC):</strong> embedded maps to display our locations. When maps load, Google may collect technical data. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">Google's Privacy Policy</a>.</li>
              <li><strong className="text-brand-ink">Wolt / DoorDash:</strong> delivery links redirect to the Wolt platform, which independently processes orders and payments. We do not receive personal data from these interactions.</li>
              <li><strong className="text-brand-ink">Takeaway.com (Just Eat Takeaway):</strong> similarly, Takeaway.com independently processes data for orders placed through their platform.</li>
              <li><strong className="text-brand-ink">jobs.bg:</strong> links to jobs.bg are solely for job applications. Application processing is handled by jobs.bg under their own policy.</li>
            </ul>
            <p>We do not transfer personal data outside the European Economic Area (EEA) unless appropriate safeguards under Chapter V GDPR are in place.</p>
          </Section>

          <Section id="cookies" title="7. Cookies">
            <p>The website may use technically necessary cookies for its proper operation (for example, to remember your selected language). We do not use tracking or advertising cookies.</p>
            <p>You can control cookie use through your browser settings. Disabling necessary cookies may affect site functionality.</p>
          </Section>

          <Section id="rights" title="8. Your Rights under GDPR">
            <p>Under GDPR you have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-brand-ink">Right of access (Art. 15):</strong> to obtain a copy of the data we process about you.</li>
              <li><strong className="text-brand-ink">Right to rectification (Art. 16):</strong> to request correction of inaccurate or incomplete data.</li>
              <li><strong className="text-brand-ink">Right to erasure (Art. 17):</strong> the "right to be forgotten" under certain conditions.</li>
              <li><strong className="text-brand-ink">Right to restriction of processing (Art. 18):</strong> where accuracy or lawfulness of processing is contested.</li>
              <li><strong className="text-brand-ink">Right to data portability (Art. 20):</strong> to receive your data in a structured, machine-readable format.</li>
              <li><strong className="text-brand-ink">Right to object (Art. 21):</strong> to object to processing based on legitimate interests.</li>
              <li><strong className="text-brand-ink">Right to withdraw consent:</strong> at any time, without affecting the lawfulness of processing before withdrawal.</li>
            </ul>
            <p>To exercise your rights, send a written request to: <a href="mailto:vetrilo2005@abv.bg" className="text-brand-accent hover:underline">vetrilo2005@abv.bg</a>. We will respond within 30 days.</p>
          </Section>

          <Section id="supervisory" title="9. Right to Lodge a Complaint">
            <p>You have the right to lodge a complaint with the <strong className="text-brand-ink">Commission for Personal Data Protection (CPDP)</strong>, the Bulgarian supervisory authority:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Address: 2 Prof. Tsvetan Lazarov Blvd., 1592 Sofia, Bulgaria</li>
              <li>Website: <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">www.cpdp.bg</a></li>
              <li>Phone: +359 2 915 35 18</li>
            </ul>
            <p>We encourage you to contact us first before lodging a complaint so we can resolve the matter together.</p>
          </Section>

          <Section id="security" title="10. Data Security">
            <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
            <p>In the event of a data breach that poses a risk to your rights, we will notify the CPDP within 72 hours and inform you directly where there is a high risk to your rights and freedoms.</p>
          </Section>

          <Section id="changes" title="11. Changes to This Policy">
            <p>We may update this policy periodically. For material changes we will update the date at the top of this document. We recommend checking this page periodically.</p>
          </Section>

          <Section id="contact" title="12. Contact">
            <p>For any questions about this policy or the processing of your personal data, please contact us:</p>
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
