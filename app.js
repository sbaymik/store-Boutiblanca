// ==========================================================================
// BOUTIBLANCA — PRODUCTION PRESTIGE (CATALOGUE & STOREFRONT)
// Haute Tradition Marocaine · Bilinguisme Intégral FR/AR · WhatsApp +212658043555
// ==========================================================================

const SAMPLE_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
];

// LISTE OFFICIELLE DES 20 ARTICLES D'EXCEPTION DE LA MAISON
const CORE_PRODUCTS = [
  // 1 à 4 : CAFTANS
  {
    id: "caftan-jawhara-royal",
    name: "Caftan Royal Jawhara",
    name_ar: "قفطان جوهرة الملكي",
    category: "Caftan",
    category_ar: "قفطان",
    price: 3200,
    badge: "Broderie Skalli Or",
    badge_ar: "صقلي ذهبي حر",
    description: "Soie Jawhara pure tissée au fil de soie noble, col sfifa fassie d'apparat et boutons aqqads faits main.",
    description_ar: "حرير جوهرة أصيل منسوج بخيوط الحرير الخالص مع سفيفة فاسية وعقاد يدوي متقن.",
    image: "https://i.pinimg.com/originals/b0/82/9a/b0829aff252d5c80d5798fd5d9fae49a.jpg",
    details: "Tissu : Soie Jawhara naturelle · Broderie : Skalli doré de Fès · Ceinture : Mdamma velours ornée comprise",
    details_ar: "القماش: حرير جوهرة طبيعي · التطريز: صقلي ذهبي فاسي حر · الحزام: مضمة مخمل مطرزة"
  },
  {
    id: "caftan-mobra-emeraude",
    name: "Caftan Mobra Émeraude",
    name_ar: "قفطان موبرة زمردي",
    category: "Caftan",
    category_ar: "قفطان",
    price: 2850,
    badge: "Velours Royal",
    badge_ar: "مخمل ملكي",
    description: "Velours de soie mobra vert émeraude impérial, broderie florale raffinée et perlage délicat.",
    description_ar: "مخمل موبرة حريري بلون الزمرد الملكي، بتطريز ناعم ورشات عقيق يدوي راقية.",
    image: "https://i.pinimg.com/736x/1d/5a/f1/1d5af1b27361dacfc665bf12d078436f.jpg",
    details: "Tissu : Velours de soie Mobra épais · Broderie : Fil d'or et perles de verre · Coupe : Ample impériale",
    details_ar: "القماش: مخمل موبرة حريري سميك · التطريز: خيط ذهبي وعقيق زجاجي · القصة: ملكية واسعة"
  },
  {
    id: "caftan-bleu-majorelle",
    name: "Caftan Saphir Majorelle",
    name_ar: "قفطان ماجوريل الأزرق",
    category: "Caftan",
    category_ar: "قفطان",
    price: 2600,
    badge: "Édition Prestige",
    badge_ar: "نسخة متميزة",
    description: "Coupe contemporaine fluide en crêpe de soie bleu Majorelle éclatant, finitions argentées dfaïfa.",
    description_ar: "تصميم عصري منسدل من كريب الحرير بلون أزرق ماجوريل المشرق وتشطيبات فضية راقية.",
    image: "https://www.shutterstock.com/shutterstock/photos/2266636325/display_1500/stock-photo-caftan-marocain-caftan-arabe-culture-traditionnel-maroc-2266636325.jpg",
    details: "Tissu : Crêpe de soie coréen haut de gamme · Passementerie : Sfifa d'argent pur · Boutons : Aqqad fassi",
    details_ar: "القماش: كريب حرير كوري فاخر · التشطيب: سفيفة فضية حرة · العقاد: فاسي يدوي"
  },
  {
    id: "caftan-nude-poudre",
    name: "Caftan Nude Perlé",
    name_ar: "قفطان وردي مرصع",
    category: "Caftan",
    category_ar: "قفطان",
    price: 2950,
    badge: "Coup de Cœur",
    badge_ar: "الأكثر طلباً",
    description: "Douceur du crêpe georgette rose poudré et dentelle délicate, sertie de perles de rivière ton sur ton.",
    description_ar: "نعومة كريب جورجيت بلون وردي هادئ مع دانتيل فاخر مرصع باللؤلؤ على نفس الدرجة.",
    image: "https://nalou.fr/wp-content/uploads/2024/07/caftan-marocain-2.jpg",
    details: "Tissu : Crêpe Georgette & Dentelle de Calais · Perlage : Fait main haute joaillerie · Style : Romantique chic",
    details_ar: "القماش: كريب جورجيت ودانتيل كاليه · التنبيت: يدوي فاخر · الأسلوب: رومانسي أنيق"
  },

  // 5 à 8 : TAKCHITAS
  {
    id: "takchita-princesse-blanche",
    name: "Takchita Blanche & Or",
    name_ar: "تكشيطة العروس الملكية",
    category: "Takchita",
    category_ar: "تكشيطة",
    price: 4600,
    badge: "Haute Couture",
    badge_ar: "هوت كوتور",
    description: "Deux pièces magistrales pensées pour la mariée : sous-robe en satin duchesse et caftan en brocart or étincelant.",
    description_ar: "قطعتان استثنائيتان للعروس: تحتيّة من ساتان دوشيس وقفطان علوي من البروكار الذهبي البراق.",
    image: "https://i.pinimg.com/736x/93/f1/3d/93f13df4035c63fec4ba8f0a59644bc9.jpg",
    details: "Comprend : Tahtiya satin + Fouqiya brocart or + Ceinture Mdamma plaquée or travaillée · Traîne : 50 cm",
    details_ar: "المكونات: تحتية ساتان دوشيس + دفينة بروكار ذهبي + مضمة مذهبة فاخرة · الذيل: 50 سم"
  },
  {
    id: "takchita-brocart-saphir",
    name: "Takchita Brocart Saphir",
    name_ar: "تكشيطة بروكار ياقوتي",
    category: "Takchita",
    category_ar: "تكشيطة",
    price: 3950,
    badge: "Pièce Unique",
    badge_ar: "قطعة نادرة",
    description: "Brocart de soie lamé bleu saphir profond, rehaussé de broderie tarz rbati aux motifs floraux géométriques.",
    description_ar: "بروكار حريري باللون الأزرق الياقوتي العميق، مزين بطرز رباطي أصيل بنقوش هندسية ملكية.",
    image: "https://s-media-cache-ak0.pinimg.com/736x/d6/9a/4b/d69a4bd68f9626b43c3dafdcc9f2cccf.jpg",
    details: "Tissu : Brocart italien de haute manufacture · Broderie : Tarz Rbati fil d'argent · Coupe : Majestueuse",
    details_ar: "القماش: بروكار إيطالي رفيع · التطريز: طرز رباطي بخيط الفضة · القصة: مهيبة"
  },
  {
    id: "takchita-rubis-imperial",
    name: "Takchita Rubis Impérial",
    name_ar: "تكشيطة الياقوت الإمبراطوري",
    category: "Takchita",
    category_ar: "تكشيطة",
    price: 4200,
    badge: "Édition Limitée",
    badge_ar: "إصدار محدود",
    description: "Mariage somptueux entre velours grenat profond et mousseline de soie champagne, manches papillon d'apparat.",
    description_ar: "تناغم فاخر بين المخمل العنابي العميق وموسلين الحرير الشامبانيا مع أكمام فضفاضة ملكية.",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80",
    details: "Tissu : Velours milleraies pourpre & Mousseline · Finition : Sfifa et Aqqad dorés à la feuille d'or",
    details_ar: "القماش: مخمل عنابي وموسلين حرير · التشطيب: سفيفة وعقاد ذهبي أصيل"
  },
  {
    id: "takchita-reine-saba",
    name: "Takchita Ivoire Céleste",
    name_ar: "تكشيطة العاج السماوي",
    category: "Takchita",
    category_ar: "تكشيطة",
    price: 4800,
    badge: "Prestige Cérémonie",
    badge_ar: "برستيج المناسبات",
    description: "Création d'exception en mousseline de soie et organza ivoire, ornée de milliers de cristaux étincelants.",
    description_ar: "إبداع فاخر من حرير الأورجانزا وموسلين العاج مزين بآلاف البلورات البراقة يدوياً.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    details: "Tissu : Organza brodé & Soie sauvage · Fermeture : Boutons aqqads dorés · Doublure : Satin doux",
    details_ar: "القماش: أورجانزا مطرز وحرير خالص · الإغلاق: عقاد ذهبي · البطانة: ساتان ناعم"
  },

  // 9 à 12 : JELLABAS
  {
    id: "jellaba-randa-amande",
    name: "Jellaba Randa Vert Amande",
    name_ar: "جلابة راندة أخضر لوزي",
    category: "Jellaba",
    category_ar: "جلابة",
    price: 1250,
    badge: "Fait Main",
    badge_ar: "صناعة يدوية",
    description: "Crêpe de soie doux et léger rehaussé d'un délicat travail de randa traditionnel fait point par point à l'aiguille.",
    description_ar: "كريب حرير ناعم ومريح مزين براندة مغربية أصيلة متقنة بالإبرة بلون أخضر لوزي أنيق.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    details: "Tissu : Crêpe de soie respirant · Travail : Randa Jacquard à l'aiguille · Capuche : Doublée soignée",
    details_ar: "القماش: كريب حريري مريح · العمل: راندة أصيلة بالإبرة · القب: مبطن بعناية"
  },
  {
    id: "jellaba-sousdi-blanche",
    name: "Jellaba Sousdi Pure Blanche",
    name_ar: "جلابة سوسدي أبيض ناصع",
    category: "Jellaba",
    category_ar: "جلابة",
    price: 980,
    badge: "Intemporel",
    badge_ar: "أصالة خالدة",
    description: "Tissu sousdi traditionnel du Sud marocain, réputé pour sa finesse et sa fraîcheur, broderie fil de soie ton sur ton.",
    description_ar: "قماش سوسدي مغربي أصيل مشهور بنعومته وخفته مع تطريز خيط حرير متناغم وفخم.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    details: "Tissu : Coton Sousdi 100% naturel · Finition : Dhriss traditionnel aux manches et col · Idéal : Printemps/Été",
    details_ar: "القماش: قطن سوسدي طبيعي 100% · التشطيب: ضريس مغربي يدوي · مثالي: للربيع والصيف"
  },
  {
    id: "jellaba-velours-nocturne",
    name: "Jellaba Velours Nuit",
    name_ar: "جلابة مخمل ليلية",
    category: "Jellaba",
    category_ar: "جلابة",
    price: 1450,
    badge: "Hiver Élégant",
    badge_ar: "شتاء دافئ وأنيق",
    description: "Velours côtelé soyeux pour les journées fraîches, sublimé par une passementerie sfifa dorée moderne.",
    description_ar: "مخمل مضلع دافئ وناعم ومناسب للأيام الباردة، بلمسة سفيفة ذهبية عصرية وشيك.",
    image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&w=800&q=80",
    details: "Tissu : Velours lourd doublé · Fermeture : Aqqad or brossé · Coupe : Droite moderne avec poches passepoilées",
    details_ar: "القماش: مخمل مبطن دافئ · الإغلاق: عقاد ذهبي · القصة: مستقيمة عصرية"
  },
  {
    id: "jellaba-lin-terracotta",
    name: "Jellaba Lin Terre de Sienne",
    name_ar: "جلابة كتان ترابي",
    category: "Jellaba",
    category_ar: "جلابة",
    price: 890,
    badge: "Tendance Moderne",
    badge_ar: "أحدث صيحة",
    description: "Lin lavé naturel couleur terracotta marocaine, coupe épurée et contemporaine avec fentes d'aisance discrètes.",
    description_ar: "كتان طبيعي بلون طيني مراكشي أصيل، بقصة عصرية بسيطة ومريحة للمناسبات واليوميات.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    details: "Tissu : 100% Lin lavé d'Europe · Col : Officier avec sfifa fine · Couleur : Terre de Marrakech",
    details_ar: "القماش: كتان طبيعي مغسول 100% · القبة: رسمية مع سفيفة ناعمة · اللون: ترابي مراكشي"
  },

  // 13 à 16 : FOULARDS & HIJABS
  {
    id: "foulard-soie-zellige",
    name: "Foulard Soie Motif Zellige",
    name_ar: "شال حرير بنقش الزليج",
    category: "Foulard",
    category_ar: "فولار",
    price: 380,
    badge: "100% Soie Pure",
    badge_ar: "حرير طبيعي 100%",
    description: "Soie de mûrier naturelle ornée de motifs géométriques inspirés des faïences et zelliges de Fès et Marrakech.",
    description_ar: "حرير طبيعي خالص بنقوش هندسية مستوحاة من عمارة الزليج المغربي العريق.",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80",
    details: "Matière : 100% Twill de Soie · Dimensions : 90 x 90 cm · Roulotté : Cousu main à la française",
    details_ar: "المادة: تويل حرير 100% · الأبعاد: 90 × 90 سم · الحواف: خياطة يدوية متقنة"
  },
  {
    id: "foulard-mousseline-dore",
    name: "Foulard Mousseline Liseré Doré",
    name_ar: "طرحة موسلين بخيط ذهبي",
    category: "Foulard",
    category_ar: "فولار",
    price: 290,
    badge: "Doux & Léger",
    badge_ar: "خفيف وناعم",
    description: "Mousseline aérienne beige champagne bordée d'un liseré étincelant au fil doré skalli véritable.",
    description_ar: "موسلين ناعم جداً بلون الشامبانيا محاط بحواف مطرزة بخيط الصقلي الذهبي اللامع.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    details: "Matière : Mousseline de soie aérée · Dimensions : 75 x 195 cm · Idéal avec nos Caftans et Takchitas",
    details_ar: "المادة: موسلين حرير منسدل · الأبعاد: 75 × 195 سم · تناسق تام مع القفطان والتكشيطة"
  },
  {
    id: "foulard-medina-emeraude",
    name: "Foulard Médina Satin Émeraude",
    name_ar: "فولار حرير ساتان زمردي",
    category: "Foulard",
    category_ar: "فولار",
    price: 350,
    badge: "Reflets Satinés",
    badge_ar: "لمعان برستيج",
    description: "Toucher soyeux d'une brillance subtile, retombée lourde et élégante ne glissant pas sur les cheveux.",
    description_ar: "ملمس حريري بلمعان راقٍ وثبات ممتاز يمنح حضوراً مبهراً في كافة المناسبات.",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
    details: "Matière : Soie de Médine haut de gamme · Dimensions : 80 x 200 cm · Couleur intense garantie",
    details_ar: "المادة: حرير المدينة الفاخر · الأبعاد: 80 × 200 سم · ثبات ممتاز وألوان ثابتة"
  },
  {
    id: "foulard-ceremonie-ivoire",
    name: "Foulard Cérémonie Ivoire & Perles",
    name_ar: "طرحة عاجية باللؤلؤ",
    category: "Foulard",
    category_ar: "فولار",
    price: 420,
    badge: "Finition Perles",
    badge_ar: "حواف مرصعة باللؤلؤ",
    description: "Étoffe ivoire lumineuse brodée aux extrémités de délicates perles nacrées façon artisanat fassi.",
    description_ar: "نسيج عاجي مشرق مزين على الأطراف بحبات لؤلؤ ناعمة على الطريقة الفاسية الأصيلة.",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80",
    details: "Matière : Crêpe de soie premium · Finition : Perles cousues main une à une · Style : Mariage et Fêtes",
    details_ar: "المادة: كريب حرير فاخر · التشطيب: لؤلؤ مثبت يدوياً · المناسبات: أعراس واحتفالات"
  },

  // 17 à 20 : CHÂLES & ÉTOFFES NOBLES
  {
    id: "chale-cachemire-tarz",
    name: "Châle Cachemire Tarz Fassi",
    name_ar: "شال كشمير بطرز فاسي",
    category: "Châle",
    category_ar: "شال",
    price: 650,
    badge: "Broderie Artisanale",
    badge_ar: "طرز يدوي متقن",
    description: "Laine mérinos et cachemire noble rehaussés d'une frise au point de Fès brodée à la main par nos maâllems.",
    description_ar: "صوف ميرينو ممزوج بالكشمير الفاخر مطرز على يد معلمات فاس بأجمل غرز الطرز التقليدي.",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80",
    details: "Matière : 70% Laine fine, 30% Cachemire · Dimensions : 70 x 210 cm · Chaud et d'un chic absolu",
    details_ar: "المادة: 70% صوف ميرينو، 30% كشمير · الأبعاد: 70 × 210 سم · دافئ وفخم للغاية"
  },
  {
    id: "chale-pashmina-dore",
    name: "Châle Pashmina Moucharabieh",
    name_ar: "باشمينا نقش مشربية ذهبي",
    category: "Châle",
    category_ar: "شال",
    price: 520,
    badge: "Chaleur & Prestige",
    badge_ar: "دفء وفخامة",
    description: "Pashmina jacquard réversible aux motifs orientaux ciselés dorés et écru, finitions franges torsadées.",
    description_ar: "باشمينا جاكار فاخرة بوجهين بنقوش مشربية ذهبية وعاجية مهدبة يدوياً بحرفية عالية.",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
    details: "Matière : Pashmina tissé main · Finition : Franges artisanales nouées · Réversible or/écru",
    details_ar: "المادة: باشمينا منسوجة يدوياً · التشطيب: أهداب معقودة · بوجهين ذهبي/عاجي"
  },
  {
    id: "selham-royal-laine",
    name: "Selham Royal Laine Blanche",
    name_ar: "سلهام ملكي صوف أبيض",
    category: "Châle",
    category_ar: "شال",
    price: 1850,
    badge: "Apparat Traditionnel",
    badge_ar: "هيبة مغربية أصيلة",
    description: "La cape majestueuse du costume d'apparat marocain en drap de laine fine blanche, col et capuche ornés de sfifa.",
    description_ar: "الرداء الملكي المهيب للتقاليد المغربية من صوف نقي أبيض، مطرز عند القبة والقب بسفيفة أصيلة وشوشية.",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    details: "Matière : 100% Drap de laine vierge · Passementerie : Sfifa pure soie & Shoushiya artisanale",
    details_ar: "المادة: صوف بكر خالص 100% · السفيفة: حرير حر مع شوشية تقليدية يدوية"
  },
  {
    id: "gandora-soie-aqqad",
    name: "Gandora Chic Soie & Aqqad",
    name_ar: "قندورة حرير مع عقاد",
    category: "Châle",
    category_ar: "شال",
    price: 790,
    badge: "Confort Royal",
    badge_ar: "أناقة مريحة",
    description: "Gandora féminine en crêpe de soie fluide bleu royal, col brodé de petits aqqads délicats pour vos réceptions d'intérieur.",
    description_ar: "قندورة مغربية نسائية مريحة من كريب الحرير الملكي مع فتحة عنق مطرزة بالعقاد الفاسي الدقيق.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    details: "Matière : Crêpe de soie fluide · Coupe : Ample et gracieuse · Entretien : Nettoyage doux recommandé",
    details_ar: "المادة: كريب حرير منسدل · القصة: فضفاضة وأنيقة · العناية: تنظيف لطيف"
  }
];

