'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import type { Lang } from './i18n';
import { reviewApiUrl, reviewPhotoUrl } from './lib/review-api';
import { preparePhoto } from './lib/prepare-photo';
import { uploadReview } from './lib/upload-review';

type Review = { id: string; author: string | null; rating: number; comment: string; photos: string[]; created_at: number };
const copy = {
  zh: { title:'食客评价', community:'本站食客评分', empty:'还没有评价，来分享第一份用餐体验。', loading:'正在加载评价…', error:'暂时无法加载评价，请重试。', retry:'重试', write:'写下你的体验', rating:'你的评分', comment:'用餐体验', placeholder:'菜品、服务、环境，有什么值得分享？', anonymous:'匿名发布', name:'署名', nameHint:'填写你想展示的名字', photos:'添加照片', photoHint:'最多 3 张，每张不超过 5 MB；支持 JPG、PNG、WebP。', remove:'移除', submit:'发布评价', sending:'正在发布…', success:'评价已发布，谢谢你的分享！', saveError:'发布失败，请重试。你的内容仍保留在表单中。', invalidPhotos:'请选择最多 3 张 JPG、PNG 或 WebP 照片，每张不超过 5 MB。', close:'关闭评价', more:'加载更多', count:'条评价', privacy:'评论、署名和照片会向本站访客展示。请只上传有权分享的照片，避免包含私人信息。', stars:'星', required:'请先选择评分。' },
  en: { title:'Diner reviews', community:'Community rating', empty:'No reviews yet. Share the first dining experience.', loading:'Loading reviews…', error:'Reviews could not be loaded. Please retry.', retry:'Retry', write:'Share your experience', rating:'Your rating', comment:'Your experience', placeholder:'What did you think of the food, service and atmosphere?', anonymous:'Post anonymously', name:'Display name', nameHint:'Choose the name shown with your review', photos:'Add photos', photoHint:'Up to 3 photos, 5 MB each; JPG, PNG or WebP.', remove:'Remove', submit:'Post review', sending:'Posting…', success:'Your review is published. Thank you!', saveError:'Could not post. Please retry; your draft is still here.', invalidPhotos:'Choose up to 3 JPG, PNG or WebP photos, no larger than 5 MB each.', close:'Close reviews', more:'Load more', count:'reviews', privacy:'Your review, name and photos are visible to site visitors. Only upload photos you have permission to share, without private information.', stars:'stars', required:'Please choose a rating.' },
  de: { title:'Gästebewertungen', community:'Bewertung auf dieser Website', empty:'Noch keine Bewertungen. Teile die erste Erfahrung.', loading:'Bewertungen werden geladen…', error:'Bewertungen konnten nicht geladen werden.', retry:'Erneut versuchen', write:'Teile deine Erfahrung', rating:'Deine Bewertung', comment:'Deine Erfahrung', placeholder:'Wie waren Essen, Service und Atmosphäre?', anonymous:'Anonym veröffentlichen', name:'Anzeigename', nameHint:'Name, der bei deiner Bewertung erscheint', photos:'Fotos hinzufügen', photoHint:'Bis zu 3 Fotos, je 5 MB; JPG, PNG oder WebP.', remove:'Entfernen', submit:'Bewertung veröffentlichen', sending:'Wird veröffentlicht…', success:'Deine Bewertung wurde veröffentlicht. Vielen Dank!', saveError:'Veröffentlichen fehlgeschlagen. Dein Entwurf bleibt erhalten.', invalidPhotos:'Bis zu 3 JPG-, PNG- oder WebP-Fotos mit jeweils maximal 5 MB auswählen.', close:'Bewertungen schließen', more:'Mehr laden', count:'Bewertungen', privacy:'Bewertung, Name und Fotos sind für Besucher sichtbar. Lade nur Fotos hoch, die du teilen darfst und die keine privaten Informationen enthalten.', stars:'Sterne', required:'Bitte eine Bewertung auswählen.' },
};

