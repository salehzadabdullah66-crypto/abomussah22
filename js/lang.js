/* ==========================================================================
   معرض آية لتجارة السيارات - نظام الترجمة الشامل (100% Arabic <-> English)
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'aya_car_lang';

  // خريطة عناصر data-i18n للترويسة والقوائم والبانرات الرئيسية
  const i18nMap = {
    "nav_home": { ar: "الرئيسية", en: "Home" },
    "nav_about": { ar: "من نحن", en: "About Us" },
    "nav_cars": { ar: "السيارات", en: "Cars Fleet" },
    "nav_services": { ar: "الخدمات", en: "Services" },
    "nav_financing": { ar: "التمويل", en: "Financing" },
    "nav_gallery": { ar: "المعرض", en: "Gallery" },
    "nav_offers": { ar: "العروض", en: "Special Offers" },
    "nav_testimonials": { ar: "آراء العملاء", en: "Testimonials" },
    "nav_faq": { ar: "الأسئلة الشائعة", en: "FAQ" },
    "nav_contact": { ar: "تواصل معنا", en: "Contact Us" },
    "btn_book": { ar: "إحجز سيارتك", en: "Book Your Car" },

    // عناوين البانرات والهيرو بتنسيق HTML
    "hero_title": { ar: 'معرض <span>آية</span> لتجارة السيارات', en: 'Aya <span>Car Trading</span> Showroom', html: true },
    "cars_banner_title": { ar: 'معرض <span>السيارات الفاخرة</span>', en: 'Luxury <span>Cars Fleet</span>', html: true },
    "about_banner_title": { ar: 'من نحن في <span>معرض آية</span>', en: 'About <span>Aya Showroom</span>', html: true },
    "services_banner_title": { ar: 'خدماتنا <span>الاحترافية</span>', en: 'Our <span>Professional Services</span>', html: true },
    "financing_banner_title": { ar: 'تسهيلات <span>التمويل والتقسيط</span>', en: 'Financing & <span>Installments</span>', html: true },
    "offers_banner_title": { ar: 'العروض <span>والخصومات الحصرية</span>', en: 'Exclusive <span>Offers & Deals</span>', html: true },
    "testimonials_banner_title": { ar: 'تجارب <span>وفيديوهات العملاء</span>', en: 'Client <span>Reviews & Stories</span>', html: true },
    "faq_banner_title": { ar: 'الأسئلة <span>الشائعة والمكررة</span>', en: 'Frequently <span>Asked Questions</span>', html: true },
    "contact_banner_title": { ar: 'تواصل مع <span>أبو موسى والمعرض</span>', en: 'Contact <span>Abu Mousa & Showroom</span>', html: true },
    "gallery_banner_title": { ar: 'ألبوم <span>الصور والمعرض</span>', en: 'Photo & Video <span>Gallery</span>', html: true }
  };

  // القاموس الشامل للموقع بجميع أقسامه وصفحاته العشرة
  const dictionary = {
    // الترويسة والعناوين العامة
    "معرض آية لتجارة السيارات - برئاسة أبو موسى": "Aya Car Trading Showroom - Led by Abu Mousa",
    "معرض اية لتجارة السيارات - برئاسة أبو موسى": "Aya Car Trading Showroom - Led by Abu Mousa",
    "معرض آية لتجارة السيارات برئاسة أبو موسى": "Aya Car Trading Showroom led by Abu Mousa",
    "معرض اية لتجارة السيارات برئاسة أبو موسى": "Aya Car Trading Showroom led by Abu Mousa",
    "معرض آية لتجارة السيارات VIP": "Aya Luxury Car Trading VIP",
    "معرض اية لتجارة السيارات VIP": "Aya Luxury Car Trading VIP",
    "معرض آية لتجارة السيارات": "Aya Car Trading Showroom",
    "معرض اية لتجارة السيارات": "Aya Car Trading Showroom",
    "معرض آية وخدماتنا": "Aya Showroom & Services",
    "معرض اية وخدماتنا": "Aya Showroom & Services",
    "معرض آية؟": "Aya Showroom?",
    "معرض اية؟": "Aya Showroom?",
    "معرض آية": "Aya Showroom",
    "معرض اية": "Aya Showroom",
    "بمعرض آية": "at Aya Showroom",
    "بمعرض اية": "at Aya Showroom",
    "لمعرض آية": "to Aya Showroom",
    "لمعرض اية": "to Aya Showroom",
    "صالات معرض آية": "Aya Showroom Halls",
    "صالات معرض اية": "Aya Showroom Halls",
    "عملاء معرض آية": "Aya Showroom Clients",
    "عملاء معرض اية": "Aya Showroom Clients",
    "لدي معرض آية": "at Aya Showroom",
    "لدى معرض آية": "at Aya Showroom",
    "المعرض الرئيسي - الشارع العام": "Main Showroom - Highway Boulevard",
    "المعرض الرئيسي - الشارع العام، فلسطين": "Main Showroom - Highway Boulevard, Palestine",
    "يومياً من 9:00 صباحاً - 10:00 مساءً": "Daily: 9:00 AM - 10:00 PM",
    "أبو موسى لديكم لا خوف عليكم": "Abu Mousa With You, Fear Nothing",
    "الرئيسية": "Home",
    "من نحن": "About Us",
    "السيارات": "Cars Fleet",
    "كتالوج السيارات": "Cars Catalog",
    "الخدمات": "Services",
    "التمويل": "Financing",
    "المعرض": "Gallery",
    "العروض": "Special Offers",
    "آراء العملاء": "Testimonials",
    "الأسئلة الشائعة": "FAQ",
    "تواصل معنا": "Contact Us",
    "إحجز سيارتك": "Book Your Car",
    "تواصل مع أبو موسى": "Contact Abu Mousa",

    // عناوين الصفحات والبانرات
    "معرض السيارات الفاخرة": "Luxury Cars Showroom",
    "الماركات العالمية الفاخرة المتاحة بالمعرض": "Global Luxury Brands Available at the Showroom",
    "عن معرض آية": "About Aya Showroom",
    "قصة النجاح والفخامة برئاسة أبو موسى": "The Story of Success & Luxury Led by Abu Mousa",
    "قصتنا ورؤيتنا": "Our Story & Vision",
    "خدماتنا الملكية": "Our Royal Services",
    "حلول وتسهيلات متكاملة": "Integrated Solutions & Facilities",
    "استكشف خدماتنا": "Explore Our Services",
    "حلول التمويل والتقسيط": "Financing & Installment Solutions",
    "امتلك سيارة أحلامك بأسهل الشروط": "Own Your Dream Car with Easy Terms",
    "حاسبة التمويل الذكية": "Smart Financing Calculator",
    "معرض الصور والفيديوهات": "Photo & Video Gallery",
    "تصفح صالات المعرض وأحدث التسليمات": "Explore Showroom Halls & Latest Deliveries",
    "العروض والخصومات الحصرية": "Exclusive Offers & Discounts",
    "فرصتك لاقتناء أفخم السيارات بأفضل الأسعار": "Your Opportunity to Own Luxury Cars at Best Prices",
    "آراء وتجارب العملاء": "Client Testimonials & Stories",
    "ماذا يقول عملاؤنا عن تجربتهم مع معرض آية وأبو موسى؟": "What Clients Say About Their Experience with Aya Showroom & Abu Mousa",
    "كل ما تريد معرفته عن الشراء، التمويل، والضمان": "Everything You Need to Know About Purchasing, Financing & Warranty",
    "نحن هنا لخدمتك والإجابة على كافة استفساراتك": "We Are Here to Serve You and Answer All Inquiries",
    "معلومات الاتصال": "Contact Information",

    // قسم الهيرو وأبو موسى
    "الفخامة والأمان في عالم السيارات": "Luxury & Safety in Automotive",
    "الوجهة الأولى لأفخم السيارات الملكية والحديثة": "The Premier Destination for Luxury & Modern Cars",
    "نقدم لكم تشكيلة فاخرة وحصرية من أحدث السيارات العالمية بمواصفات ملكية ورضى تام. ثقتكم هي هدفنا وسلامتكم هي أولويتنا تحت رعاية وإشراف مالك المعرض أبو موسى.": "Discover an exclusive luxury fleet of world-class vehicles with royal specifications. Your trust is our goal and your safety is our priority under the personal supervision of Abu Mousa.",
    "تصفح السيارات": "Browse Cars Fleet",
    "احسب قسطك التمويلي": "Calculate Installments",
    "أبو موسى": "Abu Mousa",
    "مؤسس ومالك معرض آية لتجارة السيارات": "Founder & Owner of Aya Car Trading Showroom",
    "نسعى دائماً لتوفير أرقى السيارات بأعلى معايير الجودة والشفافية. عائلتكم في أمان معنا.": "We constantly strive to provide the finest automobiles with uncompromising quality and transparency. Your family is safe with us.",
    "\"نسعى دائماً لتوفير أرقى السيارات بأعلى معايير الجودة والشفافية. عائلتكم في أمان معنا.\"": "\"We constantly strive to provide the finest automobiles with uncompromising quality and transparency. Your family is safe with us.\"",

    // الإحصائيات
    "سيارة مبيعة بنجاح": "Cars Sold Successfully",
    "عميل سعيد وواثق": "Happy & Confident Clients",
    "خبرة في سوق السيارات": "Years of Market Experience",
    "ضمان وجودة حقيقية": "Genuine Quality & Warranty",

    // كتالوج السيارات والفلترة
    "أسطولنا الفاخر": "Our Luxury Fleet",
    "أحدث السيارات المميزة": "Latest Featured Vehicles",
    "أحدث السيارات": "Latest Featured",
    "المميزة": "Vehicles",
    "اختر سيارتك القادمة من بين أرقى السيارات العالمية المفحوصة والمضمونة": "Choose your next vehicle from certified, fully inspected world-class cars",
    "تصفية كتالوج السيارات": "Filter Cars Catalog",
    "بحث مباشر باسم السيارة أو الموديل:": "Search Car Name or Model:",
    "بحث مباشر باسم السيارة أو الموديل": "Search Car Name or Model",
    "اكتب اسم السيارة (مثال: مايباخ, BMW, بورشه)...": "Type car name (e.g. Maybach, BMW, Porsche)...",
    "البحث باسم السيارة أو الماركة...": "Search car name or brand...",
    "الماركة:": "Brand:",
    "الماركة": "Brand",
    "اختر الماركة": "Select Brand",
    "جميع الماركات": "All Brands",
    "سنة الصنع:": "Model Year:",
    "سنة الصنع": "Model Year",
    "جميع السنوات": "All Years",
    "السعر الأقصى:": "Max Price:",
    "السعر الأقصى": "Max Price",
    "جميع الأسعار": "All Prices",
    "حتى $50,000": "Up to $50,000",
    "حتى $100,000": "Up to $100,000",
    "حتى $150,000": "Up to $150,000",
    "أكثر من $150,000": "Above $150,000",
    "جديد 2026": "New 2026",
    "عروض خاصة": "Special Offer",
    "السعر المميز": "Special Price",
    "التفاصيل": "View Details",
    "شاهد جميع السيارات المعروضة": "Explore Full Cars Fleet",
    "أطلبها الآن": "Order Now",
    "طلب السيارة": "Order Car",
    "تواصل للاستفسار": "Contact for Inquiry",
    "تواصل معنا فوراً": "Contact Us Immediately",
    "Contact Us فوراً": "Contact Us Immediately",
    "تواصل مع أبو موسى فوراً": "Contact Abu Mousa Immediately",
    "طلب معاينة": "Request Inspection",
    "مرسيدس مايباخ": "Mercedes-Maybach",
    "بي إم دبليو الفئة السابعة": "BMW 7 Series",
    "رينج روفر روكشري": "Range Rover Autobiography",
    "بورشه باناميرا": "Porsche Panamera",
    "أودي A8 ليموزين": "Audi A8L",
    "لكزس LX600": "Lexus LX600",
    "فل كامل": "Full Option",
    "دفع رباعي": "All-Wheel Drive",
    "سقف بانوراما": "Panorama Roof",
    "8 سرعات": "8-Speed Auto",
    "أوتوماتيك 9G-TRONIC": "Automatic 9G-TRONIC",
    "مقاعد مساج ملكية": "Royal Massage Seats",
    "نظام Off-Road ذكي": "Smart Off-Road System",
    "دفع كلي xDrive": "xDrive All-Wheel Drive",
    "شاشة مسرحية 31 بوصة": "31-inch Theatre Screen",
    "0-100 في 3.2 ثانية": "0-100 in 3.2 seconds",
    "حزمة Weissach": "Weissach Package",
    "جلد نابا وفاخر": "Premium Nappa Leather",
    "عادم RS الرياضي": "RS Sports Exhaust",
    "الكربون ألياف": "Carbon Fibre",
    "أداء الحلبات": "Track Performance",
    "حصان": "HP",
    "بنزين": "Petrol",
    "هجين": "Hybrid",
    "كهرباء": "Electric",
    "جديد 0 كم": "New 0 KM",
    "مستعمل نظيف": "Clean Used",
    "ضمان 3 سنوات": "3-Year Warranty",
    "مفحوصة 100%": "100% Inspected",
    "السعر النهائي": "Final Price",
    "السعر الكاش": "Cash Price",
    "شامل الضريبة والترخيص": "Includes Tax & Licensing",
    "لم يتم العثور على سيارات تطابق خيارات الفلترة الحالية.": "No vehicles found matching current filter options.",
    "يرجى تغيير خيارات الفلترة أو إعادة البحث.": "Please modify filter options or search again.",

    // الدول والماركات
    "أمريكا 🇺🇸": "USA 🇺🇸",
    "فرنسا 🇫🇷": "France 🇫🇷",
    "اليابان 🇯🇵": "Japan 🇯🇵",
    "ألمانيا 🇩🇪": "Germany 🇩🇪",
    "إيطاليا 🇮🇹": "Italy 🇮🇹",
    "بريطانيا 🇬🇧": "UK 🇬🇧",
    "السويد 🇸🇪": "Sweden 🇸🇪",
    "كوريا 🇰🇷": "Korea 🇰🇷",

    // قسم من نحن
    "رحلة بدأت بالشغف والنزاهة وتوجت بالقمة": "A Journey Started with Passion & Integrity, Crowned at the Top",
    "تأسس معرض آية لتجارة السيارات برئاسة أبو موسى ليكون العنوان الأول والموثوق لكل من يطمح لاقتناء سيارة مميزة تجمع بين الأمان، الفخامة، والسعر العادل.": "Aya Car Trading Showroom was established under Abu Mousa leadership to be the premier trusted destination for luxury, safety, and fair pricing.",
    "نؤمن بأن شراء السيارة ليس مجرد صفقة تجارية، بل هو قرار عائلي وشخصي هدمه الراحة والاطمئنان. لذلك نضمن لك فحصاً فنياً دقيقاً، وشفافية مطلقة في كافة المعاملات.": "We believe buying a vehicle is a family decision focused on peace of mind. We ensure thorough technical inspections and complete transparency in every deal.",
    "قيمنا الأساسية": "Our Core Values",
    "الشفافية المطلقة": "Absolute Transparency",
    "لا عمولات خفية، ولا شروط غير معلنة. جميع بيانات السيارات وتاريخها معروض بكل وضوح.": "No hidden commissions or undisclosed terms. All vehicle specs and history are clearly presented.",
    "الأمان والسلامة": "Safety & Assurance",
    "سلامتك وسلامة عائلتك هي أمانة في أعناقنا، نختار السيارات المفحوصة والمضمونة 100%.": "Your safety is our responsibility. We select 100% inspected and guaranteed vehicles.",
    "الخدمة الملكية": "Royal Service",
    "نرافقك في كافة الخطوات من الاستشارة الفنية وحتى استلام المفتاح وتسجيل الترخيص.": "We guide you through every step from technical advice to key handover and licensing.",
    "فريق عمل أبو موسى": "Abu Mousa Professional Team",
    "نخبة من المستشارين والفنيين المتخصصين في عالم السيارات الفاخرة": "Elite consultants and specialized technicians in luxury automobiles.",

    // قسم الخدمات
    "حلول متكاملة": "Integrated Solutions",
    "خدماتنا الحصرية والمتميزة": "Exclusive & Premier Services",
    "خدماتنا": "Our Exclusive Services",
    "الحصرية والمتميزة": "& Premier Quality",
    "خدمات عالمية في تجارة السيارات": "World-Class Automotive Services",
    "خدمات عالمية في تجارة Cars Fleet": "World-Class Automotive Services",
    "الاحترافية": "Professionalism",
    "نقدم لك منظومة كاملة من الخدمات الملكية المفحوصة والمضمونة بأعلى معايير الجودة": "Comprehensive luxury automotive services inspected and guaranteed to perfection",
    "نوفر لعملائنا منظومة خدمات متكاملة تضمن تجربة مريحة وآمنة 100%": "Providing our clients with complete services ensuring 100% comfortable experience",
    "بيع السيارات الفاخرة": "Luxury Cars Sales",
    "أحدث طرازات السيارات العالمية المفحوصة والمضمونة بأعلى معايير السلامة وبأفضل الأسعار.": "Latest certified global car models inspected with the highest safety standards at competitive prices.",
    "نوفر لك أحدث طرازات السيارات العالمية المفحوصة والمضمونة بمواصفات خاصة وبأسعار تنافسية ممتازة.": "We offer you the latest world-class car models inspected and guaranteed with special specs at competitive prices.",
    "سيارات جديدة ومستعملة بحالة الوكالة": "Brand new and mint condition pre-owned cars",
    "فحص ميكانيكي وهيكلي شامل": "Comprehensive mechanical & structural inspection",
    "نقل الملكية والترخيص والتأمين الفوري": "Instant ownership transfer, licensing & insurance",
    "تقرير فني معتمد لأجهزة وقطع السيارة": "Certified technical report for vehicle components",
    "ضمان شامل ممتد وثقة جودة عالية": "Extended comprehensive warranty & high quality trust",
    "شراء السيارات كاش": "Instant Cash Purchasing",
    "نشتري سيارتك فوراً بكاش مباشر وأفضل تثمين عادل بالسوق دون أي تأخير أو تعقيدات.": "We buy your car instantly with direct cash payment and fair market valuation without hassle.",
    "هل ترغب ببيع سيارتك فوراً بكاش مباشر وسعر عادل؟ نشتري سيارتك بأفضل تثمين في السوق بدون عناء.": "Looking to sell your car immediately for direct cash and fair price? We buy your car at the best market appraisal hassle-free.",
    "دفع فوري ومباشر كاش أو تحويل بنكي": "Instant direct cash or bank transfer payment",
    "تثمين عادل ومنصف بناءً على السوق": "Fair and equitable market-based valuation",
    "إنهاء كافة الأوراق الرسمية بذكاء وسرعة": "Smart and fast completion of all official paperwork",
    "كاش مباشر فوري وبأفضل تقييم": "Instant direct cash payment with best valuation",
    "تثمين عادل وسريع بدون عمولات خفية": "Fair and fast appraisal with no hidden fees",
    "إمكانية تسليم واستلام السيارة في موقعك": "Vehicle pick-up and delivery at your site",
    "تبديل واستبدال السيارات": "Car Trade-In & Exchange",
    "استبدل سيارتك القديمة بأحدث الطرازات الملكية لدى معرض آية مع خيارات تقسيط الفارق.": "Upgrade your old car to the latest luxury models at Aya Showroom with flexible installment differences.",
    "جدد سيارتك القديمة واستبدلها بأحدث الطرازات لدى معرض آية مع دفع الفارق بسهولة وسلاسة.": "Upgrade your old car to the latest models at Aya Showroom with flexible difference payments easily.",
    "تقدير ممتاز لسيارتك الحالية": "Excellent appraisal for your current car",
    "إمكانية تقسيط الفارق المتبقي": "Option to finance the remaining difference",
    "إجراءات استبدال سريعة في نفس اليوم": "Same-day fast trade-in procedures",
    "استبدال سلس وسريع بأحدث السيارات": "Seamless upgrade to the latest car models",
    "تقسيط الفرق بخيارات تمويلية ميسرة": "Finance the difference with easy installment options",
    "تقييم وتثمين السيارات": "Vehicle Valuation & Appraisal",
    "فريق خبير متخصص تحت إشراف أبو موسى يقدم لك تقييماً شاملاً ودقيقاً لقيمة سيارتك الفنية والتجارية.": "Expert technical team under Abu Mousa supervision offers precise market valuation for your car.",
    "تحديد القيمة العادلة بالسوق": "Fair market value determination",
    "استشارات بيع وشراء مجانية": "Free buying & selling consultations",
    "فحص 150 نقطة ميكانيكية وكهربائية": "150-point mechanical & electrical inspection",
    "تقييم سوقي معتمد بدقة عالية": "Accurate certified market appraisal",
    "تقرير فحص شامل وموثق": "Comprehensive documented inspection report",
    "خدمات ما بعد البيع والضمان": "After-Sales & Warranty",
    "نحرص على استمرارية رضاك وعلاقتنا بك من خلال حزم الصيانة والدعم المستمر والضمان الذهبي.": "We ensure your lasting satisfaction through quick maintenance packages and Golden Warranty commitment.",
    "متابعة دورية وخدمات الصيانة السريعة": "Regular follow-ups & quick maintenance services",
    "ضمان حقيقي ومتابعة أبو موسى الشخصية": "Genuine warranty & Abu Mousa personal supervision",
    "توفير قطع الغيار الأصلية والكفالات": "Original spare parts & warranty provision",
    "حزم صيانة دورية بأيدي متخصصين": "Routine maintenance packages by specialists",
    "دعم فني واستشارات مجانية 24/7": "24/7 free technical support & consultations",
    "توفير قطع الغيار الأصلية والضمان": "Genuine spare parts & warranty provision",
    "شحن وتوصيل السيارات الملكية": "VIP Delivery & Transport",
    "خدمة نقل وشحن VIP مغلقة ومؤمنة بالكامل لتوصيل سيارتك الجديدة حتى باب منزلك بأمان تام.": "Closed VIP transport and fully insured shipping to deliver your new vehicle right to your doorstep.",
    "شاحنات نقل خاصة ومغلقة 100%": "100% enclosed private transport trucks",
    "تغطية تأمينية شاملة أثناء النقل": "Full insurance coverage during transport",
    "توصيل سريع لجميع المدن والمناطق": "Fast delivery to all cities & regions",
    "نقل مغلق ومؤمن بالكامل لحماية السيارة": "Enclosed & fully insured car transport",
    "توصيل سريع حتى باب المنزل VIP": "VIP fast delivery right to your doorstep",
    "تتبع مباشر لمسار الشحن والتسليم": "Real-time tracking of shipping & delivery",
    "المزيد": "More Details",
    "طلب الخدمة": "Request Service",
    "احجز خدمتك الآن": "Book Your Service Now",
    "اختر الخدمة المطلوبة": "Select Required Service",
    "استعرض جميع خدماتنا المتكاملة": "Explore All Our Services",

    // لماذا تختار معرض آية
    "تميز معنا": "Excellence With Us",
    "لماذا تختار معرض آية؟": "Why Choose Aya Showroom?",
    "نضع بين يديك عقوداً من الثقة والمصداقية والخدمة المتميزة": "Decades of trust, integrity, and unmatched customer service",
    "فحص شامل 100%": "100% Comprehensive Inspection",
    "تخضع كافة سياراتنا لفحص فني وتدقيق ميكانيكي كامل لضمان أعلى معايير السلامة والجودة.": "All vehicles undergo rigorous mechanical & technical inspections ensuring top safety and quality.",
    "أسهل خطط التمويل": "Flexible Financing Plans",
    "نوفر لك حلول تقسيط ميسرة وبأقل نسبة فائدة بالتعاون مع أرقى البنوك وشركات التمويل.": "Tailored installment plans with competitive interest rates in partnership with leading banks.",
    "ضمان أبو موسى الذهبي": "Abu Mousa Golden Warranty",
    "ثقتك بنا لا تقدر بثمن، أبو موسى يقدم لك التزاماً كاملاً وخدمة ما بعد البيع بلا منافس.": "Your trust is priceless. Abu Mousa personal commitment delivers unrivaled peace of mind.",

    // قسم التمويل والحاسبة
    "سعر السيارة ($):": "Car Price ($):",
    "سعر السيارة ($)": "Car Price ($)",
    "سعر السيارة الإجمالي ($)": "Total Vehicle Price ($)",
    "سعر السيارة": "Car Price",
    "الدفعة الأولى ($):": "Down Payment ($):",
    "الدفعة الأولى ($)": "Down Payment ($)",
    "الدفعة الأولى": "Down Payment",
    "مدة التمويل (بالأشهر)": "Financing Term (Months)",
    "مدة التقسيط (أشهر):": "Installment Term (Months):",
    "مدة التقسيط (أشهر)": "Installment Term (Months)",
    "مدة التقسيط": "Installment Term",
    "12 شهر (سنة)": "12 Months (1 Year)",
    "24 شهر (سنتين)": "24 Months (2 Years)",
    "36 شهر (3 سنوات)": "36 Months (3 Years)",
    "48 شهر (4 سنوات)": "48 Months (4 Years)",
    "60 شهر (5 سنوات)": "60 Months (5 Years)",
    "القسط الشهري المتوقع": "Estimated Monthly Installment",
    "القسط الشهري التقديري": "Estimated Monthly Installment",
    "القسط الشهري التقديري:": "Estimated Monthly Installment:",
    "إجمالي المبلغ مع الفائدة": "Total Amount with Interest",
    "إجمالي المبلغ المراد سداده:": "Total Payable Amount:",
    "إجمالي المبلغ المراد سداده": "Total Payable Amount",
    "إجمالي المبلغ الإجمالي شامل الفائدة": "Total Payable Amount (Inc. Interest)",
    "* يتم الحساب بناءً على فائدة تقديرية تنافسية تبلغ 4.5% سنوياً. التفاصيل النهائية تحدد بناءً على شروط البنك المعني.": "* Calculation based on a competitive estimated annual interest rate of 4.5%. Final details are determined by bank terms.",
    "* يتم الحساب بناءً على فائدة تقديرية تنافسية تبلغ 4.5% سنوياً. View Details النهائية تحدد بناءً على شروط البنك المعني.": "* Calculation based on a competitive estimated annual interest rate of 4.5%. Final details are determined by bank terms.",
    "المستندات والوثائق المطلوبة للتمويل": "Required Financing Documents",
    "صورة عن الهوية الشخصية أو الجواز": "Copy of National ID or Passport",
    "كشف حساب بنكي لآخر 3 أشهر": "Bank statement for the last 3 months",
    "إثبات دخل أو شهادة راتب معتمدة": "Proof of income or salary certificate",
    "دفعة أولى لا تقل عن 15% من قيمة السيارة": "Minimum 15% down payment",
    "قدم طلب التمويل المباشر": "Submit Direct Financing Application",
    "قدّم طلب تمويل مع أبو موسى": "Apply for Financing with Abu Mousa",
    "قدّم طلب تمويل مع Abu Mousa": "Apply for Financing with Abu Mousa",
    "اختيار البنك أو الشركة": "Select Bank or Institution",
    "إرسال طلب التمويل": "Submit Financing Request",
    "خيارات Financing & Installments": "Financing & Installment Options",
    "خيارات التمويل والتقسيط": "Financing & Installment Options",
    "حاسبة تفاعلية": "Interactive Calculator",
    "احسب قسطك الشهري الآن": "Calculate Your Monthly Installment Now",

    // المعرض
    "جميع الصور": "All Photos",
    "الكل": "All",
    "صالات المعرض": "Showroom Halls",
    "السيارات الملكية": "Royal Cars",
    "تسليم العملاء": "Customer Deliveries",
    "الفعاليات والمعارض": "Events & Exhibitions",

    // العروض
    "عرض محدود": "Limited Offer",
    "خصم خاص": "Special Discount",
    "صيانة مجانية لمدة سنة": "1-Year Free Maintenance",
    "تأمين شامل مجاني": "Free Comprehensive Insurance",
    "تسليم فورى": "Immediate Delivery",
    "احصل على العرض الآن": "Claim Offer Now",
    "العروض الحالية": "Current Exclusive Deals",

    // آراء العملاء
    "ماذا يقول عملاؤنا عنا؟": "What Our Clients Say About Us",
    "تجارب حقيقية وثقة مطلقة": "Real Experiences & Absolute Trust",
    "عرض جميع التقييمات": "View All Testimonials",
    "تقييم ممتاز": "Excellent Rating",
    "خدمة راقية جداً وشفافية عالية": "Classy service and high transparency",
    "أبو موسى صاحب كلمة وثقة": "Abu Mousa is a man of his word and trust",
    "أنصح بالتعامل مع معرض آية": "I highly recommend dealing with Aya Showroom",
    "أضف تقييمك": "Add Your Review",

    // قسم الأسئلة الشائعة
    "إجابات شافية لكافة استفساراتك": "Comprehensive Answers to All Your Inquiries",
    "عرض باقي الأسئلة": "Show More FAQs",
    "ابحث في الأسئلة الشائعة...": "Search in FAQs...",
    "عام": "General",
    "الشراء والتسليم": "Purchasing & Delivery",
    "التمويل والتقسيط": "Financing & Installments",
    "الضمان والصيانة": "Warranty & Maintenance",
    "هل السيارات مفحوصة ومضمونة؟": "Are all vehicles inspected and guaranteed?",
    "كيف يمكنني تقسيط سيارة من خلال المعرض؟": "How can I finance a car through the showroom?",
    "هل يمكنني استبدال سيارتي القديمة؟": "Can I trade in my old car?",
    "ما هي مدة الضمان المقدمة على السيارات؟": "What is the warranty period for vehicles?",
    "هل توجد خدمة توصيل للسيارات؟": "Is vehicle delivery service available?",

    // قسم التواصل
    "العنوان الرئيسي": "Main Address",
    "الهاتف المباشر": "Direct Phone",
    "واتساب أبو موسى": "Abu Mousa WhatsApp",
    "البريد الإلكتروني": "Email Address",
    "ساعات العمل الرسمية": "Official Working Hours",
    "من الأحد إلى الخميس: 9:00 ص - 10:00 م": "Sun - Thu: 9:00 AM - 10:00 PM",
    "الجمعة والسبت: 2:00 م - 10:00 م": "Fri & Sat: 2:00 PM - 10:00 PM",
    "أرسل لنا رسالة": "Send Us a Message",
    "الاسم الكامل * :": "Full Name * :",
    "الاسم الكامل *": "Full Name *",
    "الاسم الكامل": "Full Name",
    "اسمك الكريم": "Your Name",
    "أدخل اسمك الكامل...": "Enter your full name...",
    "رقم الهاتف / الواتساب * :": "Phone Number / WhatsApp * :",
    "رقم الهاتف / الواتساب *": "Phone Number / WhatsApp *",
    "رقم الهاتف / الواتساب": "Phone Number / WhatsApp",
    "رقم الهاتف": "Phone Number",
    "البريد الإلكتروني * :": "Email Address * :",
    "البريد الإلكتروني *": "Email Address *",
    "البريد الإلكتروني": "Email Address",
    "الرسالة أو الاستفسار * :": "Message or Inquiry * :",
    "الرسالة أو الاستفسار *": "Message or Inquiry *",
    "الرسالة أو الاستفسار": "Message or Inquiry",
    "اكتب تفاصيل طلبك...": "Type message details...",
    "اكتب تفاصيل طلبك أو الاستفسار هنا...": "Type your request or inquiry details here...",
    "موضوع الرسالة": "Subject",
    "اختر الموضوع": "Select Subject",
    "استفسار عن سيارة": "Vehicle Inquiry",
    "طلب تمويل وتقسيط": "Financing Request",
    "طلب استبدال سيارة": "Trade-in Request",
    "استفسار آخر": "Other Inquiry",
    "نص الرسالة": "Message Content",
    "تفاصيل الرسالة": "Message Details",
    "إرسال الرسالة الآن": "Send Message Now",
    "إرسال الرسالة": "Send Message",
    "Send Message الآن": "Send Message Now",
    "تم إرسال رسالتك بنجاح! سيتواصل معك فريق أبو موسى في أقرب وقت.": "Your message has been sent successfully! Abu Mousa team will contact you shortly.",
    "يرجى كتابة الاسم الكامل (3 حروف على الأقل)": "Please enter full name (at least 3 characters)",
    "يرجى أدخال رقم هاتف صحيح": "Please enter a valid phone number",
    "يرجى أدخال بريد إلكتروني صحيح": "Please enter a valid email address",
    "يرجى كتابة تفاصيل الرسالة (10 أحرف على الأقل)": "Please write message details (at least 10 characters)",
    "مالك المعرض - متواجد لخدمتكم": "Showroom Owner - At Your Service",
    "مالك Gallery - متواجد لخدمتكم": "Showroom Owner - At Your Service",
    "Contact Information المباشر": "Direct Contact Information",
    "معلومات الاتصال المباشرة": "Direct Contact Information",
    "أرقام التلفون:": "Phone Numbers:",
    "محادثة الواتساب الفورية:": "Instant WhatsApp Chat:",
    "عنوان المعرض الرئيسي:": "Main Showroom Address:",
    "عنوان Gallery الرئيسي:": "Main Showroom Address:",
    "الشارع العام الرئيسي، صالة معرض آية لتجارة السيارات": "Main Highway Boulevard, Aya Car Trading Showroom",
    "الشارع الGeneral الرئيسي، صالة Aya Car Trading Showroom": "Main Highway Boulevard, Aya Car Trading Showroom",
    "تابعنا على مواقع التواصل:": "Follow Us on Social Media:",
    "تابعنا على مواقع التواصل": "Follow Us on Social Media",

    // الفوتر
    "معرض آية لتجارة السيارات - الإسم الأبرز في عالم الفخامة والسيارات الحديثة. نحرص دائماً على تقديم التميز وأفضل الأسعار لعملائنا الكرام برعاية وإشراف أبو موسى.": "Aya Car Trading Showroom - The most prominent name in luxury and modern automobiles. We are committed to delivering excellence and best prices under Abu Mousa supervision.",
    "روابط السريعة": "Quick Links",
    "الروابط السريعة": "Quick Links",
    "أقسام الموقع": "Website Sections",
    "اقسام الموقع": "Website Sections",
    "معرض السيارات": "Cars Showroom",
    "التمويل والتقسيط": "Financing & Installments",
    "العروض الحصرية": "Exclusive Offers",
    "ألبوم الصور": "Photo Gallery",
    "آراء وتجارب العملاء": "Client Testimonials & Stories",
    "اتصل بنا": "Contact Us",
    "جميع الحقوق محفوظة © 2026 معرض آية لتجارة السيارات - برئاسة أبو موسى": "All Rights Reserved © 2026 Aya Car Trading Showroom - Led by Abu Mousa",
    "جميع الحقوق محفوظة © 2026": "All Rights Reserved © 2026"
  };

  // ترتيب المفاتيح تنازلياً حسب الطول لتجنب الاستبدال الجزئي بالخطأ
  const arKeysSorted = Object.keys(dictionary).sort((a, b) => b.length - a.length);

  function getPreferredLang() {
    return localStorage.getItem(STORAGE_KEY) || 'ar';
  }

  // حفظ واسترجاع النصوص الأصلية لضمان تحويل سلس 100% دون فقدان البيانات
  function cacheOriginals(root) {
    const walk = function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node._origText === undefined) {
          node._origText = node.nodeValue;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName.toLowerCase();
        if (tag !== 'script' && tag !== 'style' && tag !== 'svg') {
          if (node.hasAttribute('placeholder') && !node.dataset.origPlaceholder) {
            node.dataset.origPlaceholder = node.getAttribute('placeholder');
          }
          if (node.hasAttribute('title') && !node.dataset.origTitle) {
            node.dataset.origTitle = node.getAttribute('title');
          }
          Array.from(node.childNodes).forEach(walk);
        }
      }
    };
    walk(root);
  }

  function applyTranslation(lang) {
    const isEn = lang === 'en';
    document.documentElement.setAttribute('dir', isEn ? 'ltr' : 'rtl');
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem(STORAGE_KEY, lang);

    // التأكد من أرشفة النصوص العربية الأصلية أول مرة
    cacheOriginals(document.body);

    // 1. ترجمة العناصر المحددة بعلامة data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (i18nMap[key]) {
        const item = i18nMap[key];
        const val = item[lang];
        if (item.html) {
          el.innerHTML = val;
        } else {
          const textSpan = el.querySelector('span');
          if (textSpan) {
            textSpan.textContent = val;
          } else {
            const icon = el.querySelector('i');
            if (icon) {
              el.innerHTML = '';
              el.appendChild(icon);
              el.appendChild(document.createTextNode(' ' + val));
            } else {
              el.textContent = val;
            }
          }
        }
      }
    });

    // 2. ترجمة العقد النصية والخصائص عبر القاموس الشامل
    const translateNode = function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const orig = node._origText !== undefined ? node._origText : node.nodeValue;
        if (!orig || !orig.trim()) return;

        if (!isEn) {
          // العودة للنص العربي الأصلي بكل دقة
          node.nodeValue = orig;
        } else {
          let val = orig;
          arKeysSorted.forEach((key) => {
            if (val.includes(key)) {
              val = val.split(key).join(dictionary[key]);
            }
          });
          node.nodeValue = val;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName.toLowerCase();
        if (tag !== 'script' && tag !== 'style' && tag !== 'svg') {
          // تجنب إعادة ترجمة عناصر data-i18n التي تمت ترجمتها بشكل مباشر
          if (!node.hasAttribute('data-i18n')) {
            Array.from(node.childNodes).forEach(translateNode);
          }
        }

        // ترجمة الخصائص (placeholders & titles)
        if (node.dataset && node.dataset.origPlaceholder) {
          const origP = node.dataset.origPlaceholder;
          if (!isEn) {
            node.placeholder = origP;
          } else {
            let pVal = origP;
            arKeysSorted.forEach((key) => {
              if (pVal.includes(key)) {
                pVal = pVal.split(key).join(dictionary[key]);
              }
            });
            node.placeholder = pVal;
          }
        }

        if (node.dataset && node.dataset.origTitle) {
          const origT = node.dataset.origTitle;
          if (!isEn) {
            node.title = origT;
          } else {
            let tVal = origT;
            arKeysSorted.forEach((key) => {
              if (tVal.includes(key)) {
                tVal = tVal.split(key).join(dictionary[key]);
              }
            });
            node.title = tVal;
          }
        }
      }
    };

    translateNode(document.body);

    // 3. تحديث اتجاه الأيقونات السهمية (Breadcrumbs)
    document.querySelectorAll('.breadcrumb i.fa-chevron-left, .breadcrumb i.fa-chevron-right').forEach((icon) => {
      if (isEn) {
        icon.classList.remove('fa-chevron-left');
        icon.classList.add('fa-chevron-right');
      } else {
        icon.classList.remove('fa-chevron-right');
        icon.classList.add('fa-chevron-left');
      }
    });

    // 4. تحديث أزرار تغيير اللغة (.lang-toggle-btn)
    document.querySelectorAll('.lang-toggle-btn').forEach((btn) => {
      const span = btn.querySelector('span');
      if (span) {
        span.textContent = isEn ? 'AR' : 'EN';
      } else {
        btn.innerHTML = `<i class="fas fa-globe"></i> <span>${isEn ? 'AR' : 'EN'}</span>`;
      }
    });
  }

  // تصدير دالة التطبيق ديناميكياً للعناصر المضافة لاحقاً
  window.ayaApplyTranslation = applyTranslation;

  document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getPreferredLang();
    applyTranslation(currentLang);

    document.querySelectorAll('.lang-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const activeLang = document.documentElement.getAttribute('lang') || 'ar';
        const newLang = activeLang === 'en' ? 'ar' : 'en';
        applyTranslation(newLang);
      });
    });
  });
})();

