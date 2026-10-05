'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { michelinEdition, michelinFranceSource, michelinRestaurants, michelinReviewedAt, michelinSource, type MichelinLocale } from '../michelin-data';
import './michelin.css';

const copy = {
  zh: {
    back: '餐厅雷达', life: '萨尔生活', language: '语言', eyebrow: 'SAARLAND + NEARBY FRANCE · MICHELIN 2026',
    title: '为一顿好饭，专程而去。', intro: '萨尔兰 8 家星级餐厅，加上邻近法国的 5 家精选：菜单、价格与订位指南。',
    venues: '家星级餐厅', stars: '颗米其林星', local: '家位于邻近法国', reviewed: '最新核对', source: '德国 2026 名单 ↗', franceSource: '法国 2026 名单 ↗',
    search: '搜索餐厅、城市或菜单', region: '地区', all: '全部地区', saarland: '萨尔兰全部', nearby: '萨尔兰其他地区', france: '邻近法国', distinction: '星级', allStars: '全部星级',
    star1: '1 星', star2: '2 星', star3: '3 星', results: '家匹配餐厅', menu: '菜单与价格', book: '如何预订', service: '营业时段',
    menuLink: '查看官方菜单 ↗', bookLink: '前往订位', call: '电话', email: '邮件', directions: '路线 ↗', details: '餐厅详细说明 ↗', pick: '为什么值得去',
    prices: '价格为每人，饮品及加价项目另计，除非另有注明。季节菜单会变化，请以订位时的官方菜单为准。',
    empty: '没有匹配的餐厅。试试其他关键词或筛选条件。', reset: '重置筛选',
    footer: '星级依据德国及法国 MICHELIN Guide 2026。萨尔兰资料于 2026-09-21 核对，新增法国餐厅资料于 2026-10-05 核对。菜单与价格会变化，请在餐厅官网确认。此目录独立整理，与 MICHELIN 无隶属关系。',
  },
  en: {
    back: 'Food radar', life: 'Saar Life', language: 'Language', eyebrow: 'SAARLAND + NEARBY FRANCE · MICHELIN 2026',
    title: 'A table worth the trip.', intro: 'Eight Michelin-starred restaurants in Saarland, plus five selected tables in nearby France, with menus, prices and booking details.',
    venues: 'starred restaurants', stars: 'Michelin stars', local: 'in nearby France', reviewed: 'Latest review', source: 'Germany 2026 list ↗', franceSource: 'France 2026 list ↗',
    search: 'Search restaurant, town or menu', region: 'Area', all: 'All areas', saarland: 'All Saarland', nearby: 'Elsewhere in Saarland', france: 'Nearby France', distinction: 'Distinction', allStars: 'All stars',
    star1: '1 star', star2: '2 stars', star3: '3 stars', results: 'restaurants found', menu: 'Menu & prices', book: 'How to book', service: 'Service times',
    menuLink: 'Official menu ↗', bookLink: 'Book a table', call: 'Call', email: 'Email', directions: 'Directions ↗', details: 'Restaurant details ↗', pick: 'Why go',
    prices: 'Prices are per person, excluding drinks and supplements unless stated. Seasonal menus change; check the official menu when booking.',
    empty: 'No restaurants match. Try another search or filter.', reset: 'Reset filters',
    footer: 'Distinctions follow the MICHELIN Guides Germany and France 2026. Saarland details were checked 21 September 2026; the French additions were checked 5 October 2026. Confirm changing menus and prices with each venue. Independently compiled; unaffiliated with MICHELIN.',
  },
  de: {
    back: 'Restaurant-Radar', life: 'Saar-Leben', language: 'Sprache', eyebrow: 'SAARLAND + FRANKREICH IN DER NÄHE · MICHELIN 2026',
    title: 'Ein Tisch, der die Reise lohnt.', intro: 'Acht Sternerestaurants im Saarland und fünf ausgewählte Adressen im nahen Frankreich: Menüs, Preise und Reservierung.',
    venues: 'Sternerestaurants', stars: 'Michelin-Sterne', local: 'im nahen Frankreich', reviewed: 'Zuletzt geprüft', source: 'Deutschland 2026 ↗', franceSource: 'Frankreich 2026 ↗',
    search: 'Restaurant, Ort oder Menü suchen', region: 'Region', all: 'Alle Regionen', saarland: 'Ganzes Saarland', nearby: 'Übriges Saarland', france: 'Frankreich in der Nähe', distinction: 'Auszeichnung', allStars: 'Alle Sterne',
    star1: '1 Stern', star2: '2 Sterne', star3: '3 Sterne', results: 'Restaurants gefunden', menu: 'Menü & Preise', book: 'So reservieren Sie', service: 'Servicezeiten',
    menuLink: 'Offizielle Karte ↗', bookLink: 'Tisch reservieren', call: 'Anrufen', email: 'E-Mail', directions: 'Route ↗', details: 'Restaurant-Details ↗', pick: 'Warum hinfahren',
    prices: 'Preise pro Person, ohne Getränke und Zuschläge, sofern nicht anders angegeben. Saisonale Menüs wechseln; aktuelle Karte bei der Buchung prüfen.',
    empty: 'Keine passenden Restaurants. Suche oder Filter ändern.', reset: 'Filter zurücksetzen',
    footer: 'Auszeichnungen laut MICHELIN Guides Deutschland und Frankreich 2026. Saarland-Daten wurden am 21. September 2026 geprüft; die französischen Ergänzungen am 5. Oktober 2026. Wechselnde Menüs und Preise beim Restaurant prüfen. Unabhängiger Katalog ohne Verbindung zu MICHELIN.',
  },
};