export default function Reviews({ place, displayName = place, lang, onClose, mode = 'restaurant' }: { place: string; displayName?: string; lang: Lang; onClose: () => void; mode?: 'restaurant' | 'shopping' }) {
  const base = copy[lang === 'mix' ? 'zh' : lang];
  const shoppingCopy = lang === 'en' ? { title:'Good finds', community:'Community recommendations', empty:'Found something good here? Share the first find.', write:'Share a good find', comment:'What did you buy?', placeholder:'Product name, price, shop, purchase date… What makes it worth sharing?', submit:'Share find', rating:'How much do you recommend it?', success:'Your find has been shared. Thank you!' } : lang === 'de' ? { title:'Gute Fundstücke', community:'Empfehlungen der Community', empty:'Etwas Gutes gefunden? Teile den ersten Fund.', write:'Teile deinen Fund', comment:'Was hast du gekauft?', placeholder:'Produkt, Preis, Geschäft, Kaufdatum… Was gefällt dir daran?', submit:'Fund teilen', rating:'Wie sehr empfiehlst du es?', success:'Dein Fund wurde geteilt. Vielen Dank!' } : { title:'好物分享', community:'大家的推荐指数', empty:'在这里买到好东西？来分享第一份发现。', write:'晒晒你的好物', comment:'买到了什么好东西？', placeholder:'商品名称、价格、具体店铺、购买日期……为什么值得分享？', submit:'发布好物', rating:'你的推荐指数', success:'好物已分享，谢谢你的推荐！' };
  const c = mode === 'shopping' ? { ...base, ...shoppingCopy, count: lang === 'en' ? 'finds' : lang === 'de' ? 'Fundstücke' : '条分享' } : base;
  const extra = lang === 'en' ? { processing:'Preparing photos…', optimized:'Photos resized before upload; original location metadata removed.', blank:'Please write a review and, if posting by name, enter a display name.', saving:'Saving…', upload:'Uploading', count:'characters' } : lang === 'de' ? { processing:'Fotos werden vorbereitet…', optimized:'Fotos werden verkleinert und ursprüngliche Standort-Metadaten entfernt.', blank:'Bitte einen Text und bei Veröffentlichung mit Namen einen Anzeigenamen eingeben.', saving:'Wird gespeichert…', upload:'Hochladen', count:'Zeichen' } : { processing:'正在优化照片…', optimized:'上传前自动缩小照片，并移除原始定位信息。', blank:'请填写内容；选择署名时，请填写展示的名字。', saving:'正在保存…', upload:'正在上传', count:'字' };
  const dialog = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<{ count: number; average: number | null }>({ count:0, average:null });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [rating, setRating] = useState(0);
  const [anonymous, setAnonymous] = useState(true);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const mounted = useRef(true);
  const activeLoad = useRef<AbortController | null>(null);
  const load = useCallback(async (offset = 0) => {
    activeLoad.current?.abort();
    const controller = new AbortController();
    activeLoad.current = controller;
    setLoading(true); setLoadError(false);
    try {
      const response = await fetch(reviewApiUrl(`/api/reviews?place=${encodeURIComponent(place)}&offset=${offset}`), { cache:'no-store', signal:controller.signal });
      if (!response.ok) throw new Error();
      const data = await response.json() as { reviews: Review[]; count:number; average:number|null };
      if (!mounted.current || controller.signal.aborted) return;
      setReviews(previous => offset ? [...previous, ...data.reviews.filter((item: Review) => !previous.some(existing => existing.id === item.id))] : data.reviews);
      setSummary({ count:data.count, average:data.average });
    } catch { if (mounted.current && !controller.signal.aborted) setLoadError(true); }
    finally { if (mounted.current && !controller.signal.aborted) setLoading(false); }
  }, [place]);
  useEffect(() => {
    mounted.current = true;
    dialog.current?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => void load(), 0);
    return () => { window.clearTimeout(timer); mounted.current = false; activeLoad.current?.abort(); document.body.style.overflow = oldOverflow; };
  }, [load]);
  const previewUrls = useRef<string[]>([]);
  function updatePhotos(next: File[]) {
    previewUrls.current.forEach(url => URL.revokeObjectURL(url));
    previewUrls.current = next.map(file => URL.createObjectURL(file));
    setPhotos(next); setPreviews(previewUrls.current);
  }
  useEffect(() => () => previewUrls.current.forEach(url => URL.revokeObjectURL(url)), []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || processing) return;
    setSuccess(false);
    if (!rating) { setMessage(c.required); return; }
    if (!comment.trim() || (!anonymous && !author.trim())) { setMessage(extra.blank); return; }
    const data = new FormData(event.currentTarget);
    data.set('comment',comment.trim());
    data.set('author',author.trim());
    data.set('place', place); data.set('rating', String(rating));
    if (anonymous) data.delete('author');
    photos.forEach(file => data.append('photos', file));
    setSending(true); setProgress(0); setMessage('');
    try {
      await uploadReview(reviewApiUrl('/api/reviews'),data,setProgress);
      formRef.current?.reset(); setRating(0); setAnonymous(true); setComment(''); setAuthor(''); updatePhotos([]); setSuccess(true); setMessage(c.success);
      await load();
    } catch { setMessage(c.saveError); }
    finally { setSending(false); }
  }

  return <dialog ref={dialog} className="review-dialog" aria-labelledby="review-title" onCancel={event => { if (sending || processing) event.preventDefault(); else onClose(); }}>
    <header className="review-header"><div><p>{c.title}</p><h2 id="review-title">{displayName}</h2></div><button type="button" onClick={onClose} disabled={sending || processing} aria-label={c.close}>×</button></header>
    <div className="review-content">
      <section className="review-feed" aria-label={c.title}>
        <div className="review-summary"><span>{c.community}</span><strong>{summary.average == null ? '—' : summary.average.toFixed(1)} <span>★</span></strong><span>{summary.count} {c.count}</span></div>
        {loading && <p role="status">{c.loading}</p>}
        {loadError && <p role="alert">{c.error} <button type="button" onClick={() => void load(reviews.length)}>{c.retry}</button></p>}
        {!loading && !loadError && !reviews.length && <p className="review-empty">{c.empty}</p>}
        {reviews.map(review => <article className="review-entry" key={review.id}><div className="review-byline"><strong>{review.author || (lang === 'en' ? 'Anonymous' : lang === 'de' ? 'Anonym' : '匿名食客')}</strong><time dateTime={new Date(review.created_at).toISOString()}>{new Date(review.created_at).toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'de' ? 'de-DE' : 'zh-CN')}</time></div><span className="review-stars" aria-label={`${review.rating} / 5`}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span><p>{review.comment}</p><div className="review-photo-grid">{review.photos.map((id, index) => <a href={reviewPhotoUrl(id)} key={id} target="_blank" rel="noreferrer"><img src={reviewPhotoUrl(id)} alt={`${displayName} · ${index+1}`} loading="lazy" /></a>)}</div></article>)}
        {reviews.length < summary.count && <button type="button" className="review-secondary" disabled={loading} onClick={() => void load(reviews.length)}>{c.more}</button>}
      </section>
      <form ref={formRef} className="review-form" onSubmit={submit}><h3>{c.write}</h3><fieldset disabled={sending || processing}><legend>{c.rating}</legend><div className="review-rating">{[1,2,3,4,5].map(value => <label key={value} className={value <= rating ? 'selected' : ''}><input type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} required aria-label={`${value} ${c.stars}`} /><span aria-hidden="true">★</span></label>)}</div></fieldset>
        <label>{c.comment}<textarea name="comment" required maxLength={2000} rows={5} placeholder={c.placeholder} value={comment} onChange={event => setComment(event.target.value)} disabled={sending || processing} /><small className="review-character-count">{comment.length} / 2000 {extra.count}</small></label>
        <label className="review-anonymous"><input type="checkbox" checked={anonymous} disabled={sending || processing} onChange={event => setAnonymous(event.target.checked)} />{c.anonymous}</label>
        {!anonymous && <label>{c.name}<input name="author" maxLength={40} required placeholder={c.nameHint} value={author} onChange={event => setAuthor(event.target.value)} disabled={sending || processing} /></label>}
        <label>{c.photos}<input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={sending || processing || photos.length >= 3} onChange={async event => {
          const files = Array.from(event.target.files || []);
          event.target.value = '';
          if (!files.length) return;
          if (photos.length + files.length > 3 || files.some(file => !['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 5*1024*1024 || !file.size)) { setSuccess(false); setMessage(c.invalidPhotos); return; }
          setProcessing(true); setMessage(''); setSuccess(false);
          try {
            const prepared: File[] = [];
            // Process sequentially to avoid decoding several full-size phone photos at once.
            for (const file of files) prepared.push(await preparePhoto(file));
            if (mounted.current) updatePhotos([...photos,...prepared]);
          } catch { if (mounted.current) setMessage(c.invalidPhotos); }
          finally { if (mounted.current) setProcessing(false); }
        }} /><small>{c.photoHint} {extra.optimized}</small></label>
        {processing && <p role="status">{extra.processing}</p>}
        <div className="review-photo-grid">{previews.map((url,index) => <div className="review-preview" key={url}><img src={url} alt={photos[index]?.name || ''} /><button type="button" disabled={sending || processing} onClick={() => updatePhotos(photos.filter((_,i) => i !== index))}>{c.remove}</button></div>)}</div>
        <p className="review-privacy">{c.privacy}</p>
        {message && <p className={success ? 'review-success' : 'review-error'} role={success ? 'status' : 'alert'}>{message}</p>}
        {sending && <div className="review-upload-status" role="status"><span>{progress < 100 ? `${extra.upload} ${progress}%` : extra.saving}</span><progress value={progress} max={100} aria-label={extra.upload} /></div>}
        <button type="submit" className="review-submit" disabled={sending || processing}>{sending ? c.sending : c.submit}</button>
      </form>
    </div>
  </dialog>;
}