let PRODUCTS = [...CORE_PRODUCTS];

// MAPPINGS POUR BILINGUISME ARABE PARFAIT
const CATEGORY_MAP_AR = {
  "Caftan": "قفطان",
  "Takchita": "تكشيطة",
  "Jellaba": "جلابة",
  "Foulard": "فولار",
  "Châle": "شال"
};

const BADGE_MAP_AR = {
  "Broderie Skalli Or": "صقلي ذهبي حر",
  "Velours Royal": "مخمل ملكي",
  "Édition Prestige": "نسخة متميزة",
  "Coup de Cœur": "الأكثر طلباً",
  "Haute Couture": "هوت كوتور",
  "Pièce Unique": "قطعة نادرة",
  "Édition Limitée": "إصدار محدود",
  "Prestige Cérémonie": "برستيج المناسبات",
  "Fait Main": "صناعة يدوية",
  "Intemporel": "أصالة خالدة",
  "Hiver Élégant": "شتاء دافئ وأنيق",
  "Tendance Moderne": "أحدث صيحة",
  "100% Soie Pure": "حرير طبيعي 100%",
  "Doux & Léger": "خفيف وناعم",
  "Reflets Satinés": "لمعان برستيج",
  "Finition Perles": "حواف مرصعة باللؤلؤ",
  "Broderie Artisanale": "طرز يدوي متقن",
  "Chaleur & Prestige": "دفء وفخامة",
  "Apparat Traditionnel": "هيبة مغربية أصيلة",
  "Confort Royal": "أناقة مريحة",
  "Signature": "قطعة مميزة",
  "Essentiel": "أساسي",
  "Nouveau": "جديد"
};

