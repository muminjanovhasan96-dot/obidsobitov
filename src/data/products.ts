/**
 * ==================================================================
 *  PRODUCT CATALOG  —  edit this file to manage the boutique's stock
 * ==================================================================
 *
 *  HOW TO ADD A PRODUCT
 *  --------------------
 *  Copy any object in the `products` array below and change the fields:
 *
 *    id         unique string (e.g. "w-07")
 *    slug       URL-friendly, unique (e.g. "rolex-day-date-40")  →  /product/<slug>
 *    name       product name (kept the same across languages)
 *    brand      brand name (e.g. "Rolex")
 *    category   one of: "watches" | "clothing" | "bags" | "accessories"
 *    priceUzs   price in UZS as a plain number (no spaces), e.g. 189000000
 *    images     1–5 image URLs. The first is the main image. Use the img()
 *               helper or paste full URLs. Swap the Unsplash placeholders for
 *               the client's own photos (hosted on a CDN or in /public).
 *    description text in all three languages { uz, ru, en }
 *    specs      list of { label, value } — label/value may be a plain string
 *               or an { uz, ru, en } object for translated text
 *    featured   true to surface the piece in the home "Featured" showcase
 *    availability "inStock" (default) or "onOrder"
 *
 *  The order of the array is the "New arrivals" order (first = newest).
 */

export type Category = "watches" | "clothing" | "bags" | "accessories";

export type LocalizedText = { uz: string; ru: string; en: string };

/** A value that is either the same in every language, or translated. */
export type Localizable = string | LocalizedText;

export type Spec = {
  label: Localizable;
  value: Localizable;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  priceUzs: number;
  images: string[];
  description: LocalizedText;
  specs: Spec[];
  featured: boolean;
  availability?: "inStock" | "onOrder";
};

/** Build an optimized Unsplash URL. Replace with client photos when ready. */
const img = (id: string, w = 1600): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Reusable, translated spec labels (keeps the data below tidy). */
const L = {
  movement: { uz: "Mexanizm", ru: "Механизм", en: "Movement" },
  case: { uz: "Korpus", ru: "Корпус", en: "Case" },
  caseSize: { uz: "Korpus o'lchami", ru: "Размер корпуса", en: "Case size" },
  water: { uz: "Suv o'tkazmaslik", ru: "Водозащита", en: "Water resistance" },
  reference: { uz: "Referens", ru: "Референс", en: "Reference" },
  bracelet: { uz: "Bilaguzuk", ru: "Браслет", en: "Bracelet" },
  material: { uz: "Material", ru: "Материал", en: "Material" },
  dimensions: { uz: "O'lchamlari", ru: "Размеры", en: "Dimensions" },
  hardware: { uz: "Furnitura", ru: "Фурнитура", en: "Hardware" },
  origin: { uz: "Ishlab chiqarilgan", ru: "Произведено", en: "Made in" },
  fit: { uz: "Bichim", ru: "Крой", en: "Fit" },
  color: { uz: "Rang", ru: "Цвет", en: "Colour" },
  lens: { uz: "Linza", ru: "Линзы", en: "Lens" },
} satisfies Record<string, LocalizedText>;

const italy: LocalizedText = { uz: "Italiya", ru: "Италия", en: "Italy" };
const switzerland: LocalizedText = {
  uz: "Shveytsariya",
  ru: "Швейцария",
  en: "Switzerland",
};
const france: LocalizedText = { uz: "Fransiya", ru: "Франция", en: "France" };

