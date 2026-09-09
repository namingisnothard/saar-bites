'use client';
import Link from 'next/link';
import {useCallback,useEffect,useRef,useState,type FormEvent} from 'react';
import {reviewApiUrl} from '../lib/review-api';
type Message={id:string;place:string;location:string;message:string;author:string|null;created_at:number};
const copy={
  zh:{title:'留言板',intro:'有想推荐的新餐厅、超市或其他地点？告诉大家你希望这里收录什么。留言是收录建议，不代表地点已添加。',back:'餐厅雷达',life:'萨尔生活',feed:'最新打卡',form:'推荐一个地点',place:'餐厅 / 地点名称',location:'地址或所在区域（选填）',message:'为什么想推荐？',anonymous:'匿名留言',author:'署名',submit:'发布留言',sending:'发布中…',privacy:'地点、留言和署名会公开展示。请勿填写私人联系方式等敏感信息。',success:'留言已发布，谢谢你的推荐！',failure:'发布失败，内容已保留，请重试。',recent:'大家的收录建议',empty:'还没有留言，来推荐第一个地点吧。',loading:'正在加载…',error:'留言暂时无法加载。',retry:'重试',more:'加载更多',refresh:'刷新留言',anon:'匿名用户'},
  en:{title:'Message board',intro:'Have a restaurant, shop or other place to recommend? Tell us what you would like added. Suggestions do not mean a place has been listed yet.',back:'Food radar',life:'Saar Life',feed:'Latest reviews',form:'Suggest a place',place:'Restaurant / place name',location:'Address or area (optional)',message:'Why do you recommend it?',anonymous:'Post anonymously',author:'Display name',submit:'Post suggestion',sending:'Posting…',privacy:'The place, message and name will be public. Please leave out private contact details.',success:'Suggestion posted. Thank you!',failure:'Could not post. Your draft is saved here; please retry.',recent:'Community suggestions',empty:'No suggestions yet. Share the first place!',loading:'Loading…',error:'Messages could not be loaded.',retry:'Retry',more:'Load more',refresh:'Refresh',anon:'Anonymous'},
  de:{title:'Pinnwand',intro:'Kennst du ein Restaurant, Geschäft oder einen anderen Ort? Schlage vor, was wir aufnehmen sollen. Ein Vorschlag ist noch kein neuer Eintrag.',back:'Restaurant-Radar',life:'Saar-Leben',feed:'Neue Bewertungen',form:'Ort vorschlagen',place:'Restaurant / Ortsname',location:'Adresse oder Stadtteil (optional)',message:'Warum empfiehlst du diesen Ort?',anonymous:'Anonym veröffentlichen',author:'Anzeigename',submit:'Vorschlag senden',sending:'Wird gesendet…',privacy:'Ort, Nachricht und Name werden öffentlich angezeigt. Keine privaten Kontaktdaten angeben.',success:'Vorschlag veröffentlicht. Vielen Dank!',failure:'Senden fehlgeschlagen. Dein Entwurf bleibt erhalten.',recent:'Vorschläge der Community',empty:'Noch keine Vorschläge. Teile den ersten Ort!',loading:'Wird geladen…',error:'Nachrichten konnten nicht geladen werden.',retry:'Erneut versuchen',more:'Mehr laden',refresh:'Aktualisieren',anon:'Anonym'},
};
export default function Board(){
  const [lang,setLang]=useState<'zh'|'en'|'de'>('zh');const c=copy[lang];
  const [messages,setMessages]=useState<Message[]>([]),[count,setCount]=useState(0),[loading,setLoading]=useState(true),[failed,setFailed]=useState(false);
  const [place,setPlace]=useState(''),[location,setLocation]=useState(''),[message,setMessage]=useState(''),[author,setAuthor]=useState(''),[anonymous,setAnonymous]=useState(true),[sending,setSending]=useState(false),[notice,setNotice]=useState<'success'|'failure'|''>('');
  const active=useRef<AbortController|null>(null),next=useRef(0),retry=useRef(0),posting=useRef(false);
  const load=useCallback(async(offset=0)=>{
    active.current?.abort();const controller=new AbortController();active.current=controller;retry.current=offset;setLoading(true);setFailed(false);
    try{const response=await fetch(reviewApiUrl(`/api/suggestions?offset=${offset}`),{cache:'no-store',signal:controller.signal});if(!response.ok)throw new Error();const data=await response.json() as {messages:Message[];count:number};if(controller.signal.aborted)return;setMessages(old=>offset?[...old,...data.messages.filter(item=>!old.some(previous=>previous.id===item.id))]:data.messages);next.current=offset+data.messages.length;setCount(data.count);}
    catch{if(!controller.signal.aborted)setFailed(true);}finally{if(!controller.signal.aborted)setLoading(false);}
  },[]);
  useEffect(()=>{const saved=localStorage.getItem('saar-bites-language');if(saved==='en'||saved==='de')setLang(saved);void load();return()=>active.current?.abort();},[load]);
  useEffect(()=>{document.documentElement.lang=lang==='zh'?'zh-CN':lang;},[lang]);
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();if(posting.current||!place.trim()||!message.trim()||!anonymous&&!author.trim())return;
    posting.current=true;setSending(true);setNotice('');
    try{const response=await fetch(reviewApiUrl('/api/suggestions'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({place:place.trim(),location:location.trim(),message:message.trim(),author:anonymous?null:author.trim()})});if(!response.ok)throw new Error();setPlace('');setLocation('');setMessage('');setNotice('success');void load();}catch{setNotice('failure');}finally{posting.current=false;setSending(false);}
  }
  return <main className="life-page"><nav className="life-nav"><Link href="/" className="brand"><span>SB</span> SAAR BITES</Link><div><Link href="/">{c.back}</Link><Link href="/life">{c.life}</Link><Link href="/reviews">{c.feed}</Link><div className="life-languages" aria-label="Language">{(['zh','en','de'] as const).map(value=><button key={value} aria-pressed={lang===value} onClick={()=>{setLang(value);localStorage.setItem('saar-bites-language',value==='zh'?'mix':value);}}>{value==='zh'?'中文':value.toUpperCase()}</button>)}</div></div></nav>
    <header className="life-heading latest-heading"><div><p>SAARBRÜCKEN · YOUR NEXT DISCOVERY</p><h1>{c.title}</h1><p>{c.intro}</p></div></header>
    <div className="board-layout"><form className="review-form board-form" onSubmit={submit}><h2>{c.form}</h2><fieldset disabled={sending}>
      <label>{c.place}<input required maxLength={100} value={place} onChange={e=>setPlace(e.target.value)}/></label>
      <label>{c.location}<input maxLength={200} value={location} onChange={e=>setLocation(e.target.value)}/></label>
      <label>{c.message}<textarea required maxLength={2000} rows={5} value={message} onChange={e=>setMessage(e.target.value)}/><small>{message.length} / 2000</small></label>
      <label className="review-anonymous"><input type="checkbox" checked={anonymous} onChange={e=>setAnonymous(e.target.checked)}/>{c.anonymous}</label>
      {!anonymous&&<label>{c.author}<input required maxLength={40} value={author} onChange={e=>setAuthor(e.target.value)}/></label>}
      <p className="review-privacy">{c.privacy}</p><button className="review-submit" disabled={sending||!place.trim()||!message.trim()||!anonymous&&!author.trim()}>{sending?c.sending:c.submit}</button>
    </fieldset>{notice&&<p role={notice==='failure'?'alert':'status'} className={notice==='failure'?'review-error':'review-success'}>{c[notice]}</p>}</form>
    <section className="board-feed" aria-busy={loading}><div className="board-feed-heading"><h2>{c.recent}</h2><button className="review-secondary" disabled={loading} onClick={()=>void load()}>{c.refresh}</button></div><p>{count}</p>
      {messages.map(item=><article key={item.id} className="life-find board-message"><div className="review-byline"><strong>{item.author||c.anon}</strong><time dateTime={new Date(item.created_at).toISOString()}>{new Date(item.created_at).toLocaleString(lang==='zh'?'zh-CN':lang,{timeZone:'Europe/Berlin',dateStyle:'medium',timeStyle:'short'})}</time></div><h3>{item.place}</h3>{item.location&&<p className="board-location">{item.location}</p>}<p>{item.message}</p></article>)}
      {loading&&<p role="status">{c.loading}</p>}{failed&&<p role="alert">{c.error} <button className="review-secondary" onClick={()=>void load(retry.current)}>{c.retry}</button></p>}{!loading&&!failed&&!messages.length&&<p className="life-no-finds">{c.empty}</p>}{!loading&&!failed&&next.current<count&&<button className="review-secondary" onClick={()=>void load(next.current)}>{c.more}</button>}
    </section></div></main>;
}