// TRADUCTIONS MULTILINGUES COMPLÈTES ET RIGOUREUSES
const translations = {
  fr: {
    announcement: "Livraison Partout au Maroc & International <span>·</span> Haute Tradition & Broderie d'Apparat",
    navHome: "Accueil",
    navCarousel: "Sélection",
    navCategories: "Catégories",
    navCollection: "Collection",
    navHeritage: "Notre Héritage",
    waVip: "WhatsApp VIP",
    cartLabel: "Panier",
    topCarouselTag: "Sélection Signature",
    topCarouselTitle: "La Sélection Impériale · <em>Créations de la Maison</em>",
    carouselPause: "Pause",
    carouselPlay: "Lecture",
    heroBadge: "Maison de Haute Tradition Marocaine",
    heroTitle: "L'art du caftan impérial.<br><em>Une allure sans égale.</em>",
    heroDescription: "Chaque création BOUTIBLANCA rend hommage au raffinement séculaire du costume marocain. Des soies tissées à Fès, des velours d'exception et une passementerie délicate façonnée au fil d'or skalli.",
    discover: "Explorer la Collection ↗",
    directWa: "Conseil Privé WhatsApp",
    statCraft: "Haute Façon",
    statCraftSub: "Créations Exclusives",
    statHandmade: "100%",
    statHandmadeSub: "Fait Main d'Artisan",
    statDelivery: "Maroc",
    statDeliverySub: "Livraison Sécurisée",
    sealMaison: "MAISON",
    sealEdition: "ÉDITION",
    sealRoyale: "✦ ROYALE ✦",
    floatingCraftTitle: "Haute Façon Fassie",
    floatingCraftDesc: "Broderie & Aqqads sur-mesure",
    trustCraftTitle: "Artisanat d'Exception",
    trustCraftDesc: "Confectionné point par point par nos maâllems à Fès et Marrakech.",
    trustMaterialsTitle: "Matières Nobles",
    trustMaterialsDesc: "Soie Jawhara pure, velours Mobra et fil d'or Skalli authentique.",
    trustDeliveryTitle: "Livraison Partout au Maroc",
    trustDeliveryDesc: "Expédition soignée et sécurisée dans un coffret de protection de luxe.",
    trustWaTitle: "Conciergerie WhatsApp",
    trustWaDesc: "Échanges directs, conseils personnalisés et accompagnement sur-mesure.",
    catEyebrow: "L'Univers de la Maison",
    catTitle: "Cinq Étoffes, Mille Émotions",
    catDiscover: "Découvrir les pièces ↗",
    catCaftans: "Caftans",
    catTakchitas: "Takchitas",
    catJellabas: "Jellabas",
    catFoulards: "Foulards",
    catChales: "Châles & Selhams",
    collectionEyebrow: "Le Catalogue Exclusif",
    collectionTitle: "L'Intégralité de nos <em>Créations</em>",
    searchPlaceholder: "Rechercher une pièce, tissu, couleur…",
    filterAll: "Toutes les Pièces",
    filterCaftan: "Caftans",
    filterTakchita: "Takchitas",
    filterJellaba: "Jellabas",
    filterFoulard: "Foulards & Hijabs",
    filterChale: "Châles & Selhams",
    vipWaTitle: "Une Création Sur-Mesure ?",
    vipWaDesc: "Nos maîtres artisans réalisent également vos tenues d'apparat sur mesure (choix du tissu, broderies sfifa personnalisées, perlage spécifique). Échangez directement avec notre conseillère privée via WhatsApp.",
    vipWaBtn: "Discuter sur WhatsApp",
    heritageEyebrow: "Transmission & Passion",
    heritageTitle: "Le Maroc dans chaque point d'aiguille.",
    heritageP1: "BOUTIBLANCA est née d'un amour inconditionnel pour les arts traditionnels marocains. De la broderie tarz fassi au travail minutieux de la randa, chaque pièce reflète la patience et la dextérité de nos maâllems.",
    heritageP2: "Nous sélectionnons des soies fines et des velours d'exception pour que chaque apparition soit un moment de grâce et de fierté culturelle.",
    heritageBtn: "Découvrir nos pièces ↗",
    footerDesc: "L'excellence de la haute couture traditionnelle marocaine. Des pièces précieuses pour célébrer les plus beaux instants de la vie.",
    footerCollections: "Nos Collections",
    footerServices: "Conciergerie & Service",
    footerContact: "Contact Privé",
    footerRights: "Tous droits réservés.",
    footerHeritageNote: "Maison Marocaine de Haute Tradition · Fait main avec passion.",
    floatingWaPill: "Conseillère en direct 💬",
    quickView: "Aperçu Rapide",
    orderWa: "Commander sur WhatsApp",
    addToCart: "Ajouter au Panier",
    added: "ajouté à votre sélection !",
    yourCart: "Votre Sélection",
    subtotal: "Sous-total",
    emptyCart: "Votre panier attend sa première pièce d'exception.",
    continueShopping: "Continuer mes découvertes",
    confirmWa: "Confirmer par WhatsApp",
    currency: "DH"
  },
  ar: {
    announcement: "توصيل إلى جميع مدن المغرب وكافة أنحاء العالم <span>·</span> فخامة الأصالة المغربية والتطريز اليدوي",
    navHome: "الرئيسية",
    navCarousel: "التشكيلة",
    navCategories: "الفئات",
    navCollection: "المجموعة الكاملة",
    navHeritage: "تاريخ الدار",
    waVip: "واتساب خاص",
    cartLabel: "السلة",
    topCarouselTag: "إطلالة متميزة",
    topCarouselTitle: "المجموعة الإمبراطورية · <em>إبداعات الدار</em>",
    carouselPause: "إيقاف مؤقت",
    carouselPlay: "تشغيل",
    heroBadge: "دار الأصالة والأناقة المغربية",
    heroTitle: "سحر القفطان الملكي الأصيل.<br><em>فخامة استثنائية لكل زمان.</em>",
    heroDescription: "تحتفي بوتي بلانكا بعراقة الزي التقليدي المغربي الأصيل. حرير خالص منسوج في فاس، مخمل ملكي فاخر، وتطريزات متقنة بخيوط الصقلي الحر وعقاد يدوي أصيل.",
    discover: "اكتشفي التشكيلة ↗",
    directWa: "استشارة خاصة واتساب",
    statCraft: "تفصيل ملكي",
    statCraftSub: "تصاميم حصرية",
    statHandmade: "100%",
    statHandmadeSub: "صناعة يدوية أصيلة",
    statDelivery: "المغرب",
    statDeliverySub: "توصيل آمن ومضمون",
    sealMaison: "الدار",
    sealEdition: "إصدار",
    sealRoyale: "✦ ملكي ✦",
    floatingCraftTitle: "صنعة فاسية فاخرة",
    floatingCraftDesc: "طرز وسفيفة وعقاد حسب الطلب",
    trustCraftTitle: "حرفية متوارثة",
    trustCraftDesc: "منسوجة ومطرزة غرزة بغرزة بأيدي معلمين مهرة في فاس ومراكش.",
    trustMaterialsTitle: "أقمشة فاخرة",
    trustMaterialsDesc: "حرير جوهرة خالص، مخمل موبرة أصيل، وخيوط الصقلي الحر.",
    trustDeliveryTitle: "توصيل لكافة مدن المغرب",
    trustDeliveryDesc: "شحن سريع وعناية فائقة في علبة فاخرة تحفظ جمال القطعة.",
    trustWaTitle: "خدمة خاصة عبر واتساب",
    trustWaDesc: "تواصل مباشر، استشارات مقاسات وتنسيق مخصص لأجمل لحظاتك.",
    catEyebrow: "عوالم الدار",
    catTitle: "خمسة أقمشة، وأناقة خالدة",
    catDiscover: "اكتشفي القطع ↗",
    catCaftans: "قفاطين",
    catTakchitas: "تكاشط",
    catJellabas: "جلابات",
    catFoulards: "فولارات",
    catChales: "شالات وسلاهم",
    collectionEyebrow: "الدليل الحصري",
    collectionTitle: "كافة <em>إبداعاتنا</em> الملكية",
    searchPlaceholder: "ابحثي عن قطعة، قماش، أو لون…",
    filterAll: "عرض الكل",
    filterCaftan: "قفاطين",
    filterTakchita: "تكاشط",
    filterJellaba: "جلابات",
    filterFoulard: "فولارات وطرحات",
    filterChale: "شالات وسلاهم",
    vipWaTitle: "تصميم خاص على المقاس ؟",
    vipWaDesc: "ينفذ معلمونا أيضاً طلباتكم الخاصة حسب المقاس (اختيار القماش، ألوان السفيفة، رشمات الطرز ورشات العقيق). تواصلي مباشرة مع مستشارتنا عبر واتساب.",
    vipWaBtn: "تواصلي عبر واتساب",
    heritageEyebrow: "أصالة وإتقان",
    heritageTitle: "المغرب في كل غرزة إبرة.",
    heritageP1: "وُلدت بوتي بلانكا من شغف أصيل بفنون الصنعة التقليدية المغربية. من الطرز الرباطي والفاسي المتقن إلى دقة الراندة، تعكس كل قطعة صبر وبراعة معلماتنا ومعلمينا.",
    heritageP2: "ننتقي أرفع أقمشة الحرير والمخمل لتكون إطلالتك في كل مناسبة لحظة فخر واعتزاز بالهوية المغربية العريقة.",
    heritageBtn: "اكتشفي قطعنا ↗",
    footerDesc: "فخامة الأزياء المغربية الراقية. إبداعات أصيلة ترافقك في أسعد اللحظات والمناسبات.",
    footerCollections: "تشكيلات الدار",
    footerServices: "الخدمات والاستشارات",
    footerContact: "اتصال خاص",
    footerRights: "جميع الحقوق محفوظة.",
    footerHeritageNote: "دار مغربية للأصالة العريقة · صنعت بحب وإتقان.",
    floatingWaPill: "مستشارة في الخدمة 💬",
    quickView: "نظرة سريعة",
    orderWa: "طلب فوري عبر واتساب",
    addToCart: "أضيفي إلى السلة",
    added: "أُضيفت إلى سلتك الملكية !",
    yourCart: "اختياراتك",
    subtotal: "المجموع الفرعي",
    emptyCart: "سلتك تنتظر أول قطعة تليق بذوقك.",
    continueShopping: "تابعي الاكتشاف",
    confirmWa: "تأكيد الطلب عبر واتساب",
    currency: "درهم"
  }
};

