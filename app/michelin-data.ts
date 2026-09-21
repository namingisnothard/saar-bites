export type MichelinLocale = 'zh' | 'en' | 'de';
type Copy = Record<MichelinLocale, string>;
const l = (zh: string, en: string, de: string): Copy => ({ zh, en, de });

export const michelinReviewedAt = '2026-09-21';
export const michelinEdition = 2026;
export const michelinSource = 'https://guide.michelin.com/de/de/article/michelin-guide-ceremony/alle-sternerestaurants---michelin-guide-deutschland-2026';

export type MichelinRestaurant = {
  id: string;
  name: string;
  stars: 1 | 2 | 3;
  city: string;
  address: string;
  cuisine: Copy;
  menu: { label: Copy; price: string }[];
  menuNote: Copy;
  menuUrl: string;
  bookingUrl: string;
  booking: Copy;
  phone: string;
  email?: string;
  service: Copy;
  notice?: Copy;
  policyUrl?: string;
};

// Michelin distinctions: 2026 annual list above. Menus and booking details:
// official venue sources, checked 2026-09-21; see docs/michelin-review-2026-09-21.md.
export const michelinRestaurants: MichelinRestaurant[] = [
  {
    id: 'esplanade', name: 'ESPLANADE', stars: 2, city: 'Saarbrücken',
    address: 'Nauwieserstraße 5, 66111 Saarbrücken',
    cuisine: l('现代法餐 · 地中海与日本风味', 'Modern French · Mediterranean & Japanese influences', 'Moderne französische Küche · mediterrane & japanische Einflüsse'),
    menu: [
      { label: l('Signature · 6 道菜', 'Signature · 6 courses', 'Signature · 6 Gänge'), price: '€195' },
      { label: l('Les Délices de la Forêt · 4 道菜', 'Les Délices de la Forêt · 4 courses', 'Les Délices de la Forêt · 4 Gänge'), price: '€200' },
      { label: l('Plat du Jour 午市套餐', 'Plat du Jour lunch menu', 'Plat du Jour mittags'), price: '€72' },
    ],
    menuNote: l('9 月 16 日菜单：Signature 与秋季森林套餐，另有素食和单点选择；加菜另计。每周午市套餐周三至周六提供（节假日除外）。', 'Menu dated 16 September: Signature and a seasonal forest menu, plus vegetarian and à la carte options; supplements extra. Weekly lunch menu Wed–Sat, excluding public holidays.', 'Karte vom 16. September: Signature und Waldmenü, dazu vegetarische und À-la-carte-Optionen; Supplements extra. Wöchentliches Mittagsmenü Mi–Sa, außer an Feiertagen.'),
    menuUrl: 'https://www.esplanade-sb.de/restaurant-saarbruecken/',
    bookingUrl: 'https://www.esplanade-sb.de/restaurant-saarbruecken/#tischreservierung',
    booking: l('通过官网 OpenTable、电话或邮件预订；6 人及以上请电话或邮件联系餐厅。', 'Book through the official OpenTable widget, by phone or email. For 6 or more guests, contact the restaurant by phone or email.', 'Über das offizielle OpenTable-Widget, telefonisch oder per E-Mail buchen. Ab 6 Personen nur telefonisch oder per E-Mail reservieren.'),
    phone: '+49 681 84499125', email: 'restaurant@esplanade-sb.de',
    service: l('周三至周六：午市 12:00 起，晚市 18:30 起。', 'Wed–Sat: lunch from 12:00; dinner from 18:30.', 'Mi–Sa: mittags ab 12 Uhr, abends ab 18:30 Uhr.'),
    notice: l('10 月 11–18 日休假；10 月 21 日晚恢复营业，午市套餐 10 月 22 日恢复。', 'Holiday closure 11–18 Oct; reopens for dinner 21 Oct. Lunch menu resumes 22 Oct.', 'Betriebsferien 11.–18.10.; wieder geöffnet am 21.10. abends. Plat du Jour ab 22.10.'),
  },
  {
    id: 'erfort', name: 'GästeHaus Klaus Erfort', stars: 2, city: 'Saarbrücken',
    address: 'Mainzer Straße 95, 66121 Saarbrücken',
    cuisine: l('经典法餐', 'Classic French', 'Klassische französische Küche'),
    menu: [
      { label: l('品鉴套餐 · 4 / 5 道 / 完整版', 'Tasting menu · 4 / 5 courses / complete', 'Degustationsmenü · 4 / 5 Gänge / komplett'), price: '€175 / €200 / €244' },
    ],
    menuNote: l('官网当季菜单含龙虾、海鲈与鹿肉；经典单点菜 Les grands Classiques 需提前订购。', 'The published seasonal menu includes lobster, sea bass and venison. Les grands Classiques à la carte dishes require advance ordering.', 'Die veröffentlichte Saisonkarte enthält Hummer, Wolfsbarsch und Rehbock. Les grands Classiques à la carte nur auf Vorbestellung.'),
    menuUrl: 'https://www.gaestehaus-erfort.de/', bookingUrl: 'https://www.gaestehaus-erfort.de/',
    booking: l('官网 Reservierung 栏可在线预订，也可电话联系。邮件订位需至少提前两周。', 'Use the website’s Reservierung section or call. Email reservation requests should be sent at least two weeks ahead.', 'Im Bereich Reservierung der Website oder telefonisch buchen. E-Mail-Reservierungen bitte mindestens zwei Wochen im Voraus senden.'),
    phone: '+49 681 9582682', email: 'kontakt@gaestehaus-erfort.de',
    service: l('周一至周五：12:00 / 19:00 起；周六仅接受提前安排的包场，周日休息。', 'Mon–Fri from 12:00 and 19:00. Saturday private groups by arrangement; Sunday closed.', 'Mo–Fr ab 12 und 19 Uhr. Sa geschlossene Gesellschaften nach Vereinbarung; So geschlossen.'),
  },
  {
    id: 'bau', name: "Victor’s Fine Dining by Christian Bau", stars: 3, city: 'Perl-Nennig',
    address: 'Schloßstraße 27–29, 66706 Perl-Nennig',
    cuisine: l('法日融合 · 鱼与海鲜', 'French-Japanese · fish & seafood', 'Französisch-japanisch · Fisch & Meeresfrüchte'),
    menu: [
      { label: l('Paris–Tokio · Full experience', 'Paris–Tokio · Full experience', 'Paris–Tokio · Full experience'), price: '€355' },
      { label: l('Einfach Bau · 5 道菜及饮品套餐', 'Einfach Bau · 5 courses with drinks', 'Einfach Bau · 5 Gänge mit Getränken'), price: '€425' },
    ],
    menuNote: l('法日品鉴菜单含龙虾、比目鱼与鱼子酱。Einfach Bau 含葡萄酒、开胃酒、水与热饮，仅周四晚、周六午及周日午晚提供，需邮件预订。', 'French-Japanese tasting menu featuring lobster, turbot and caviar. Einfach Bau includes wine, aperitif, water and a hot drink; Thu dinner, Sat lunch, Sun lunch/dinner only. Request this package by email.', 'Französisch-japanisches Menü mit Hummer, Steinbutt und Kaviar. Einfach Bau inkl. Wein, Aperitif, Wasser und Heißgetränk: Do abends, Sa mittags, So mittags/abends. Arrangement nur per E-Mail buchen.'),
    menuUrl: 'https://www.victors-fine-dining.de/menues-arrangements',
    bookingUrl: 'https://www.victors-fine-dining.de/reservierung',
    booking: l('官网在线订位，确认后信用卡预付 €250/人。至少提前 5 个工作日取消时，订金转为下次预订的额度；较晚取消可能被扣留。6 人起请电话或邮件联系，另有团体条款。', 'Book online with a €250/person card deposit. Cancel at least 5 working days ahead to retain the deposit as credit for a future booking; late cancellations may forfeit it. Contact the venue for 6+ guests; group terms differ.', 'Online mit €250 Anzahlung pro Person buchen. Bei Stornierung mindestens 5 Werktage vorher bleibt das Deposit für eine neue Buchung erhalten; später kann es einbehalten werden. Ab 6 Gästen direkt anfragen; gesonderte Gruppenbedingungen.'),
    phone: '+49 6866 79118', email: 'info@victors-fine-dining.de',
    service: l('晚市周四至周日 19:00–24:00；午市周六、周日 12:00–16:00。', 'Dinner Thu–Sun 19:00–24:00; lunch Sat–Sun 12:00–16:00.', 'Do–So abends 19–24 Uhr; Sa–So mittags 12–16 Uhr.'),
    policyUrl: 'https://www.victors-fine-dining.de/faq',
  },
  {
    id: 'atama', name: 'ATAMA by Martin Stopp', stars: 2, city: 'St. Ingbert',
    address: 'Ensheimer Straße 20, 66386 St. Ingbert',
    cuisine: l('创意料理 · 经典品鉴', 'Creative cuisine · classic tasting menus', 'Kreative Küche · klassische Degustation'),
    menu: [
      { label: l('Für die Sinne · 5 / 6 / 7 道', 'Für die Sinne · 5 / 6 / 7 courses', 'Für die Sinne · 5 / 6 / 7 Gänge'), price: '€165 / €185 / €195' },
      { label: l('Für die Seele · 5 / 6 / 7 道', 'Für die Seele · 5 / 6 / 7 courses', 'Für die Seele · 5 / 6 / 7 Gänge'), price: '€195 / €225 / €235' },
    ],
    menuNote: l('均含开胃小点、Amuse-bouche 与餐后甜点。素食、纯素及忌口请在订位时或至少提前 24 小时说明。', 'Both include snacks, amuse-bouche and petits fours. Request vegetarian/vegan options or dietary adjustments when booking, at least 24 hours ahead.', 'Beide inklusive Snacks, Amuse-Bouche und Petits Fours. Vegetarische/vegane Wünsche und Unverträglichkeiten bei Buchung, spätestens 24 Stunden vorher, mitteilen.'),
    menuUrl: 'https://atama.de/fine-dining/',
    bookingUrl: 'https://bookings.zenchef.com/results?rid=371808&pid=1001&shxpid=54697',
    booking: l('通过 Zenchef 选择 Fine Dining / Menü 场次，需信用卡担保；满位可加入候补。取消期限依所选体验确认（官网通常为提前 24 小时，Chef’s Table 为 48 小时）。', 'Choose the Fine Dining / Menü experience in Zenchef; a card guarantee is required. Join the waitlist if full. Check your experience’s terms: the FAQ generally gives 24 hours for cancellation, 48 for Chef’s Table.', 'In Zenchef Fine Dining / Menü wählen; Kreditkartengarantie erforderlich. Bei Ausbuchung Warteliste nutzen. Frist der Experience prüfen: laut FAQ in der Regel 24 Stunden, beim Chef’s Table 48 Stunden.'),
    phone: '+49 6894 705840', email: 'mail@atama.de',
    service: l('餐厅：周四至周六 18:30–24:00，周三至周五 12:00–14:30；菜单场次以订位系统为准。', 'Restaurant: Thu–Sat 18:30–24:00; Wed–Fri 12:00–14:30. Check available menu experiences when booking.', 'Restaurant: Do–Sa 18:30–24 Uhr; Mi–Fr 12–14:30 Uhr. Menü-Experiences im Buchungssystem prüfen.'),
    policyUrl: 'https://atama.de/faq/',
  },
  {
    id: 'louis', name: 'LOUIS restaurant', stars: 2, city: 'Saarlouis',
    address: 'Prälat-Subtil-Ring 22, 66740 Saarlouis',
    cuisine: l('亚洲风味创意料理 · 纯素套餐', 'Asian-influenced cooking · vegan tasting menu', 'Asiatisch geprägte Küche · veganes Menü'),
    menu: [
      { label: l('LOUIS’ menu · 完整 / 周三周四短套餐', 'LOUIS’ menu · full / shorter Wed–Thu menu', 'LOUIS’ Menü · komplett / kurz Mi–Do'), price: '€240 / €180' },
      { label: l('Gemüse Deluxe 纯素 · 完整 / 周三周四短套餐', 'Vegan Gemüse Deluxe · full / shorter Wed–Thu menu', 'Veganes Gemüse Deluxe · komplett / kurz Mi–Do'), price: '€220 / €165' },
    ],
    menuNote: l('当季主套餐含海鲜与肉类；Gemüse Deluxe 为纯素菜单。价格依据较新的德语官网菜单，饮品另计。', 'The seasonal main menu includes seafood and meat; Gemüse Deluxe is vegan. Prices follow the newer German-language menu; drinks are extra.', 'Das saisonale Hauptmenü enthält Meeresfrüchte und Fleisch; Gemüse Deluxe ist vegan. Preise laut neuerer deutscher Karte; Getränke extra.'),
    menuUrl: 'https://lamaison-hotel.de/restaurant-bar/louis-restaurant/',
    bookingUrl: 'https://lamaison-hotel.de/restaurant-bar/louis-restaurant/#tisch-reservieren',
    booking: l('通过 LOUIS 页面在线预订，或电话、邮件联系。6 人起请电话或邮件预订。', 'Book online on the LOUIS page, or by phone/email. For 6+ guests, use phone or email.', 'Auf der LOUIS-Seite online oder telefonisch/per E-Mail buchen. Ab 6 Personen bitte telefonisch oder per E-Mail anfragen.'),
    phone: '+49 6831 89440440', email: 'info@lamaison-hotel.de',
    service: l('周三至周六 18:30 起；周日至周二休息。', 'Wed–Sat from 18:30; closed Sun–Tue.', 'Mi–Sa ab 18:30 Uhr; So–Di geschlossen.'),
    notice: l('11 月 1–10 日休假。', 'Closed for a creative break 1–10 November.', 'Kreativpause 1.–10. November.'),
  },
  {
    id: 'haemmerle', name: 'Hämmerle’s Restaurant · Chef’s Table', stars: 1, city: 'Blieskastel',
    address: 'Bliestalstraße 110a, 66440 Blieskastel-Webenheim',
    cuisine: l('Bliesgau 当季料理 · Chef’s Table', 'Seasonal Bliesgau cooking · Chef’s Table', 'Saisonale Bliesgau-Küche · Chef’s Table'),
    menu: [
      { label: l('Chef’s Table · 午市 / 晚市', 'Chef’s Table · lunch / dinner', 'Chef’s Table · mittags / abends'), price: '€98 / €149' },
    ],
    menuNote: l('晚间 Chef’s Table 为 7 道菜体验，并有素食版本。官网另列午市套餐；订位时请确认道数。请预订 Chef’s Table，而非另一个 Landgenuss 餐厅。', 'The evening Chef’s Table offers a seven-course experience with a vegetarian alternative. A separate lunch menu is listed; confirm its course count. Select Chef’s Table when booking; Landgenuss is a separate restaurant.', 'Abends sieben Gänge am Chef’s Table, auch vegetarisch. Separates Mittagsmenü; Gangzahl bei Buchung erfragen. Chef’s Table wählen; Landgenuss ist ein separates Restaurant.'),
    menuUrl: 'https://haemmerles.de/restaurant-barrique/', bookingUrl: 'https://haemmerles.de/kontakt/',
    booking: l('官网 OpenTable 或电话预订，最多提前 90 天；满位可在线候补。不接受邮件订位。', 'Book via the official OpenTable widget or by phone, up to 90 days ahead. Online waitlist available. Reservation requests by email are not accepted.', 'Über das offizielle OpenTable-Widget oder telefonisch bis zu 90 Tage vorher buchen. Online-Warteliste verfügbar. Keine Reservierungsanfragen per E-Mail.'),
    phone: '+49 6842 52142',
    service: l('Chef’s Table：周二至周五 12:00–16:00；周五晚 19:00 起。周末及节假日休息。', 'Chef’s Table: Tue–Fri 12:00–16:00; Friday dinner from 19:00. Closed weekends and public holidays.', 'Chef’s Table: Di–Fr 12–16 Uhr; Fr abends ab 19 Uhr. Wochenende und Feiertage geschlossen.'),
    notice: l('10 月 12–16 日休假。', 'Holiday closure 12–16 October.', 'Betriebsferien 12.–16. Oktober.'),
  },
  {
    id: 'kunz', name: 'Restaurant Kunz', stars: 1, city: 'St. Wendel',
    address: 'Kirchstraße 22, 66606 St. Wendel-Bliesen',
    cuisine: l('经典法餐 · 当季料理', 'Classic French · seasonal cooking', 'Klassische französische Küche · saisonal'),
    menu: [
      { label: l('Signature · 4 / 5 / 6 道菜', 'Signature · 4 / 5 / 6 courses', 'Signature · 4 / 5 / 6 Gänge'), price: '€128 / €148 / €168' },
      { label: l('Traditionell · 5 道菜，至少 2 人', 'Traditionell · 5 courses, minimum 2 guests', 'Traditionell · 5 Gänge, ab 2 Personen'), price: '€85' },
    ],
    menuNote: l('当前官网 PDF 的 Signature 套餐需全桌统一选择；另有传统套餐与单点菜。菜单未注明日期，订位时请确认价格和菜品。', 'The currently linked PDF offers Signature for the whole table, a traditional menu and à la carte. The PDF is undated; confirm dishes and prices when booking.', 'Die aktuell verlinkte PDF-Karte bietet Signature nur tischweise, ein traditionelles Menü und à la carte. PDF ohne Datum; Gerichte und Preise bei Buchung bestätigen.'),
    menuUrl: 'https://restaurant-kunz.de/gourmet',
    bookingUrl: 'https://www.opentable.de/r/restaurant-kunz-reservations-wendel?restref=172620&lang=de-DE&ot_source=Restaurant%20website',
    booking: l('使用官网所链接的 OpenTable，或电话、邮件联系。8 人及以上请直接联系餐厅。', 'Use the restaurant’s linked OpenTable booking, or contact it by phone/email. For groups of 8+, contact the restaurant directly.', 'Über den offiziellen OpenTable-Link oder telefonisch/per E-Mail buchen. Gruppen ab 8 Personen bitte direkt anfragen.'),
    phone: '+49 6854 8145', email: 'service@restaurant-kunz.de',
    service: l('周三至周六 18:00–22:00；周日至周二休息。', 'Wed–Sat 18:00–22:00; closed Sun–Tue.', 'Mi–Sa 18–22 Uhr; So–Di geschlossen.'),
  },
  {
    id: 'midi', name: 'midi', stars: 1, city: 'St. Ingbert',
    address: 'Ernst-Heckel-Straße 4, 66386 St. Ingbert-Rohrbach',
    cuisine: l('Bliesgau 当季料理 · 素食套餐', 'Seasonal Bliesgau cooking · vegetarian menu', 'Saisonale Bliesgau-Küche · vegetarisches Menü'),
    menu: [
      { label: l('Ursprung / Botanik · 5 道菜', 'Ursprung / Botanik · 5 courses', 'Ursprung / Botanik · 5 Gänge'), price: '€159' },
      { label: l('周日午市 · 3 道菜', 'Sunday lunch · 3 courses', 'Sonntagsmenü · 3 Gänge'), price: '€69' },
    ],
    menuNote: l('新主厨 Marcus Langer 的 Ursprung 与素食 Botanik 可混合搭配；额外每道 +€10。周日午市含面包与黄油。', 'Chef Marcus Langer’s Ursprung and vegetarian Botanik can be mixed to create your menu; each additional course is €10. Sunday lunch includes bread and butter.', 'Ursprung und das vegetarische Botanik von Marcus Langer sind kombinierbar; jeder weitere Gang €10. Sonntagsmenü inklusive Brot und Butter.'),
    menuUrl: 'https://www.midi-restaurant.de/karte/', bookingUrl: 'https://www.midi-restaurant.de/tisch-reservieren/',
    booking: l('官网 OpenTable 在线预订，或电话、邮件联系。过敏与忌口请在订位时说明，最晚提前两天。', 'Book through the official OpenTable widget, or contact the venue by phone/email. Discuss allergies or intolerances when booking, at least two days ahead.', 'Über das offizielle OpenTable-Widget oder telefonisch/per E-Mail buchen. Allergien und Unverträglichkeiten bei Buchung, spätestens zwei Tage vorher, mitteilen.'),
    phone: '+49 6894 9299423', email: 'info@midi-restaurant.de',
    service: l('9 月 23 日起：周三至周六 18:00–23:00，周日 12:00–15:00；周一、周二休息。', 'From 23 September: Wed–Sat 18:00–23:00; Sun 12:00–15:00. Closed Mon–Tue.', 'Ab 23. September: Mi–Sa 18–23 Uhr; So 12–15 Uhr. Mo–Di geschlossen.'),
    notice: l('星级依据 2026 年指南；新主厨及新菜单为 9 月公布。新营业时间自 9 月 23 日生效。', 'Star status follows the 2026 guide. A new chef and menus were announced in September; the new hours take effect 23 September.', 'Stern laut Guide 2026. Neuer Küchenchef und neue Menüs im September angekündigt; neue Öffnungszeiten gelten ab 23. September.'),
    policyUrl: 'https://www.midi-restaurant.de/event/neuer-rhythmus-oeffnungszeiten-ab-23-september/',
  },
];
