-- ============================================================
-- IMPORT DES 20 ARTICLES BOUTIBLANCA DANS SUPABASE
-- À exécuter dans : Supabase → SQL Editor → New query → Run
--
-- Ce script insère les 20 CORE_PRODUCTS dans la table products.
-- Si un produit existe déjà (même slug), il est mis à jour (upsert).
-- Après exécution, tous les produits seront modifiables dans l'admin.
-- ============================================================

-- NB : La table products a une contrainte sur category :
-- check (category in ('Caftan','Takchita','Jellaba','Accessoire'))
-- 'Foulard' et 'Châle' ne sont pas dans la contrainte → on les mappe à 'Accessoire'
-- Vous pouvez modifier la contrainte séparément si besoin.

-- ── Étape 1 : Élargir la contrainte category pour accepter Foulard et Châle ──
ALTER TABLE public.products
  DROP CONSTRAINT IF EXISTS products_category_check;

ALTER TABLE public.products
  ADD CONSTRAINT products_category_check
  CHECK (category IN ('Caftan','Takchita','Jellaba','Foulard','Châle','Accessoire'));

-- ── Étape 2 : Insérer / Mettre à jour les 20 articles ───────────────────────
INSERT INTO public.products (slug, name_fr, name_ar, description_fr, description_ar, category, price_mad, stock, image_url, badge, is_published)
VALUES

-- ── CAFTANS (4) ─────────────────────────────────────────────────────────────
('caftan-jawhara-royal',
 'Caftan Royal Jawhara',
 'قفطان جوهرة الملكي',
 'Soie Jawhara pure tissée au fil de soie noble, col sfifa fassie d''apparat et boutons aqqads faits main.',
 'حرير جوهرة أصيل منسوج بخيوط الحرير الخالص مع سفيفة فاسية وعقاد يدوي متقن.',
 'Caftan', 3200, 5,
 'https://i.pinimg.com/originals/b0/82/9a/b0829aff252d5c80d5798fd5d9fae49a.jpg',
 'Broderie Skalli Or', true),

('caftan-mobra-emeraude',
 'Caftan Mobra Émeraude',
 'قفطان موبرة زمردي',
 'Velours de soie mobra vert émeraude impérial, broderie florale raffinée et perlage délicat.',
 'مخمل موبرة حريري بلون الزمرد الملكي، بتطريز ناعم ورشات عقيق يدوي راقية.',
 'Caftan', 2850, 3,
 'https://i.pinimg.com/736x/1d/5a/f1/1d5af1b27361dacfc665bf12d078436f.jpg',
 'Velours Royal', true),

('caftan-bleu-majorelle',
 'Caftan Saphir Majorelle',
 'قفطان ماجوريل الأزرق',
 'Coupe contemporaine fluide en crêpe de soie bleu Majorelle éclatant, finitions argentées dfaïfa.',
 'تصميم عصري منسدل من كريب الحرير بلون أزرق ماجوريل المشرق وتشطيبات فضية راقية.',
 'Caftan', 2600, 4,
 'https://www.shutterstock.com/shutterstock/photos/2266636325/display_1500/stock-photo-caftan-marocain-caftan-arabe-culture-traditionnel-maroc-2266636325.jpg',
 'Édition Prestige', true),

('caftan-nude-poudre',
 'Caftan Nude Perlé',
 'قفطان وردي مرصع',
 'Douceur du crêpe georgette rose poudré et dentelle délicate, sertie de perles de rivière ton sur ton.',
 'نعومة كريب جورجيت بلون وردي هادئ مع دانتيل فاخر مرصع باللؤلؤ على نفس الدرجة.',
 'Caftan', 2950, 2,
 'https://nalou.fr/wp-content/uploads/2024/07/caftan-marocain-2.jpg',
 'Coup de Cœur', true),

-- ── TAKCHITAS (4) ────────────────────────────────────────────────────────────
('takchita-princesse-blanche',
 'Takchita Blanche & Or',
 'تكشيطة العروس الملكية',
 'Deux pièces magistrales pensées pour la mariée : sous-robe en satin duchesse et caftan en brocart or étincelant.',
 'قطعتان استثنائيتان للعروس: تحتيّة من ساتان دوشيس وقفطان علوي من البروكار الذهبي البراق.',
 'Takchita', 4600, 2,
 'https://i.pinimg.com/736x/93/f1/3d/93f13df4035c63fec4ba8f0a59644bc9.jpg',
 'Haute Couture', true),