const state = {
  language: "fr",
  filter: "Tous",
  searchQuery: "",
  cart: loadCart(),
  activeQuickView: null,
  autoplayActive: true,
  autoplayTimer: null
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

// NUMÉRO WHATSAPP OFFICIEL VÉRIFIÉ (+212 6 58 04 35 55)
function getStoreWhatsAppNumber() {
  const cfg = window.BOUTIBLANCA_CONFIG || {};
  let num = (cfg.WHATSAPP_NUMBER || "212658043555").replace(/\D/g, "");
  
  // Si le localStorage contient un ancien faux numéro de test, on l'écrase
  try {
    const dynamicCfg = JSON.parse(localStorage.getItem("boutiblanca_content_settings") || "{}");
    if (dynamicCfg.whatsappNumber && dynamicCfg.whatsappNumber.includes("212600000000")) {
      dynamicCfg.whatsappNumber = "212658043555";
      localStorage.setItem("boutiblanca_content_settings", JSON.stringify(dynamicCfg));
    } else if (dynamicCfg.whatsappNumber && !dynamicCfg.whatsappNumber.includes("00000000")) {
      num = dynamicCfg.whatsappNumber.replace(/\D/g, "");
    }
  } catch {}

  return num || "212658043555";
}

function formatPrice(price) {
  const num = new Intl.NumberFormat(state.language === "ar" ? "ar-MA" : "fr-MA", { maximumFractionDigits: 0 }).format(price);
  return `${num} ${translations[state.language].currency}`;
}

function loadCart() {
  try { return JSON.parse(localStorage.getItem("boutiblanca_cart_v2") || "[]"); } catch { return []; }
}
function saveCart() {
  try { localStorage.setItem("boutiblanca_cart_v2", JSON.stringify(state.cart)); } catch {}
}

function showToast(message) {
  let toast = $("#toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="ornament-star">✦</span> ${message}`;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3000);
}

// LIEN DE COMMANDE WHATSAPP OFFICIEL AVEC MESSAGE BILINGUE
function createWhatsAppOrderUrl(product) {
  const phone = getStoreWhatsAppNumber();
  const isAr = state.language === "ar";
  const name = isAr && product.name_ar ? product.name_ar : product.name;
  const category = isAr ? (CATEGORY_MAP_AR[product.category] || product.category_ar || product.category) : product.category;
  const price = formatPrice(product.price);
  
  let msg = "";
  if (isAr) {
    msg = `السلام عليكم ورحمة الله،\nأود الاستفسار وطلب هذه القطعة من بوتي بلانكا:\n\n✨ *${name}*\n🏷️ الفئة: ${category}\n💰 السعر: ${price}\n🆔 المرجع: ${product.id}\n\nهل المقاس والتوصيل متوفران حالياً؟ شكراً جزيلاً.`;
  } else {
    msg = `Bonjour BOUTIBLANCA,\nJe souhaite commander cette création d'exception :\n\n✨ *${name}*\n🏷️ Catégorie : ${category}\n💰 Prix : ${price}\n🆔 Réf : ${product.id}\n\nPouvez-vous me confirmer la disponibilité et le délai de livraison ? Merci.`;
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

// RENDU CARTE UNIVERSEL BILINGUE (CARROUSEL & GRILLE)
function renderCarouselCard(p) {
  const isAr = state.language === "ar";
  const name = isAr && p.name_ar ? p.name_ar : p.name;
  const desc = isAr && p.description_ar ? p.description_ar : p.description;
  const cat = isAr ? (CATEGORY_MAP_AR[p.category] || p.category_ar || p.category) : p.category;
  const badge = isAr ? (BADGE_MAP_AR[p.badge] || p.badge_ar || p.badge) : p.badge;
  const waUrl = createWhatsAppOrderUrl(p);

  return `
    <article class="carousel-card" data-id="${p.id}">
      <div class="card-image-box">
        <img class="card-img" src="${p.image}" alt="${name}" loading="lazy" onerror="this.onerror=null;this.src='${SAMPLE_FALLBACK_IMAGES[0]}';" />
        <span class="badge-prestige"><span class="ornament-star">✦</span> ${badge}</span>
        <div class="card-quick-actions">
          <button class="btn-card-quickview" data-quick="${p.id}">🔍 ${translations[state.language].quickView}</button>
          <a class="btn-card-wa-icon" href="${waUrl}" target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp">💬</a>
        </div>
      </div>
      <div class="card-details">
        <span class="card-category">${cat}</span>
        <h3 class="card-title">${name}</h3>
        <p class="card-desc">${desc}</p>
        <div class="card-footer">
          <span class="card-price">${formatPrice(p.price)}</span>
          <a class="btn-wa-direct" href="${waUrl}" target="_blank" rel="noopener noreferrer">
            <span>💬</span> <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderProductCard(p) {
  return renderCarouselCard(p);
}

// CARROUSEL DU HAUT
function initTopCarousel() {
  const track = $("#top-carousel-track");
  const viewport = $("#top-carousel-viewport");
  if (!track || !viewport) return;

  track.innerHTML = PRODUCTS.map(renderCarouselCard).join("");

  const btnPrev = $("#carousel-btn-prev");
  const btnNext = $("#carousel-btn-next");
  const btnPlay = $("#carousel-autoplay-btn");

  if (btnPrev) {
    btnPrev.onclick = () => {
      const cardWidth = 312;
      viewport.scrollBy({ left: state.language === "ar" ? cardWidth : -cardWidth, behavior: "smooth" });
    };
  }
  if (btnNext) {
    btnNext.onclick = () => {
      const cardWidth = 312;
      viewport.scrollBy({ left: state.language === "ar" ? -cardWidth : cardWidth, behavior: "smooth" });
    };
  }

  function runAutoplay() {
    clearInterval(state.autoplayTimer);
    if (!state.autoplayActive) return;
    state.autoplayTimer = setInterval(() => {
      const scrollStep = 312;
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      if (Math.abs(viewport.scrollLeft) >= maxScroll - 10) {
        viewport.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        viewport.scrollBy({ left: scrollStep, behavior: "smooth" });
      }
    }, 4000);
  }

  if (btnPlay) {
    btnPlay.onclick = () => {
      state.autoplayActive = !state.autoplayActive;
      btnPlay.classList.toggle("active", state.autoplayActive);
      const textSpan = $("#autoplay-text");
      const iconSpan = $("#autoplay-icon");
      if (textSpan) textSpan.textContent = state.autoplayActive ? translations[state.language].carouselPause : translations[state.language].carouselPlay;
      if (iconSpan) iconSpan.textContent = state.autoplayActive ? "⏸" : "▶";
      if (state.autoplayActive) runAutoplay();
      else clearInterval(state.autoplayTimer);
    };
  }

  viewport.addEventListener("mouseenter", () => clearInterval(state.autoplayTimer));
  viewport.addEventListener("mouseleave", () => { if (state.autoplayActive) runAutoplay(); });

  runAutoplay();
  bindProductEvents();
}

// GRILLE DE LA COLLECTION COMPLÈTE
function renderGridProducts() {
  const grid = $("#products-grid");
  if (!grid) return;

  const filtered = PRODUCTS.filter(p => {
    const matchCat = state.filter === "Tous" || p.category === state.filter;
    const q = state.searchQuery.toLowerCase();
    const matchSearch = !q || 
      p.name.toLowerCase().includes(q) || 
      (p.name_ar && p.name_ar.includes(q)) || 
      p.description.toLowerCase().includes(q) || 
      (p.description_ar && p.description_ar.includes(q)) || 
      p.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    const emptyMsg = state.language === "ar" ? "لا توجد قطع تطابق بحثك حالياً." : "Aucune création ne correspond à votre recherche.";
    const resetMsg = state.language === "ar" ? "إعادة ضبط التصفية" : "Réinitialiser les filtres";
    grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted); font-size: 15px;">
      ${emptyMsg}<br><button id="btn-reset-filters" class="btn-wa-direct" style="margin-top:15px; cursor:pointer;">${resetMsg}</button>
    </div>`;
    const reset = $("#btn-reset-filters");
    if (reset) reset.onclick = () => { state.filter = "Tous"; state.searchQuery = ""; renderGridProducts(); };
    return;
  }

  grid.innerHTML = filtered.map(renderProductCard).join("");
  bindProductEvents();
}

function bindProductEvents() {
  $$("[data-quick]").forEach(btn => {
    btn.onclick = () => openQuickView(btn.dataset.quick);
  });
}

// QUICK VIEW MODAL
function openQuickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  state.activeQuickView = p;

  const isAr = state.language === "ar";
  const name = isAr && p.name_ar ? p.name_ar : p.name;
  const desc = isAr && p.description_ar ? p.description_ar : p.description;
  const cat = isAr ? (CATEGORY_MAP_AR[p.category] || p.category_ar || p.category) : p.category;
  const badge = isAr ? (BADGE_MAP_AR[p.badge] || p.badge_ar || p.badge) : p.badge;
  const details = isAr && p.details_ar ? p.details_ar : (p.details || "");
  const waUrl = createWhatsAppOrderUrl(p);

  $("#modal-img").src = p.image;
  $("#modal-img").alt = name;
  $("#modal-category").textContent = `${cat} · ${badge}`;
  $("#modal-title").textContent = name;
  $("#modal-price").textContent = formatPrice(p.price);
  $("#modal-desc").textContent = desc;
  $("#modal-details").textContent = details;
  $("#modal-btn-wa").href = waUrl;

  const cartBtn = $("#modal-btn-cart");
  if (cartBtn) {
    cartBtn.onclick = () => {
      addToCart(p.id);
      closeQuickView();
    };
  }

  $("#modal-backdrop").classList.add("open");
  $("#quickview-modal").classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeQuickView() {
  $("#modal-backdrop").classList.remove("open");
  $("#quickview-modal").classList.remove("open");
  document.body.classList.remove("no-scroll");
}

function addToCart(id) {
  const item = state.cart.find(x => x.id === id);
  if (item) item.quantity++;
  else state.cart.push({ id, quantity: 1 });
  saveCart();
  renderCart();
  const prod = PRODUCTS.find(p => p.id === id);
  const prodName = state.language === "ar" && prod?.name_ar ? prod.name_ar : (prod ? prod.name : "");
  showToast(`${prodName} ${translations[state.language].added}`);
}

function changeQuantity(id, delta) {
  const item = state.cart.find(x => x.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(x => x.id !== id);
  }
  saveCart();
  renderCart();
}

function renderCart() {
  const count = state.cart.reduce((acc, cur) => acc + cur.quantity, 0);
  const badge = $("#cart-count");
  if (badge) badge.textContent = count;

  const itemsContainer = $("#cart-items-list");
  const emptyBox = $("#cart-empty-state");
  const totalEl = $("#cart-total-price");

  if (!itemsContainer) return;

  if (count === 0) {
    itemsContainer.innerHTML = "";
    if (emptyBox) emptyBox.style.display = "block";
    if (totalEl) totalEl.textContent = formatPrice(0);
    return;
  }

  if (emptyBox) emptyBox.style.display = "none";

  let total = 0;
  const isAr = state.language === "ar";

  itemsContainer.innerHTML = state.cart.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (!p) return "";
    const name = isAr && p.name_ar ? p.name_ar : p.name;
    const cat = isAr ? (CATEGORY_MAP_AR[p.category] || p.category_ar || p.category) : p.category;
    const lineTotal = p.price * item.quantity;
    total += lineTotal;
    return `
      <div class="cart-item-row">
        <img class="cart-item-img" src="${p.image}" alt="${name}" />
        <div class="cart-item-info">
          <h4>${name}</h4>
          <p>${cat} · ${formatPrice(p.price)}</p>
          <div class="cart-qty-ctrl">
            <button onclick="changeQuantity('${p.id}', -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity('${p.id}', 1)">＋</button>
          </div>
        </div>
        <div style="text-align:right;">
          <strong style="font-size:13px;">${formatPrice(lineTotal)}</strong>
          <button style="display:block; margin-top:8px; font-size:11px; color:var(--text-muted); cursor:pointer;" onclick="changeQuantity('${p.id}', -999)">${isAr ? 'حذف' : 'Supprimer'}</button>
        </div>
      </div>
    `;
  }).join("");

  if (totalEl) totalEl.textContent = formatPrice(total);

  const btnWaAll = $("#btn-cart-checkout-wa");
  if (btnWaAll) {
    const phone = getStoreWhatsAppNumber();
    const lines = state.cart.map(item => {
      const p = PRODUCTS.find(x => x.id === item.id);
      const name = isAr && p?.name_ar ? p.name_ar : (p ? p.name : "Pièce");
      return `• ${name} x${item.quantity} (${formatPrice((p?.price||0)*item.quantity)})`;
    }).join("\n");
    const msg = isAr 
      ? `السلام عليكم بوتي بلانكا، أود تأكيد طلبيتي:\n\n${lines}\n\n*المجموع:* ${formatPrice(total)}\n\nيرجى تأكيد التوصيل وبيانات الاستلام.`
      : `Bonjour BOUTIBLANCA, je souhaite valider ma commande avec vos créations :\n\n${lines}\n\n*Total :* ${formatPrice(total)}\n\nPouvez-vous me confirmer les modalités de livraison ? Merci.`;
    btnWaAll.href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }
}

function openCart() {
  $("#cart-drawer").classList.add("open");
  $("#modal-backdrop").classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  $("#cart-drawer").classList.remove("open");
  if (!$("#quickview-modal").classList.contains("open")) {
    $("#modal-backdrop").classList.remove("open");
    document.body.classList.remove("no-scroll");
  }
}

// BILINGUISME FR/AR INTÉGRAL AVEC DATA-I18N
function setLanguage(lang) {
  state.language = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  const btn = $("#language-switch");
  if (btn) btn.textContent = lang === "fr" ? "عربي" : "FR";

  const t = translations[lang];

  // Traduction de tous les éléments balisés data-i18n
  $$("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.innerHTML = t[key];
  });

  // Traduction des placeholders
  $$("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.placeholder = t[key];
  });

  // Mise à jour des liens WhatsApp directs
  const phone = getStoreWhatsAppNumber();
  const heroWa = $("#hero-wa-btn");
  if (heroWa) {
    const heroMsg = lang === "ar" 
      ? "السلام عليكم بوتي بلانكا، أود استشارة خاصة لاختيار قطعة مناسبة."
      : "Bonjour BOUTIBLANCA, je souhaite un conseil pour une création.";
    heroWa.href = `https://wa.me/${phone}?text=${encodeURIComponent(heroMsg)}`;
  }

  const floatingWa = $("#floating-wa-btn");
  if (floatingWa) {
    const floatMsg = lang === "ar" 
      ? "السلام عليكم بوتي بلانكا، أود الاستفسار عن تفصيل أو اقتناء قطعة."
      : "Bonjour BOUTIBLANCA, je souhaite un conseil personnalisé sur vos créations.";
    floatingWa.href = `https://wa.me/${phone}?text=${encodeURIComponent(floatMsg)}`;
  }

  initTopCarousel();
  renderGridProducts();
  renderCart();
}

