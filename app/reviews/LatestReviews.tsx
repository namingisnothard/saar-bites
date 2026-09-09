'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import Reviews from '../Reviews';
import type { Lang } from '../i18n';
import { reviewApiUrl, reviewPhotoUrl } from '../lib/review-api';

type Entry = { id:string; place:string; author:string|null; rating:number; comment:string; photos:string[]; created_at:number };
const texts = {
  zh:{title:'最新打卡',intro:'大家最近去了哪家餐厅？看看最新的用餐体验、评分和实拍照片。',back:'餐厅雷达',life:'萨尔生活',refresh:'刷新动态',loading:'正在加载最新打卡…',empty:'还没有餐厅打卡。去选一家餐厅，分享你的第一份用餐体验吧。',error:'暂时无法加载打卡，请重试。',retry:'重试',more:'加载更多',anonymous:'匿名食客',view:'查看餐厅评价 / 我也来打卡',count:'条餐厅打卡',photo:'用餐照片'},
  en:{title:'Latest reviews',intro:'Where has everyone been eating? Discover recent restaurant visits, ratings and photos.',back:'Food radar',life:'Saar Life',refresh:'Refresh feed',loading:'Loading recent reviews…',empty:'No restaurant reviews yet. Choose a restaurant and share your first visit.',error:'Could not load reviews. Please retry.',retry:'Retry',more:'Load more',anonymous:'Anonymous diner',view:'View restaurant reviews / Share a visit',count:'restaurant reviews',photo:'Dining photo'},
  de:{title:'Neue Bewertungen',intro:'Wo war die Community essen? Entdecke neue Restaurantbesuche, Bewertungen und Fotos.',back:'Restaurant-Radar',life:'Saar-Leben',refresh:'Aktualisieren',loading:'Bewertungen werden geladen…',empty:'Noch keine Restaurantbewertungen. Wähle ein Restaurant und teile deinen ersten Besuch.',error:'Bewertungen konnten nicht geladen werden.',retry:'Erneut versuchen',more:'Mehr laden',anonymous:'Anonymer Gast',view:'Bewertungen ansehen / Besuch teilen',count:'Restaurantbewertungen',photo:'Foto vom Restaurantbesuch'},
};
export default function LatestReviews() {
  const [lang,setLang] = useState<Lang>('mix');
  const locale = lang === 'en' || lang === 'de' ? lang : 'zh';
  const c = texts[locale];
  const [entries,setEntries] = useState<Entry[]>([]);
  const [count,setCount] = useState(0);
  const [loading,setLoading] = useState(true);
  const [failed,setFailed] = useState(false);
  const [selected,setSelected] = useState<string|null>(null);
  const active = useRef<AbortController|null>(null);
  const nextOffset = useRef(0);
  const retryOffset = useRef(0);
  const load = useCallback(async (offset=0) => {
    active.current?.abort();
    const controller = new AbortController(); active.current = controller;
    retryOffset.current = offset; setLoading(true); setFailed(false);
    try {
      const response = await fetch(reviewApiUrl(`/api/reviews?place=restaurants%3Aall&offset=${offset}`), {cache:'no-store',signal:controller.signal});
      if (!response.ok) throw new Error('Unavailable');
      const data = await response.json() as {reviews:Entry[]; count:number};
      if (controller.signal.aborted) return;
      setEntries(previous => offset ? [...previous,...data.reviews.filter(item=>!previous.some(old=>old.id===item.id))] : data.reviews);
      nextOffset.current = offset + data.reviews.length; setCount(data.count);
    } catch { if (!controller.signal.aborted) setFailed(true); }
    finally { if (!controller.signal.aborted) setLoading(false); }
  },[]);
  useEffect(() => {
    const saved = localStorage.getItem('saar-bites-language');
    if (saved === 'en' || saved === 'de') setLang(saved);
    void load(); return () => active.current?.abort();
  },[load]);
  useEffect(() => { document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale; },[locale]);
  return <main className="life-page latest-page">
    <nav className="life-nav"><Link href="/" className="brand"><span>SB</span> SAAR BITES</Link><div><Link href="/">← {c.back}</Link><Link href="/life">{c.life}</Link><div className="life-languages" aria-label="Language">{(['mix','en','de'] as Lang[]).map(item=><button key={item} aria-pressed={lang===item} onClick={()=>{setLang(item);localStorage.setItem('saar-bites-language',item);}}>{item==='mix'?'中文':item.toUpperCase()}</button>)}</div></div></nav>
    <header className="life-heading latest-heading"><div><p>SAARBRÜCKEN · COMMUNITY TABLE</p><h1>{c.title}</h1><p>{c.intro}</p></div><button className="review-submit" disabled={loading} onClick={()=>void load()}>{c.refresh} ↻</button></header>
    <section className="latest-feed" aria-label={c.title} aria-busy={loading}>
      <p className="latest-count">{count} {c.count}</p>
      <div className="latest-list">{entries.map(entry=><article key={entry.id} className="life-find latest-entry">
        <button className="life-shop-link" onClick={()=>setSelected(entry.place)}>{entry.place} ↗</button>
        <div className="review-byline"><strong>{entry.author || c.anonymous}</strong><time dateTime={new Date(entry.created_at).toISOString()}>{new Date(entry.created_at).toLocaleString(locale === 'zh' ? 'zh-CN' : locale,{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Europe/Berlin'})}</time></div>
        <div className="review-stars" aria-label={`${entry.rating} / 5`}>{'★'.repeat(entry.rating)}{'☆'.repeat(5-entry.rating)}</div>
        <p>{entry.comment}</p>
        {entry.photos.length>0 && <div className="review-photo-grid">{entry.photos.map((photo,index)=><a key={photo} href={reviewPhotoUrl(photo)} target="_blank" rel="noreferrer"><img src={reviewPhotoUrl(photo)} alt={`${entry.place} · ${c.photo} ${index+1}`} loading="lazy" /></a>)}</div>}
        <button className="review-secondary" onClick={()=>setSelected(entry.place)}>{c.view}</button>
      </article>)}</div>
      {loading && <p role="status" className="review-empty">{c.loading}</p>}
      {failed && <div role="alert" className="review-empty">{c.error} <button className="review-secondary" onClick={()=>void load(retryOffset.current)}>{c.retry}</button></div>}
      {!loading && !failed && !entries.length && <div className="life-no-finds"><p>{c.empty}</p><Link href="/">{c.back} →</Link></div>}
      {!loading && !failed && nextOffset.current<count && <button className="review-secondary" onClick={()=>void load(nextOffset.current)}>{c.more}</button>}
    </section>
    {selected && <Reviews key={selected} place={selected} lang={lang} onClose={()=>{setSelected(null);void load();}} />}
  </main>;
}