('takchita-brocart-saphir',
 'Takchita Brocart Saphir',
 'تكشيطة بروكار ياقوتي',
 'Brocart de soie lamé bleu saphir profond, rehaussé de broderie tarz rbati aux motifs floraux géométriques.',
 'بروكار حريري باللون الأزرق الياقوتي العميق، مزين بطرز رباطي أصيل بنقوش هندسية ملكية.',
 'Takchita', 3950, 1,
 'https://s-media-cache-ak0.pinimg.com/736x/d6/9a/4b/d69a4bd68f9626b43c3dafdcc9f2cccf.jpg',
 'Pièce Unique', true),

('takchita-rubis-imperial',
 'Takchita Rubis Impérial',
 'تكشيطة الياقوت الإمبراطوري',
 'Mariage somptueux entre velours grenat profond et mousseline de soie champagne, manches papillon d''apparat.',
 'تناغم فاخر بين المخمل العنابي العميق وموسلين الحرير الشامبانيا مع أكمام فضفاضة ملكية.',
 'Takchita', 4200, 2,
 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
 'Édition Limitée', true),

('takchita-reine-saba',
 'Takchita Ivoire Céleste',
 'تكشيطة العاج السماوي',
 'Création d''exception en mousseline de soie et organza ivoire, ornée de milliers de cristaux étincelants.',
 'إبداع فاخر من حرير الأورجانزا وموسلين العاج مزين بآلاف البلورات البراقة يدوياً.',
 'Takchita', 4800, 1,
 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
 'Prestige Cérémonie', true),

-- ── JELLABAS (4) ─────────────────────────────────────────────────────────────
('jellaba-randa-amande',
 'Jellaba Randa Vert Amande',
 'جلابة راندة أخضر لوزي',
 'Crêpe de soie doux et léger rehaussé d''un délicat travail de randa traditionnel fait point par point à l''aiguille.',
 'كريب حرير ناعم ومريح مزين براندة مغربية أصيلة متقنة بالإبرة بلون أخضر لوزي أنيق.',
 'Jellaba', 1250, 6,
 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
 'Fait Main', true),

('jellaba-sousdi-blanche',
 'Jellaba Sousdi Pure Blanche',
 'جلابة سوسدي أبيض ناصع',
 'Tissu sousdi traditionnel du Sud marocain, réputé pour sa finesse et sa fraîcheur, broderie fil de soie ton sur ton.',
 'قماش سوسدي مغربي أصيل مشهور بنعومته وخفته مع تطريز خيط حرير متناغم وفخم.',
 'Jellaba', 980, 8,
 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
 'Intemporel', true),

('jellaba-velours-nocturne',
 'Jellaba Velours Nuit',
 'جلابة مخمل ليلية',
 'Velours côtelé soyeux pour les journées fraîches, sublimé par une passementerie sfifa dorée moderne.',
 'مخمل مضلع دافئ وناعم ومناسب للأيام الباردة، بلمسة سفيفة ذهبية عصرية وشيك.',
 'Jellaba', 1450, 4,
 'https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&w=800&q=80',
 'Hiver Élégant', true),

('jellaba-lin-terracotta',
 'Jellaba Lin Terre de Sienne',
 'جلابة كتان ترابي',
 'Lin lavé naturel couleur terracotta marocaine, coupe épurée et contemporaine avec fentes d''aisance discrètes.',
 'كتان طبيعي بلون طيني مراكشي أصيل، بقصة عصرية بسيطة ومريحة للمناسبات واليوميات.',
 'Jellaba', 890, 7,
 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
 'Tendance Moderne', true),

-- ── FOULARDS & HIJABS (4) ────────────────────────────────────────────────────
('foulard-soie-zellige',
 'Foulard Soie Motif Zellige',
 'شال حرير بنقش الزليج',
 'Soie de mûrier naturelle ornée de motifs géométriques inspirés des faïences et zelliges de Fès et Marrakech.',
 'حرير طبيعي خالص بنقوش هندسية مستوحاة من عمارة الزليج المغربي العريق.',
 'Foulard', 380, 15,
 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
 '100% Soie Pure', true),