export const products: Product[] = [
  // ---------------------------------------------------------------- WATCHES
  {
    id: "w-01",
    slug: "rolex-submariner-date",
    name: "Submariner Date",
    brand: "Rolex",
    category: "watches",
    priceUzs: 189000000,
    images: [
      img("photo-1587836374828-4dbafa94cf0e"),
      img("photo-1523170335258-f5ed11844a49"),
      img("photo-1548171915-e79a380a2a4b"),
    ],
    description: {
      uz: "Suv osti dunyosining afsonasi. Oksidlanmaydigan po'lat korpus, seramika bezel va Rolex'ning mashhur aniqligini o'zida jamlagan zamonaviy klassika. Har qanday vaziyatda — kostyum ostidami yoki kundalik uslubdami — bir xil ishonch bilan ko'zni qamashtiradi.",
      ru: "Легенда подводного мира. Корпус из нержавеющей стали, керамический безель и знаменитая точность Rolex — современная классика, которая уместна и под костюмом, и в повседневном образе.",
      en: "A legend of the deep. A stainless steel case, ceramic bezel and Rolex's celebrated precision come together in a modern classic that looks equally assured under a suit or with everyday tailoring.",
    },
    specs: [
      { label: L.movement, value: { uz: "Avtomatik, Kalibr 3235", ru: "Автоматический, калибр 3235", en: "Automatic, Calibre 3235" } },
      { label: L.case, value: { uz: "Oystersteel po'lat", ru: "Сталь Oystersteel", en: "Oystersteel" } },
      { label: L.caseSize, value: "41 mm" },
      { label: L.water, value: "300 m" },
      { label: L.reference, value: "126610LN" },
    ],
    featured: true,
    availability: "inStock",
  },
  {
    id: "w-02",
    slug: "audemars-piguet-royal-oak",
    name: "Royal Oak Selfwinding",
    brand: "Audemars Piguet",
    category: "watches",
    priceUzs: 495000000,
    images: [
      img("photo-1523170335258-f5ed11844a49"),
      img("photo-1612817159949-195b6eb9e31a"),
      img("photo-1533139502658-0198f920d8e8"),
    ],
    description: {
      uz: "Gerald Genta chizgan ikonik sakkiz qirrali bezel va «Grande Tapisserie» sharpasi bilan bezatilgan tarixiy model. Sport-hashamat janrini yaratgan asar — nafislik va jasoratning mukammal muvozanati.",
      ru: "Историческая модель с культовым восьмиугольным безелем от Джеральда Дженты и циферблатом «Grande Tapisserie». Часы, создавшие жанр спортивной роскоши — безупречный баланс изящества и смелости.",
      en: "The historic model with its iconic octagonal bezel by Gérald Genta and «Grande Tapisserie» dial. The watch that created the luxury-sports genre — a flawless balance of elegance and audacity.",
    },
    specs: [
      { label: L.movement, value: { uz: "Avtomatik, Kalibr 4302", ru: "Автоматический, калибр 4302", en: "Automatic, Calibre 4302" } },
      { label: L.case, value: { uz: "Zanglamaydigan po'lat", ru: "Нержавеющая сталь", en: "Stainless steel" } },
      { label: L.caseSize, value: "41 mm" },
      { label: L.water, value: "50 m" },
      { label: L.reference, value: "15500ST" },
    ],
    featured: true,
    availability: "inStock",
  },
  {
    id: "w-03",
    slug: "patek-philippe-nautilus",
    name: "Nautilus 5711/1A",
    brand: "Patek Philippe",
    category: "watches",
    priceUzs: 1250000000,
    images: [
      img("photo-1509048191080-d2984bad6ae5"),
      img("photo-1594534475808-b18fc33b045e"),
      img("photo-1547996160-81dfa63595aa"),
    ],
    description: {
      uz: "Dunyodagi eng orzu qilingan soat. Iluminatorni eslatuvchi korpus va ko'k gradient sharpa — Patek Philippe san'atining eng yuqori cho'qqisi. Kolleksiyaning marvaridi va nasldan-naslga o'tadigan meros.",
      ru: "Самые желанные часы в мире. Корпус в форме иллюминатора и синий градиентный циферблат — вершина искусства Patek Philippe. Жемчужина коллекции и наследие, передаваемое из поколения в поколение.",
      en: "The most coveted watch in the world. Its porthole-inspired case and blue gradient dial represent the pinnacle of Patek Philippe's art — a collector's jewel and an heirloom passed down through generations.",
    },
    specs: [
      { label: L.movement, value: { uz: "Avtomatik, Kalibr 26-330 S C", ru: "Автоматический, калибр 26-330 S C", en: "Automatic, Calibre 26-330 S C" } },
      { label: L.case, value: { uz: "Zanglamaydigan po'lat", ru: "Нержавеющая сталь", en: "Stainless steel" } },
      { label: L.caseSize, value: "40 mm" },
      { label: L.water, value: "120 m" },
      { label: L.reference, value: "5711/1A-010" },
    ],
    featured: true,
    availability: "onOrder",
  },
  {
    id: "w-04",
    slug: "rolex-datejust-41",
    name: "Datejust 41",
    brand: "Rolex",
    category: "watches",
    priceUzs: 129000000,
    images: [
      img("photo-1548171915-e79a380a2a4b"),
      img("photo-1587836374828-4dbafa94cf0e"),
      img("photo-1523170335258-f5ed11844a49"),
    ],
    description: {
      uz: "Klassikaning ta'rifi. Fluted bezel, Jubilee bilaguzuk va nafis sharpa — Datejust har qanday zamon uslubidan yuqorida turadigan abadiy nafosat timsoli.",
      ru: "Определение классики. Рифлёный безель, браслет Jubilee и утончённый циферблат — Datejust остаётся символом вне времени и моды.",
      en: "The definition of classic. A fluted bezel, Jubilee bracelet and refined dial make the Datejust a symbol of timeless elegance that rises above every trend.",
    },
    specs: [
      { label: L.movement, value: { uz: "Avtomatik, Kalibr 3235", ru: "Автоматический, калибр 3235", en: "Automatic, Calibre 3235" } },
      { label: L.case, value: { uz: "Oystersteel va sariq oltin", ru: "Oystersteel и жёлтое золото", en: "Oystersteel and yellow gold" } },
      { label: L.caseSize, value: "41 mm" },
      { label: L.water, value: "100 m" },
      { label: L.reference, value: "126333" },
    ],
    featured: true,
    availability: "inStock",
  },
  {
    id: "w-05",
    slug: "patek-philippe-aquanaut",
    name: "Aquanaut 5167A",
    brand: "Patek Philippe",
    category: "watches",
    priceUzs: 690000000,
    images: [
      img("photo-1533139502658-0198f920d8e8"),
      img("photo-1594534475808-b18fc33b045e"),
      img("photo-1612817159949-195b6eb9e31a"),
    ],
    description: {
      uz: "Zamonaviy avlod uchun yaratilgan sport-hashamat. Yengil «Tropical» qayishi va relyefli sharpasi bilan Aquanaut kundalik erkinlik va yuksak soatsozlikni birlashtiradi.",
      ru: "Спортивная роскошь для современного поколения. С лёгким ремешком «Tropical» и рельефным циферблатом Aquanaut соединяет повседневную свободу и высокое часовое искусство.",
      en: "Sports luxury for a modern generation. With its supple «Tropical» strap and embossed dial, the Aquanaut unites everyday ease with fine watchmaking.",
    },
    specs: [
      { label: L.movement, value: { uz: "Avtomatik, Kalibr 324 S C", ru: "Автоматический, калибр 324 S C", en: "Automatic, Calibre 324 S C" } },
      { label: L.case, value: { uz: "Zanglamaydigan po'lat", ru: "Нержавеющая сталь", en: "Stainless steel" } },
      { label: L.caseSize, value: "40 mm" },
      { label: L.water, value: "120 m" },
      { label: L.reference, value: "5167A-001" },
    ],
    featured: true,
    availability: "onOrder",
  },
  {
    id: "w-06",
    slug: "audemars-piguet-royal-oak-offshore",
    name: "Royal Oak Offshore Chronograph",
    brand: "Audemars Piguet",
    category: "watches",
    priceUzs: 560000000,
    images: [
      img("photo-1612817159949-195b6eb9e31a"),
      img("photo-1533139502658-0198f920d8e8"),
      img("photo-1509048191080-d2984bad6ae5"),
    ],
    description: {
      uz: "Kuch va karakterning ifodasi. Yiriklashtirilgan korpus, xronograf funksiyasi va jasur dizayn — Offshore o'ziga xosligini yashirmaydigan shaxslar uchun.",
      ru: "Воплощение силы и характера. Увеличенный корпус, функция хронографа и смелый дизайн — Offshore для тех, кто не скрывает свою индивидуальность.",
      en: "An expression of power and character. An oversized case, chronograph function and bold design — the Offshore is for those who never hide their individuality.",
    },
    specs: [
      { label: L.movement, value: { uz: "Avtomatik xronograf, Kalibr 4401", ru: "Автоматический хронограф, калибр 4401", en: "Automatic chronograph, Calibre 4401" } },
      { label: L.case, value: { uz: "Zanglamaydigan po'lat", ru: "Нержавеющая сталь", en: "Stainless steel" } },
      { label: L.caseSize, value: "43 mm" },
      { label: L.water, value: "100 m" },
      { label: L.reference, value: "26420ST" },
    ],
    featured: true,
    availability: "inStock",
  },

  // --------------------------------------------------------------- CLOTHING
  {
    id: "c-01",
    slug: "loro-piana-cashmere-overcoat",
    name: "Cashmere Overcoat",
    brand: "Loro Piana",
    category: "clothing",
    priceUzs: 62000000,
    images: [
      img("photo-1539533018447-63fcce2678e3"),
      img("photo-1591047139829-d91aecb6caea"),
      img("photo-1507003211169-0a1dd7228f2d"),
    ],
    description: {
      uz: "Sof kashmirdan tikilgan palto — issiqlik va yengillikning nodir uyg'unligi. Loro Piana'ning noyob matosi tananing har bir harakatiga muloyim ergashadi va yillar davomida shaklini saqlaydi.",
      ru: "Пальто из чистого кашемира — редкое сочетание тепла и лёгкости. Уникальная ткань Loro Piana мягко следует за каждым движением и годами сохраняет форму.",
      en: "An overcoat in pure cashmere — a rare marriage of warmth and lightness. Loro Piana's singular cloth follows every movement softly and holds its shape for years.",
    },
    specs: [
      { label: L.material, value: { uz: "100% kashmir", ru: "100% кашемир", en: "100% cashmere" } },
      { label: L.fit, value: { uz: "Erkin, klassik", ru: "Свободный, классический", en: "Relaxed, classic" } },
      { label: L.color, value: { uz: "Tuya jun rangi", ru: "Верблюжий", en: "Camel" } },
      { label: L.origin, value: italy },
    ],
    featured: false,
    availability: "inStock",
  },
  {
    id: "c-02",
    slug: "brunello-cucinelli-wool-suit",
    name: "Tailored Wool Suit",
    brand: "Brunello Cucinelli",
    category: "clothing",
    priceUzs: 56000000,
    images: [
      img("photo-1507679799987-c73779587ccf"),
      img("photo-1592878904946-b3cd8ae243d0"),
      img("photo-1507003211169-0a1dd7228f2d"),
    ],
    description: {
      uz: "Italiya ustalari qo'lida tikilgan jun kostyum. Yumshoq yelka chizig'i va benuqson bichim — «quiet luxury» falsafasining tirik timsoli. Rasmiy uchrashuvdan tortib kechki ziyofatgacha.",
      ru: "Шерстяной костюм, сшитый руками итальянских мастеров. Мягкая линия плеча и безупречный крой — живое воплощение философии «тихой роскоши». От деловой встречи до вечернего приёма.",
      en: "A wool suit made by Italian hands. A soft shoulder line and impeccable cut make it a living expression of the «quiet luxury» philosophy — from a business meeting to an evening reception.",
    },
    specs: [
      { label: L.material, value: { uz: "Sof jun (Super 130's)", ru: "Чистая шерсть (Super 130's)", en: "Pure wool (Super 130's)" } },
      { label: L.fit, value: { uz: "Zamonaviy tor bichim", ru: "Современный приталенный", en: "Modern slim" } },
      { label: L.color, value: { uz: "Ko'mir-kulrang", ru: "Угольно-серый", en: "Charcoal" } },
      { label: L.origin, value: italy },
    ],
    featured: false,
    availability: "inStock",
  },
  {
    id: "c-03",
    slug: "tom-ford-silk-evening-shirt",
    name: "Silk Evening Shirt",
    brand: "Tom Ford",
    category: "clothing",
    priceUzs: 9900000,
    images: [
      img("photo-1596755094514-f87e34085b2c"),
      img("photo-1594938298603-c8148c4dae35"),
      img("photo-1620012253295-c15cc3e65df4"),
    ],
    description: {
      uz: "Sof ipakdan tikilgan kechki ko'ylak. Yorug'likda muloyim yaltirab, teri bilan bir bo'lib ketadigan matoda — Tom Ford uslubining o'ziga xos jozibasi mujassam.",
      ru: "Вечерняя рубашка из чистого шёлка. Ткань мягко мерцает на свету и струится по коже — в ней воплощено особое обаяние стиля Tom Ford.",
      en: "An evening shirt in pure silk. The cloth shimmers softly in the light and glides against the skin — the distinct allure of the Tom Ford style, made tangible.",
    },
    specs: [
      { label: L.material, value: { uz: "100% ipak", ru: "100% шёлк", en: "100% silk" } },
      { label: L.fit, value: { uz: "Tor bichim", ru: "Приталенный", en: "Slim fit" } },
      { label: L.color, value: { uz: "Tungi qora", ru: "Чёрный", en: "Midnight black" } },
      { label: L.origin, value: italy },
    ],
    featured: false,
    availability: "inStock",
  },

  // ------------------------------------------------------------------- BAGS
  {
    id: "b-01",
    slug: "hermes-birkin-30",
    name: "Birkin 30",
    brand: "Hermès",
    category: "bags",
    priceUzs: 315000000,
    images: [
      img("photo-1584917865442-de89df76afd3"),
      img("photo-1594223274512-ad4803739b7c"),
      img("photo-1590874103328-eac38a683ce7"),
    ],
    description: {
      uz: "Hashamatning eng oliy ramzi. Togo terisidan bir usta tomonidan qo'lda tikilgan Birkin — nafaqat sumka, balki investitsiya va status timsoli. Har bir chok — mukammallikka intilishning isboti.",
      ru: "Высший символ роскоши. Birkin из кожи Togo, сшитая вручную одним мастером, — не просто сумка, а инвестиция и символ статуса. Каждый стежок — доказательство стремления к совершенству.",
      en: "The ultimate symbol of luxury. Hand-stitched by a single artisan in Togo leather, the Birkin is not merely a bag but an investment and a mark of status — every stitch a proof of the pursuit of perfection.",
    },
    specs: [
      { label: L.material, value: { uz: "Togo teri", ru: "Кожа Togo", en: "Togo leather" } },
      { label: L.dimensions, value: "30 × 22 × 16 cm" },
      { label: L.hardware, value: { uz: "Oltin rangli", ru: "Золотистая", en: "Gold-tone" } },
      { label: L.origin, value: france },
    ],
    featured: false,
    availability: "onOrder",
  },
  {
    id: "b-02",
    slug: "bottega-veneta-intrecciato-tote",
    name: "Intrecciato Tote",
    brand: "Bottega Veneta",
    category: "bags",
    priceUzs: 44000000,
    images: [
      img("photo-1594223274512-ad4803739b7c"),
      img("photo-1590874103328-eac38a683ce7"),
      img("photo-1584917865442-de89df76afd3"),
    ],
    description: {
      uz: "Logotipsiz hashamat. Bottega Veneta'ning mashhur «Intrecciato» to'quv usuli — brendni bir qarashda tanitadigan yagona belgisi. Yumshoq teri va keng sig'im kundalik nafosat uchun.",
      ru: "Роскошь без логотипа. Знаменитое плетение «Intrecciato» от Bottega Veneta — единственный знак, по которому бренд узнают с первого взгляда. Мягкая кожа и вместительность для повседневной элегантности.",
      en: "Luxury without a logo. Bottega Veneta's famous «Intrecciato» weave is the only mark by which the house is recognised at a glance. Supple leather and generous capacity for everyday elegance.",
    },
    specs: [
      { label: L.material, value: { uz: "To'qilgan nappa teri", ru: "Плетёная кожа наппа", en: "Woven nappa leather" } },
      { label: L.dimensions, value: "40 × 28 × 14 cm" },
      { label: L.color, value: { uz: "Tutun rangi", ru: "Дымчатый", en: "Smoke" } },
      { label: L.origin, value: italy },
    ],
    featured: false,
    availability: "inStock",
  },
  {
    id: "b-03",
    slug: "louis-vuitton-keepall-55",
    name: "Keepall Bandoulière 55",
    brand: "Louis Vuitton",
    category: "bags",
    priceUzs: 27500000,
    images: [
      img("photo-1590874103328-eac38a683ce7"),
      img("photo-1584917865442-de89df76afd3"),
      img("photo-1594223274512-ad4803739b7c"),
    ],
    description: {
      uz: "Sayohatchining klassikasi. Monogram matosidan tayyorlangan Keepall — yengil, bardoshli va tanib olinadigan. Hafta oxiri sayohatlari uchun ideal hamroh.",
      ru: "Классика путешественника. Keepall из ткани с монограммой — лёгкая, прочная и узнаваемая. Идеальный спутник для поездок на выходные.",
      en: "The traveller's classic. Crafted in Monogram canvas, the Keepall is light, durable and instantly recognisable — the ideal companion for a weekend away.",
    },
    specs: [
      { label: L.material, value: { uz: "Monogram matosi", ru: "Ткань Monogram", en: "Monogram canvas" } },
      { label: L.dimensions, value: "55 × 31 × 26 cm" },
      { label: L.hardware, value: { uz: "Oltin rangli", ru: "Золотистая", en: "Gold-tone" } },
      { label: L.origin, value: france },
    ],
    featured: false,
    availability: "inStock",
  },

  // ------------------------------------------------------------ ACCESSORIES
  {
    id: "a-01",
    slug: "cartier-juste-un-clou-bracelet",
    name: "Juste un Clou Bracelet",
    brand: "Cartier",
    category: "accessories",
    priceUzs: 108000000,
    images: [
      img("photo-1620625515032-6ed0c1790c75"),
      img("photo-1611591437281-460bfbe1220a"),
      img("photo-1602751584552-8ba73aad10e1"),
    ],
    description: {
      uz: "Oddiy mixning san'at asariga aylanishi. 1970-yillarda Nyu-Yorkda tug'ilgan bu dizayn — Cartier jasoratining ramzi. Minimalist shakl, maksimal ta'sir.",
      ru: "Превращение обычного гвоздя в произведение искусства. Рождённый в Нью-Йорке 1970-х, этот дизайн — символ смелости Cartier. Минимальная форма, максимальное впечатление.",
      en: "An ordinary nail transformed into a work of art. Born in 1970s New York, this design is a symbol of Cartier's audacity — minimal form, maximum presence.",
    },
    specs: [
      { label: L.material, value: { uz: "18k oq oltin", ru: "18k белое золото", en: "18k white gold" } },
      { label: L.color, value: { uz: "Oq oltin", ru: "Белое золото", en: "White gold" } },
      { label: L.origin, value: france },
    ],
    featured: false,
    availability: "onOrder",
  },
  {
    id: "a-02",
    slug: "tom-ford-sunglasses",
    name: "Private Collection Sunglasses",
    brand: "Tom Ford",
    category: "accessories",
    priceUzs: 5600000,
    images: [
      img("photo-1511499767150-a48a237f0083"),
      img("photo-1572635196237-14b3f281503f"),
      img("photo-1508296695146-257a814070b4"),
    ],
    description: {
      uz: "Yuzning eng nafis ramkasi. Italiyada qo'lda yig'ilgan asetat gardish va yuqori sifatli linzalar — Tom Ford quyoshdan himoyani uslub bayonotiga aylantiradi.",
      ru: "Самая изысканная оправа для лица. Ацетатная оправа ручной сборки из Италии и линзы высшего качества — Tom Ford превращает защиту от солнца в заявление о стиле.",
      en: "The finest frame for the face. A hand-assembled acetate frame from Italy and premium lenses — Tom Ford turns sun protection into a statement of style.",
    },
    specs: [
      { label: L.material, value: { uz: "Asetat gardish", ru: "Ацетатная оправа", en: "Acetate frame" } },
      { label: L.lens, value: { uz: "Qahrabo rangli, UV400", ru: "Янтарные, UV400", en: "Amber, UV400" } },
      { label: L.origin, value: italy },
    ],
    featured: false,
    availability: "inStock",
  },
  {
    id: "a-03",
    slug: "montblanc-meisterstuck-wallet",
    name: "Meisterstück Leather Wallet",
    brand: "Montblanc",
    category: "accessories",
    priceUzs: 4400000,
    images: [
      img("photo-1627123424574-724758594e93"),
      img("photo-1517254797898-04edd251bfb3"),
    ],
    description: {
      uz: "Kundalik nafosat detali. Sof teri va Montblanc emblemasi bilan bezatilgan hamyon — silliq sirt va aniq choklar har bir tafsilotda sifatni namoyon etadi.",
      ru: "Деталь повседневной элегантности. Кошелёк из натуральной кожи с эмблемой Montblanc — гладкая поверхность и точные швы демонстрируют качество в каждой детали.",
      en: "A detail of everyday elegance. A wallet in full-grain leather with the Montblanc emblem — a smooth surface and precise stitching show quality in every detail.",
    },
    specs: [
      { label: L.material, value: { uz: "Sof teri", ru: "Натуральная кожа", en: "Full-grain leather" } },
      { label: L.color, value: { uz: "Qora", ru: "Чёрный", en: "Black" } },
      { label: L.origin, value: { uz: "Germaniya", ru: "Германия", en: "Germany" } },
    ],
    featured: false,
    availability: "inStock",
  },
];

// -------------------------------------------------------------------------
//  Helpers used across the site (no need to edit)
// -------------------------------------------------------------------------

export const categories: Category[] = [
  "watches",
  "clothing",
  "bags",
  "accessories",
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedWatches(limit = 6): Product[] {
  return products
    .filter((p) => p.category === "watches" && p.featured)
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

/** Unique, sorted list of brands (optionally filtered by category). */
export function getBrands(category?: Category): string[] {
  const pool = category
    ? products.filter((p) => p.category === category)
    : products;
  return Array.from(new Set(pool.map((p) => p.brand))).sort();
}

export const priceBounds = {
  min: Math.min(...products.map((p) => p.priceUzs)),
  max: Math.max(...products.map((p) => p.priceUzs)),
};
