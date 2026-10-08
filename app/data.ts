export type Interval = [string, string];
export type Place = {
  name: string;
  category: string;
  group: 'cafe' | 'restaurant' | 'bakery' | 'dessert';
  rating: number | null;
  ratingSource?: 'OpenTable';
  reviews: number | null;
  sources: string[];
  address: string;
  website?: string;
  maps?: string;
  menu?: string;
  booking?: string;
  menuNote: string;
  schedule: Interval[][] | null;
  scheduleSource?: 'Google Maps';
  temporaryClosure?: { from: string; through: string; resume: string };
  scheduleExceptions?: Record<string, Interval[]>;
  openedOn?: string;
  reopenedOn?: string;
  photoIsIllustration?: boolean;
};

const d = (...days: Interval[][]): Interval[][] => days;
const q = (name: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} Saarbrücken`)}`;
const asset = (file: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/${file}`;
export const restaurantPlaceholder = asset('restaurant-placeholder.svg');

export const contentReviewedAt = '2026-10-08';

export const places: Place[] = [
  // Additions reviewed 2026-10-08; see docs/opening-review-2026-10-08.md.
  {"name": "Jouliard", "category": "法式 · Bistro", "group": "restaurant", "rating": null, "reviews": null, "sources": ["推荐补充"], "address": "Scheidter Straße 66, 66123 Saarbrücken", "website": "https://www.jouliard.de/", "menu": "https://www.jouliard.de/", "menuNote": "4 月 8 日新团队重开 · 官网：周二、周三 18–22；周四至周六 12–14、18–22；周日、周一休息。电话预约 0681 59590688；纯素菜需提前预订。", "schedule": [[], [], [["18:00", "22:00"]], [["18:00", "22:00"]], [["12:00", "14:00"], ["18:00", "22:00"]], [["12:00", "14:00"], ["18:00", "22:00"]], [["12:00", "14:00"], ["18:00", "22:00"]]], "reopenedOn": "2026-04-08"},
  {"name": "Goni’s Grill Haus", "category": "Grill · 餐厅", "group": "restaurant", "rating": null, "reviews": null, "sources": ["推荐补充"], "address": "Saarbrücker Straße 273, 66125 Saarbrücken", "website": "https://www.neueroeffnung.info/saarbruecken/gonis-grill-haus", "menuNote": "开业目录列 8 月 8 日开业；周二、周四、周六 11–23，周五 11–14、17–23；周一、周三休息，未列周日，请向店家确认。", "schedule": null, "openedOn": "2026-08-08"},
  {"name": "Riva Italia", "category": "意式 · Café · Aperitivo", "group": "cafe", "rating": null, "reviews": null, "sources": ["推荐补充", "Café"], "address": "Herbergsgasse 4, 66111 Saarbrücken", "website": "https://www.neueroeffnung.info/saarbruecken/riva-italia-cafe", "menuNote": "开业目录列 3 月 28 日开业 · 咖啡、早餐、Antipasti 与葡萄酒；目录仅列周一、周三至周日时段，周二未核实。", "schedule": null, "openedOn": "2026-03-28"},
  {"name": "Casa Anatolia Restaurant", "category": "餐厅", "group": "restaurant", "rating": null, "reviews": null, "sources": ["推荐补充"], "address": "Vorstadtstraße 33, 66117 Saarbrücken", "website": "https://www.neueroeffnung.info/saarbruecken/casa-anatolia-restaurant", "menuNote": "开业目录 3 月 25 日更新确认 3 月 22 日开业，列每日 12–22；营业时间据第三方目录，请向店家确认。", "schedule": [[["12:00", "22:00"]], [["12:00", "22:00"]], [["12:00", "22:00"]], [["12:00", "22:00"]], [["12:00", "22:00"]], [["12:00", "22:00"]], [["12:00", "22:00"]]], "openedOn": "2026-03-22"},

  // OpenTable Saarbrücken listings checked 2026-09-24. Ratings/counts are OpenTable snapshots, not Google scores.
  {name:'Casino am Staden',category:'现代欧陆 · 法式 · 葡萄酒',group:'restaurant',rating:4.6,ratingSource:'OpenTable',reviews:50,sources:['OpenTable'],address:'Bismarckstraße 47, 66121 Saarbrücken',website:'https://www.casino-staden.de/',booking:'https://www.opentable.de/r/casino-am-staden-saarbrucken',menuNote:'时令法式与地中海菜 · 午餐周三至周日 11:30–14:30；晚餐 18:00–21:30',schedule:d([['11:30','14:30'],['18:00','21:30']],[],[],[['11:30','14:30'],['18:00','21:30']],[['11:30','14:30'],['18:00','21:30']],[['11:30','14:30'],['18:00','21:30']],[['11:30','14:30'],['18:00','21:30']])},
  {name:'Ti Amo - Trattoria',category:'意大利 · Trattoria',group:'restaurant',rating:4.4,ratingSource:'OpenTable',reviews:150,sources:['OpenTable'],address:'St. Johanner Markt 5, 66111 Saarbrücken',website:'https://www.tiamo-sb.de/',booking:'https://www.opentable.de/r/ti-amo-trattoria-saarbrucken',menuNote:'意式小份分享料理、Pasta 与 Pizza · 周五及周六营业至午夜',schedule:d([['11:30','23:00']],[['11:30','23:00']],[['11:30','23:00']],[['11:30','23:00']],[['11:30','23:00']],[['11:30','24:00']],[['11:30','24:00']])},
  {name:'QU4RTIER Restaurant & Bar',category:'德国菜 · 现代法式 · 国际',group:'restaurant',rating:4.6,ratingSource:'OpenTable',reviews:606,sources:['OpenTable'],address:'Europaallee 25a, 66113 Saarbrücken',website:'https://www.qu4rtier.de/',booking:'https://www.opentable.de/r/qu4rtier-restaurant-and-bar-saarbrucken',menuNote:'午餐周二至周五 11:30–14:30；晚餐周二至周六 17:00–22:00 · 酒吧时间另列',schedule:d([],[],[['11:30','14:30'],['17:00','22:00']],[['11:30','14:30'],['17:00','22:00']],[['11:30','14:30'],['17:00','22:00']],[['11:30','14:30'],['17:00','22:00']],[['17:00','22:00']])},
  {name:'Quacks Restaurant',category:'现代欧陆 · 地区菜 · 法式',group:'restaurant',rating:4.8,ratingSource:'OpenTable',reviews:230,sources:['OpenTable'],address:'Gersweilerstraße 43A, 66117 Saarbrücken',website:'https://www.restaurant-quack.de/',menu:'https://www.restaurant-quack.de/speisekarte',booking:'https://www.opentable.de/r/quacks-restaurant-saarbrucken',menuNote:'季节料理与 Chef’s Table · 午餐周三至周六 12:00–13:15；晚餐周二至周六 18:00–21:45',schedule:d([],[],[['18:00','21:45']],[['12:00','13:15'],['18:00','21:45']],[['12:00','13:15'],['18:00','21:45']],[['12:00','13:15'],['18:00','21:45']],[['12:00','13:15'],['18:00','21:45']])},
  {name:'Noya',category:'意大利 · 地中海 · 鸡尾酒',group:'restaurant',rating:4.5,ratingSource:'OpenTable',reviews:454,sources:['OpenTable'],address:'Faktoreistraße 4, 66111 Saarbrücken',website:'https://www.noya-sb.de/',booking:'https://www.opentable.de/r/noya-saarbrucken',menuNote:'意式与地中海料理 · 周一至周四 12:00–23:00，周五至午夜，周六 17:00 起',schedule:d([], [['12:00','23:00']],[['12:00','23:00']],[['12:00','23:00']],[['12:00','23:00']],[['12:00','24:00']],[['17:00','24:00']])},
  {name:'Ristorante Roma',category:'意大利 · 托斯卡纳',group:'restaurant',rating:4.9,ratingSource:'OpenTable',reviews:862,sources:['OpenTable'],address:'Hafenstraße 12, 66111 Saarbrücken',website:'https://www.roma-saarbruecken.de/',booking:'https://www.opentable.de/ristorante-roma',menuNote:'官网每周午市菜单 · 自 2026 年 6 月起周三至周六营业',schedule:d([],[],[],[['12:00','15:30'],['18:30','24:00']],[['12:00','15:30'],['18:30','24:00']],[['12:00','15:30'],['18:30','24:00']],[['12:00','15:30'],['18:30','24:00']])},
  {name:'Restaurant Handelshof',category:'现代法式',group:'restaurant',rating:4.8,ratingSource:'OpenTable',reviews:55,sources:['OpenTable'],address:'Wilhelm-Heinrich-Straße 17, 66117 Saarbrücken',website:'https://restaurant-handelshof.de/',booking:'https://www.opentable.de/r/restaurant-handelshof-saarbrucken',menuNote:'法式经典与创意料理 · 午餐周四、周五、周日；晚餐周四至周六',schedule:d([['12:00','15:00']],[],[],[],[['12:00','15:00'],['18:00','23:00']],[['12:00','15:00'],['18:00','23:00']],[['18:00','23:00']])},
  {name:'Le petit CINQ',category:'国际 · 法式 · 时令',group:'restaurant',rating:4.8,ratingSource:'OpenTable',reviews:56,sources:['OpenTable'],address:'Nauwieserstraße 5, 66111 Saarbrücken',website:'https://www.esplanade-sb.de/le-petit-cinq/',booking:'https://www.opentable.de/r/le-petit-cinq-saarbrucken',menuNote:'ESPLANADE 酒店第二餐厅 · 周一、周二、周日午餐及晚餐',schedule:d([['12:00','13:45'],['18:30','21:30']],[['12:00','13:45'],['18:30','21:30']],[['12:00','13:45'],['18:30','21:30']],[],[],[],[])},
  {name:'Schlachthof Brasserie',category:'法式 · Brasserie',group:'restaurant',rating:4.7,ratingSource:'OpenTable',reviews:209,sources:['OpenTable'],address:'Straße des 13. Januar 35, 66121 Saarbrücken',website:'https://www.schlachthof-brasserie.de/',booking:'https://www.opentable.de/r/schlachthof-brasserie-saarbrucken',menuNote:'法式小酒馆与葡萄酒 · 周一至周五午餐及晚餐',schedule:d([], [['12:00','14:00'],['18:00','22:00']],[['12:00','14:00'],['18:00','22:00']],[['12:00','14:00'],['18:00','22:00']],[['12:00','14:00'],['18:00','22:00']],[['12:00','14:00'],['18:00','22:00']],[])},
  {name:'Brauhaus zum Stiefel',category:'萨尔兰 · 啤酒馆',group:'restaurant',rating:4.5,ratingSource:'OpenTable',reviews:876,sources:['OpenTable'],address:'Am Stiefel 2, 66111 Saarbrücken',website:'https://www.brauhaus-zum-stiefel.de/',booking:'https://www.opentable.de/r/brauhaus-zum-stiefel-saarbrucken',menuNote:'传统萨尔兰菜与自酿啤酒 · 每天 11:00–23:00',schedule:d(...Array.from({length:7},()=>[['11:00','23:00']] as Interval[]))},
  {name:'Forsthaus Neuhaus',category:'乡村菜 · 萨尔兰 · 啤酒花园',group:'restaurant',rating:4.7,ratingSource:'OpenTable',reviews:121,sources:['OpenTable'],address:'Neuhaus 1, 66115 Saarbrücken',website:'https://forsthausneuhaus.de/',booking:'https://www.opentable.de/r/forsthaus-neuhaus-saarbrucken',menuNote:'乡村旅馆与啤酒花园 · 周三至周日 11:00–22:00',schedule:d([['11:00','22:00']],[],[],[['11:00','22:00']],[['11:00','22:00']],[['11:00','22:00']],[['11:00','22:00']])},
  {name:"L'Osteria Saarbrücken - Trierer Straße",category:'意大利 · Pizza · Pasta',group:'restaurant',rating:4.2,ratingSource:'OpenTable',reviews:8,sources:['OpenTable'],address:'Trierer Straße 33, 66111 Saarbrücken',website:'https://losteria.net/de/restaurants/restaurant/saarbruecken/',booking:'https://www.opentable.de/r/losteria-saarbrucken-trierer-strasse-saarbrucken',menuNote:'大份 Pizza、Pasta 与 Antipasti · 周五、周六营业至午夜',schedule:d([['12:00','23:00']],[['11:30','23:00']],[['11:30','23:00']],[['11:30','23:00']],[['11:30','23:00']],[['11:30','24:00']],[['11:30','24:00']])},
  {name:"L'Osteria Saarbrücken Zinzinger Straße",category:'意大利 · Pizza · Pasta',group:'restaurant',rating:4.3,ratingSource:'OpenTable',reviews:28,sources:['OpenTable'],address:'Zinzinger Straße 1–3, 66117 Saarbrücken',website:'https://losteria.net/de/restaurants/restaurant/saarbruecken-zinzinger-strasse/',booking:'https://www.opentable.de/r/losteria-saarbrucken-zinzinger-strasse-saarbrucken',menuNote:'大份 Pizza、Pasta 与周日 Brunch · 周日 09:00 起',schedule:d([['09:00','23:00']],[['11:30','23:00']],[['11:30','23:00']],[['11:30','23:00']],[['11:30','23:00']],[['11:30','24:00']],[['11:30','24:00']])},
  {name:'Gästehaus Klaus Erfort',category:'法式 · 米其林二星',group:'restaurant',rating:4.9,ratingSource:'OpenTable',reviews:679,sources:['OpenTable'],address:'Mainzer Straße 95, 66121 Saarbrücken',website:'https://www.gaestehaus-erfort.de/',booking:'https://www.opentable.de/gastehaus-klaus-erfort',menuNote:'法式高档餐饮 · 周一至周五 12:00–13:45 与 19:00–21:30',schedule:d([], ...Array.from({length:5},()=>[['12:00','13:45'],['19:00','21:30']] as Interval[]),[])},
  {name:'Steakhouse Gusto',category:'牛排 · Grill · Burger',group:'restaurant',rating:4.8,ratingSource:'OpenTable',reviews:298,sources:['OpenTable'],address:'Saarstraße 11, 66111 Saarbrücken',website:'https://www.gustosteakhouse.com/',booking:'https://www.opentable.de/steakhouse-gusto',menuNote:'牛排、Burger 与开放式熔岩石烤架 · 晚餐周一、周三至周六 18:00–22:00',schedule:d([], [['18:00','22:00']],[],[['18:00','22:00']],[['18:00','22:00']],[['18:00','22:00']],[['18:00','22:00']])},
  {name:'Hotel Restaurant Angelo',category:'现代意大利 · 地中海',group:'restaurant',rating:4.7,ratingSource:'OpenTable',reviews:13,sources:['OpenTable'],address:'Saargemünder Straße 28, 66129 Saarbrücken',website:'https://www.angelo-sb.de/',booking:'https://www.opentable.de/r/hotel-restaurant-angelo-saarbrucken',menuNote:'意式与地中海菜 · 周一至周五午餐及晚餐',schedule:d([], ...Array.from({length:5},()=>[['12:00','14:30'],['18:00','21:00']] as Interval[]),[])},
  {name:"Leidinger's Lust - Die Frühstücksmacher",category:'早餐 · Buffet',group:'restaurant',rating:4.3,ratingSource:'OpenTable',reviews:7,sources:['OpenTable'],address:'Mainzer Straße 12, 66111 Saarbrücken',website:'https://leidinger-saarbruecken.de/essen2/',booking:'https://www.opentable.de/solivo',menuNote:'酒店官网早餐 Buffet：周一至周五 06:30–11:00，周末及节假日 07:00–13:00',schedule:d([['07:00','13:00']],...Array.from({length:5},()=>[['06:30','11:00']] as Interval[]),[['07:00','13:00']])},
  {name:'Le Flâneur',category:'法式 · Bistro',group:'restaurant',rating:5.0,reviews:12,sources:['推荐补充'],address:'Sankt Johanner Markt 7–9, 66111 Saarbrücken',website:'https://www.le-flaneur.de/',menu:'https://www.le-flaneur.de/speisekarte',menuNote:'9 月 28 日开业 · 官网营业时间：周日至周四 11:30–23:00，周五及周六 11:30–24:00',schedule:d([['11:30','23:00']],...Array.from({length:4},()=>[['11:30','23:00']] as Interval[]),[['11:30','24:00']],[['11:30','24:00']]),openedOn:'2026-09-28'},
  {name:'Halbmond Restaurant',category:'阿拉伯 · 也门菜 · Café',group:'restaurant',rating:4.6,reviews:562,sources:['推荐补充'],address:'Fröschengasse 18, 66111 Saarbrücken',website:'https://www.halbmondrestaurant.de/',menuNote:'官网宣布 10 月 5 日起每日 11:30–22:30 营业；也门特色菜与屋顶露台',reopenedOn:'2026-10-05',schedule:d(...Array.from({length:7},()=>[['11:30','22:30']] as Interval[]))},
  {name:'Mangal Döner x Lukas Podolski',category:'Döner · 快餐',group:'restaurant',rating:4.3,reviews:75,sources:['推荐补充'],address:'Sulzbachstraße 2, 66111 Saarbrücken',website:'https://mangal-lp10.de/',menuNote:'RADIO SALÜ 确认 9 月 18 日在原 Café Schubert 开业；Google Maps 列周日至周四至 23:00、周五周六至次日 01:00',schedule:d([['12:00','23:00']],...Array.from({length:4},()=>[['11:30','23:00']] as Interval[]),[['11:30','25:00']],[['11:30','25:00']]),scheduleSource:'Google Maps',openedOn:'2026-09-18'},
  {name:'Why Not Sushi',category:'日式 · Sushi',group:'restaurant',rating:3.0,reviews:18,sources:['推荐补充'],address:'Bahnhofstraße 58, 66111 Saarbrücken',website:'https://wolt.com/de/deu/saarbrucken/restaurant/why-not-sushi',menuNote:'9 月 12 日开业资讯；Wolt 已上线菜单与配送，配送时间不等于堂食营业时间',schedule:null,openedOn:'2026-09-12'},
  {name:'Sneaky',category:'街头小吃 · Burger · Tacos',group:'restaurant',rating:4.6,reviews:56,sources:['推荐补充'],address:'Kaltenbachstraße 3, 66111 Saarbrücken',website:'https://www.neueroeffnung.info/saarbruecken/sneaky-street-food-laden',menuNote:'9 月 1 日开业 · Burger、Birria Tacos 与冰淇淋；营业时段据开业目录，SR 报道对周五、周六打烊时间有不同记录',schedule:d([],[],[['12:00','22:00']],[['12:00','22:00']],[['12:00','22:00']],[['12:00','24:00']],[['12:00','24:00']]),openedOn:'2026-09-01'},
  {name:'Amidos & Helmi',category:'突尼斯 · 地中海 · Burger',group:'restaurant',rating:5.0,reviews:73,sources:['推荐补充'],address:'Mainzer Straße 102, 66121 Saarbrücken',website:'https://amidos-helmi.de/',menuNote:'官网宣布 8 月 7 日开业 · 突尼斯家常菜、Couscous 与 Grill/Burger；营业时段据地区开业资讯',schedule:d([['12:00','15:00'],['18:00','22:30']],[['11:30','15:00'],['18:00','23:00']],[],[['11:30','15:00'],['18:00','23:00']],[['11:30','15:00'],['18:00','23:00']],[['11:30','15:00'],['18:00','23:30']],[['12:00','15:00'],['18:00','23:30']]),openedOn:'2026-08-07'},
  {name:'Berliner Döner by Kemo',category:'Döner · 快餐',group:'restaurant',rating:null,reviews:null,sources:['推荐补充'],address:'Bergstraße 68, 66115 Saarbrücken',website:'https://bald-in.de/laden/7fbb1644-2c86-459c-b77c-fb222bcc659a',menuNote:'地区开业资讯确认 8 月 1 日开业；本店营业时段尚未可靠核实',schedule:null,openedOn:'2026-08-01',photoIsIllustration:true},
  {name:'Pasteria al Dente',category:'意式 · Pasta',group:'restaurant',rating:4.5,reviews:52,sources:['推荐补充'],address:'Sankt-Johanner-Markt 22, 66111 Saarbrücken',website:'https://pasteria-al-dente.eatbu.com/',menu:'https://pasteria-al-dente.eatbu.com/',menuNote:'7 月 7 日开业 · 官网菜单与营业时间：周二休息，周日至 21:30，其余营业日至 23:00',schedule:d([['09:00','21:30']],[['09:00','23:00']],[],[['09:00','23:00']],[['09:00','23:00']],[['09:00','23:00']],[['09:00','23:00']]),openedOn:'2026-07-07'},
  {name:'Schnitzery',category:'Schnitzel · 快餐',group:'restaurant',rating:4.1,reviews:100,sources:['推荐补充'],address:'Berliner Promenade 18, 66111 Saarbrücken',website:'https://www.neueroeffnung.info/saarbruecken/schnitzery_6',menuNote:'6 月 15 日开业 · Schnitzel、Burger 与 Bowls；时段据地区开业资讯',schedule:d([['11:00','23:00']],...Array.from({length:4},()=>[['11:00','23:00']] as Interval[]),[['11:00','25:00']],[['11:00','25:00']]),openedOn:'2026-06-15'},
  // Added 2026-09-15. Official menus/addresses; Memory Burger and Im kleinen Restaurant hours from official sites.
  // Google rating snapshots: Wanderlog Tbilissi (2700151), Krua Thai (3039337);
  // Restaurant Guru Memory-Burger-Saarbrucken-Saarbrucken and Limoncello-Saarbrucken.
  // Original additions below; the 2026-09-21 source review is documented in docs/data-review-2026-09-21.md.
  { name:'Restaurant Tbilissi', category:'格鲁吉亚菜 · Georgian', group:'restaurant', rating:4.7, reviews:410, sources:['推荐补充'], address:'Saarstraße 13, 66111 Saarbrücken', website:'https://tbilissi-georgisches-restaurant.eatbu.com/', menu:"https://cdn.website.dish.co/media/88/c3/9926039/Speisekarte.pdf", menuNote:"Google Maps 列周二至周六 18:00–23:00，周日、周一休息；官网已列周二至周六时段", schedule:d([],[],...Array.from({length:5},()=>[['18:00','23:00']] as Interval[])), scheduleSource:'Google Maps' },
  { name:'Memory Burger Saarbrücken', category:'Burger · 美式', group:'restaurant', rating:4.8, reviews:865, sources:['推荐补充'], address:'Ufergasse 2, 66111 Saarbrücken', website:'https://saarbruecken.memory-burger.de/', menu:"https://saarbruecken.memory-burger.de/wp-content/uploads/2026/07/Kopie-von-SB-memory.pdf", menuNote:"官网 PDF 菜单 · 牛肉、鸡肉与素食汉堡、Bowls", schedule:d([['17:00','22:00']],[['12:00','22:00']],[['12:00','22:00']],[['12:00','22:00']],[['12:00','22:00']],[['12:00','23:00']],[['12:00','23:00']]) },
  { name:'Krua Thai Restaurant', category:'泰国菜', group:'restaurant', rating:4.6, reviews:319, sources:['推荐补充'], address:'Mainzer Straße 71, 66121 Saarbrücken', website:'http://www.kruathai-sb.de/', menu:'https://de.restaurantguru.com/Krua-Thai-Saarbrucken/menu', menuNote:'Google Maps 列周二至周日 18:00–23:00，周一休息；其他目录所列午市不一致', schedule:d([['18:00','23:00']],[],...Array.from({length:5},()=>[['18:00','23:00']] as Interval[])), scheduleSource:'Google Maps' },
  { name:'Im kleinen Restaurant', category:'意大利 · 地中海', group:'restaurant', rating:4.7, reviews:276, sources:['推荐补充'], address:'Gersweiler Straße 39–43, 66117 Saarbrücken', website:'https://www.im-kleinen-restaurant.de/', menu:'https://www.im-kleinen-restaurant.de/wp-content/uploads/2025/09/Speisekarte.pdf', menuNote:'官网菜单 · Pasta、牛排与地中海料理 · 现址位于 Hotel Crystal，节假日 17:30–22:00', schedule:d([['11:30','14:00'],['17:30','22:00']],[],[['17:30','22:00']],[['17:30','22:00']],[['17:30','22:00']],[['17:30','22:00']],[['17:30','22:00']]) },

  // Added 2026-09-15. Hours/menu: official sites. Rating snapshots: Wanderlog
  // https://wanderlog.com/place/details/2700258/osaka-restaurant
  // https://wanderlog.com/sv/list/geoCategory/466832/best-asian-food-in-saarbrucken
  // MORAK's Google review count is unavailable; do not substitute another platform's count.
  { name:'Osaka Restaurant', category:'日式 · Sushi', group:'restaurant', rating:4.6, reviews:1379, sources:['推荐补充'], address:'Dudweilerstraße 1, 66111 Saarbrücken', website:'https://www.sushi-saarbruecken.de/', maps:'https://www.google.com/maps/place/Osaka+Restaurant/data=!4m6!3m5!1s0x4795b402a9bcea05:0xf977a751f59e23ba!8m2!3d49.2350272!4d6.9949208!16s%2Fg%2F1tfjdgy6', menu:'https://www.sushi-saarbruecken.de/produkt-kategorie/menus/', menuNote:'官网菜单 · Sushi、Gyoza 与日式料理', schedule:d([['18:00','23:00']],[['12:00','15:00'],['18:00','23:00']],[],[['12:00','15:00'],['18:00','23:00']],[['12:00','15:00'],['18:00','23:00']],[['12:00','15:00'],['18:00','23:00']],[['12:00','15:00'],['18:00','23:00']]) },
  { name:'MORAK', category:'韩国菜 · Korean BBQ', group:'restaurant', rating:4.5, reviews:344, sources:['推荐补充'], address:'Saaruferstraße 12, 66117 Saarbrücken', website:'https://morak.online/', maps:'https://www.google.com/maps/place/MORAK/data=!4m6!3m5!1s0x4795b5004d42cbf7:0xfc682a11b6ee68fe!8m2!3d49.2353783!4d6.9905317!16s%2Fg%2F11yd71bytg', menu:'https://morak.online/menu', menuNote:"Google Maps 列周一至周三 17:30–22:00；周四至周日另有 12:00–15:00 午市", schedule:d([['12:00','15:00'],['18:00','22:00']],...Array.from({length:3},()=>[['17:30','22:00']] as Interval[]),[['12:00','15:00'],['18:00','22:00']],[['12:00','15:00'],['18:00','23:00']],[['12:00','15:00'],['18:00','23:00']]), scheduleSource:'Google Maps' },
  // Added 2026-09-14: official address/menu/hours; Google rating snapshot via https://wanderlog.com/ru/place/details/2700155/cafe-especial-saarbr%C3%BCcken.
  // The official site gives no fixed closing time, so live opening status remains unconfirmed.
  { name:'CAFE ESPECIAL Saarbrücken', category:'墨西哥菜 · Tex-Mex · 鸡尾酒', group:'restaurant', rating:4.3, reviews:2411, sources:['Saarbrücken'], address:'Kronenstraße 1, 66111 Saarbrücken', website:'https://www.cafe-especial.com/sarrebruck/', maps:'https://www.google.com/maps/place/CAFE+ESPECIAL+Saarbr%C3%BCcken/data=!4m6!3m5!1s0x4795b41cdfaeeda7:0x27a61a0c7e539a4!8m2!3d49.2321235!4d6.9958925!16s%2Fg%2F1tj7c_6t', menu:'https://www.cafe-especial.com/druckversion/saarbruecken-speisekarte/', menuNote:'Google Maps 列周日至周四至午夜、周五及周六至 01:00；官网只列开门时间，打烊时间为 open end', schedule:d([['12:00','24:00']],...Array.from({length:4},()=>[['11:30','24:00']] as Interval[]),[['11:30','25:00']],[['11:30','25:00']]), scheduleSource:'Google Maps' },
  // Listing snapshots: Wanderlog, checked 2026-09-09. the bakery's hours differ across sources.
  { name:'the bakery', category:'咖啡 · 烘焙 · 早餐', group:'bakery', rating:4.6, reviews:656, sources:['Saarbrücken','Café'], address:'Gerberstraße 7, 66111 Saarbrücken', website:'https://einkaufen.saarbruecken.de/genuss/gastronomie_detail/gastronomy-660d1de8d6625', maps:'https://www.google.com/maps?cid=4958234852955040279', menuNote:'可颂、Quiche 与蛋糕 · 市政目录列周一至周六 09:00–18:00，周日休息', schedule:d([], ...Array.from({length:6},()=>[['09:00','18:00']] as Interval[])) },
  { name:'Bäckerei - Konditorei Erhard Heil', category:'面包房 · 糕点', group:'bakery', rating:4.4, reviews:437, sources:['Saarbrücken'], address:'Bahnhofstraße 101A, 66111 Saarbrücken', website:'https://www.facebook.com/heilbackerei', maps:'https://www.google.com/maps?cid=7006462121478122254', menuNote:'面包、Apfelkrapfen 与蛋糕', schedule:d([], ...Array.from({length:6},()=>[['06:00','18:00']] as Interval[])) },
  { name:'Café Bisous', category:'咖啡 · Brunch', group:'cafe', rating:4.7, reviews:288, sources:['Saarbrücken','Café'], address:'Mainzer Str. 72, 66121 Saarbrücken', website:'https://bisous-saarbruecken.eatbu.com/', menu:"https://cdn.website.dish.co/media/4a/a3/9326801/Speisekarte.pdf", menuNote:"官网 PDF 菜单 · Pancakes、Avocado Toast", schedule:d([['09:00','16:00']],[['09:00','16:00']],[],[['09:00','16:00']],[['09:00','16:00']],[['09:00','16:00']],[['09:00','16:00']]) },
  { name:'Siam', category:'泰国菜', group:'restaurant', rating:4.4, reviews:484, sources:['Saarbrücken'], address:'Mainzer Str. 22, 66111 Saarbrücken', website:'https://www.restaurant-siam.de/', menu:'https://www.restaurant-siam.de/speisekarte', menuNote:'官网菜单 · 泰式咖喱、脆皮鸭', schedule:d([],[],[['12:00','15:00'],['18:00','22:00']],[['12:00','15:00'],['18:00','22:00']],[['12:00','15:00'],['18:00','22:00']],[['12:00','15:00'],['18:00','23:00']],[['18:00','23:00']]) },
  { name:'F.A.K | Fresh Asian Kitchen', category:'亚洲融合菜', group:'restaurant', rating:4.6, reviews:326, sources:['Saarbrücken'], address:'Berliner Promenade 18, 66111 Saarbrücken', website:'https://fak-food.com/', menuNote:"Google Maps 列周一至周五 11:30–15:00、17:30–21:30；周六 12:00–15:00、17:00–22:00；周日 15:00–21:30；官网午市有两种结束时间", schedule:d([['15:00','21:30']],...Array.from({length:5},()=>[['11:30','15:00'],['17:30','21:30']] as Interval[]),[['12:00','15:00'],['17:00','22:00']]), scheduleSource:'Google Maps' },
  { name:'Buffalo Steakhaus', category:'牛排馆', group:'restaurant', rating:4.3, reviews:1275, sources:['Saarbrücken'], address:'Betzenstraße 10, 66111 Saarbrücken', website:'http://www.buffalo-saar.de/', menuNote:'官网菜单 · Steakhouse', schedule:d(...Array.from({length:7},()=>[['11:30','22:30']] as Interval[])) },
  { name:'Mayfair Coffee, Bakery & More', category:'咖啡 · 烘焙', group:'cafe', rating:4.9, reviews:198, sources:['Saarbrücken','Café'], address:'Futterstraße 9, 66111 Saarbrücken', website:'https://www.instagram.com/mayfaircoffee_/', menuNote:'菜单照片 · 咖啡、可颂与甜点', schedule:d([['09:30','21:00']],[['08:30','20:00']],[['08:30','20:00']],[['08:30','20:00']],[['08:30','20:00']],[['08:30','20:00']],[['09:30','21:00']]) },
  { name:'masons Restaurant Saarbrücken', category:'环球小盘 · All-you-can-eat', group:'restaurant', rating:4.6, reviews:4217, sources:['Saarbrücken'], address:'Futterstraße 18, 66111 Saarbrücken', website:'https://masons-restaurant.de/', menu:'https://masons-restaurant.de/wp-content/uploads/files/Speisekarte-DE.pdf', menuNote:'2026 官网菜单 · 环球主题小盘', schedule:d(...Array.from({length:7},()=>[['17:00','23:00']] as Interval[])) },
  { name:'Bistro Kambodscha', category:'柬埔寨菜', group:'restaurant', rating:4.8, reviews:262, sources:['Saarbrücken'], address:'Karcherstraße 22, 66111 Saarbrücken', website:'https://instagram.com/bistro_kambodscha', menuNote:'菜单照片 · 高棉家常菜', schedule:d([], [['11:30','14:30'],['18:00','24:00']],[['11:30','14:30'],['18:00','24:00']],[['11:30','14:30'],['18:00','24:00']],[['11:30','14:30'],['18:00','24:00']],[['11:30','14:30'],['18:00','24:00']],[['11:30','14:30'],['18:00','24:00']]) },
  { name:'Mangal Mezze & Grill', category:'土耳其 · Mezze', group:'restaurant', rating:4.8, reviews:935, sources:['Saarbrücken'], address:'Berliner Promenade 1–2, 66111 Saarbrücken', website:'https://www.mangal-saarbruecken.de/', menuNote:'官网菜单 · Mezze 与炭火烧烤', schedule:d([['12:00','21:00']],...Array.from({length:5},()=>[['18:00','22:00']] as Interval[]),[['13:00','22:00']]) },
  { name:'Viet Quan', category:'越南菜', group:'restaurant', rating:4.5, reviews:552, sources:['Saarbrücken'], address:'Viktoriastraße 11, 66111 Saarbrücken', website:'https://bestellen-vietquan.de/', menuNote:'在线点单菜单 · 越南粉与米饭', schedule:d([], [['11:00','22:00']],[['11:00','22:00']],[['11:00','16:00']],[['11:00','22:00']],[['11:00','22:00']],[['11:00','22:00']]) },
  { name:'NIKUYA - Japanese Korea Grill & BBQ', category:'日韩烧肉', group:'restaurant', rating:4.8, reviews:163, sources:['Saarbrücken'], address:'Trierer Str. 16, 66111 Saarbrücken', website:'https://www.nikuya-bbq.de/', menuNote:'官网菜单 · Japanese/Korean BBQ', schedule:d([['12:00','14:30'],['17:00','22:30']],[['17:00','22:30']],[['17:00','22:30']],[['17:00','22:30']],[['17:00','22:30']],[['17:00','22:30']],[['12:00','14:30'],['17:00','22:30']]) },
  { name:'Grand Asia', category:'亚洲自助 · Sushi', group:'restaurant', rating:4.6, reviews:2103, sources:['Saarbrücken'], address:'Trierer Str. 14, 66111 Saarbrücken', website:"https://grand-asia.de/restaurant-home/", menu:"https://grand-asia.de/speisekarte/", menuNote:"官网菜单 · 午市周五至周日；厨房提前 30 分钟结束", schedule:d([['12:00','15:00'],['17:30','23:00']],...Array.from({length:4},()=>[['17:30','23:00']] as Interval[]),[['12:00','15:00'],['17:30','24:00']],[['12:00','15:00'],['17:30','24:00']]) },
  { name:'Ratskeller Saarbrücken', category:'萨尔兰 · 德国菜', group:'restaurant', rating:4.1, reviews:1185, sources:['Saarbrücken','Starred'], address:'Rathausplatz 1, 66111 Saarbrücken', website:'https://www.ratskeller-saarbruecken.de/', menu:'https://www.ratskeller-saarbruecken.de/speisen/', menuNote:"Google Maps 列周一至周六 17:00 起，周一、五、六至 01:00，其余至午夜；周日休息；官网未列结束时间", schedule:d([], [['17:00','25:00']],[['17:00','24:00']],[['17:00','24:00']],[['17:00','24:00']],[['17:00','25:00']],[['17:00','25:00']]), scheduleSource:'Google Maps' },
  { name:'Johanna cafétéria', category:'咖啡 · 早餐', group:'cafe', rating:4.2, reviews:720, sources:['Saarbrücken','Café'], address:'Mainzer Str. 131, 66121 Saarbrücken', website:"https://www.johanna.saarland/", menu:"https://www.johanna.saarland/speisekarte", menuNote:"官网菜单 · 早餐与蛋糕 · 仅支持银行卡及移动支付", schedule:d([['10:00','16:00']],[['08:00','16:00']],[['08:00','16:00']],[['08:00','16:00']],[['08:00','16:00']],[['08:00','16:00']],[['10:00','16:00']]) },
  { name:'Quanah Schott Pâtisserie', category:'法式甜点', group:'dessert', rating:4.8, reviews:243, sources:['Saarbrücken','Café'], address:'Mainzer Str. 86, 66121 Saarbrücken', website:'https://www.facebook.com/QuanahSchottPatisserie/', menuNote:'当季甜点柜 · 法式 Pâtisserie', schedule:d([['09:00','12:00'],['14:00','16:00']],[],[],[['11:00','18:00']],[['11:00','18:00']],[['11:00','18:00']],[['09:00','18:00']]) },
  { name:'Cafe Bali', category:'印尼菜', group:'restaurant', rating:4.6, reviews:794, sources:['Saarbrücken'], address:'Rotenbergstraße 10, 66111 Saarbrücken', website:'https://www.cafebali.de/', menu:"https://www.cafebali.de/menu", menuNote:'官网菜单 · 印尼家常菜', schedule:d([['18:00','23:00']],[],[],[['18:00','23:00']],[['18:00','23:00']],[['18:00','23:00']],[['18:00','23:00']]) },
  { name:'LUUC Café Deli Wein - Saarbrücken', category:'咖啡 · Deli · 葡萄酒', group:'cafe', rating:4.4, reviews:1152, sources:['Saarbrücken'], address:'Türkenstraße 17, 66111 Saarbrücken', website:'https://cafeluuc.de/luuc-cafe-saarbruecken', booking:'https://www.opentable.de/r/luuc-cafe-saarbrucken', menuNote:'官网菜单 · Brunch、Deli 与葡萄酒', schedule:d([['09:30','20:30']],[['09:30','20:30']],[['09:30','20:30']],[['09:30','20:30']],[['09:30','22:00']],[['09:30','22:00']],[['09:30','22:00']]) },
  { name:'Thonet', category:'咖啡 · Bar', group:'cafe', rating:4.4, reviews:297, sources:['Saarbrücken'], address:'Katholisch-Kirch-Straße 24, 66111 Saarbrücken', menuNote:'Google 菜单照片 · 咖啡与饮品', schedule:d([['09:00','21:00']],[['09:30','22:00']],[['09:30','22:00']],[['09:30','22:00']],[['09:30','22:00']],[['09:00','23:00']],[['09:00','23:00']]) },
  { name:'Café Kunstherz', category:'艺术咖啡馆', group:'cafe', rating:4.4, reviews:185, sources:['Saarbrücken','Café'], address:'Bismarckstraße 11–15, 66111 Saarbrücken', website:'https://www.kunstherzcafe.de/', menuNote:'官网菜单 · 咖啡、蛋糕与文化活动', schedule:d([['10:00','18:00']],[],[['10:00','18:00']],[['10:00','20:00']],[['10:00','18:00']],[['10:00','18:00']],[['10:00','18:00']]) },
  { name:'Schrill-Saarbrücken', category:'咖啡 · 甜点', group:'cafe', rating:4.6, reviews:191, sources:['Saarbrücken','Café'], address:'Försterstraße 22, 66111 Saarbrücken', website:'https://xmeri.com/schrill-saarbruecken/', menuNote:'菜单照片 · 咖啡与甜点', schedule:d([['10:00','18:00']],[],[],[['15:30','18:00']],[['10:00','18:00']],[['10:00','18:00']],[['10:00','18:00']]) },
  { name:'caffeo', category:'精品咖啡', group:'cafe', rating:4.8, reviews:172, sources:['Saarbrücken'], address:'Großherzog-Friedrich-Straße 40, 66111 Saarbrücken', website:'https://www.facebook.com/caffeos', menuNote:'Google Maps 列周一至周五 10:00–19:00、周六 12:00–18:00、周日休息；其他目录记录不一致', schedule:d([], ...Array.from({length:5},()=>[['10:00','19:00']] as Interval[]),[['12:00','18:00']]), scheduleSource:'Google Maps' },
  { name:'AC Saarbrücken', category:'校园餐厅 · 国际菜', group:'restaurant', rating:4.5, reviews:248, sources:['Saarbrücken'], address:'Campus A3 2, 66123 Saarbrücken', website:'https://www.ac-sb.de/', menuNote:'官网周菜单 · 午餐', schedule:d([], [['11:30','16:00']],[['11:30','16:00']],[['11:30','16:00']],[['11:30','16:00']],[['11:30','16:00']],[]) },
  { name:'Moccachili', category:'Bio Café · Bistro', group:'cafe', rating:4.5, reviews:325, sources:['Saarbrücken'], address:'Ev.-Kirch-Straße 8, 66111 Saarbrücken', website:'https://moccachili.blogspot.com/p/tagliche-leckereien.html', menuNote:"Google Maps 列周一至周六 09:30–18:00、周日 13:00–18:00；市政目录所列打烊时间较晚", schedule:d([['13:00','18:00']],...Array.from({length:6},()=>[['09:30','18:00']] as Interval[])), scheduleSource:'Google Maps' },
  { name:'BOCCA Pastabar', category:'意大利 · Pasta', group:'restaurant', rating:4.7, reviews:169, sources:['Saarbrücken'], address:'Mainzer Str. 54, 66121 Saarbrücken', website:'https://www.bocca-pastabar.com/', menuNote:'官网菜单 · 手工 Pasta', schedule:d([['17:00','21:00']],...Array.from({length:5},()=>[['12:00','14:30'],['18:00','23:00']] as Interval[]),[['18:00','24:00']]) },
  { name:'Kulturcafé', category:'咖啡 · 早餐 · Bar', group:'cafe', rating:4.6, reviews:812, sources:['Saarbrücken'], address:'Sankt-Johanner-Markt 24, 66111 Saarbrücken', website:'https://kulturcafe-sb.de/', menu:"https://kulturcafe-sb.de/speisekarte.html", menuNote:"Google Maps 列周一至周六 08:30–24:00、周日 09:00–24:00；官网周日至 23:00，其他日 open end", schedule:d([['09:00','24:00']],...Array.from({length:6},()=>[['08:30','24:00']] as Interval[])), scheduleSource:'Google Maps' },
  { name:'EDEN', category:'融合菜 · Bowls · Falafel', group:'restaurant', rating:4.6, reviews:344, sources:['Saarbrücken','Starred'], address:'Mainzer Str. 26, 66111 Saarbrücken', website:'https://eden-saarbruecken.de/', menuNote:'官网/外卖菜单 · Pasta、Bowls、Falafel', schedule:d([],...Array.from({length:6},()=>[['17:00','22:00']] as Interval[])) },
  { name:'Brot und Sinne', category:'面包房 · 咖啡', group:'bakery', rating:4.7, reviews:530, sources:['Saarbrücken'], address:'Kaltenbachstraße 6, 66111 Saarbrücken', website:'https://www.brotundsinne.de/', menuNote:"Google Maps 与市政目录列周一至周五 07:30–19:30、周六 08:00–19:30、周日 08:30–18:00；面包行业目录工作日至 18:00", schedule:d([['08:30','18:00']],...Array.from({length:5},()=>[['07:30','19:30']] as Interval[]),[['08:00','19:30']]), scheduleSource:'Google Maps' },
  { name:'Brot & Sinne - Quartier Mainzer Strasse', category:'面包房 · 咖啡', group:'bakery', rating:4.6, reviews:164, sources:['Café'], address:'Mainzer Str. 86, 66121 Saarbrücken', website:'https://www.brotundsinne.de/', menuNote:'当日面包、早餐与午餐', schedule:d([['08:00','12:00']],[['07:00','19:00']],[['07:00','19:00']],[['07:00','19:00']],[['07:00','19:00']],[['07:00','19:00']],[['07:00','19:00']]) },
  { name:'Black Hen Rösthandwerk Saarbrücken', category:'咖啡烘焙坊', group:'cafe', rating:5.0, reviews:159, sources:['Café'], address:'Zum Gerlen 5, 66131 Saarbrücken', website:'https://www.blackhen.de/', menuNote:"咖啡豆与烘焙工作室 · 官网厂店营业时间：周三 14:00–17:00", schedule:d([],[],[],[['14:00','17:00']],[],[],[]) },
  { name:'Fredrik - Saarbrücken', category:'北欧咖啡 · Brunch', group:'cafe', rating:4.4, reviews:931, sources:['Café'], address:'Keplerstraße 12, 66117 Saarbrücken', website:"https://www.fredrik.saarland/", menu:"https://www.fredrik.saarland/speisekarte", menuNote:'官网菜单 · Brunch 与北欧风咖啡', schedule:d([['10:00','17:00']],[['09:00','17:00']],[['09:00','17:00']],[['09:00','17:00']],[['09:00','17:00']],[['09:00','17:00']],[['10:00','17:00']]) },
  { name:'Café Lolo', category:'咖啡 · Konditorei', group:'dessert', rating:4.7, reviews:2169, sources:['Café'], address:'Heuduckstraße 67, 66117 Saarbrücken', website:'https://www.cafe-lolo.de/', menu:'https://cafe-lolo.de/images/sortiment.pdf', menuNote:'2026 Sortiment · 蛋糕与 Butterkuchen', schedule:d([['08:00','18:00']],[],[['07:00','18:00']],[['07:00','18:00']],[['07:00','18:00']],[['07:00','18:00']],[['07:00','18:00']]) },
  { name:'Palazzo Sandro | Saarbrücken', category:'意式冰淇淋', group:'dessert', rating:4.3, reviews:183, sources:['Starred'], address:'Bahnhofstraße 16, 66111 Saarbrücken', website:'https://palazzosandro.de/', menu:"https://palazzosandro.de/", menuNote:"Google Maps 列周一至周六 11:30–21:00、周日 12:30–21:00；官网同址两栏开门时间略有差异", schedule:d([['12:30','21:00']],...Array.from({length:6},()=>[['11:30','21:00']] as Interval[])), scheduleSource:'Google Maps' },
  { name:'Zapata - Saarbrücken', category:'西班牙 · Tapas', group:'restaurant', rating:4.2, reviews:1150, sources:['Starred'], address:'Hinterhof, Mainzer Str. 8, 66111 Saarbrücken', website:'https://www.zapata.saarland/', menu:'https://www.zapata.saarland/speisekarte', menuNote:'最新官网菜单 · Tapas、Social Plates 与 Drinks', schedule:d([['17:30','23:00']],[['17:30','23:00']],[['17:30','23:00']],[['17:30','23:00']],[['17:30','23:00']],[['17:30','24:00']],[['17:30','24:00']]) },
  { name:'Pizza Gotti', category:'那不勒斯披萨 · 意大利菜', group:'restaurant', rating:4.8, reviews:761, sources:['推荐补充'], address:'Mainzer Str. 8, 66111 Saarbrücken', website:'https://www.gotti-pizza.de/', menu:'https://www.gotti-pizza.de/speisekarte', menuNote:'2026 官网菜单 · 那不勒斯披萨、DOP 食材与创意口味', schedule:d([['17:00','21:00']],[['12:00','22:00']],[['12:00','22:00']],[['12:00','22:00']],[['12:00','22:00']],[['12:00','22:00']],[['12:00','22:00']]) },
  { name:'BABAQ', category:'Döner · 土耳其', group:'restaurant', rating:4.3, reviews:306, sources:['Starred'], address:'Bahnhofstraße 43A, 66111 Saarbrücken', website:'http://www.babaq.de/', menuNote:'官网/Google 菜单 · Döner 与 Grill', schedule:d([], [['11:30','22:00']],[['11:30','22:00']],[['11:30','22:00']],[['11:30','22:00']],[['11:30','25:00']],[['11:30','25:00']]) },
  { name:'Cafe Extrablatt Saarbrücken', category:'全天咖啡 · 早餐 · Bistro', group:'cafe', rating:4.1, reviews:253, sources:['推荐补充','Café'], address:'Bahnhofstraße 18, 66111 Saarbrücken', website:'https://cafe-extrablatt.de/standorte/details/cafe-extrablatt-saarbruecken', menu:'https://cafe-extrablatt.de/fileadmin/pdf/Speisekarten/Cafe-Extrablatt-Saarbruecken-Speisekarte-Web.pdf', menuNote:"Google Maps 列周日至周四 09:00–24:00、周五及周六至 01:00；官网称每天 09:00 至 open end", schedule:d([['09:00','24:00']],...Array.from({length:4},()=>[['09:00','24:00']] as Interval[]),[['09:00','25:00']],[['09:00','25:00']]), scheduleSource:'Google Maps' },
  { name:'Galicia Tapas', category:'Galicia · Tapas · 海鲜', group:'restaurant', rating:4.8, reviews:567, sources:['推荐补充'], address:'Bliesweg 2, 66113 Saarbrücken', website:'https://galicia-tapas.de/', menuNote:'官网菜单 · Galician Tapas、海鲜与分享套餐', schedule:d([['12:00','14:30'],['17:30','22:00']],[['17:30','22:30']],[],[['17:30','22:30']],[['17:30','22:30']],[['17:30','23:00']],[['17:30','23:00']]) },
  { name:'Flammerie Alt-Saarbrücken', category:'Flammkuchen · 法式', group:'restaurant', rating:4.8, reviews:844, sources:['推荐补充'], address:'Neumarkt 9, 66117 Saarbrücken', website:"https://einkaufen.saarbruecken.de/genuss/gastronomie_detail/gastronomy-64cbb0e3d06c9", maps:'https://www.google.com/maps/place/Flammerie+Alt-Saarbr%C3%BCcken/data=!4m6!3m5!1s0x4795b4024b8386d1:0x965b8e0ab908f822!8m2!3d49.2329561!4d6.9901929!16s%2Fg%2F11d_cxzd65', menuNote:"Google Maps 显示整周关闭，市政目录仍列周二至周日营业；目前无法确认实际状态，请先致电 0681 92747902", schedule:null },
  { name:'Café Batela', category:'早餐 · Brunch · 咖啡', group:'cafe', rating:4.7, reviews:482, sources:['推荐补充','Café'], address:'Mainzer Str. 4, 66111 Saarbrücken', website:'https://cafe-batela.de/', menuNote:'官网菜单 · 早餐、Brunch 与精品咖啡', schedule:d([['09:30','16:00']],[['09:00','16:00']],[['09:00','16:00']],[['09:00','16:00']],[['09:00','16:00']],[['09:00','16:00']],[['09:30','16:00']]) },
  { name:'Café am Steg', category:'咖啡 · 早餐 · 烘焙', group:'cafe', rating:4.6, reviews:107, sources:['推荐补充','Café'], address:'Am Steg 3, 66111 Saarbrücken', website:'https://www.cafe-am-steg.de/', menuNote:'官网菜单 · 咖啡、早餐、Panini 与每日烘焙', schedule:d([['10:00','18:00']],[],[['10:00','18:00']],[['10:00','18:00']],[['10:00','18:00']],[['10:00','18:00']],[['10:00','18:00']]) },
  { name:'Le Comptoir', category:'法式 · Fine dining', group:'restaurant', rating:4.8, reviews:173, sources:['推荐补充'], address:'Försterstraße 15, 66111 Saarbrücken', website:'https://www.lecomptoir-saarbruecken.de/', menuNote:'官网信息 · 精致法餐与季节菜单', schedule:d([],[],[['18:30','23:30']],[['18:30','23:30']],[['18:30','23:30']],[['18:30','23:30']],[['18:30','23:30']]) },
  { name:'ESPLANADE Saarbrücken', category:'现代欧陆 · 米其林二星', group:'restaurant', rating:4.6, reviews:364, sources:['推荐补充','Starred'], address:'Nauwieserstraße 5, 66111 Saarbrücken', website:'https://www.esplanade-sb.de/', menu:"https://www.esplanade-sb.de/restaurant-saarbruecken/", booking:'https://www.opentable.de/esplanade', menuNote:"Google Maps 列周三至周六 12:00–14:00、18:30–22:00；官网宣布 10 月 11–18 日休假，21 日晚恢复营业", schedule:d([],[],[],...Array.from({length:4},()=>[['12:00','14:00'],['18:30','22:00']] as Interval[])), scheduleSource:'Google Maps', temporaryClosure:{from:'2026-10-11',through:'2026-10-18',resume:'21.10 18:30'}, scheduleExceptions:{'2026-10-21':[['18:30','22:00']]} },
  { name:'Restaurant Le Schloss Halberg', category:'法式 · 德国 · 景观餐厅', group:'restaurant', rating:4.7, reviews:417, sources:['推荐补充'], address:'Franz-Mai-Straße 1, 66121 Saarbrücken', website:'https://www.le-schloss-halberg.de/', menuNote:'官网菜单 · 经典法餐、德国菜与季节菜单', schedule:d([], [['12:00','14:00'],['18:30','22:00']],[['12:00','14:00'],['18:30','22:00']],[['12:00','14:00']],[['12:00','14:00'],['18:30','22:00']],[['12:00','14:00'],['18:30','22:00']],[['18:30','22:00']]) },
  { name:'Dang Dang', category:'中国菜 · Dim Sum · 川菜', group:'restaurant', rating:4.8, reviews:83, sources:['推荐补充'], address:'Kappenstraße 9, 66111 Saarbrücken', website:'https://asia-zone.com/website/dang-dang-saarbruecken', menu:'https://asia-zone.com/website/dang-dang-saarbruecken', menuNote:"第三方菜单预览（非店家官网）· 菜品、价格及时间请向店家确认", schedule:d([['17:30','22:30']],[],[['11:30','15:00'],['17:30','22:30']],[['11:30','15:00'],['17:30','22:30']],[['11:30','15:00'],['17:30','22:30']],[['11:30','15:00'],['17:30','22:30']],[['11:30','22:30']]) },
  { name:'China Restaurant', category:'中国菜 · 火锅 · 上海家常菜', group:'restaurant', rating:4.4, reviews:749, sources:['推荐补充'], address:'Hohenzollernstraße 21, 66117 Saarbrücken', website:'https://www.facebook.com/ChinaRestaurant.sb', menu:'https://weur-cdn.menuweb.menu/storage/media/companies_menu_pdf/93008743/china-restaurant-saarbrucken-speisekarte.pdf', menuNote:'2026 菜单 · 火锅、麻婆豆腐与脆皮鸭', schedule:d(...Array.from({length:7},()=>[['11:30','15:00'],['17:30','23:00']] as Interval[])) },
  { name:'Hongkong Imbiss', category:'中国菜 · 素食 · Su-Ya', group:'restaurant', rating:4.3, reviews:240, sources:['推荐补充'], address:'Gerberstraße 18, 66111 Saarbrücken', website:'https://www.facebook.com/HongkongImbiss/', menuNote:'菜单与每日推荐 · 豆腐、素鸭和家常小炒', schedule:d([], [['11:30','21:00']],[['11:30','21:00']],[['11:30','21:00']],[['11:30','21:00']],[['11:30','21:00']],[['11:30','21:00']]) },
];

export const placeCoordinates: Record<string, [number, number]> = {
  'Amidos & Helmi':[49.22978,7.00857], // OpenStreetMap node 6017949512.
  'Berliner Döner by Kemo':[49.241189,6.9443032], // Bald-in location page.
  'Schnitzery':[49.2344520,6.9931977], // Berliner Promenade 18; same address as F.A.K.
  'Restaurant Tbilissi':[49.232196807,6.995368003], // Waze venue at Saarstraße 13.
  'Memory Burger Saarbrücken':[49.235231,6.993173], // Das Telefonbuch restaurant listing.
  'Krua Thai Restaurant':[49.2296758,7.0065700], // Mapy / OpenStreetMap restaurant point.
  'Im kleinen Restaurant':[49.23211,6.96892], // Approximate Hotel Crystal site, current Gersweiler Straße address.

  'Osaka Restaurant':[49.2350272,6.9949208],
  'MORAK':[49.2353783,6.9905317],
  'CAFE ESPECIAL Saarbrücken':[49.2321235,6.9958925],
  'the bakery':[49.2338311,6.9964672],
  'Bäckerei - Konditorei Erhard Heil':[49.2378053,6.9912288],
  'Café Bisous':[49.2302033,7.0058480],
  'Siam':[49.2314072,7.0011183],
  'F.A.K | Fresh Asian Kitchen':[49.2344520,6.9931977],
  'Buffalo Steakhaus':[49.2350103,6.9957903],
  'Mayfair Coffee, Bakery & More':[49.2362394,6.9944071],
  'masons Restaurant Saarbrücken':[49.2369010,6.9946295],
  'Bistro Kambodscha':[49.2393057,6.9952513],
  'Mangal Mezze & Grill':[49.2369023,6.9907788],
  'Viet Quan':[49.2374458,6.9909079],
  'NIKUYA - Japanese Korea Grill & BBQ':[49.2396033,6.9880651],
  'Grand Asia':[49.2395263,6.9882497],
  'Ratskeller Saarbrücken':[49.2344301,6.9955350],
  'Johanna cafétéria':[49.2288981,7.0119713],
  'Quanah Schott Pâtisserie':[49.2299543,7.0074145],
  'Cafe Bali':[49.2347713,7.0019293],
  'LUUC Café Deli Wein - Saarbrücken':[49.2328633,6.9985708],
  'Thonet':[49.2331188,6.9979200],
  'Café Kunstherz':[49.2300439,7.0004299],
  'Schrill-Saarbrücken':[49.2364824,6.9985704],
  'caffeo':[49.2330840,7.0021027],
  'AC Saarbrücken':[49.2556338,7.0408082],
  'Moccachili':[49.2319976,6.9963897],
  'BOCCA Pastabar':[49.2305283,7.0042215],
  'Kulturcafé':[49.2327031,6.9968834],
  'EDEN':[49.2313218,7.0014008],
  'Brot und Sinne':[49.2334109,6.9962055],
  'Brot & Sinne - Quartier Mainzer Strasse':[49.2299543,7.0074145],
  'Black Hen Rösthandwerk Saarbrücken':[49.2114897,7.1131881],
  'Fredrik - Saarbrücken':[49.2349788,6.9857436],
  'Café Lolo':[49.2335174,6.9744717],
  'Palazzo Sandro | Saarbrücken':[49.2336613,6.9957223],
  'Zapata - Saarbrücken':[49.2321364,6.9997662],
  'Pizza Gotti':[49.2318003,6.9995438],
  'BABAQ':[49.2353044,6.9939054],
  'Cafe Extrablatt Saarbrücken':[49.2336900,6.9957330],
  'Galicia Tapas':[49.2507383,6.9627664],
  'Flammerie Alt-Saarbrücken':[49.2329561,6.9901929],
  'Café Batela':[49.2319602,6.9991573],
  'Café am Steg':[49.2355663,6.9928143],
  'Le Comptoir':[49.2358206,6.9990016],
  'ESPLANADE Saarbrücken':[49.2349449,6.9997037],
  'Restaurant Le Schloss Halberg':[49.2228109,7.0307812],
  'Dang Dang':[49.2331786,6.9969131],
  'China Restaurant':[49.2344129,6.9878522],
  'Hongkong Imbiss':[49.2338981,6.9970529],
};

export const mapImages: Record<string, string> = {
  // Actual venue/dish photos; sources recorded in docs/opening-review-2026-10-08.md.
  'Jouliard':asset('venue-jouliard.webp'),
  'Goni’s Grill Haus':asset('venue-gonis-grill-haus.jpg'),
  'Riva Italia':asset('venue-riva-italia.jpg'),
  'Casa Anatolia Restaurant':asset('venue-casa-anatolia.jpg'),
  'Le Flâneur':asset('le-flaneur.jpg'),
  'Halbmond Restaurant':asset('halbmond-restaurant.jpg'),
  'Mangal Döner x Lukas Podolski':asset('mangal-lp10.png'),
  'Why Not Sushi':asset('why-not-sushi.jpg'),
  'Sneaky':asset('sneaky.jpg'),
  'Amidos & Helmi':asset('amidos-helmi.jpg'),
  'Berliner Döner by Kemo':asset('berliner-doener-by-kemo.svg'),
  'Pasteria al Dente':asset('pasteria-al-dente.jpg'),
  'Schnitzery':asset('schnitzery.jpg'),
  'Casino am Staden':asset('opentable-casino-am-staden.webp'),
  'Ti Amo - Trattoria':asset('opentable-ti-amo.webp'),
  'QU4RTIER Restaurant & Bar':asset('opentable-qu4rtier.webp'),
  'Quacks Restaurant':asset('opentable-quacks.webp'),
  'Noya':asset('opentable-noya.webp'),
  'Ristorante Roma':asset('opentable-ristorante-roma.webp'),
  'Restaurant Handelshof':asset('opentable-handelshof.webp'),
  'Le petit CINQ':asset('opentable-le-petit-cinq.webp'),
  'Schlachthof Brasserie':asset('opentable-schlachthof-brasserie.webp'),
  'Brauhaus zum Stiefel':asset('opentable-brauhaus-zum-stiefel.webp'),
  'Forsthaus Neuhaus':asset('opentable-forsthaus-neuhaus.webp'),
  "L'Osteria Saarbrücken - Trierer Straße":asset('opentable-losteria-trierer.webp'),
  "L'Osteria Saarbrücken Zinzinger Straße":asset('opentable-losteria-zinzinger.webp'),
  'Gästehaus Klaus Erfort':asset('opentable-gaestehaus-klaus-erfort.webp'),
  'Steakhouse Gusto':asset('opentable-steakhouse-gusto.webp'),
  'Hotel Restaurant Angelo':asset('opentable-hotel-angelo.webp'),
  "Leidinger's Lust - Die Frühstücksmacher":asset('opentable-leidingers-lust.png'),
  'Restaurant Tbilissi':'https://cdn.website.dish.co/media/78/51/9916955/Tbilissi-georgisches-Restaurant-IMG-8501-JPG.jpg',
  'Memory Burger Saarbrücken':'https://saarbruecken.memory-burger.de/wp-content/uploads/2026/02/AnyConv.com__941f4c2d-b654-4b04-9405-38ed5d6ca7fb-1024x683.webp',
  'Krua Thai Restaurant':'https://itin-dev.wanderlogstatic.com/freeImage/XFMDKzCTZiMO4sxUYMppHSGPCAlJpAiS',
  'Im kleinen Restaurant':'https://www.im-kleinen-restaurant.de/wp-content/uploads/2025/03/DSC01669-1024x682.jpg',

  // Venue photos: local copies from official sites, listings, and editorial sources; reviewed 2026-10-05.
  'Osaka Restaurant':'https://www.sushi-saarbruecken.de/erelreew/2026/07/20260630_0008.jpg',
  'MORAK':'https://morak.online/_assets/media/d3ee022828a717a4ea78d192ac632e66.jpg',
  'CAFE ESPECIAL Saarbrücken':'https://itin-dev.wanderlogstatic.com/freeImageSmall/r8ue532xH4t4EQzMCMYQbX7ucueqP9a2',
  'the bakery':'https://itin-dev.wanderlogstatic.com/freeImageSmall/E8ZO78ORHfGHzXSOqAfKNJUlAhFGusyG',
  'Bäckerei - Konditorei Erhard Heil':'https://itin-dev.wanderlogstatic.com/freeImageSmall/kGkpNAIxjsBIHGo2cwCLUPJjCzSCgplT',
  'Dang Dang':'https://pub-b2129fef1d2d4d4591d29f2baa8a348e.r2.dev/posts/zh-hero-1771934646507-fan7x4.webp',
  'China Restaurant':'https://itin-dev.wanderlogstatic.com/freeImageSmall/9rqqVHZ5e7Hs9hiW8kKvpJnBqCTXFhF2',
  'Hongkong Imbiss':'https://img.restaurantguru.com/w550/h367/r361-Hongkong-Imbiss-interior-2025-02.jpg',
  'Cafe Extrablatt Saarbrücken':'https://cafe-extrablatt.de/fileadmin/_processed_/4/8/csm_Cafe-Extrablatt-Standard-Header_c05f1cd8f4.jpg',
  'Galicia Tapas':asset('venue-galicia-tapas.jpg'),
  'Flammerie Alt-Saarbrücken':asset('venue-flammerie-alt-saarbrucken.jpg'),
  'Café Batela':asset('venue-cafe-batela.png'),
  'Café am Steg':asset('venue-cafe-am-steg.jpg'),
  'Le Comptoir':asset('venue-le-comptoir.jpg'),
  'ESPLANADE Saarbrücken':asset('venue-esplanade-saarbrucken.jpg'),
  'Restaurant Le Schloss Halberg':asset('venue-restaurant-le-schloss-halberg.jpg'),
  'Café Bisous':asset('venue-cafe-bisous.jpg'),
  'Siam':asset('venue-siam.jpg'),
  'F.A.K | Fresh Asian Kitchen':asset('venue-f-a-k-fresh-asian-kitchen.jpg'),
  'Buffalo Steakhaus':asset('venue-buffalo-steakhaus.jpg'),
  'Mayfair Coffee, Bakery & More':asset('venue-mayfair-coffee.jpg'),
  'masons Restaurant Saarbrücken':asset('venue-masons-restaurant-saarbrucken.jpg'),
  'Bistro Kambodscha':asset('venue-bistro-kambodscha.jpg'),
  'Mangal Mezze & Grill':asset('venue-mangal-mezze-grill.png'),
  'Viet Quan':asset('venue-viet-quan.jpg'),
  'NIKUYA - Japanese Korea Grill & BBQ':asset('venue-nikuya-japanese-korea-grill-bbq.jpg'),
  'Grand Asia':asset('venue-grand-asia.jpg'),
  'Ratskeller Saarbrücken':asset('venue-ratskeller-saarbrucken.jpg'),
  'Johanna cafétéria':asset('venue-johanna-cafeteria.jpg'),
  'Quanah Schott Pâtisserie':asset('venue-quanah-schott.jpg'),
  'Cafe Bali':asset('venue-cafe-bali.jpg'),
  'LUUC Café Deli Wein - Saarbrücken':asset('venue-luuc-cafe-deli-wein-saarbrucken.jpg'),
  'Thonet':asset('venue-thonet.jpg'),
  'Café Kunstherz':asset('venue-cafe-kunstherz.jpg'),
  'Schrill-Saarbrücken':asset('venue-schrill.jpg'),
  'caffeo':asset('venue-caffeo.jpg'),
  'AC Saarbrücken':asset('venue-ac-saarbrucken.jpg'),
  'Moccachili':asset('venue-moccachili.jpg'),
  'BOCCA Pastabar':asset('venue-bocca-pastabar.jpg'),
  'Kulturcafé':asset('venue-kulturcafe.jpg'),
  'EDEN':asset('venue-eden.png'),
  'Brot und Sinne':asset('venue-brot-und-sinne.jpg'),
  'Brot & Sinne - Quartier Mainzer Strasse':asset('venue-brot-sinne-quartier.jpg'),
  'Black Hen Rösthandwerk Saarbrücken':asset('venue-black-hen-rosthandwerk-saarbrucken.png'),
  'Fredrik - Saarbrücken':asset('venue-fredrik-saarbrucken.jpg'),
  'Café Lolo':asset('venue-cafe-lolo.jpg'),
  'Palazzo Sandro | Saarbrücken':asset('venue-palazzo-sandro-saarbrucken.png'),
  'Zapata - Saarbrücken':asset('venue-zapata-saarbrucken.jpg'),
  'Pizza Gotti':'https://images.squarespace-cdn.com/content/v1/5faaa96e735dc206f69b2b98/6b4e5b3d-a590-4388-ac26-37a27a6fa149/Pizza-Gotti-Napoli-Saarbruecken.jpg',
  'BABAQ':asset('venue-babaq.jpg'),
};

// Opening reports reviewed 2026-10-08; each item links to its supporting source.
export const openingNews: { date:string; state:string; name:string; category:string; address:string; note:string; url:string; detailsUrl?:string }[] = [
  {date:'05 OCT 2026',state:'官网宣布重开',name:'Halbmond Restaurant',category:'阿拉伯 · 也门菜 · Café',address:'Fröschengasse 18, 66111 Saarbrücken',note:'官网宣布 10 月 5 日起每日 11:30–22:30 营业，并上线新菜单。',url:'https://www.halbmondrestaurant.de/'},
  {"date":"01 OCT 2026","state":"重开日期待核实","name":"Dampfschiff","category":"Bar · 酒吧","address":"Saarstraße 8, 66111 Saarbrücken","note":"此前计划 10 月 1 日在原 Sake 餐厅重开；截至 10 月 8 日未找到可核实的实际开业公告，请联系店家。","url":"https://www.neueroeffnung.info/saarbruecken/dampfschiff-bar"},
  {date:'28 SEP 2026',state:'已开业',name:'Le Flâneur',category:'法式 · Bistro',address:'Sankt-Johanner-Markt 7–9, 66111 Saarbrücken',note:'开业资讯确认 9 月 28 日开业；官网现有菜单，周日至周四 11:30–23:00，周五及周六至午夜。',url:'https://www.le-flaneur.de/'},
  {"date":"18 SEP 2026","state":"已开业","name":"Mangal Döner x Lukas Podolski","category":"Döner · 快餐","address":"Sulzbachstraße 2, 66111 Saarbrücken","note":"RADIO SALÜ 于 9 月 18 日报道已开业，入驻原 Café Schubert；与 Berliner Promenade 的 Mangal Mezze & Grill 是不同店家。","url":"https://www.salue.de/nachrichten/message-258387.phtml"},
  {"date":"12 SEP 2026","state":"已上线点餐","name":"Why Not Sushi","category":"日式 · Sushi","address":"Bahnhofstraße 58, 66111 Saarbrücken","note":"开业资讯列出 9 月 12 日；截至 9 月 21 日 Wolt 已有本店菜单、地址与配送时段。堂食营业时间请向店家确认。","url":"https://wolt.com/de/deu/saarbrucken/restaurant/why-not-sushi"},
  {date:'01 SEP 2026',state:'已开业',name:'Sneaky',category:'街头小吃 · Burger · Tacos',address:'Kaltenbachstraße 3, 66111 Saarbrücken',note:'开业资讯网站 9 月 12 日更新确认于 9 月 1 日开业；Kalinski 团队新店，提供汉堡、Tacos、冰淇淋与奶昔外带。',url:'https://www.neueroeffnung.info/saarbruecken/sneaky-street-food-laden'},
  {"date": "08 AUG 2026", "state": "开业资讯", "name": "Goni’s Grill Haus", "category": "Grill · 餐厅", "address": "Saarbrücker Straße 273, 66125 Saarbrücken", "note": "开业目录列 8 月 8 日开业；周二、周四、周六 11–23，周五 11–14、17–23；周一、周三休息，未列周日，请向店家确认。", "url": "https://www.neueroeffnung.info/saarbruecken/gonis-grill-haus"},
  {date:'07 AUG 2026',state:'已开业',name:'Amidos & Helmi',category:'突尼斯 · 地中海 · Burger',address:'Mainzer Straße 102, 66121 Saarbrücken',note:'官网公布 8 月 7 日开业，主打突尼斯家常菜、Couscous 与 Grill/Burger。',url:'https://amidos-helmi.de/'},
  {date:'01 AUG 2026',state:'已开业',name:'Berliner Döner by Kemo',category:'Döner · 快餐',address:'Bergstraße 68, 66115 Saarbrücken',note:'开业资讯网站列出 8 月 1 日开业，位于 Burbach 的 Döner 小店；营业详情请向店家确认。',url:'https://www.neueroeffnung.info/saarbruecken/berliner-doener-by-kemo'},
  {date:'07 JUL 2026',state:'已开业',name:'Pasteria al Dente',category:'意式 · Pasta',address:'Sankt-Johanner-Markt 22, 66111 Saarbrücken',note:'据开业资讯网站，原定春季的开业计划因装修延期至 7 月 7 日；位于 Stengelbrunnen 对面。',url:'https://www.neueroeffnung.info/saarbruecken/pasteria-al-dente'},
  {date:'15 JUN 2026',state:'已开业',name:'Schnitzery',category:'Schnitzel · 快餐',address:'Berliner Promenade 18, 66111 Saarbrücken',note:'开业资讯网站于 7 月确认，这家 Berliner Promenade 新店已在 6 月 15 日开业。',url:'https://www.neueroeffnung.info/saarbruecken/schnitzery_6'},
  {"date": "08 APR 2026", "state": "新团队重开", "name": "Jouliard", "category": "法式 · Bistro", "address": "Scheidter Straße 66, 66123 Saarbrücken", "note": "4 月 8 日新团队重开 · 官网：周二、周三 18–22；周四至周六 12–14、18–22；周日、周一休息。电话预约 0681 59590688；纯素菜需提前预订。", "url": "https://www.neueroeffnung.info/saarbruecken/jouliard-bistro"},
  {"date": "28 MAR 2026", "state": "开业资讯", "name": "Riva Italia", "category": "意式 · Café · Aperitivo", "address": "Herbergsgasse 4, 66111 Saarbrücken", "note": "开业目录列 3 月 28 日开业 · 咖啡、早餐、Antipasti 与葡萄酒；目录仅列周一、周三至周日时段，周二未核实。", "url": "https://www.neueroeffnung.info/saarbruecken/riva-italia-cafe"},
  {"date": "22 MAR 2026", "state": "开业资讯", "name": "Casa Anatolia Restaurant", "category": "餐厅", "address": "Vorstadtstraße 33, 66117 Saarbrücken", "note": "开业目录 3 月 25 日更新确认 3 月 22 日开业，列每日 12–22；营业时间据第三方目录，请向店家确认。", "url": "https://www.neueroeffnung.info/saarbruecken/casa-anatolia-restaurant"},
];

export const newsletters = [
  {name:'ESPLANADE · FEINE AUSSICHTEN',cadence:'每周菜单',note:'两家餐厅的周菜单与临时空桌提醒。',url:'https://www.esplanade-sb.de/news/'},
  {name:'Saarbrücken 市政 Newsletter',cadence:'每周四',note:'城市新鲜事、活动与官方通知；不是纯餐饮，但适合发现本地新动向。',url:'https://www.saarbruecken.de/rathaus/presse_und_online/newsletter'},
];

export const mapUrl = (place: Place) => place.maps ?? q(place.name);
