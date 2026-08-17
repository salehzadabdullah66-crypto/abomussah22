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

    // أقسام السيارات والفلترة والتصنيفات الجديدة
    "جميع الأقسام": "All Categories",
    "قسم السيارات المستعملة": "Used Cars Section",
    "قسم البيك آب": "Pick-Up Section",
    "السيارات الجديدة": "New Cars (2024-2026)",
    "قسم السيارات الملكية والفاخرة": "Royal & Luxury Section",
    "جميع السيارات": "All Cars",
    "سيارات مستعملة": "Used Cars",
    "سيارات بيك آب": "Pick-Up Trucks",
    "سيارات بيك آب (Pick-Up)": "Pick-Up Trucks",
    "سيارات جديدة (2024-2026)": "New Cars (2024-2026)",
    "سيارات جديدة": "New Cars",
    "سيارات ملكية وفاخرة": "Luxury Cars",
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

    // مواصفات وبطاقات السيارات المستعملة والبيك آب
    "مستعملة - 42,000 كم": "Used - 42,000 KM",
    "بحالة الوكالة - 35,000 كم": "Mint Condition - 35,000 KM",
    "مستعملة نظيفة - 48,000 كم": "Clean Used - 48,000 KM",
    "كسر زيرو - 18,000 كم": "Like New - 18,000 KM",
    "مفحوصة - 38,000 كم": "Inspected - 38,000 KM",
    "بيك آب 4x4 فل كامل": "4x4 Full Option Pickup",
    "بيك آب فاخر 2025": "2025 Luxury Pickup",
    "بيك آب الاعتمادية 2024": "2024 Heavy Duty Pickup",
    "فخامة Denali 2025": "2025 Denali Luxury Pickup",
    "دفع رباعي 4x4 قفل دُفلوك": "4x4 AWD Diff Lock",
    "حمولة وقوة سحب عالية": "High Towing & Payload",
    "حزمة FX4 Off-Road": "FX4 Off-Road Package",
    "مقاعد جلد مساج وسقف": "Leather Massage Seats & Roof",
    "عالي الاعتمادية والخدمة الشاقة": "High Reliability & Heavy Duty",
    "حزمة Denali الفاخرة باب خلفي MultiPro": "Luxury Denali MultiPro Tailgate",
    "السعر الكاش (معقول ومناسب)": "Cash Price (Fair Deal)",
    "السعر الكاش (مناسب جداً)": "Cash Price (Competitive)",
    "فحص كامل 100%": "100% Certified Inspection",
    "سقف بانوراما AMG": "AMG Panorama Roof",
    "اقتصادية جداً بالبنزين": "Fuel Efficient",
    "رادار وتحديد مسار": "Radar & Lane Assist",

    // تصنيفات الماركات في الكروت
    "Toyota (قسم البيك آب)": "Toyota (Pick-Up)",
    "Mercedes-Benz (قسم المستعمل)": "Mercedes-Benz (Used)",
    "Ford (قسم البيك آب)": "Ford (Pick-Up)",
    "Toyota (قسم المستعمل)": "Toyota (Used)",
    "BMW (قسم المستعمل)": "BMW (Used)",
    "Hyundai (قسم المستعمل)": "Hyundai (Used)",
    "KIA (قسم المستعمل)": "KIA (Used)",
    "Isuzu (قسم البيك آب)": "Isuzu (Pick-Up)",
    "GMC (قسم البيك آب)": "GMC (Pick-Up)",

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

    // الإحصائيات
    "سيارة مبيعة بنجاح": "Cars Sold Successfully",
    "عميل سعيد وواثق": "Happy & Confident Clients",
    "خبرة في سوق السيارات": "Years of Market Experience",
    "ضمان وجودة حقيقية": "Genuine Quality & Warranty",

    // الفلترة والبطاقات العامة
    "أسطولنا الفاخر": "Our Luxury Fleet",
    "أسطولنا المميز والفاخر": "Our Premier & Luxury Fleet",
    "أحدث السيارات المميزة والملكية": "Latest Royal & Featured Vehicles",
    "أحدث السيارات المميزة": "Latest Featured Vehicles",
    "اختر سيارتك القادمة من بين أرقى السيارات العالمية المفحوصة والمضمونة": "Choose your next vehicle from certified, fully inspected world-class cars",
    "اختر سيارتك القادمة من بين أرقى السيارات العالمية المفحوصة والمضمونة لدى معرض آية": "Choose your next vehicle from certified world-class cars at Aya Showroom",
    "تصفية كتالوج السيارات": "Filter Cars Catalog",
    "بحث مباشر باسم السيارة أو الموديل:": "Search Car Name or Model:",
    "اكتب اسم السيارة (مثال: مايباخ, BMW, بورشه)...": "Type car name (e.g. Maybach, BMW, Porsche)...",
    "جديد 2026": "New 2026",
    "عروض خاصة": "Special Offer",
    "السعر المميز": "Special Price",
    "التفاصيل": "View Details",
    "شاهد جميع السيارات المعروضة": "Explore Full Cars Fleet",
    "أطلبها الآن": "Order Now",
    "طلب السيارة": "Order Car",
    "تواصل للاستفسار": "Contact for Inquiry",
    "مرسيدس مايباخ": "Mercedes-Maybach",
    "بي إم دبليو الفئة السابعة": "BMW 7 Series",
    "رينج روفر روكشري": "Range Rover Autobiography",
    "فل كامل": "Full Option",
    "مقاعد مساج ملكية": "Royal Massage Seats",
    "السعر النهائي": "Final Price",
    "السعر الكاش": "Cash Price",
    "شامل الضريبة والترخيص": "Includes Tax & Licensing",
    "لم يتم العثور على سيارات تطابق خيارات الفلترة الحالية.": "No vehicles found matching current filter options.",
    "يرجى تغيير خيارات الفلترة أو إعادة البحث.": "Please modify filter options or search again.",

    // قسم الخدمات
    "حلول متكاملة": "Integrated Solutions",
    "خدماتنا الحصرية والمتميزة": "Exclusive & Premier Services",
    "بيع السيارات الفاخرة": "Luxury Cars Sales",
    "شراء السيارات كاش": "Instant Cash Purchasing",
    "تبديل واستبدال السيارات": "Car Trade-In & Exchange",
    "تقييم وتثمين السيارات": "Vehicle Valuation & Appraisal",
    "خدمات ما بعد البيع والضمان": "After-Sales & Warranty",
    "شحن وتوصيل السيارات الملكية": "VIP Delivery & Transport",
    "المزيد": "More Details",
    "طلب الخدمة": "Request Service",
    "احجز خدمتك الآن": "Book Your Service Now",

    // قسم التمويل
    "سعر السيارة ($):": "Car Price ($):",
    "سعر السيارة ($)": "Car Price ($)",
    "الدفعة الأولى ($):": "Down Payment ($):",
    "الدفعة الأولى ($)": "Down Payment ($)",
    "مدة التقسيط (أشهر):": "Installment Term (Months):",
    "مدة التقسيط (أشهر)": "Installment Term (Months)",
    "القسط الشهري المتوقع": "Estimated Monthly Installment",
    "إجمالي المبلغ المراد سداده": "Total Payable Amount",
    "قدّم طلب تمويل مع أبو موسى": "Apply for Financing with Abu Mousa",

    // الفوتر
    "معرض آية لتجارة السيارات - الإسم الأبرز في عالم الفخامة والسيارات الحديثة. نحرص دائماً على تقديم التميز وأفضل الأسعار لعملائنا الكرام برعاية وإشراف أبو موسى.": "Aya Car Trading Showroom - The premier name in luxury and modern automobiles under Abu Mousa supervision.",
    "الروابط السريعة": "Quick Links",
    "أقسام الموقع": "Website Sections",
    "جميع الحقوق محفوظة © 2026 معرض آية لتجارة السيارات - برئاسة أبو موسى": "All Rights Reserved © 2026 Aya Car Trading Showroom - Led by Abu Mousa"
  };

  // ترتيب المفاتيح تنازلياً حسب الطول لتجنب الاستبدال الجزئي بالخطأ
  const arKeysSorted = Object.keys(dictionary).sort((a, b) => b.length - a.length);

  function getPreferredLang() {
    return localStorage.getItem(STORAGE_KEY) || 'ar';
  }

  // أرشفة النصوص الأصلية
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

    cacheOriginals(document.body);

    // 1. ترجمة عناصر data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (i18nMap[key]) {
        const item = i18nMap[key];
        const val = item[lang];
        if (item.html || (typeof val === 'string' && val.includes('<span'))) {
          el.innerHTML = val;
        } else {
          const textSpan = el.querySelector(':scope > span:not(.type-cursor)');
          if (textSpan && !textSpan.classList.contains('gold-gradient-title')) {
            textSpan.textContent = val;
          } else {
            // الحفاظ على الأيقونات والسهم
            const icon = el.querySelector('i:not(.chevron-arrow)');
            const arrow = el.querySelector('i.chevron-arrow');
            if (icon || arrow) {
              el.childNodes.forEach((child) => {
                if (child.nodeType === Node.TEXT_NODE && child.nodeValue.trim().length > 0) {
                  child.nodeValue = ' ' + val + ' ';
                }
              });
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
          Array.from(node.childNodes).forEach(translateNode);
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

    // 3. تحديث اتجاه الأيقونات السهمية
    document.querySelectorAll('.breadcrumb i.fa-chevron-left, .breadcrumb i.fa-chevron-right').forEach((icon) => {
      if (isEn) {
        icon.classList.remove('fa-chevron-left');
        icon.classList.add('fa-chevron-right');
      } else {
        icon.classList.remove('fa-chevron-right');
        icon.classList.add('fa-chevron-left');
      }
    });

    // 4. تحديث أزرار تغيير اللغة
    document.querySelectorAll('.lang-toggle-btn').forEach((btn) => {
      const span = btn.querySelector('span');
      if (span) {
        span.textContent = isEn ? 'AR' : 'EN';
      } else {
        btn.innerHTML = `<i class="fas fa-globe"></i> <span>${isEn ? 'AR' : 'EN'}</span>`;
      }
    });
  }

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
