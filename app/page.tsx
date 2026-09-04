'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { mapImages, mapUrl, newsletters, openingNews, places, type Place } from './data';
import { newsletterTranslations, openingTranslations, placeTranslations, ui, weekdays, type Lang } from './i18n';
import MapView from './MapView';

type Status = { state: 'open' | 'closed' | 'unknown'; label: string; detail: string; closeIn?: number; openIn?: number; opensAt?: string };
type DiceScope = 'open' | 'restaurant' | 'cafe' | 'filtered' | 'all';
const weekdayIndex: Record<string, number> = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 };

function clockParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone:'Europe/Berlin', weekday:'short', hour:'2-digit', minute:'2-digit', hourCycle:'h23' }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? '0';
  return { day: weekdayIndex[value('weekday')] ?? 0, minute: Number(value('hour')) * 60 + Number(value('minute')) };
}

function toMinute(time: string) { const [h,m] = time.split(':').map(Number); return h * 60 + m; }
function showTime(time: string) { const [h,m] = time.split(':').map(Number); return `${String(h % 24).padStart(2,'0')}:${String(m).padStart(2,'0')}`; }
function showWait(minutes: number, lang: Lang) {
  const hours = Math.floor(minutes / 60), rest = minutes % 60;
  if (lang === 'mix' || lang === 'zh') return hours ? `${hours}小时${rest ? `${rest}分钟` : ''}` : `${rest}分钟`;
  if (lang === 'de') return hours ? `${hours} Std.${rest ? ` ${rest} Min.` : ''}` : `${rest} Min.`;
  return hours ? `${hours} ${hours === 1 ? 'hour' : 'hours'}${rest ? ` ${rest} min` : ''}` : `${rest} min`;
}

function cuisineTags(place: Place) {
  const text = `${place.name} ${place.category}`.toLowerCase();
  const tags: string[] = [];
  if (/中国|chinese/.test(text)) tags.push('chinese');
  else if (/泰国|亚洲|柬埔寨|越南|日韩|印尼|sushi|japanese|korea/.test(text)) tags.push('asian');
  if (/土耳其|döner|mezze|西班牙|tapas|falafel/.test(text)) tags.push('mediterranean');
  if (/萨尔兰|德国|ratskeller/.test(text)) tags.push('german');
  if (place.group === 'cafe' || /咖啡|café|brunch|早餐|bistro/.test(text)) tags.push('cafeBrunch');
  if (place.group === 'bakery' || place.group === 'dessert' || /烘焙|甜点|面包|冰淇淋|pâtisserie/.test(text)) tags.push('sweets');
  if (/意大利|pasta|gelato/.test(text)) tags.push('italian');
  if (/烧肉|牛排|grill|bbq|steak/.test(text)) tags.push('grill');
  if (/环球|融合|国际|fusion|all-you-can-eat/.test(text)) tags.push('global');
  return tags;
}

function getStatus(place: Place, date: Date | null, lang: Lang): Status {
  const c = ui[lang];
  if (!date || !place.schedule) return { state:'unknown', label:c.unknown, detail:c.checkMaps };
  const { day, minute } = clockParts(date);
  const today = place.schedule[day] ?? [];
  for (const [start,end] of today) {
    const s = toMinute(start), e = toMinute(end);
    if (minute >= s && minute < e) return { state:'open', label:c.open, detail:`${showTime(end)} ${c.closes}`, closeIn:e-minute };
  }
  const prev = place.schedule[(day + 6) % 7] ?? [];
  for (const [,end] of prev) {
    const e = toMinute(end);
    if (e > 1440 && minute < e - 1440) return { state:'open', label:c.open, detail:`${showTime(end)} ${c.closes}`, closeIn:e-1440-minute };
  }
  for (let offset=0; offset<8; offset++) {
    const nextDay = (day + offset) % 7;
    for (const [start] of place.schedule[nextDay] ?? []) {
      const s = toMinute(start);
      if (offset > 0 || s > minute) return { state:'closed', label:c.closed, detail:`${offset === 0 ? c.today : weekdays[lang][nextDay]} ${showTime(start)} ${c.opens}`, openIn:offset * 1440 + s - minute, opensAt:showTime(start) };
    }
  }
  return { state:'closed', label:c.closed, detail:c.noHours };
}