export default function MichelinPage() {
  const [locale, setLocale] = useState<MichelinLocale>('zh');
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('all');
  const [stars, setStars] = useState('all');
  const c = copy[locale];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = localStorage.getItem('saar-bites-language');
      if (saved === 'en' || saved === 'de') setLocale(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => { document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale; }, [locale]);

  const normalized = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const shown = michelinRestaurants.filter(restaurant => {
    const matchesArea = area === 'all' || (area === 'france' ? restaurant.region === 'france' : area === 'saarland' ? !restaurant.region : area === 'local' ? restaurant.city === 'Saarbrücken' : !restaurant.region && restaurant.city !== 'Saarbrücken');
    const text = `${restaurant.name} ${restaurant.city} ${restaurant.address} ${restaurant.cuisine[locale]} ${restaurant.menuNote[locale]} ${restaurant.menu.map(item => item.label[locale]).join(' ')}`;
    return matchesArea && (stars === 'all' || restaurant.stars === Number(stars)) && normalized(text).includes(normalized(query.trim()));
  });
  const reset = () => { setQuery(''); setArea('all'); setStars('all'); };

  return <main className="michelin-page">
    <nav className="michelin-nav" aria-label="Main">
      <Link href="/" className="brand"><span className="brand-mark">SB</span><span>SAAR BITES</span></Link>
      <div className="michelin-nav-tools">
        <Link href="/">← {c.back}</Link><Link href="/life">{c.life}</Link>
        <div className="language-switch" role="group" aria-label={c.language}>
          {(['zh', 'en', 'de'] as const).map(language => <button key={language} className={locale === language ? 'active' : ''} aria-pressed={locale === language} onClick={() => { setLocale(language); localStorage.setItem('saar-bites-language', language === 'zh' ? 'mix' : language); }}>{language === 'zh' ? '中文' : language.toUpperCase()}</button>)}
        </div>
      </div>
    </nav>

    <header className="michelin-hero">
      <div className="michelin-hero-copy">
        <p className="eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><p className="michelin-intro">{c.intro}</p>
        <a className="michelin-source" href={michelinSource} target="_blank" rel="noreferrer">{c.source}</a>{' · '}<a className="michelin-source" href={michelinFranceSource} target="_blank" rel="noreferrer">{c.franceSource}</a>
        <p className="michelin-reviewed">{c.reviewed} <time dateTime={michelinReviewedAt}>{michelinReviewedAt}</time></p>
      </div>
      <div className="michelin-hero-aside">
        <div className="michelin-star-art" aria-hidden="true">✳<span>✳</span>✳</div>
        <dl className="michelin-stats">
          <div><dt>{c.venues}</dt><dd>{michelinRestaurants.length}</dd></div>
          <div><dt>{c.stars}</dt><dd>{michelinRestaurants.reduce((total, item) => total + item.stars, 0)}</dd></div>
          <div><dt>{c.local}</dt><dd>{michelinRestaurants.filter(item => item.region === 'france').length}</dd></div>
        </dl>
      </div>
    </header>

    <section className="michelin-catalog" aria-label={c.venues}>
      <div className="michelin-filters">
        <input type="search" aria-label={c.search} placeholder={c.search} value={query} onChange={event => setQuery(event.target.value)} />
        <label>{c.region}<select value={area} onChange={event => setArea(event.target.value)}><option value="all">{c.all}</option><option value="saarland">{c.saarland}</option><option value="local">Saarbrücken</option><option value="region">{c.nearby}</option><option value="france">{c.france}</option></select></label>
        <label>{c.distinction}<select value={stars} onChange={event => setStars(event.target.value)}><option value="all">{c.allStars}</option><option value="3">{c.star3}</option><option value="2">{c.star2}</option><option value="1">{c.star1}</option></select></label>
        {(query || area !== 'all' || stars !== 'all') && <button className="michelin-reset" onClick={reset}>{c.reset}</button>}
      </div>
      <div className="michelin-catalog-note"><span role="status">{shown.length} {c.results}</span><p>{c.prices}</p></div>
      <div className="michelin-grid">
        {shown.map(restaurant => <article className="michelin-card" id={restaurant.id} key={restaurant.id}>
          <header className="michelin-card-header">
            <div className="michelin-card-topline"><span className="michelin-badge"><span aria-hidden="true">{'★'.repeat(restaurant.stars)}</span> MICHELIN {michelinEdition} · {restaurant.stars === 1 ? c.star1 : restaurant.stars === 2 ? c.star2 : c.star3}</span><span>{restaurant.city}{restaurant.region === 'france' ? ' · France' : ''}</span></div>
            <h2>{restaurant.name}</h2><p>{restaurant.cuisine[locale]}</p>
            {restaurant.highlight && <p className="michelin-highlight"><strong>{c.pick}</strong> {restaurant.highlight[locale]}</p>}
            <address>{restaurant.address}</address>
          </header>
          <div className="michelin-card-body">
            <section className="michelin-menu" aria-labelledby={`${restaurant.id}-menu`}>
              <h3 id={`${restaurant.id}-menu`}>{c.menu}</h3>
              {restaurant.menu.length > 0 && <dl>{restaurant.menu.map(item => <div key={item.label.en}><dt>{item.label[locale]}</dt><dd>{item.price}</dd></div>)}</dl>}
              <p>{restaurant.menuNote[locale]}</p><a className="michelin-text-link" href={restaurant.menuUrl} target="_blank" rel="noreferrer">{c.menuLink}</a>
            </section>
            <section className="michelin-booking" aria-labelledby={`${restaurant.id}-booking`}>
              <h3 id={`${restaurant.id}-booking`}>{c.book}</h3><p>{restaurant.booking[locale]}</p>
              <div className="michelin-contact"><a href={`tel:${restaurant.phone.replace(/\s/g, '')}`}>{c.call}: {restaurant.phone}</a>{restaurant.email && <a href={`mailto:${restaurant.email}`}>{c.email}: {restaurant.email}</a>}</div>
            </section>
            <details className="michelin-service"><summary>{c.service}</summary><p>{restaurant.service[locale]}</p>{restaurant.notice && <p className="michelin-notice">{restaurant.notice[locale]}</p>}{restaurant.policyUrl && <a className="michelin-text-link" href={restaurant.policyUrl} target="_blank" rel="noreferrer">{c.details}</a>}</details>
            <div className="michelin-card-actions"><a className="michelin-book-button" href={restaurant.bookingUrl} target="_blank" rel="noreferrer">{c.bookLink}<span aria-hidden="true">↗</span></a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${restaurant.name} ${restaurant.address}`)}`} target="_blank" rel="noreferrer">{c.directions}</a></div>
          </div>
        </article>)}
      </div>
      {shown.length === 0 && <div className="michelin-empty"><p>{c.empty}</p><button onClick={reset}>{c.reset}</button></div>}
    </section>
    <footer className="michelin-footer"><Link href="/">SAAR BITES</Link><p>{c.footer}</p><a href={michelinSource} target="_blank" rel="noreferrer">MICHELIN Germany {michelinEdition} ↗</a><a href={michelinFranceSource} target="_blank" rel="noreferrer">MICHELIN France {michelinEdition} ↗</a></footer>
  </main>;
}
