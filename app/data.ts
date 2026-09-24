export type Interval = [string, string];
export type Place = {
  name: string;
  category: string;
  group: 'cafe' | 'restaurant' | 'bakery' | 'dessert';
  rating: number;
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
};

const d = (...days: Interval[][]): Interval[][] => days;
const q = (name: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} Saarbrücken`)}`;
const asset = (file: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/${file}`;
export const restaurantPlaceholder = asset('restaurant-placeholder.svg');

export const contentReviewedAt = '2026-09-24';

export const places: Place[] = [
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
  {name:"Leidinger's Lust - Die Frühstücksmacher",category:'早餐 · Buffet',group:'restaurant',rating:4.3,ratingSource:'OpenTable',reviews:7,sources:['OpenTable'],address:'Mainzer Straße 12, 66111 Saarbrücken',website:'https://www.leidinger-saarbruecken.de/genusswelt/leidingerlust-die-fruehstuecksmacher/',booking:'https://www.opentable.de/solivo',menuNote:'酒店早餐 Buffet · OpenTable 仅列周一至周五 08:30–11:00；周末与节假日请电话确认',schedule:null},
  // Added 2026-09-15. Official menus/addresses; Memory Burger and Im kleinen Restaurant hours from official sites.
  // Google rating snapshots: Wanderlog Tbilissi (2700151), Krua Thai (3039337);
  // Restaurant Guru Memory-Burger-Saarbrucken-Saarbrucken and Limoncello-Saarbrucken.
  // Original additions below; the 2026-09-21 source review is documented in docs/data-review-2026-09-21.md.
  { name:'Restaurant Tbilissi', category:'格鲁吉亚菜 · Georgian', group:'restaurant', rating:4.7, reviews:410, sources:['推荐补充'], address:'Saarstraße 13, 66111 Saarbrücken', website:'https://tbilissi-georgisches-restaurant.eatbu.com/', menu:"https://cdn.website.dish.co/media/88/c3/9926039/Speisekarte.pdf", menuNote:"官网菜单 · 官网列出周二至周六 18:00–23:00；周日、周一营业情况请确认", schedule:null },
  { name:'Memory Burger Saarbrücken', category:'Burger · 美式', group:'restaurant', rating:4.8, reviews:865, sources:['推荐补充'], address:'Ufergasse 2, 66111 Saarbrücken', website:'https://saarbruecken.memory-burger.de/', menu:"https://saarbruecken.memory-burger.de/wp-content/uploads/2026/07/Kopie-von-SB-memory.pdf", menuNote:"官网 PDF 菜单 · 牛肉、鸡肉与素食汉堡、Bowls", schedule:d([['17:00','22:00']],[['12:00','22:00']],[['12:00','22:00']],[['12:00','22:00']],[['12:00','22:00']],[['12:00','23:00']],[['12:00','23:00']]) },
  { name:'Krua Thai Restaurant', category:'泰国菜', group:'restaurant', rating:4.6, reviews:319, sources:['推荐补充'], address:'Mainzer Straße 71, 66121 Saarbrücken', website:'http://www.kruathai-sb.de/', menu:'https://de.restaurantguru.com/Krua-Thai-Saarbrucken/menu', menuNote:'菜单照片 · 泰式咖喱与素食选项 · 各平台营业时间不一致，请向店家确认', schedule:null },
  { name:'Im kleinen Restaurant', category:'意大利 · 地中海', group:'restaurant', rating:4.7, reviews:276, sources:['推荐补充'], address:'Gersweiler Straße 39–43, 66117 Saarbrücken', website:'https://www.im-kleinen-restaurant.de/', menu:'https://www.im-kleinen-restaurant.de/wp-content/uploads/2025/09/Speisekarte.pdf', menuNote:'官网菜单 · Pasta、牛排与地中海料理 · 现址位于 Hotel Crystal，节假日 17:30–22:00', schedule:d([['11:30','14:00'],['17:30','22:00']],[],[['17:30','22:00']],[['17:30','22:00']],[['17:30','22:00']],[['17:30','22:00']],[['17:30','22:00']]) },

  // Added 2026-09-15. Hours/menu: official sites. Rating snapshots: Wanderlog
  // https://wanderlog.com/place/details/2700258/osaka-restaurant
  // https://wanderlog.com/sv/list/geoCategory/466832/best-asian-food-in-saarbrucken
  // MORAK's Google review count is unavailable; do not substitute another platform's count.
  { name:'Osaka Restaurant', category:'日式 · Sushi', group:'restaurant', rating:4.6, reviews:1379, sources:['推荐补充'], address:'Dudweilerstraße 1, 66111 Saarbrücken', website:'https://www.sushi-saarbruecken.de/', maps:'https://www.google.com/maps/place/Osaka+Restaurant/data=!4m6!3m5!1s0x4795b402a9bcea05:0xf977a751f59e23ba!8m2!3d49.2350272!4d6.9949208!16s%2Fg%2F1tfjdgy6', menu:'https://www.sushi-saarbruecken.de/produkt-kategorie/menus/', menuNote:'官网菜单 · Sushi、Gyoza 与日式料理', schedule:d([['18:00','23:00']],[['12:00','15:00'],['18:00','23:00']],[],[['12:00','15:00'],['18:00','23:00']],[['12:00','15:00'],['18:00','23:00']],[['12:00','15:00'],['18:00','23:00']],[['12:00','15:00'],['18:00','23:00']]) },
  { name:'MORAK', category:'韩国菜 · Korean BBQ', group:'restaurant', rating:4.4, reviews:null, sources:['推荐补充'], address:'Saaruferstraße 12, 66117 Saarbrücken', website:'https://morak.online/', maps:'https://www.google.com/maps/place/MORAK/data=!4m6!3m5!1s0x4795b5004d42cbf7:0xfc682a11b6ee68fe!8m2!3d49.2353783!4d6.9905317!16s%2Fg%2F11yd71bytg', menu:'https://morak.online/menu', menuNote:"韩式料理与 BBQ · 官网暂时无法读取，其他平台时间与原记录不一致，请先确认", schedule:null },
  // Added 2026-09-14: official address/menu/hours; Google rating snapshot via https://wanderlog.com/ru/place/details/2700155/cafe-especial-saarbr%C3%BCcken.
  // The official site gives no fixed closing time, so live opening status remains unconfirmed.
  { name:'CAFE ESPECIAL Saarbrücken', category:'墨西哥菜 · Tex-Mex · 鸡尾酒', group:'restaurant', rating:4.3, reviews:2411, sources:['Saarbrücken'], address:'Kronenstraße 1, 66111 Saarbrücken', website:'https://www.cafe-especial.com/sarrebruck/', maps:'https://www.google.com/maps/place/CAFE+ESPECIAL+Saarbr%C3%BCcken/data=!4m6!3m5!1s0x4795b41cdfaeeda7:0x27a61a0c7e539a4!8m2!3d49.2321235!4d6.9958925!16s%2Fg%2F1tj7c_6t', menu:'https://www.cafe-especial.com/druckversion/saarbruecken-speisekarte/', menuNote:'官网菜单 · Tacos、Fajitas 与鸡尾酒 · 周一至周六 11:30 起，周日及节假日 12:00 起；打烊时间不固定', schedule:null },
  // Listing snapshots: Wanderlog, checked 2026-09-09. the bakery's hours differ across sources.
  { name:'the bakery', category:'咖啡 · 烘焙 · 早餐', group:'bakery', rating:4.6, reviews:656, sources:['Saarbrücken','Café'], address:'Gerberstraße 7, 66111 Saarbrücken', website:'https://www.facebook.com/thebakery.saarbruecken', maps:'https://www.google.com/maps?cid=4958234852955040279', menuNote:'可颂、Quiche 与蛋糕 · 营业时间请查看 Google Maps', schedule:null },
  { name:'Bäckerei - Konditorei Erhard Heil', category:'面包房 · 糕点', group:'bakery', rating:4.4, reviews:437, sources:['Saarbrücken'], address:'Bahnhofstraße 101A, 66111 Saarbrücken', website:'https://www.facebook.com/heilbackerei', maps:'https://www.google.com/maps?cid=7006462121478122254', menuNote:'面包、Apfelkrapfen 与蛋糕', schedule:d([], ...Array.from({length:6},()=>[['06:00','18:00']] as Interval[])) },
  { name:'Café Bisous', category:'咖啡 · Brunch', group:'cafe', rating:4.7, reviews:288, sources:['Saarbrücken','Café'], address:'Mainzer Str. 72, 66121 Saarbrücken', website:'https://bisous-saarbruecken.eatbu.com/', menu:"https://cdn.website.dish.co/media/4a/a3/9326801/Speisekarte.pdf", menuNote:"官网 PDF 菜单 · Pancakes、Avocado Toast", schedule:d([['09:00','16:00']],[['09:00','16:00']],[],[['09:00','16:00']],[['09:00','16:00']],[['09:00','16:00']],[['09:00','16:00']]) },
  { name:'Siam', category:'泰国菜', group:'restaurant', rating:4.4, reviews:484, sources:['Saarbrücken'], address:'Mainzer Str. 22, 66111 Saarbrücken', website:'https://www.restaurant-siam.de/', menu:'https://www.restaurant-siam.de/speisekarte', menuNote:'官网菜单 · 泰式咖喱、脆皮鸭', schedule:d([],[],[['12:00','15:00'],['18:00','22:00']],[['12:00','15:00'],['18:00','22:00']],[['12:00','15:00'],['18:00','22:00']],[['12:00','15:00'],['18:00','23:00']],[['18:00','23:00']]) },
  { name:'F.A.K | Fresh Asian Kitchen', category:'亚洲融合菜', group:'restaurant', rating:4.6, reviews:326, sources:['Saarbrücken'], address:'Berliner Promenade 18, 66111 Saarbrücken', website:'https://fak-food.com/', menuNote:"官网菜单 · 官网午市结束时间有 14:30 / 15:00 两种说法，请先确认", schedule:null },
  { name:'Buffalo Steakhaus', category:'牛排馆', group:'restaurant', rating:4.3, reviews:1275, sources:['Saarbrücken'], address:'Betzenstraße 10, 66111 Saarbrücken', website:'http://www.buffalo-saar.de/', menuNote:'官网菜单 · Steakhouse', schedule:d(...Array.from({length:7},()=>[['11:30','22:30']] as Interval[])) },
  { name:'Mayfair Coffee, Bakery & More', category:'咖啡 · 烘焙', group:'cafe', rating:4.9, reviews:198, sources:['Saarbrücken','Café'], address:'Futterstraße 9, 66111 Saarbrücken', website:'https://www.instagram.com/mayfaircoffee_/', menuNote:'菜单照片 · 咖啡、可颂与甜点', schedule:d([['09:30','21:00']],[['08:30','20:00']],[['08:30','20:00']],[['08:30','20:00']],[['08:30','20:00']],[['08:30','20:00']],[['09:30','21:00']]) },
  { name:'masons Restaurant Saarbrücken', category:'环球小盘 · All-you-can-eat', group:'restaurant', rating:4.6, reviews:4217, sources:['Saarbrücken'], address:'Futterstraße 18, 66111 Saarbrücken', website:'https://masons-restaurant.de/', menu:'https://masons-restaurant.de/wp-content/uploads/files/Speisekarte-DE.pdf', menuNote:'2026 官网菜单 · 环球主题小盘', schedule:d(...Array.from({length:7},()=>[['17:00','23:00']] as Interval[])) },
  { name:'Bistro Kambodscha', category:'柬埔寨菜', group:'restaurant', rating:4.8, reviews:262, sources:['Saarbrücken'], address:'Karcherstraße 22, 66111 Saarbrücken', website:'https://instagram.com/bistro_kambodscha', menuNote:'菜单照片 · 高棉家常菜', schedule:d([], [['11:30','14:30'],['18:00','24:00']],[['11:30','14:30'],['18:00','24:00']],[['11:30','14:30'],['18:00','24:00']],[['11:30','14:30'],['18:00','24:00']],[['11:30','14:30'],['18:00','24:00']],[['11:30','14:30'],['18:00','24:00']]) },
  { name:'Mangal Mezze & Grill', category:'土耳其 · Mezze', group:'restaurant', rating:4.8, reviews:935, sources:['Saarbrücken'], address:'Berliner Promenade 1–2, 66111 Saarbrücken', website:'https://www.mangal-saarbruecken.de/', menuNote:'官网菜单 · Mezze 与炭火烧烤', schedule:d([['12:00','21:00']],...Array.from({length:5},()=>[['18:00','22:00']] as Interval[]),[['13:00','22:00']]) },
  { name:'Viet Quan', category:'越南菜', group:'restaurant', rating:4.5, reviews:552, sources:['Saarbrücken'], address:'Viktoriastraße 11, 66111 Saarbrücken', website:'https://bestellen-vietquan.de/', menuNote:'在线点单菜单 · 越南粉与米饭', schedule:d([], [['11:00','22:00']],[['11:00','22:00']],[['11:00','16:00']],[['11:00','22:00']],[['11:00','22:00']],[['11:00','22:00']]) },
  { name:'NIKUYA - Japanese Korea Grill & BBQ', category:'日韩烧肉', group:'restaurant', rating:4.8, reviews:163, sources:['Saarbrücken'], address:'Trierer Str. 16, 66111 Saarbrücken', website:'https://www.nikuya-bbq.de/', menuNote:'官网菜单 · Japanese/Korean BBQ', schedule:d([['12:00','14:30'],['17:00','22:30']],[['17:00','22:30']],[['17:00','22:30']],[['17:00','22:30']],[['17:00','22:30']],[['17:00','22:30']],[['12:00','14:30'],['17:00','22:30']]) },
  { name:'Grand Asia', category:'亚洲自助 · Sushi', group:'restaurant', rating:4.6, reviews:2103, sources:['Saarbrücken'], address:'Trierer Str. 14, 66111 Saarbrücken', website:"https://grand-asia.de/restaurant-home/", menu:"https://grand-asia.de/speisekarte/", menuNote:"官网菜单 · 午市周五至周日；厨房提前 30 分钟结束", schedule:d([['12:00','15:00'],['17:30','23:00']],...Array.from({length:4},()=>[['17:30','23:00']] as Interval[]),[['12:00','15:00'],['17:30','24:00']],[['12:00','15:00'],['17:30','24:00']]) },
  { name:'Ratskeller Saarbrücken', category:'萨尔兰 · 德国菜', group:'restaurant', rating:4.1, reviews:1185, sources:['Saarbrücken','Starred'], address:'Rathausplatz 1, 66111 Saarbrücken', website:'https://www.ratskeller-saarbruecken.de/', menu:'https://www.ratskeller-saarbruecken.de/speisen/', menuNote:"官网菜单 · 周一至周六 17:00 起；官网未给出固定打烊时间，周日请确认", schedule:null },
  { name:'Johanna cafétéria', category:'咖啡 · 早餐', group:'cafe', rating:4.2, reviews:720, sources:['Saarbrücken','Café'], address:'Mainzer Str. 131, 66121 Saarbrücken', website:"https://www.johanna.saarland/", menu:"https://www.johanna.saarland/speisekarte", menuNote:"官网菜单 · 早餐与蛋糕 · 仅支持银行卡及移动支付", schedule:d([['10:00','16:00']],[['08:00','16:00']],[['08:00','16:00']],[['08:00','16:00']],[['08:00','16:00']],[['08:00','16:00']],[['10:00','16:00']]) },
  { name:'Quanah Schott Pâtisserie', category:'法式甜点', group:'dessert', rating:4.8, reviews:243, sources:['Saarbrücken','Café'], address:'Mainzer Str. 86, 66121 Saarbrücken', website:'https://www.facebook.com/QuanahSchottPatisserie/', menuNote:'当季甜点柜 · 法式 Pâtisserie', schedule:d([['09:00','12:00'],['14:00','16:00']],[],[],[['11:00','18:00']],[['11:00','18:00']],[['11:00','18:00']],[['09:00','18:00']]) },
  { name:'Cafe Bali', category:'印尼菜', group:'restaurant', rating:4.6, reviews:794, sources:['Saarbrücken'], address:'Rotenbergstraße 10, 66111 Saarbrücken', website:'https://www.cafebali.de/', menu:"https://www.cafebali.de/menu", menuNote:'官网菜单 · 印尼家常菜', schedule:d([['18:00','23:00']],[],[],[['18:00','23:00']],[['18:00','23:00']],[['18:00','23:00']],[['18:00','23:00']]) },
  { name:'LUUC Café Deli Wein - Saarbrücken', category:'咖啡 · Deli · 葡萄酒', group:'cafe', rating:4.4, reviews:1152, sources:['Saarbrücken'], address:'Türkenstraße 17, 66111 Saarbrücken', website:'https://cafeluuc.de/luuc-cafe-saarbruecken', booking:'https://www.opentable.de/r/luuc-cafe-saarbrucken', menuNote:'官网菜单 · Brunch、Deli 与葡萄酒', schedule:d([['09:30','20:30']],[['09:30','20:30']],[['09:30','20:30']],[['09:30','20:30']],[['09:30','22:00']],[['09:30','22:00']],[['09:30','22:00']]) },
  { name:'Thonet', category:'咖啡 · Bar', group:'cafe', rating:4.4, reviews:297, sources:['Saarbrücken'], address:'Katholisch-Kirch-Straße 24, 66111 Saarbrücken', menuNote:'Google 菜单照片 · 咖啡与饮品', schedule:d([['09:00','21:00']],[['09:30','22:00']],[['09:30','22:00']],[['09:30','22:00']],[['09:30','22:00']],[['09:00','23:00']],[['09:00','23:00']]) },
  { name:'Café Kunstherz', category:'艺术咖啡馆', group:'cafe', rating:4.4, reviews:185, sources:['Saarbrücken','Café'], address:'Bismarckstraße 11–15, 66111 Saarbrücken', website:'https://www.kunstherzcafe.de/', menuNote:'官网菜单 · 咖啡、蛋糕与文化活动', schedule:d([['10:00','18:00']],[],[['10:00','18:00']],[['10:00','20:00']],[['10:00','18:00']],[['10:00','18:00']],[['10:00','18:00']]) },
  { name:'Schrill-Saarbrücken', category:'咖啡 · 甜点', group:'cafe', rating:4.6, reviews:191, sources:['Saarbrücken','Café'], address:'Försterstraße 22, 66111 Saarbrücken', website:'https://xmeri.com/schrill-saarbruecken/', menuNote:'菜单照片 · 咖啡与甜点', schedule:d([['10:00','18:00']],[],[],[['15:30','18:00']],[['10:00','18:00']],[['10:00','18:00']],[['10:00','18:00']]) },
  { name:'caffeo', category:'精品咖啡', group:'cafe', rating:4.8, reviews:172, sources:['Saarbrücken'], address:'Großherzog-Friedrich-Straße 40, 66111 Saarbrücken', website:'https://www.facebook.com/caffeos', menuNote:'营业时间未确认 · 请先查看 Google Maps', schedule:null },
  { name:'AC Saarbrücken', category:'校园餐厅 · 国际菜', group:'restaurant', rating:4.5, reviews:248, sources:['Saarbrücken'], address:'Campus A3 2, 66123 Saarbrücken', website:'https://www.ac-sb.de/', menuNote:'官网周菜单 · 午餐', schedule:d([], [['11:30','16:00']],[['11:30','16:00']],[['11:30','16:00']],[['11:30','16:00']],[['11:30','16:00']],[]) },
  { name:'Moccachili', category:'Bio Café · Bistro', group:'cafe', rating:4.5, reviews:325, sources:['Saarbrücken'], address:'Ev.-Kirch-Straße 8, 66111 Saarbrücken', website:'https://moccachili.blogspot.com/p/tagliche-leckereien.html', menuNote:"官网日常菜单 · 官网开门时间有 09:30 / 10:00 两种说法，请先确认", schedule:null },
  { name:'BOCCA Pastabar', category:'意大利 · Pasta', group:'restaurant', rating:4.7, reviews:169, sources:['Saarbrücken'], address:'Mainzer Str. 54, 66121 Saarbrücken', website:'https://www.bocca-pastabar.com/', menuNote:'官网菜单 · 手工 Pasta', schedule:d([['17:00','21:00']],...Array.from({length:5},()=>[['12:00','14:30'],['18:00','23:00']] as Interval[]),[['18:00','24:00']]) },
  { name:'Kulturcafé', category:'咖啡 · 早餐 · Bar', group:'cafe', rating:4.6, reviews:812, sources:['Saarbrücken'], address:'Sankt-Johanner-Markt 24, 66111 Saarbrücken', website:'https://kulturcafe-sb.de/', menu:"https://kulturcafe-sb.de/speisekarte.html", menuNote:"官网菜单 · 周一至周六 08:30 起，打烊时间不固定；周日 09:00–23:00", schedule:null },
  { name:'EDEN', category:'融合菜 · Bowls · Falafel', group:'restaurant', rating:4.6, reviews:344, sources:['Saarbrücken','Starred'], address:'Mainzer Str. 26, 66111 Saarbrücken', website:'https://eden-saarbruecken.de/', menuNote:'官网/外卖菜单 · Pasta、Bowls、Falafel', schedule:d([],...Array.from({length:6},()=>[['17:00','22:00']] as Interval[])) },
  { name:'Brot und Sinne', category:'面包房 · 咖啡', group:'bakery', rating:4.7, reviews:530, sources:['Saarbrücken'], address:'Kaltenbachstraße 6, 66111 Saarbrücken', website:'https://www.brotundsinne.de/', menuNote:"面包、Bagel 与 Zimtschnecke · 城市与行业目录的营业时间不一致，请先确认", schedule:null },
  { name:'Brot & Sinne - Quartier Mainzer Strasse', category:'面包房 · 咖啡', group:'bakery', rating:4.6, reviews:164, sources:['Café'], address:'Mainzer Str. 86, 66121 Saarbrücken', website:'https://www.brotundsinne.de/', menuNote:'当日面包、早餐与午餐', schedule:d([['08:00','12:00']],[['07:00','19:00']],[['07:00','19:00']],[['07:00','19:00']],[['07:00','19:00']],[['07:00','19:00']],[['07:00','19:00']]) },
  { name:'Black Hen Rösthandwerk Saarbrücken', category:'咖啡烘焙坊', group:'cafe', rating:5.0, reviews:159, sources:['Café'], address:'Zum Gerlen 5, 66131 Saarbrücken', website:'https://www.blackhen.de/', menuNote:"咖啡豆与烘焙工作室 · 官网厂店营业时间：周三 14:00–17:00", schedule:d([],[],[],[['14:00','17:00']],[],[],[]) },
  { name:'Fredrik - Saarbrücken', category:'北欧咖啡 · Brunch', group:'cafe', rating:4.4, reviews:931, sources:['Café'], address:'Keplerstraße 12, 66117 Saarbrücken', website:"https://www.fredrik.saarland/", menu:"https://www.fredrik.saarland/speisekarte", menuNote:'官网菜单 · Brunch 与北欧风咖啡', schedule:d([['10:00','17:00']],[['09:00','17:00']],[['09:00','17:00']],[['09:00','17:00']],[['09:00','17:00']],[['09:00','17:00']],[['10:00','17:00']]) },
  { name:'Café Lolo', category:'咖啡 · Konditorei', group:'dessert', rating:4.7, reviews:2169, sources:['Café'], address:'Heuduckstraße 67, 66117 Saarbrücken', website:'https://www.cafe-lolo.de/', menu:'https://cafe-lolo.de/images/sortiment.pdf', menuNote:'2026 Sortiment · 蛋糕与 Butterkuchen', schedule:d([['08:00','18:00']],[],[['07:00','18:00']],[['07:00','18:00']],[['07:00','18:00']],[['07:00','18:00']],[['07:00','18:00']]) },
  { name:'Palazzo Sandro | Saarbrücken', category:'意式冰淇淋', group:'dessert', rating:4.3, reviews:183, sources:['Starred'], address:'Bahnhofstraße 16, 66111 Saarbrücken', website:'https://palazzosandro.de/', menu:"https://palazzosandro.de/", menuNote:"官网冰淇淋与甜点介绍 · 官网两处营业时间不一致，请先确认", schedule:null },
  { name:'Zapata - Saarbrücken', category:'西班牙 · Tapas', group:'restaurant', rating:4.2, reviews:1150, sources:['Starred'], address:'Hinterhof, Mainzer Str. 8, 66111 Saarbrücken', website:'https://www.zapata.saarland/', menu:'https://www.zapata.saarland/speisekarte', menuNote:'最新官网菜单 · Tapas、Social Plates 与 Drinks', schedule:d([['17:30','23:00']],[['17:30','23:00']],[['17:30','23:00']],[['17:30','23:00']],[['17:30','23:00']],[['17:30','24:00']],[['17:30','24:00']]) },
  { name:'Pizza Gotti', category:'那不勒斯披萨 · 意大利菜', group:'restaurant', rating:4.8, reviews:761, sources:['推荐补充'], address:'Mainzer Str. 8, 66111 Saarbrücken', website:'https://www.gotti-pizza.de/', menu:'https://www.gotti-pizza.de/speisekarte', menuNote:'2026 官网菜单 · 那不勒斯披萨、DOP 食材与创意口味', schedule:d([['17:00','21:00']],[['12:00','22:00']],[['12:00','22:00']],[['12:00','22:00']],[['12:00','22:00']],[['12:00','22:00']],[['12:00','22:00']]) },
  { name:'BABAQ', category:'Döner · 土耳其', group:'restaurant', rating:4.3, reviews:306, sources:['Starred'], address:'Bahnhofstraße 43A, 66111 Saarbrücken', website:'http://www.babaq.de/', menuNote:'官网/Google 菜单 · Döner 与 Grill', schedule:d([], [['11:30','22:00']],[['11:30','22:00']],[['11:30','22:00']],[['11:30','22:00']],[['11:30','25:00']],[['11:30','25:00']]) },
  { name:'Cafe Extrablatt Saarbrücken', category:'全天咖啡 · 早餐 · Bistro', group:'cafe', rating:4.1, reviews:253, sources:['推荐补充','Café'], address:'Bahnhofstraße 18, 66111 Saarbrücken', website:'https://cafe-extrablatt.de/standorte/details/cafe-extrablatt-saarbruecken', menu:'https://cafe-extrablatt.de/fileadmin/pdf/Speisekarten/Cafe-Extrablatt-Saarbruecken-Speisekarte-Web.pdf', menuNote:"官网菜单 · 每天 09:00 起，打烊时间不固定", schedule:null },
  { name:'Galicia Tapas', category:'Galicia · Tapas · 海鲜', group:'restaurant', rating:4.8, reviews:567, sources:['推荐补充'], address:'Bliesweg 2, 66113 Saarbrücken', website:'https://galicia-tapas.de/', menuNote:'官网菜单 · Galician Tapas、海鲜与分享套餐', schedule:d([['12:00','14:30'],['17:30','22:00']],[['17:30','22:30']],[],[['17:30','22:30']],[['17:30','22:30']],[['17:30','23:00']],[['17:30','23:00']]) },
  { name:'Flammerie Alt-Saarbrücken', category:'Flammkuchen · 法式', group:'restaurant', rating:4.8, reviews:844, sources:['推荐补充'], address:'Neumarkt 9, 66117 Saarbrücken', website:"https://einkaufen.saarbruecken.de/genuss/gastronomie_detail/gastronomy-64cbb0e3d06c9", maps:'https://www.google.com/maps/place/Flammerie+Alt-Saarbr%C3%BCcken/data=!4m6!3m5!1s0x4795b4024b8386d1:0x965b8e0ab908f822!8m2!3d49.2329561!4d6.9901929!16s%2Fg%2F11d_cxzd65', menuNote:"市政餐厅介绍 · 原官网已转向供应商网站；各目录营业时间不一致，请先确认", schedule:null },
  { name:'Café Batela', category:'早餐 · Brunch · 咖啡', group:'cafe', rating:4.7, reviews:482, sources:['推荐补充','Café'], address:'Mainzer Str. 4, 66111 Saarbrücken', website:'https://cafe-batela.de/', menuNote:'官网菜单 · 早餐、Brunch 与精品咖啡', schedule:d([['09:30','16:00']],[['09:00','16:00']],[['09:00','16:00']],[['09:00','16:00']],[['09:00','16:00']],[['09:00','16:00']],[['09:30','16:00']]) },
  { name:'Café am Steg', category:'咖啡 · 早餐 · 烘焙', group:'cafe', rating:4.6, reviews:107, sources:['推荐补充','Café'], address:'Am Steg 3, 66111 Saarbrücken', website:'https://www.cafe-am-steg.de/', menuNote:'官网菜单 · 咖啡、早餐、Panini 与每日烘焙', schedule:d([['10:00','18:00']],[],[['10:00','18:00']],[['10:00','18:00']],[['10:00','18:00']],[['10:00','18:00']],[['10:00','18:00']]) },
  { name:'Le Comptoir', category:'法式 · Fine dining', group:'restaurant', rating:4.8, reviews:173, sources:['推荐补充'], address:'Försterstraße 15, 66111 Saarbrücken', website:'https://www.lecomptoir-saarbruecken.de/', menuNote:'官网信息 · 精致法餐与季节菜单', schedule:d([],[],[['18:30','23:30']],[['18:30','23:30']],[['18:30','23:30']],[['18:30','23:30']],[['18:30','23:30']]) },
  { name:'ESPLANADE Saarbrücken', category:'现代欧陆 · 米其林二星', group:'restaurant', rating:4.6, reviews:364, sources:['推荐补充','Starred'], address:'Nauwieserstraße 5, 66111 Saarbrücken', website:'https://www.esplanade-sb.de/', menu:"https://www.esplanade-sb.de/restaurant-saarbruecken/", booking:'https://www.opentable.de/esplanade', menuNote:"官网 9 月菜单与周菜单 · 周三至周六 12:00 / 18:30 起，结束时间未注明；10 月 11–18 日休假，21 日晚恢复营业", schedule:null },
  { name:'Restaurant Le Schloss Halberg', category:'法式 · 德国 · 景观餐厅', group:'restaurant', rating:4.7, reviews:417, sources:['推荐补充'], address:'Franz-Mai-Straße 1, 66121 Saarbrücken', website:'https://www.le-schloss-halberg.de/', menuNote:'官网菜单 · 经典法餐、德国菜与季节菜单', schedule:d([], [['12:00','14:00'],['18:30','22:00']],[['12:00','14:00'],['18:30','22:00']],[['12:00','14:00']],[['12:00','14:00'],['18:30','22:00']],[['12:00','14:00'],['18:30','22:00']],[['18:30','22:00']]) },
  { name:'Dang Dang', category:'中国菜 · Dim Sum · 川菜', group:'restaurant', rating:4.8, reviews:83, sources:['推荐补充'], address:'Kappenstraße 9, 66111 Saarbrücken', website:'https://asia-zone.com/website/dang-dang-saarbruecken', menu:'https://asia-zone.com/website/dang-dang-saarbruecken', menuNote:"第三方菜单预览（非店家官网）· 菜品、价格及时间请向店家确认", schedule:d([['17:30','22:30']],[],[['11:30','15:00'],['17:30','22:30']],[['11:30','15:00'],['17:30','22:30']],[['11:30','15:00'],['17:30','22:30']],[['11:30','15:00'],['17:30','22:30']],[['11:30','22:30']]) },
  { name:'China Restaurant', category:'中国菜 · 火锅 · 上海家常菜', group:'restaurant', rating:4.4, reviews:749, sources:['推荐补充'], address:'Hohenzollernstraße 21, 66117 Saarbrücken', website:'https://www.facebook.com/ChinaRestaurant.sb', menu:'https://weur-cdn.menuweb.menu/storage/media/companies_menu_pdf/93008743/china-restaurant-saarbrucken-speisekarte.pdf', menuNote:'2026 菜单 · 火锅、麻婆豆腐与脆皮鸭', schedule:d(...Array.from({length:7},()=>[['11:30','15:00'],['17:30','23:00']] as Interval[])) },
  { name:'Hongkong Imbiss', category:'中国菜 · 素食 · Su-Ya', group:'restaurant', rating:4.3, reviews:240, sources:['推荐补充'], address:'Gerberstraße 18, 66111 Saarbrücken', website:'https://www.facebook.com/HongkongImbiss/', menuNote:'菜单与每日推荐 · 豆腐、素鸭和家常小炒', schedule:d([], [['11:30','21:00']],[['11:30','21:00']],[['11:30','21:00']],[['11:30','21:00']],[['11:30','21:00']],[['11:30','21:00']]) },
];

export const placeCoordinates: Record<string, [number, number]> = {
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

  // Photos from the restaurants' official websites, checked 2026-09-15.
  'Osaka Restaurant':'https://www.sushi-saarbruecken.de/erelreew/2026/07/20260630_0008.jpg',
  'MORAK':'https://morak.online/_assets/media/d3ee022828a717a4ea78d192ac632e66.jpg',
  'CAFE ESPECIAL Saarbrücken':'https://itin-dev.wanderlogstatic.com/freeImageSmall/r8ue532xH4t4EQzMCMYQbX7ucueqP9a2',
  'the bakery':'https://itin-dev.wanderlogstatic.com/freeImageSmall/E8ZO78ORHfGHzXSOqAfKNJUlAhFGusyG',
  'Bäckerei - Konditorei Erhard Heil':'https://itin-dev.wanderlogstatic.com/freeImageSmall/kGkpNAIxjsBIHGo2cwCLUPJjCzSCgplT',
  'Dang Dang':'https://pub-b2129fef1d2d4d4591d29f2baa8a348e.r2.dev/posts/zh-hero-1771934646507-fan7x4.webp',
  'China Restaurant':'https://itin-dev.wanderlogstatic.com/freeImageSmall/9rqqVHZ5e7Hs9hiW8kKvpJnBqCTXFhF2',
  'Hongkong Imbiss':'https://img.restaurantguru.com/w550/h367/r361-Hongkong-Imbiss-interior-2025-02.jpg',
  'Cafe Extrablatt Saarbrücken':'https://cafe-extrablatt.de/fileadmin/_processed_/4/8/csm_Cafe-Extrablatt-Standard-Header_c05f1cd8f4.jpg',
  'Galicia Tapas':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnwvO5GJIyp9BUkIwYtGpiQ4ZLv7RxgQ8veLDN-oTnAn4gCdPxrqfpgXR-88ZM7V10hoQLim1q8bX-7-OybbOpeF2ulg6zMTPU5S_NbqvvttTKIrFdUuUIDWk0zkxvRtCBBXzAOnA=w408-h272-k-no',
  'Flammerie Alt-Saarbrücken':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmr7PzyPxbc5MsaUG8-698ndv1oO2fl9yETdYpEjvWvQK6gbJyMYmHJ2Wxeu9nt6eZrI-h70-DtTO2UiGHZ7gW1atmkR1ABfZ291za-1GRKHtmUx5pMrHA33tDgN6rkVuZg9cRCYg=w408-h306-k-no',
  'Café Batela':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmajkzU9pjjZpB7zLC8y8gPojJuPvMjd0PGGo-qMGx7XL5ybS2G3xa7dR_M_Ezt1DtCJ2MZBb4JOrJSbw6Xnw1h5OXV90NLVQldBkD4TwuYqsiroNx_OCqkk5I-qRgfz3IdF3dV=w408-h307-k-no',
  'Café am Steg':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmjnSSeMXifopEsnVUsSgSmqM5aVfKcx4-aqEWsc29GVh-rTV8zp9g2r5eJldhZ8JUUfbIr0bzGN4UdvwFRV913GZWdh1bzude5PB9NwAN3Hgj4zWrnLDUxhNOXudcm7HKmF1p2tbRBd2cJ=w408-h306-k-no',
  'Le Comptoir':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWk1tSfuvVvWj_3ADWNfA_ZNnZjHQmtPtyuietDNXGEMhN0m6rbZEDjprlveHR9zGSx3BNo2G6w1bFk5roO5howLnDZ-a2eTVPzVI1ookOZubdIx7G0AglcMVNI0SIie67ArcgFL=w426-h240-k-no',
  'ESPLANADE Saarbrücken':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWljPMLkObu_IWmToiB2gzizWd9nEC_W39TeGqNKgY9L6KNa9chwXBxh1QLBh3lTjv-QN0Q4ccur8auxnlGimACDp65eRGw9WESqTJCyk_TEplhLljAeFX20Q2o4QAeu2bP_oCuH=w408-h272-k-no',
  'Restaurant Le Schloss Halberg':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmdk_TJxSxg8kF8ObX8q-VJOdO0XFrutuUfRBz1trVAcB2WgjguUNHnB6vtIT4WbzGGtj_QSginbF2JpFQ_F5jRvqh4o_q19M4dnBPQs5xJh4Mt6sBuQ7OATSSTw4D3ocaBHiKo=w426-h240-k-no',
  'Café Bisous':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmUaWr1fMEV1RLJr36QD_W4DskC6V7JhLs1uxRG_anmLdsCGvxcM3ChoU6bIK5FIRmf9wHXo2gHNMVZ4Uab-PrUdv-CRZ2HRmkRX-pAjuJHP9nAt-dvYLIAOX-pZ4NkGLOVexXDjg=w532-h240-k-no',
  'Siam':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmbtHGdhCzaLMcL4J8U5EJRRWQEXhyeoosgHTYzA5vo7ZY645kI4du-JCDGG6WLM3WWf1jzmsbj1kEBqB5HF1F40xlu7bpJOyHggdyn-N1fYGyKo_KfuBbQCDAdyYyjaNjrRkA5=w408-h306-k-no',
  'F.A.K | Fresh Asian Kitchen':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWn6XRl6aoMkAKcgwXAIr6hARlE2qghbCkb9wLv-lEeECYmciTGZvEBQYV90DSlPr1toAKQCHTai8cq8d2dlNuVoMfuxZ_1Mcifko3_4Dk7rjU9EeVzPHsUABNsvOh4EgPzw9NM5=w408-h291-k-no',
  'Buffalo Steakhaus':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkTOnoizlGYRQpiB1c0F4Fm_CX0dZBECsWqBP2gcD09Zz9KjZCKM52N0eJpm9Die3iaLbyl2WsbJx8ZyN_BOUwE3_SfWwEWUoq5W1iy29gLHvtMqaR-7U8eBAh2MFX12KGkRorVig=w662-h240-k-no',
  'Mayfair Coffee, Bakery & More':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWn7nOdCE7fKv9V-n8rOQh-lrPlKyJD3cP2qIVxllLgyTqI7aSks_3oRFvOg1w9DqVRmq4zEh6oBRYR5uHBdxqmbgjt3rDrX2UQXK8QmstU672HwNIbQotcnf1vQoBcxBvMI-69z=w408-h544-k-no',
  'masons Restaurant Saarbrücken':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWki8UsiLPT3PdIY1M2K4rhFmgJ0GAjsdPMsEmNUYxgiE6CFoZ-zGIPK473C4269GRWgCZEoupIClKXaoAGUnO6u5wOMLasCZudIhz6hYnrgxcYfJk5bPrzoVOrcCvIcUnQ2j2A=w408-h611-k-no',
  'Bistro Kambodscha':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmgnomd8oX3caUXmDbA3Ixc5FZK7fT8HXgVgvEZHdpm97-bEnELrJO5WPk1L56GxhjJyqy6Z0mYAWqgKU78-cSYkRTQMPRSS4CQrnwwHPafAFnHA_4V2EVN3EbxzeCK0yx0xIA-zA=w408-h306-k-no',
  'Mangal Mezze & Grill':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmRwyVrAG4tv54R6ebSeNd6CDEWc4hiEjU7S_hMf-Creu4qMTNBdfn5RDPJ0HuCDNqEtdbutHtyf17EEX5b0vkHZUgg3SXyqdfErT4UkV2nseUsniq5IhegCDKLApNld2QpJq0VssB82ws=w408-h272-k-no',
  'Viet Quan':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlrYeryDFfH77gxudiV5vVMLocIerKodF-ObnrIzAHC02tcSYyBWSfjSLRtVa2Vkac_271GTDWkk2DJG7I_NHAupmksWo3CM4mfE6BZS2f_rSOue7ZL1sgMlbnNMCbC20qAPcDPcw=w408-h306-k-no',
  'NIKUYA - Japanese Korea Grill & BBQ':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl15yCFOLMbD29dJkkIbDNk8yX2LMaYVbcuzCQcQ6syaXUpAG8HZmORacC7-FDbOwtK5Xz5tVExWobzCGHO7M9R2-8jtoi22RHUbj6G7W85_fsL4uO2Ejv7I61U5ClqfogAlzLCvwRNrWlx=w408-h272-k-no',
  'Grand Asia':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmnaXVmM1r-TtBeGbu6KKBR3UVP2x_1vJtnDBzcTx1Xfg0rl2F1IF5oMH33E95evFmO0BSK1pyHRb8fdkJMzwNCk1n-SN7GVHTCblNAlKhSPOuI5YdznJg5Zg5TwZgBxNvaakfW=w426-h240-k-no',
  'Ratskeller Saarbrücken':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlrrKxULreCAvwT0YUeF9XGsuIC41GSvTEloac4rb8x9vegj_yHLjAn7bMi6DiBO67-OkeXtUwei2Xx4lbzdCuP44YEDrWvxSisfPcVrXEr0kdL9m-VWX2TdRGMPihucwsr3Yjv=w426-h240-k-no',
  'Johanna cafétéria':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnFQWAJFmZP2v7U38dZY1W-eOuX59FoiNpJ0DRLXmsgWmb0eFB9ru_KFICeKSLCttbPAb3fhwUIWqHHmeRbw21-u_VUYkat02DKQygF6fnxLapv6UjznSJ7dT6utdyF-7P9sg4MyQ=w408-h612-k-no',
  'Quanah Schott Pâtisserie':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl6C5FBH33eygR4F6CAVFmN_Ft4NAzwelqRL17gc8fSp1ToIzB5-EcUK8fd4nrqp2nZiNz8ZrItc0vg7F4QJ7_bL1yci5X4MAd_HRTU6A-IyzZx-NsYQHJRm0Ha_Ks8oZVZ1dgy=w409-h240-k-no',
  'Cafe Bali':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkAJxoJpLXiUtRpxYUawLRgAvvADOSrNnmxM1lNwUMrrYeWhDud39Xi-Qd5eyZ8N3boss9czkBsglvLGJ60oUUbJ74pBmF8gvoDo9M6PkVIzq4mD8WoOMZL_vpJ8d8Ud293IFet=w480-h240-k-no',
  'LUUC Café Deli Wein - Saarbrücken':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlvMQHwUm723haTpSutXpI5dAga-BGyG04lRTKYSNnru7nhX55aG-wgon5x8-AnfERLtlSF-mSNnDIr_dcuxqHRk5L1HBrssd_ucPe64bYHIYIXbS7o-y_p0xlGuSTVMYssJ892SQBHn9Vr=w408-h352-k-no',
  'Thonet':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnNdxo4PYsIDDy8xdsBK2JISKO9XM0wIj9WM5Dj_pLT2Ojl47T0VwakcjpzmrmE6VsQctLUys03RR-v1nxQnmzyPZHQ91rKKSiVthsf16nFxwVzZyDyHuzbp6nLzGM5BT1fQI9-=w408-h306-k-no',
  'Café Kunstherz':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkge3zXE4gqI8FJg3NEFXNXXAzqCuU2fLruUbDzmKOh5bsj8p962S3UgWNmjxNLDE3Yp4A5u9kcdUzhtNLKshy17hvYk0Vsh0o9z2UM3o6eKJ_SOHtH4nzrHBEeZhgfQVHed0GAz8JaP5O5=w426-h240-k-no',
  'Schrill-Saarbrücken':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnOi_d8A-yK-2tYOmaqPhqb2GgM8Yqd-S3I9DI_c9Rvw6TSG0YKVTcE3YuHZCLeGaFhfGC-4bBpYDTeGkCbhrpcO2RC6lNT1kDvDzazsWpPc7qbItXAIPuKPNxGqY79HTI3OaW7qQ=w408-h306-k-no',
  'caffeo':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlMta8c-pL5nc1EvyAVMf1Pz2wtayaHl3uUt4c4d0DOPEb0i3sFmRz2oQ5ILNw-hUf6KaSzYeGJok_tm15B9lOU_B8zfjr0ritbPxnwdskmplDNQwC_j98ODaZVEwgRBBSkjHmYRQ=w408-h544-k-no',
  'AC Saarbrücken':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWndtN5FcMtwf-Y7diXGUurWmx1DuqvE2ygdc2vtluqLvPPMeN_Ug-vntZjDg23-HhEJ8TXyzsXyf6HZuo1kIMMJayRcmOai_k4H1fI0-ZSGIbyYY2Oif_49Bqft9icZtlg6ayyq=w426-h240-k-no',
  'Moccachili':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnCvlHR-IJA7kJYrHWxiZ8TqBu0bDOk2Wwmf2aX-EnWBVqtiIsceMHXXqURkj5morutAFpSlUVufkW1wHU8JFRXUsB_3GQqQ2Y3ndkbuW9s24mLujV6xltqewdglvP3L0wyA1s9Wg=w408-h261-k-no',
  'BOCCA Pastabar':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWn_OZUVIOnnBeWtW9nZ8HBkoOXPk9f0-dUK0hxYQ_54Bw2nQ7FTi4xbdJt1fAWRExrd-9e0E_epYVv7aMaXF4ZN40XR4fJD1Xlbk-kfExsBT1JDWbOxipnyv_wbj_7iJVtllt-XnfKmYCFq=w408-h580-k-no',
  'Kulturcafé':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnl5deUg1utLe6SgLKJfZqx27IB6Jlp8vyaOsFFZdtJiTV7DiGl-X75fps6tOVtZl1D77MOScE-htf9MsG6JkSaktwhLD60Yr1GjrnilqC--f7rDsO0HdCG80KwAfG2-ui8B6j0=w503-h240-k-no',
  'EDEN':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnTEgo9i_EMXvxdm-QC5QqywI_7oMcAoUZD8KYRS4tQlgCzKO3He_mpXQseFb4dN8lqBsadb9B5zdjB3Z8M__-XlSYpB3leE9Nmnq1qB4oU5WMoSYWZ0MTB3zALoj7e3CeCeCZq_Ehh3s3i=w408-h510-k-no',
  'Brot und Sinne':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkNytQD7EgwV575TkXdY5mFHdj8iFt6CKM94jz4bOAchJUtF7Vqi6Bike3ZeVivN64KDYxh80WbvBN6u9QeqrOnlAH8FyokwPpjmykcIOtqGReHZ9dOvXotzU8h5eA3BHgjPVZZ=w408-h306-k-no',
  'Brot & Sinne - Quartier Mainzer Strasse':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWn28dCuBgrLQ3v-rS18FPWnzAtXprQraAJXrANKa_MSHP8uS9oBdffY9skTpIgvTeyB1g-FC9bNwPE3_YMZQgkmXlomTydUovoAL1ez_fHXcNRr0Svc20Z8kxNiuxAajteYYLWh=w426-h240-k-no',
  'Black Hen Rösthandwerk Saarbrücken':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWni2MRerVJl_hbnRS3vFvOVR-EiDDW7qParjMqrli6v5jUk9hmGVzVzmAPN-QDZ-l51snYwit7LzeKZ0hahYKtNNt20aBKEe2IhK9TuAZCksx2ktXo4QoYza581GGQaSP5Nm8tfEw=w408-h306-k-no',
  'Fredrik - Saarbrücken':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkp7uBJJrPlOVX_eMNIJxjSHMconuBOq-dUzPio6gpA9HlkmO94ChURAoCH1v7qbO3pJYDch6xa0GziCPI52wZvrUryLE2wuEQvoJ1O4GnvYHH-POF7PEeK1kPHAv-XjCjiFYZ1=w408-h272-k-no',
  'Café Lolo':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkq7y_cCWewKEvpo_q9ZIT9Dwb1mKf8wm4ITBa-QxpCQiqd9sr5vQH3RamTD4PuCaQOho6L-UY5vCzJzb82aJTtN7xfIOBRvCoRsWLXlkKvItN2iv2rDVa1qNh7YCC631Fie5dI-Q=w408-h275-k-no',
  'Palazzo Sandro | Saarbrücken':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl8ZwOhi9YKaCeGoNCBQCM-tmptcVq1r8yqRdfaWO7WZCa-k-ZgPIukDKD07GK-HIVoE0sikDsGgn3elpIvaijO4DwalaebcppS78heaQADPvPt2JFVoyJpEo_7UGWrwOt2Qp7D_g=w408-h306-k-no',
  'Zapata - Saarbrücken':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl0xiynX0jRiVijTdl9vCbAXjJfPgHoQHtKfbNFNFEaTcLnI75pjBYDOLachR35ANFpDwgPyPbribGZyzFB_WON6ncIxAtkdif3k6BJ3HNK5P5T4vjHTSNbFy10TUMaHmnh5Pr45w=w408-h272-k-no',
  'Pizza Gotti':'https://images.squarespace-cdn.com/content/v1/5faaa96e735dc206f69b2b98/6b4e5b3d-a590-4388-ac26-37a27a6fa149/Pizza-Gotti-Napoli-Saarbruecken.jpg',
  'BABAQ':'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkCsTUubptfsat90zVzHIUcbgwkn3cQhRL5u6u8ljo9gCntzWA4ARn6cUW3QqrxBOCvG1uUqJzXNr_9H5L0qwsbrTvDqfcgotEk2UqytvyWS0HRudIuOkY7a9pA8U_1bQN-kMD37cpP_b0=w408-h724-k-no',
};

// Opening reports reviewed 2026-09-24; each item links to its supporting source.
export const openingNews: { date:string; state:string; name:string; category:string; address:string; note:string; url:string; detailsUrl?:string }[] = [
  {date:'23–26 SEP 2026',state:'本周午市菜单',name:'Ristorante Roma · Mittagsmenü',category:'意大利 · 午餐',address:'Hafenstraße 12, 66111 Saarbrücken',note:'官网公布 9 月 23–26 日午市双道菜单，36 欧元；周三至周六午餐时段供应，节假日除外。',url:'https://www.roma-saarbruecken.de/'},
  {"date":"01 OCT 2026","state":"重开预告","name":"Dampfschiff","category":"Bar · 酒吧","address":"Saarstraße 8, 66111 Saarbrücken","note":"据开业资讯网站，计划 10 月 1 日在原 Sake 餐厅重开；截至 9 月 24 日尚未到计划日期。","url":"https://www.neueroeffnung.info/saarbruecken/dampfschiff-bar"},
  {"date":"SEP 2026","state":"计划开业 · 日期待定","name":"Le Flâneur","category":"法式 · Bistro","address":"Sankt-Johanner-Markt 7–9, 66111 Saarbrücken","note":"开业资讯预计 9 月 21 日当周开业，但未给出具体日期；截至 9 月 24 日未找到可核实的正式开业公告。预告菜品并非正式菜单。","url":"https://www.neueroeffnung.info/saarbruecken/le-flaneur-franzoesisches-bistro-restaurant"},
  {"date":"18 SEP 2026","state":"已开业","name":"Mangal Döner x Lukas Podolski","category":"Döner · 快餐","address":"Sulzbachstraße 2, 66111 Saarbrücken","note":"RADIO SALÜ 于 9 月 18 日报道已开业，入驻原 Café Schubert；与 Berliner Promenade 的 Mangal Mezze & Grill 是不同店家。","url":"https://www.salue.de/nachrichten/message-258387.phtml"},
  {"date":"12 SEP 2026","state":"已上线点餐","name":"Why Not Sushi","category":"日式 · Sushi","address":"Bahnhofstraße 58, 66111 Saarbrücken","note":"开业资讯列出 9 月 12 日；截至 9 月 21 日 Wolt 已有本店菜单、地址与配送时段。堂食营业时间请向店家确认。","url":"https://wolt.com/de/deu/saarbrucken/restaurant/why-not-sushi"},
  {"date":"05 SEP 2026","state":"重开待确认","name":"Halbmond Restaurant","category":"阿拉伯 · Café · Terrasse","address":"Fröschengasse 18, 66111 Saarbrücken","note":"截至 9 月 24 日官网仍显示未注明月份的休假通知，实际重开日期待确认。","url":"https://www.halbmondrestaurant.de/"},
  {date:'01 SEP 2026',state:'新店',name:'Sneaky',category:'街头小吃 · Burger · Tacos',address:'Kaltenbachstraße 3, 66111 Saarbrücken',note:'开业资讯网站 9 月 12 日更新确认于 9 月 1 日开业；Kalinski 团队新店，提供汉堡、Tacos、冰淇淋与奶昔外带。',url:'https://www.neueroeffnung.info/saarbruecken/sneaky-street-food-laden'},
  {date:'07 AUG 2026',state:'新店',name:'Amidos & Helmi',category:'突尼斯 · 地中海 · Burger',address:'Mainzer Straße 102, 66121 Saarbrücken',note:'官网公布 8 月 7 日开业，主打突尼斯家常菜、Couscous 与 Grill/Burger。',url:'https://amidos-helmi.de/'},
  {date:'01 AUG 2026',state:'新店资讯',name:'Berliner Döner by Kemo',category:'Döner · 快餐',address:'Bergstraße 68, 66115 Saarbrücken',note:'开业资讯网站列出 8 月 1 日开业，位于 Burbach 的 Döner 小店；营业详情请向店家确认。',url:'https://www.neueroeffnung.info/saarbruecken/berliner-doener-by-kemo'},
  {date:'07 JUL 2026',state:'夏季新店',name:'Pasteria al Dente',category:'意式 · Pasta',address:'Sankt-Johanner-Markt 22, 66111 Saarbrücken',note:'据开业资讯网站，原定春季的开业计划因装修延期至 7 月 7 日；位于 Stengelbrunnen 对面。',url:'https://www.neueroeffnung.info/saarbruecken/pasteria-al-dente'},
  {date:'15 JUN 2026',state:'夏季新店',name:'Schnitzery',category:'Schnitzel · 快餐',address:'Berliner Promenade 18, 66111 Saarbrücken',note:'开业资讯网站于 7 月确认，这家 Berliner Promenade 新店已在 6 月 15 日开业。',url:'https://www.neueroeffnung.info/saarbruecken/schnitzery_6'},
];

export const newsletters = [
  {name:'ESPLANADE · FEINE AUSSICHTEN',cadence:'每周菜单',note:'两家餐厅的周菜单与临时空桌提醒。',url:'https://www.esplanade-sb.de/news/'},
  {name:'Saarbrücken 市政 Newsletter',cadence:'每周四',note:'城市新鲜事、活动与官方通知；不是纯餐饮，但适合发现本地新动向。',url:'https://www.saarbruecken.de/rathaus/presse_und_online/newsletter'},
];

export const mapUrl = (place: Place) => place.maps ?? q(place.name);
