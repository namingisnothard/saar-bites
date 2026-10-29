# Restaurant additions — 29 October 2026

Added the six previously identified missing restaurants with supported Google snapshots >=4.5. La Paella was already added in this local update (see la-paella-review-2026-10-29.md), bringing the guide from 84 to 91 places. Cōcō im Rizzo remains excluded because its address is unresolved; lower-rated venues and Mee's Korat (Google score unverified) were not added.

These are third-party Google snapshots, not direct live Maps checks. Chinese, English and German notes explicitly say this. Existing ratings and the last broad content-review date remain unchanged.

| Venue | Google snapshot / source | Official information |
| --- | --- | --- |
| Musaïq | 4.7 / 47 — https://de.restaurantguru.com/Musaiq-Saarbrucken | https://www.xn--musaq-fta.de/ — Nauwieserstraße 19; Tue–Sat 15–24, Sun 14–22, Mon closed. Main dining 17–22, bar thereafter. Current autumn/winter menu linked directly. |
| Restaurant Hashimoto | 4.6 / 377, snapshot dated 30 September — https://www.werkenntdenbesten.de/e/26331708/japanisches-restaurant/saarbruecken/japanisches-restaurant-hashimoto-hashimoto-bewertungen.html | https://hashimoto-saar.de/ — Cecilienstraße 7; Tue/Wed/Sat 18:30–22, Fri/Sun additionally 12–14; Mon/Thu closed. https://hashimoto-saar.de/speisekarte-hashimoto-saarbruecken/ announces full closures 1 and 15 November, entered as date exceptions. Teppanyaki Fri evening–Sun by reservation. |
| Izakaya Hashimoto | 4.6 / 236 — https://wanderlog.com/place/details/2975040/izakaya-hashimoto | https://hashimoto-saar.de/speisekarte-izakaya-saarbruecken/ — Fröschengasse 1; irregular closing days since August, monthly plan on Instagram. Keep schedule null; do not reuse fixed days from old directories. |
| Gasthaus Zahm | 4.6 / 916 — https://restaurant.info/restaurant/gasthaus-zahm | https://www.gasthaus-zahm.de/ — Saarstraße 6; daily from noon, kitchen to 22:30. No fixed venue closing time, schedule null. |
| Haus Brück | 4.6 / 251 — https://de.restaurantguru.com/restaurant-Saarbrucken-t1/2?cuisines=34 | https://haus-brueck.de/ redirects to https://haus-brueck.jimdosite.com/ — Mainzer Straße 6; kitchen Mon–Fri 11:30–14:30, Tue–Sat 18–21:30; Sun closed. Tue–Fri venue remains open in the afternoon; kitchen hours are not substituted for venue hours, schedule null. |
| La Bastille | 4.5 / 652 — https://wanderlog.com/place/details/2700127/la-bastille-saarbr%C3%BCcken | https://www.restaurant-labastille.de/kontakt/ — Kronenstraße 1b; kitchen Tue–Sat 11:30–14, Fri/Sat additionally 17–21. Approximate venue closing 15:30/22:30; closed Sun/Mon/public holidays. Schedule null because closings are approximate. |

## Real photo sources

All downloaded files were visually inspected. Rights remain with original photographers/publishers. Existing unmapped-place links handle the six additions without guessed coordinates.

- Musaïq courtyard: https://www.xn--musaq-fta.de/wp-content/uploads/go-x/u/5de9daf4-8f62-4bf6-934c-3ab66992ac09/l0,t529,w941,h606/image.jpg → public/venue-musaiq.jpg.
- Restaurant Hashimoto official restaurant teaser: https://hashimoto-saar.de/mt-content/uploads/2019/07/teaser-startseite3.jpg → public/venue-hashimoto.jpg.
- Izakaya Hashimoto official izakaya teaser: https://hashimoto-saar.de/mt-content/uploads/2019/07/teaser-startseite4.jpg → public/venue-izakaya-hashimoto.jpg.
- Gasthaus Zahm official interior: https://www.gasthaus-zahm.de/wp-content/uploads/2019/06/20200131-HIP_8009-1.jpg → public/venue-gasthaus-zahm.jpg. Generic stock imagery elsewhere on the page was excluded.
- Haus Brück exterior, Forum report https://www.magazin-forum.de/de/bewaehrtes-guten-haenden (Thomas Wieck): https://www.magazin-forum.de/sites/default/files/inline-images/07_2026_Leben_SL_Geniessen_Haus_Brueck_003.jpg → public/venue-haus-brueck.jpg.
- La Bastille exterior, matched Tripadvisor listing https://www.tripadvisor.com/Restaurant_Review-g187396-d1037959-Reviews-La_Bastille-Saarbrucken_Saarland.html: https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/04/50/ee/caption.jpg?h=-1&s=1&w=900 → public/venue-la-bastille.jpg. Official gallery image fetch returned 403.

Validation: TypeScript check, duplicate/name/translation/photo checks, production Vinext build. Static Pages build was attempted but requires NEXT_PUBLIC_REVIEW_API_URL, which is not configured in this local shell. Browser access host was unavailable in this session, so no browser QA claimed. Changes remain local pending the established GitHub publication workflow.
