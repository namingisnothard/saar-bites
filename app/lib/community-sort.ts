export type SiteScores = Record<string, {count:number;average:number}>;
export function compareCommunity(a:string,b:string,scores:SiteScores,mode:string) {
  const x=scores[a],y=scores[b];
  if(mode==='site-rating') return (y?.average ?? -1)-(x?.average ?? -1) || (y?.count ?? 0)-(x?.count ?? 0) || a.localeCompare(b);
  return (y?.count ?? 0)-(x?.count ?? 0) || (y?.average ?? -1)-(x?.average ?? -1) || a.localeCompare(b);
}
