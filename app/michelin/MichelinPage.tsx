'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { michelinEdition, michelinRestaurants, michelinReviewedAt, michelinSource, type MichelinLocale } from '../michelin-data';
import './michelin.css';

const copy = {
  zh: {
    back: '餐厅雷达', life: '萨尔生活', language: '语言', eyebrow: 'SAARLAND · MICHELIN GUIDE 2026',
    title: '为一顿好饭，专程而去。', intro: '从萨尔布吕肯到萨尔兰各地，8 家米其林星级餐厅的菜单、价格与订位指南。',
    venues: '家星级餐厅', stars: '颗米其林星', local: '家位于 Saarbrücken', reviewed: '核对日期', source: '查看 MICHELIN 2026 名单 ↗',
    search: '搜索餐厅、城市或菜单', region: '地区', all: '萨尔兰全部', nearby: '萨尔兰其他地区', distinction: '星级', allStars: '全部星级',
    star1: '1 星', star2: '2 星', star3: '3 星', results: '家匹配餐厅', menu: '菜单与价格', book: '如何预订', service: '营业时段',
    menuLink: '查看官方菜单 ↗', bookLink: '前往订位', call: '电话', email: '邮件', directions: '路线 ↗', details: '餐厅详细说明 ↗',
    prices: '价格为每人，饮品及加价项目另计，除非另有注明。季节菜单会变化，请以订位时的官方菜单为准。',
    empty: '没有匹配的餐厅。试试其他关键词或筛选条件。', reset: '重置筛选',
    footer: '星级依据 MICHELIN Guide 2026。菜单、价格与订位说明来自餐厅官网，于 2026-09-21 核对。空位与最终条款请在餐厅订位系统确认。此目录独立整理，与 MICHELIN 无隶属关系。',
  },
  en: {
    back: 'Food radar', life: 'Saar Life', language: 'Language', eyebrow: 'SAARLAND · MICHELIN GUIDE 2026',
    title: 'A table worth the trip.', intro: 'Eight Michelin-starred restaurants across Saarland, with menus, published prices and a clear route to your reservation.',
    venues: 'starred restaurants', stars: 'Michelin stars', local: 'in Saarbrücken', reviewed: 'Reviewed', source: 'View the MICHELIN 2026 list ↗',
    search: 'Search restaurant, town or menu', region: 'Area', all: 'All Saarland', nearby: 'Elsewhere in Saarland', distinction: 'Distinction', allStars: 'All stars',
    star1: '1 star', star2: '2 stars', star3: '3 stars', results: 'restaurants found', menu: 'Menu & prices', book: 'How to book', service: 'Service times',
    menuLink: 'Official menu ↗', bookLink: 'Book a table', call: 'Call', email: 'Email', directions: 'Directions ↗', details: 'Restaurant details ↗',
    prices: 'Prices are per person, excluding drinks and supplements unless stated. Seasonal menus change; check the official menu when booking.',
    empty: 'No restaurants match. Try another search or filter.', reset: 'Reset filters',
    footer: 'Distinctions follow the MICHELIN Guide 2026. Menus, prices and booking details come from restaurant websites, checked 21 September 2026. Confirm availability and final terms in the venue’s booking system. An independently compiled catalog, unaffiliated with MICHELIN.',
  },
  de: {
    back: 'Restaurant-Radar', life: 'Saar-Leben', language: 'Sprache', eyebrow: 'SAARLAND · MICHELIN GUIDE 2026',
    title: 'Ein Tisch, der die Reise lohnt.', intro: 'Acht Sternerestaurants im Saarland: Menüs, veröffentlichte Preise und alles Wichtige für die Reservierung.',
    venues: 'Sternerestaurants', stars: 'Michelin-Sterne', local: 'in Saarbrücken', reviewed: 'Geprüft', source: 'MICHELIN-Liste 2026 ansehen ↗',
    search: 'Restaurant, Ort oder Menü suchen', region: 'Region', all: 'Ganzes Saarland', nearby: 'Übriges Saarland', distinction: 'Auszeichnung', allStars: 'Alle Sterne',
    star1: '1 Stern', star2: '2 Sterne', star3: '3 Sterne', results: 'Restaurants gefunden', menu: 'Menü & Preise', book: 'So reservieren Sie', service: 'Servicezeiten',
    menuLink: 'Offizielle Karte ↗', bookLink: 'Tisch reservieren', call: 'Anrufen', email: 'E-Mail', directions: 'Route ↗', details: 'Restaurant-Details ↗',
    prices: 'Preise pro Person, ohne Getränke und Zuschläge, sofern nicht anders angegeben. Saisonale Menüs wechseln; aktuelle Karte bei der Buchung prüfen.',
    empty: 'Keine passenden Restaurants. Suche oder Filter ändern.', reset: 'Filter zurücksetzen',
    footer: 'Auszeichnungen laut MICHELIN Guide 2026. Menüs, Preise und Buchungsdetails stammen von den Restaurant-Websites, geprüft am 21. September 2026. Verfügbarkeit und endgültige Bedingungen im Buchungssystem prüfen. Unabhängig zusammengestellter Katalog, nicht mit MICHELIN verbunden.',
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
    const matchesArea = area === 'all' || (area === 'local' ? restaurant.city === 'Saarbrücken' : restaurant.city !== 'Saarbrücken');
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
        <a className="michelin-source" href={michelinSource} target="_blank" rel="noreferrer">{c.source}</a>
        <p className="michelin-reviewed">{c.reviewed} <time dateTime={michelinReviewedAt}>{michelinReviewedAt}</time></p>
      </div>
      <div className="michelin-hero-aside">
        <div className="michelin-star-art" aria-hidden="true">✳<span>✳</span>✳</div>
        <dl className="michelin-stats">
          <div><dt>{c.venues}</dt><dd>{michelinRestaurants.length}</dd></div>
          <div><dt>{c.stars}</dt><dd>{michelinRestaurants.reduce((total, item) => total + item.stars, 0)}</dd></div>
          <div><dt>{c.local}</dt><dd>{michelinRestaurants.filter(item => item.city === 'Saarbrücken').length}</dd></div>
        </dl>
      </div>
    </header>

    <section className="michelin-catalog" aria-label={c.venues}>
      <div className="michelin-filters">
        <input type="search" aria-label={c.search} placeholder={c.search} value={query} onChange={event => setQuery(event.target.value)} />
        <label>{c.region}<select value={area} onChange={event => setArea(event.target.value)}><option value="all">{c.all}</option><option value="local">Saarbrücken</option><option value="region">{c.nearby}</option></select></label>
        <label>{c.distinction}<select value={stars} onChange={event => setStars(event.target.value)}><option value="all">{c.allStars}</option><option value="3">{c.star3}</option><option value="2">{c.star2}</option><option value="1">{c.star1}</option></select></label>
        {(query || area !== 'all' || stars !== 'all') && <button className="michelin-reset" onClick={reset}>{c.reset}</button>}
      </div>
      <div className="michelin-catalog-note"><span role="status">{shown.length} {c.results}</span><p>{c.prices}</p></div>
      <div className="michelin-grid">
        {shown.map(restaurant => <article className="michelin-card" id={restaurant.id} key={restaurant.id}>
          <header className="michelin-card-header">
            <div className="michelin-card-topline"><span className="michelin-badge"><span aria-hidden="true">{'★'.repeat(restaurant.stars)}</span> MICHELIN {michelinEdition} · {restaurant.stars === 1 ? c.star1 : restaurant.stars === 2 ? c.star2 : c.star3}</span><span>{restaurant.city}</span></div>
            <h2>{restaurant.name}</h2><p>{restaurant.cuisine[locale]}</p>
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
    <footer className="michelin-footer"><Link href="/">SAAR BITES</Link><p>{c.footer}</p><a href={michelinSource} target="_blank" rel="noreferrer">MICHELIN Guide {michelinEdition} ↗</a></footer>
  </main>;
}
