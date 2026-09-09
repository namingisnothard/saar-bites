'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import Reviews from '../Reviews';
import { lifePlaces, lifePlaceKey, type LifePlace } from '../life-data';
import type { Lang } from '../i18n';
import { reviewApiUrl, reviewPhotoUrl } from '../lib/review-api';

type Find = { id:string; place:string; author:string|null; comment:string; photos:string[]; rating:number; created_at:number };
const texts = {
  zh:{title:'萨尔生活',intro:'超市补货、日常购物，把在萨尔买到的好东西分享给彼此。',back:'餐厅雷达',search:'搜索超市、商店或地址',all:'全部',supermarket:'超市',drugstore:'日化 / 美妆',shopping:'Shopping',share:'分享好物',view:'查看 / 分享好物',official:'官网与营业时间 ↗',map:'路线 ↗',latest:'大家最近买了什么',empty:'还没有好物分享。选一家店，晒晒你的第一份发现。',failed:'分享暂时无法加载。',retry:'重试',more:'加载更多',loading:'正在加载…',noStores:'没有匹配的地点。',updated:'地点信息核对：2026-09-09 · 库存、价格和营业时间以门店为准。',choose:'选择购买地点',anonymous:'匿名',close:'取消'},
  en:{title:'Saar Life',intro:'Groceries, everyday shopping and good finds worth sharing in Saarbrücken.',back:'Food radar',search:'Search shops, supermarkets or addresses',all:'All',supermarket:'Supermarkets',drugstore:'Beauty / drugstores',shopping:'Shopping',share:'Share a find',view:'Browse / share finds',official:'Website & hours ↗',map:'Directions ↗',latest:'Recent community finds',empty:'No finds yet. Choose a shop and share your first discovery.',failed:'Finds could not be loaded.',retry:'Retry',more:'Load more',loading:'Loading…',noStores:'No matching places.',updated:'Locations checked: 9 September 2026 · Confirm stock, prices and hours with the shop.',choose:'Choose where you bought it',anonymous:'Anonymous',close:'Cancel'},
  de:{title:'Saar-Leben',intro:'Lebensmittel, Alltagseinkäufe und gute Fundstücke aus Saarbrücken miteinander teilen.',back:'Restaurant-Radar',search:'Supermarkt, Geschäft oder Adresse suchen',all:'Alle',supermarket:'Supermärkte',drugstore:'Drogerie / Beauty',shopping:'Shopping',share:'Fund teilen',view:'Funde ansehen / teilen',official:'Website & Öffnungszeiten ↗',map:'Route ↗',latest:'Neue Funde der Community',empty:'Noch keine Funde. Wähle ein Geschäft und teile deine erste Entdeckung.',failed:'Funde konnten nicht geladen werden.',retry:'Erneut versuchen',more:'Mehr laden',loading:'Wird geladen…',noStores:'Keine passenden Orte.',updated:'Standorte geprüft: 9. September 2026 · Bestand, Preise und Zeiten beim Geschäft prüfen.',choose:'Wo hast du es gekauft?',anonymous:'Anonym',close:'Abbrechen'},
};
export default function LifePage() {
  const [lang,setLang] = useState<Lang>('mix');
  const [query,setQuery] = useState('');
  const [category,setCategory] = useState('all');
  const [selected,setSelected] = useState<LifePlace|null>(null);
  const [choosing,setChoosing] = useState(false);
  const [finds,setFinds] = useState<Find[]>([]);
  const [total,setTotal] = useState(0);
  const [loading,setLoading] = useState(true);
  const [failed,setFailed] = useState(false);
  const locale = lang === 'en' || lang === 'de' ? lang : 'zh';
  const c = texts[locale];
  useEffect(() => { const timer = window.setTimeout(() => { const saved = localStorage.getItem('saar-bites-language'); if (saved === 'en' || saved === 'de') setLang(saved); }, 0); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale; }, [locale]);
  const load = useCallback(async (offset=0) => {
    setLoading(true); setFailed(false);
    try { const response = await fetch(reviewApiUrl(`/api/reviews?place=life%3Aall&offset=${offset}`), {cache:'no-store'}); if (!response.ok) throw new Error(); const data = await response.json() as { reviews:Find[]; count:number }; setFinds(previous => offset ? [...previous,...data.reviews.filter((item:Find) => !previous.some(old => old.id === item.id))] : data.reviews); setTotal(data.count); }
    catch { setFailed(true); } finally { setLoading(false); }
  }, []);
  useEffect(() => { const timer = window.setTimeout(() => void load(), 0); return () => window.clearTimeout(timer); }, [load]);
  const shops = lifePlaces.filter(place => (category === 'all' || place.category === category) && `${place.name} ${place.address} ${place.notes[locale]}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <main className="life-page"><nav className="life-nav"><Link href="/" className="brand"><span>SB</span> SAAR BITES</Link><div><Link href="/">← {c.back}</Link><div className="life-languages" aria-label="Language">{(['mix','en','de'] as Lang[]).map(item => <button key={item} aria-pressed={lang===item} onClick={() => { setLang(item); localStorage.setItem('saar-bites-language',item); }}>{item === 'mix' ? '中文' : item.toUpperCase()}</button>)}</div></div></nav>
    <header className="life-heading"><div><p>SAARBRÜCKEN · EVERYDAY FINDS</p><h1>{c.title}</h1><p>{c.intro}</p></div><button className="review-submit" onClick={() => { setChoosing(true); document.getElementById('life-stores')?.scrollIntoView({behavior:'smooth'}); }}>{c.share} ＋</button></header>
    <section className="life-stores" id="life-stores" aria-label={c.choose}>
      {choosing && <p className="life-prompt" role="status">{c.choose} <button onClick={() => setChoosing(false)}>{c.close}</button></p>}
      <div className="life-filters"><input aria-label={c.search} placeholder={c.search} value={query} onChange={event => setQuery(event.target.value)} /><div>{(['all','supermarket','drugstore','shopping'] as const).map(key => <button aria-pressed={category===key} key={key} onClick={() => setCategory(key)}>{c[key]}</button>)}</div></div>
      <div className="life-grid">{shops.map(place => <article className={`life-card life-${place.category}`} key={place.id}><div className="life-card-category">{c[place.category]}</div><h2>{place.name}</h2><p className="life-address">{place.address}</p><p>{place.notes[locale]}</p><div className="life-card-links"><a href={place.url} target="_blank" rel="noreferrer">{c.official}</a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name} ${place.address}`)}`} target="_blank" rel="noreferrer">{c.map}</a></div><button onClick={() => { setSelected(place); setChoosing(false); }}>{c.view} ＋</button></article>)}</div>
      {!shops.length && <p className="empty">{c.noStores}</p>}
      <p className="life-updated">{c.updated}</p>
    </section>
    <section className="life-finds"><h2>{c.latest}</h2>{loading && <p role="status">{c.loading}</p>}{failed && <p role="alert">{c.failed} <button onClick={() => void load(finds.length)}>{c.retry}</button></p>}{!loading && !failed && !finds.length && <p className="life-no-finds">{c.empty}</p>}
      <div className="life-grid">{finds.map(find => { const shop = lifePlaces.find(item => lifePlaceKey(item) === find.place); return <article className="life-find" key={find.id}><button className="life-shop-link" onClick={() => shop && setSelected(shop)}>{shop?.name}</button><div className="review-byline"><strong>{find.author || c.anonymous}</strong><time dateTime={new Date(find.created_at).toISOString()}>{new Date(find.created_at).toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale)}</time></div><span className="review-stars" aria-label={`${find.rating} / 5`}>{'★'.repeat(find.rating)}{'☆'.repeat(5-find.rating)}</span><p>{find.comment}</p><div className="review-photo-grid">{find.photos.map((id,index) => <a href={reviewPhotoUrl(id)} target="_blank" rel="noreferrer" key={id}><img src={reviewPhotoUrl(id)} alt={`${shop?.name} · ${index+1}`} loading="lazy" /></a>)}</div></article>; })}</div>
      {finds.length < total && <button className="review-secondary" disabled={loading} onClick={() => void load(finds.length)}>{c.more}</button>}
    </section>
    {selected && <Reviews key={selected.id} place={lifePlaceKey(selected)} displayName={selected.name} lang={lang} mode="shopping" onClose={() => { setSelected(null); void load(); }} />}
  </main>;
}