('foulard-mousseline-dore',
 'Foulard Mousseline Liseré Doré',
 'طرحة موسلين بخيط ذهبي',
 'Mousseline aérienne beige champagne bordée d''un liseré étincelant au fil doré skalli véritable.',
 'موسلين ناعم جداً بلون الشامبانيا محاط بحواف مطرزة بخيط الصقلي الذهبي اللامع.',
 'Foulard', 290, 20,
 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
 'Doux & Léger', true),

('foulard-medina-emeraude',
 'Foulard Médina Satin Émeraude',
 'فولار حرير ساتان زمردي',
 'Toucher soyeux d''une brillance subtile, retombée lourde et élégante ne glissant pas sur les cheveux.',
 'ملمس حريري بلمعان راقٍ وثبات ممتاز يمنح حضوراً مبهراً في كافة المناسبات.',
 'Foulard', 350, 12,
 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
 'Reflets Satinés', true),

('foulard-ceremonie-ivoire',
 'Foulard Cérémonie Ivoire & Perles',
 'طرحة عاجية باللؤلؤ',
 'Étoffe ivoire lumineuse brodée aux extrémités de délicates perles nacrées façon artisanat fassi.',
 'نسيج عاجي مشرق مزين على الأطراف بحبات لؤلؤ ناعمة على الطريقة الفاسية الأصيلة.',
 'Foulard', 420, 10,
 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80',
 'Finition Perles', true),

-- ── CHÂLES & SELHAMS (4) ────────────────────────────────────────────────────
('chale-cachemire-tarz',
 'Châle Cachemire Tarz Fassi',
 'شال كشمير بطرز فاسي',
 'Laine mérinos et cachemire noble rehaussés d''une frise au point de Fès brodée à la main par nos maâllems.',
 'صوف ميرينو ممزوج بالكشمير الفاخر مطرز على يد معلمات فاس بأجمل غرز الطرز التقليدي.',
 'Châle', 650, 10,
 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80',
 'Broderie Artisanale', true),

('chale-pashmina-dore',
 'Châle Pashmina Moucharabieh',
 'باشمينا نقش مشربية ذهبي',
 'Pashmina jacquard réversible aux motifs orientaux ciselés dorés et écru, finitions franges torsadées.',
 'باشمينا جاكار فاخرة بوجهين بنقوش مشربية ذهبية وعاجية مهدبة يدوياً بحرفية عالية.',
 'Châle', 520, 8,
 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
 'Chaleur & Prestige', true),

('selham-royal-laine',
 'Selham Royal Laine Blanche',
 'سلهام ملكي صوف أبيض',
 'La cape majestueuse du costume d''apparat marocain en drap de laine fine blanche, col et capuche ornés de sfifa.',
 'الرداء الملكي المهيب للتقاليد المغربية من صوف نقي أبيض، مطرز عند القبة والقب بسفيفة أصيلة وشوشية.',
 'Châle', 1850, 3,
 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
 'Apparat Traditionnel', true),

('gandora-soie-aqqad',
 'Gandora Chic Soie & Aqqad',
 'قندورة حرير مع عقاد',
 'Gandora féminine en crêpe de soie fluide bleu royal, col brodé de petits aqqads délicats pour vos réceptions d''intérieur.',
 'قندورة مغربية نسائية مريحة من كريب الحرير الملكي مع فتحة عنق مطرزة بالعقاد الفاسي الدقيق.',
 'Châle', 790, 6,
 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
 'Confort Royal', true)

ON CONFLICT (slug) DO UPDATE SET
  name_fr        = EXCLUDED.name_fr,
  name_ar        = EXCLUDED.name_ar,
  description_fr = EXCLUDED.description_fr,
  description_ar = EXCLUDED.description_ar,
  category       = EXCLUDED.category,
  price_mad      = EXCLUDED.price_mad,
  image_url      = EXCLUDED.image_url,
  badge          = EXCLUDED.badge,
  is_published   = EXCLUDED.is_published,
  updated_at     = now();

-- ── Vérification : afficher les 20 produits importés ────────────────────────
SELECT slug, name_fr, category, price_mad, stock, is_published
FROM public.products
ORDER BY category, price_mad DESC;