export default function Home() {
  const [now,setNow] = useState<Date | null>(null);
  const [query,setQuery] = useState('');
  const [filter,setFilter] = useState('all');
  const [openOnly,setOpenOnly] = useState(false);
  const [sort,setSort] = useState('smart');
  const [lang,setLang] = useState<Lang>('mix');
  const [cuisine,setCuisine] = useState('all');
  const [selectedDay,setSelectedDay] = useState<number | null>(null);
  const [view,setView] = useState<'list' | 'map'>('list');
  const [searchOpen,setSearchOpen] = useState(false);
  const [activeSuggestion,setActiveSuggestion] = useState(0);
  const [diceScope,setDiceScope] = useState<DiceScope>('open');
  const [dicePlace,setDicePlace] = useState<Place | null>(null);
  const [rolling,setRolling] = useState(false);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem('saar-bites-language') as Lang | null;
    if (saved && ['mix','en','de'].includes(saved)) {
      const timer = window.setTimeout(() => setLang(saved), 0);
      return () => window.clearTimeout(timer);
    }
    else if (saved === 'zh') window.localStorage.setItem('saar-bites-language','mix');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang === 'de' ? 'de' : lang === 'en' ? 'en' : 'zh-CN');
  }, [lang]);

  const chooseLanguage = (next: Lang) => {
    setLang(next);
    window.localStorage.setItem('saar-bites-language',next);
  };

  const t = (key: string) => ui[lang][key];
  const placeCopy = useCallback((place: Place) => lang === 'en' || lang === 'de' ? (placeTranslations[place.name]?.[lang] ?? [place.category,place.menuNote]) : [place.category,place.menuNote], [lang]);
  const categoryFor = useCallback((place: Place) => placeCopy(place)[0], [placeCopy]);
  const sourceCopy = (source: string) => {
    if (lang === 'zh') return source === 'Café' ? '咖啡收藏' : source === 'Starred' ? '星标地点' : source === '推荐补充' ? '补充推荐' : '萨尔布吕肯';
    if (lang === 'en') return source === 'Café' ? 'Café list' : source === 'Starred' ? 'Starred' : source === '推荐补充' ? 'Recommended' : 'Saarbrücken';
    if (lang === 'de') return source === 'Café' ? 'Café-Liste' : source === 'Starred' ? 'Markiert' : source === '推荐补充' ? 'Empfohlen' : 'Saarbrücken';
    return source === '推荐补充' ? '补充推荐' : source;
  };
  const filters = [['all',t('all')],['restaurant',t('restaurant')],['cafe',t('cafe')],['bakery',t('bakery')],['starred',t('starred')]];
  const cuisineFilters = [['all',t('cuisineAll')],['chinese',t('chinese')],['asian',t('asian')],['mediterranean',t('mediterranean')],['german',t('german')],['cafeBrunch',t('cafeBrunch')],['sweets',t('sweets')],['italian',t('italian')],['grill',t('grill')],['global',t('global')]];

  const enriched = useMemo(() => places.map((place) => ({ place, status:getStatus(place,now,lang) })), [now,lang]);
  const openPlaces = enriched.filter(({status}) => status.state === 'open');
  const upcomingPlaces = enriched
    .filter(({place,status}) => ['restaurant','cafe'].includes(place.group) && status.state === 'closed' && (status.openIn ?? Infinity) <= 120)
    .sort((a,b) => (a.status.openIn ?? Infinity) - (b.status.openIn ?? Infinity));
  const recommendations = [...openPlaces].sort((a,b) => {
    const closingPenaltyA = (a.status.closeIn ?? 999) < 45 ? .35 : 0;
    const closingPenaltyB = (b.status.closeIn ?? 999) < 45 ? .35 : 0;
    return (b.place.rating-closingPenaltyB) - (a.place.rating-closingPenaltyA);
  }).slice(0,5);
  const weeklyHours = useMemo(() => Array.from({length:7}, (_,day) => {
    const scheduled = places.filter(place => (place.schedule?.[day]?.length ?? 0) > 0);
    const hours = scheduled.reduce((sum,place) => sum + (place.schedule?.[day] ?? []).reduce((daySum,[start,end]) => daySum + (toMinute(end)-toMinute(start))/60,0),0);
    return { day, hours, venues:scheduled.length };
  }), []);
  const weeklyOrder = [1,2,3,4,5,6,0].map(day => weeklyHours[day]);
  const weeklyMax = Math.max(...weeklyHours.map(item => item.hours),1);
  const todayIndex = now ? clockParts(now).day : -1;

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = enriched.filter(({place,status}) => {
      const localized = placeCopy(place);
      const matchesText = `${place.name} ${place.category} ${localized[0]} ${place.menuNote} ${localized[1]} ${place.address}`.toLowerCase().includes(needle);
      const matchesFilter = filter === 'all' || (filter === 'starred' ? place.sources.includes('Starred') : filter === 'bakery' ? ['bakery','dessert'].includes(place.group) : place.group === filter);
      const matchesCuisine = cuisine === 'all' || cuisineTags(place).includes(cuisine);
      const matchesDay = selectedDay === null || (place.schedule?.[selectedDay]?.length ?? 0) > 0;
      return matchesText && matchesFilter && matchesCuisine && matchesDay && (!openOnly || status.state === 'open');
    });
    return list.sort((a,b) => {
      if (sort === 'rating') return b.place.rating - a.place.rating;
      if (sort === 'reviews') return b.place.reviews - a.place.reviews;
      const order = {open:0,unknown:1,closed:2};
      return order[a.status.state] - order[b.status.state] || b.place.rating - a.place.rating;
    });
  }, [enriched,filter,cuisine,selectedDay,openOnly,query,sort,placeCopy]);

  const suggestions = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    return enriched.filter(({place}) => `${place.name} ${place.category} ${placeCopy(place).join(' ')} ${place.address}`.toLowerCase().includes(needle)).slice(0,6);
  }, [enriched,placeCopy,query]);

  const selectSuggestion = (place: Place) => {
    setQuery(place.name);
    setFilter('all');
    setCuisine('all');
    setSelectedDay(null);
    setOpenOnly(false);
    setSearchOpen(false);
    window.setTimeout(() => document.querySelector('#places')?.scrollIntoView({behavior:'smooth'}), 30);
  };

  const dicePools: Record<DiceScope, Place[]> = {
    open: enriched.filter(({status}) => status.state === 'open').map(({place}) => place),
    restaurant: places.filter((place) => place.group === 'restaurant'),
    cafe: places.filter((place) => place.group === 'cafe'),
    filtered: shown.map(({place}) => place),
    all: places,
  };
  const dicePool = dicePools[diceScope];
  const diceScopes: [DiceScope,string][] = [
    ['open',t('diceOpen')],
    ['restaurant',t('diceRestaurant')],
    ['cafe',t('diceCafe')],
    ['filtered',t('diceFiltered')],
    ['all',t('diceAll')],
  ];
  const diceStatus = dicePlace ? enriched.find(({place}) => place.name === dicePlace.name)?.status : undefined;
  const rollDice = () => {
    if (!dicePool.length || rolling) return;
    setRolling(true);
    let tick = 0;
    const timer = window.setInterval(() => {
      setDicePlace(dicePool[Math.floor(Math.random() * dicePool.length)]);
      tick += 1;
      if (tick >= 10) {
        window.clearInterval(timer);
        const alternatives = dicePool.length > 1 ? dicePool.filter(place => place.name !== dicePlace?.name) : dicePool;
        setDicePlace(alternatives[Math.floor(Math.random() * alternatives.length)]);
        setRolling(false);
      }
    }, 85);
  };

  const timeLocale = lang === 'de' ? 'de-DE' : lang === 'en' ? 'en-GB' : 'zh-CN';
  const localTime = now?.toLocaleTimeString(timeLocale,{ timeZone:'Europe/Berlin', hour:'2-digit', minute:'2-digit' }) ?? '--:--';
  const menuUrl = (place: Place) => place.menu ?? place.website ?? mapUrl(place);

  return (
    <main>
      <nav className="nav-shell">
        <a className="brand" href="#top"><span className="brand-mark">SB</span><span>SAAR BITES</span></a>
        <div className="nav-links"><a href="#radar">{t('nowNav')}</a><a href="#dice">{t('diceNav')}</a><a href="#places">{t('savedNav')}</a><a href="#new">{t('newsNav')}</a></div>
        <div className="nav-tools"><div className="language-switch" role="group" aria-label={t('language')}>{([['mix','ZN/EN'],['en','EN'],['de','DE']] as [Lang,string][]).map(([value,label])=><button key={value} className={lang===value?'active':''} onClick={()=>chooseLanguage(value)} aria-pressed={lang===value}>{label}</button>)}</div><div className="nav-meta"><span className="live-dot" />{t('locale')} {localTime}</div></div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{t('heroEyebrow')}</p>
          <div className="search-wrap">
            <label className="search-box"><span>⌕</span><input value={query} onChange={(event)=>{setQuery(event.target.value);setSearchOpen(true);setActiveSuggestion(0);}} onFocus={()=>setSearchOpen(true)} onBlur={()=>window.setTimeout(()=>setSearchOpen(false),140)} onKeyDown={(event)=>{
              if (event.key === 'ArrowDown') { event.preventDefault(); setActiveSuggestion((activeSuggestion+1) % Math.max(suggestions.length,1)); }
              if (event.key === 'ArrowUp') { event.preventDefault(); setActiveSuggestion((activeSuggestion-1+Math.max(suggestions.length,1)) % Math.max(suggestions.length,1)); }
              if (event.key === 'Enter' && suggestions[activeSuggestion]) { event.preventDefault(); selectSuggestion(suggestions[activeSuggestion].place); }
              if (event.key === 'Escape') setSearchOpen(false);
            }} placeholder={t('search')} aria-label={t('search')} role="combobox" aria-expanded={searchOpen && suggestions.length>0} aria-controls="search-suggestions" aria-autocomplete="list" /></label>
            {query && <button className="search-clear" onClick={()=>{setQuery('');setSearchOpen(false);}}>{t('clear')}</button>}
            {searchOpen && query && <div className="suggestion-panel" id="search-suggestions" role="listbox" aria-label={t('suggestions')}>
              {suggestions.map(({place,status},index)=><button key={place.name} className={index===activeSuggestion?'active':''} onMouseDown={(event)=>event.preventDefault()} onClick={()=>selectSuggestion(place)} role="option" aria-selected={index===activeSuggestion}><span><strong>{place.name}</strong><small>{placeCopy(place)[0]} · {place.address}</small></span><b className={status.state}>{status.label}</b></button>)}
              {!suggestions.length && <p>{t('empty')}</p>}
            </div>}
            {query && <div className="search-count">{shown.length} {t('matches')} · <button onClick={()=>document.querySelector('#places')?.scrollIntoView({behavior:'smooth'})}>{t('allSaved')} ↓</button></div>}
          </div>
          <div className="hero-stats"><div><strong>{places.length}</strong><span>{t('savedCount')}</span></div><div><strong>{openPlaces.length}</strong><span>{t('openCount')}</span></div><div><strong>09·01</strong><span>{t('checked')}</span></div></div>
        </div>
        <div className="now-card">
          <div className="now-topline"><span>OPEN-NOW RADAR</span><span className="pulse">● LIVE</span></div>
          <div className="radar-orbit orbit-one"/><div className="radar-orbit orbit-two"/>
          <div className="radar-center"><span>{t('localTime')}</span><strong>{localTime}</strong></div>
          <div className="radar-pin pin-one"><i />{openPlaces.filter(x=>x.place.group==='restaurant').length} {t('restaurants')}</div>
          <div className="radar-pin pin-two"><i />{openPlaces.filter(x=>x.place.group==='cafe').length} {t('cafes')}</div>
          <div className="radar-pin pin-three"><i />{openPlaces.filter(x=>['bakery','dessert'].includes(x.place.group)).length} {t('desserts')}</div>
          <div className="radar-next" aria-live="polite">
            <span>{t('openingSoon')}</span>
            {upcomingPlaces.length ? <div className="radar-next-list">
              {upcomingPlaces.map(({place,status}) => <a href={mapUrl(place)} target="_blank" rel="noreferrer" key={place.name}><strong>{place.name}</strong><small>{t('opensIn')} {showWait(status.openIn ?? 0,lang)} · {status.opensAt}</small></a>)}
            </div> : <small>{t('noOpeningSoon')}</small>}
          </div>
          <p>{t('scheduleNote')}</p>
        </div>
      </section>

      <section className="radar-section" id="radar">
        <div className="radar-heading"><div><p className="eyebrow">{t('rightNow')} · {localTime}</p><h2>{t('worthGoing')}</h2></div><button className={openOnly?'toggle active':'toggle'} onClick={()=>{setOpenOnly(!openOnly);document.querySelector('#places')?.scrollIntoView();}}><span/>{t('openOnly')}</button></div>
        <div className="recommend-grid">
          {recommendations.map(({place,status},index)=><article className="recommend-card" key={place.name}>
            <div className="recommend-number">0{index+1}</div><div className="status open"><span/>{status.label} · {status.detail}</div><h3>{place.name}</h3><p>{placeCopy(place)[0]}</p>
            <div className="recommend-bottom"><span>★ {place.rating} · {place.reviews.toLocaleString(timeLocale)} {t('reviews')}</span><a href={mapUrl(place)} target="_blank" rel="noreferrer">{t('openMap')}</a></div>
          </article>)}
          {!recommendations.length && <p className="empty">{t('noOpen')}</p>}
        </div>
      </section>

      <section className="week-section">
        <div className="week-heading"><div><p className="eyebrow">{t('weekEyebrow')}</p><h2>{t('weekTitle')}</h2></div><p>{t('weekIntro')}</p></div>
        <div className="week-chart">
          {weeklyOrder.map(item=><button type="button" className={`week-day${item.day===todayIndex?' today':''}${item.day===selectedDay?' selected':''}`} key={item.day} title={`${item.hours.toFixed(1)} ${t('openHours')} · ${item.venues} ${t('venueUnit')} ${t('openVenues')}`} aria-pressed={item.day===selectedDay} onClick={()=>{setSelectedDay(current=>current===item.day?null:item.day);setView('list');window.setTimeout(()=>document.querySelector('#places')?.scrollIntoView({behavior:'smooth'}),80);}}>
            <div className="week-values"><strong>{item.hours.toFixed(1)}</strong><span>{t('hourUnit')}</span></div>
            <div className="week-track"><div style={{height:`${Math.max(10,(item.hours/weeklyMax)*100)}%`}} /></div>
            <div className="week-label"><b>{weekdays[lang][item.day]}</b><small>{item.venues} {t('venueUnit')}</small>{item.day===todayIndex&&<em>{t('todayBadge')}</em>}</div>
          </button>)}
        </div>
      </section>

      <section className="dice-section" id="dice">
        <div className="dice-copy"><p className="eyebrow">{t('diceEyebrow')}</p><h2>{t('diceTitle')}</h2><p>{t('diceIntro')}</p>
          <div className="dice-scopes" role="group" aria-label={t('diceTitle')}>{diceScopes.map(([value,label])=><button key={value} className={diceScope===value?'active':''} onClick={()=>setDiceScope(value)} aria-pressed={diceScope===value}>{label}<span>{dicePools[value].length}</span></button>)}</div>
          <button className="roll-button" onClick={rollDice} disabled={!dicePool.length || rolling}><span className={rolling?'rolling':''}>⚄</span>{rolling?t('rolling'):dicePlace?t('again'):t('roll')}</button>
        </div>
        <div className={rolling?'dice-result is-rolling':'dice-result'}>
          {dicePlace && diceStatus ? <><a className="dice-photo" href={mapUrl(dicePlace)} target="_blank" rel="noreferrer"><img src={mapImages[dicePlace.name]} alt={dicePlace.name} referrerPolicy="no-referrer" /><span>★ {dicePlace.rating}</span></a><div className="dice-result-body"><p>{t('diceResult')}</p><div className={`status ${diceStatus.state}`}><span/>{diceStatus.label} · {diceStatus.detail}</div><h3>{dicePlace.name}</h3><small>{placeCopy(dicePlace)[0]} · {dicePlace.address}</small><a href={mapUrl(dicePlace)} target="_blank" rel="noreferrer">{t('openMap')}</a></div></> : <div className="dice-placeholder"><span>⚄</span><p>{dicePool.length?t('roll'):t('diceEmpty')}</p></div>}
        </div>
      </section>

      <section className="places-section" id="places">
        <div className="section-heading"><div><p className="eyebrow">{t('curated')}</p><h2>{t('allSaved')}</h2></div><div className="view-tools"><span>{shown.length} / {places.length} {t('placesUnit')}</span><div className="view-switch" role="group"><button className={view==='list'?'active':''} onClick={()=>setView('list')}>☷ {t('listView')}</button><button className={view==='map'?'active':''} onClick={()=>setView('map')}>⌖ {t('mapView')}</button></div></div></div>
        <div className="filter-bar">
          <div className="filter-chips">{filters.map(([value,label])=><button key={value} className={filter===value?'active':''} onClick={()=>setFilter(value)}>{label}</button>)}{selectedDay!==null&&<button className="day-filter-clear" onClick={()=>setSelectedDay(null)}>{weekdays[lang][selectedDay]} · {t('openOn')} ×</button>}</div>
          <div className="sort-wrap"><label>{t('sort')}</label><select value={sort} onChange={(e)=>setSort(e.target.value)}><option value="smart">{t('smart')}</option><option value="rating">{t('rating')}</option><option value="reviews">{t('reviewsSort')}</option></select></div>
        </div>
        <div className="cuisine-bar"><span>{t('cuisine')}</span><div className="cuisine-chips">{cuisineFilters.map(([value,label])=><button key={value} className={cuisine===value?'active':''} onClick={()=>setCuisine(value)}>{label}</button>)}</div></div>
        {view === 'map' && <div className="map-shell"><div className="map-heading"><p>{t('mapHint')}</p><span>{shown.length} {t('mapPlaces')}</span></div><MapView entries={shown} categoryFor={categoryFor} openMapLabel={t('openMap')} /></div>}
        {view === 'list' && <div className="place-list">
          {shown.map(({place,status},index)=><article className="place-row" key={place.name}>
            <div className={`row-index tone-${index%4}`}>{String(index+1).padStart(2,'0')}</div>
            <a className="row-photo" href={mapUrl(place)} target="_blank" rel="noreferrer" aria-label={`在 Google Maps 查看 ${place.name}`}>
              <img src={mapImages[place.name]} alt={`${place.name} · ${t('photo')}`} loading="lazy" referrerPolicy="no-referrer" />
              <span>{place.sources.includes('推荐补充')?t('recommendPhoto'):t('photo')}</span>
            </a>
            <div className="row-main">
              <div className={`status ${status.state}`}><span/>{status.label} · {status.detail}</div>
              <h3>{place.name}</h3><p>{placeCopy(place)[0]} · {place.address}</p>
              <div className="source-list">{place.sources.map(source=><b key={source}>{sourceCopy(source)}</b>)}</div>
            </div>
            <div className="row-score"><strong>{place.rating}</strong><span>★ Google</span><small>{place.reviews.toLocaleString(timeLocale)} {t('reviewCount')}</small></div>
            <div className="row-menu"><span>MENU</span><p>{placeCopy(place)[1]}</p></div>
            <div className="row-actions"><a className="menu-button" href={menuUrl(place)} target="_blank" rel="noreferrer">{t('menu')}</a><a href={mapUrl(place)} target="_blank" rel="noreferrer">{t('maps')}</a></div>
          </article>)}
        </div>}
        {!shown.length && <div className="empty">{t('empty')}</div>}
      </section>

      <section className="news-section" id="new">
        <div className="news-title"><p className="eyebrow">{t('newsEyebrow')}</p><h2>{t('newsTitle')}</h2><p>{t('newsIntro')}</p></div>
        <div className="news-layout">
          <div className="opening-feed">
            {openingNews.map((item,index)=>{ const translated = lang === 'en' || lang === 'de' ? openingTranslations[item.name]?.[lang] : [item.state,item.category,item.note]; return <a className="opening-item" href={item.url} target="_blank" rel="noreferrer" key={item.name}>
              <span className="opening-no">{String(index+1).padStart(2,'0')}</span><div><div className="opening-date">{item.date} · {translated?.[0]}</div><h3>{item.name}</h3><p>{translated?.[1]} · {item.address}</p><small>{translated?.[2]}</small></div><b>↗</b>
            </a>})}
          </div>
          <aside className="newsletter-stack"><div className="newsletter-top"><span>✦</span><div><p>{t('newsletterDesk')}</p><h3>{t('newsletterTitle')}</h3></div></div>
            {newsletters.map(item=>{ const translated = lang === 'en' || lang === 'de' ? newsletterTranslations[item.name]?.[lang] : [item.cadence,item.note]; const displayName = item.name === 'Saarbrücken 市政 Newsletter' ? (lang === 'en' ? 'City of Saarbrücken newsletter' : lang === 'de' ? 'Newsletter der Stadt Saarbrücken' : lang === 'zh' ? '萨尔布吕肯市政通讯' : item.name) : item.name; return <a href={item.url} target="_blank" rel="noreferrer" key={item.name}><div><span>{translated?.[0]}</span><h4>{displayName}</h4><p>{translated?.[1]}</p></div><b>{t('subscribe')}</b></a>})}
          </aside>
        </div>
      </section>

      <footer><div className="brand"><span className="brand-mark">SB</span><span>SAAR BITES</span></div><p>{t('footer')}</p></footer>
    </main>
  );
}