function applyNoCodeSettings() {
  const theme = JSON.parse(localStorage.getItem("boutiblanca_theme_settings") || "null");
  if (theme) {
    const root = document.documentElement;
    if (theme.goldPrimary) root.style.setProperty("--gold-primary", theme.goldPrimary);
    if (theme.bgCanvas) root.style.setProperty("--bg-canvas", theme.bgCanvas);
    if (theme.textMain) root.style.setProperty("--text-main", theme.textMain);
    if (theme.accentColor) root.style.setProperty("--accent-emerald", theme.accentColor);
    if (theme.fontSerif) root.style.setProperty("--font-serif", theme.fontSerif);
  }

  const content = JSON.parse(localStorage.getItem("boutiblanca_content_settings") || "null");
  if (content && state.language === "fr") {
    if (content.announcementText && $("#top-announcement-text")) {
      $("#top-announcement-text").innerHTML = content.announcementText;
    }
    if (content.heroTitle && $("#hero-main-title")) {
      $("#hero-main-title").innerHTML = content.heroTitle;
    }
    if (content.heroDesc && $("#hero-main-desc")) {
      $("#hero-main-desc").textContent = content.heroDesc;
    }
    if (content.heroImage && $("#hero-arch-img")) {
      $("#hero-arch-img").src = content.heroImage;
    }
  }

  const phone = getStoreWhatsAppNumber();
  const waFloating = $("#floating-wa-btn");
  if (waFloating) {
    const msg = state.language === "ar" 
      ? "السلام عليكم بوتي بلانكا، أود الاستفسار عن تفصيل أو اقتناء قطعة."
      : "Bonjour BOUTIBLANCA, je souhaite un conseil personnalisé sur vos créations.";
    waFloating.href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }
}

// SYNCHRONISATION SUPABASE SANS ÉCRASER LES 20 ARTICLES MAJEURS
async function syncSupabaseCatalogue() {
  const cfg = window.BOUTIBLANCA_CONFIG || {};
  if (!window.supabase || !cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY || cfg.SUPABASE_URL.includes("TON-PROJET")) return;
  try {
    const db = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    const { data, error } = await db.from("products").select("*").eq("is_published", true).order("created_at", { ascending: false });
    if (!error && data && data.length > 0) {
      // On enrichit ou on ajoute les produits Supabase aux 20 articles de base
      const supabaseItems = data.map((p, idx) => ({
        id: p.id,
        name: p.name_fr,
        name_ar: p.name_ar || p.name_fr,
        category: p.category || "Caftan",
        category_ar: CATEGORY_MAP_AR[p.category] || "قفطان",
        price: Number(p.price_mad) || 0,
        badge: p.badge || "Signature",
        badge_ar: BADGE_MAP_AR[p.badge] || "قطعة مميزة",
        description: p.description_fr || "",
        description_ar: p.description_ar || (p.description_fr ? p.description_fr : "صناعة تقليدية مغربية فاخرة"),
        image: p.image_url || CORE_PRODUCTS[idx % CORE_PRODUCTS.length].image,
        details: p.description_fr || "",
        details_ar: p.description_ar || ""
      }));

      // Les 20 pièces authentiques restent toujours présentes
      PRODUCTS = [...CORE_PRODUCTS];
      supabaseItems.forEach(sp => {
        const existingIdx = PRODUCTS.findIndex(cp => cp.id === sp.id || cp.name === sp.name);
        if (existingIdx >= 0) {
          PRODUCTS[existingIdx] = { ...PRODUCTS[existingIdx], ...sp };
        } else {
          PRODUCTS.push(sp);
        }
      });

      initTopCarousel();
      renderGridProducts();
      renderCart();
    }
  } catch (err) {
    console.warn("Supabase local mode.", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applyNoCodeSettings();
  initTopCarousel();
  renderGridProducts();
  renderCart();
  syncSupabaseCatalogue();

  const langSwitch = $("#language-switch");
  if (langSwitch) langSwitch.onclick = () => setLanguage(state.language === "fr" ? "ar" : "fr");

  const cartTrigger = $("#cart-trigger");
  if (cartTrigger) cartTrigger.onclick = openCart;

  const cartClose = $("#cart-close-btn");
  if (cartClose) cartClose.onclick = closeCart;

  const modalClose = $("#modal-close-btn");
  if (modalClose) modalClose.onclick = closeQuickView;

  const modalBackdrop = $("#modal-backdrop");
  if (modalBackdrop) modalBackdrop.onclick = () => { closeQuickView(); closeCart(); };

  $$(".filter-btn").forEach(btn => {
    btn.onclick = () => {
      $$(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.filter = btn.dataset.filter;
      renderGridProducts();
    };
  });

  const searchInput = $("#search-input");
  if (searchInput) {
    searchInput.oninput = (e) => {
      state.searchQuery = e.target.value.trim();
      renderGridProducts();
    };
  }

  const yearEl = $("#current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

window.addEventListener("storage", (e) => {
  if (e.key === "boutiblanca_theme_settings" || e.key === "boutiblanca_content_settings") {
    applyNoCodeSettings();
  }
});