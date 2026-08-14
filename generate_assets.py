import os

os.makedirs('img/cars', exist_ok=True)
os.makedirs('img/gallery', exist_ok=True)
os.makedirs('img/testimonials', exist_ok=True)

cars = [
    ('hero_car_bg', 'مرسيدس مايباخ الفاخرة 2026', '#1A1D24', '#D4AF37'),
    ('maybach_s680', 'Mercedes-Maybach S680', '#0B0C10', '#D4AF37'),
    ('bmw_760i', 'BMW 760i xDrive', '#12141C', '#0066B1'),
    ('porsche_911', 'Porsche 911 GT3 RS', '#1E1B18', '#D4AF37'),
    ('range_rover', 'Range Rover SV Autobiography', '#15171E', '#C5A059'),
    ('audi_rs7', 'Audi RS7 Performance', '#101216', '#E21A22'),
    ('lamborghini_urus', 'Lamborghini Urus Performante', '#1A1A1A', '#FFC107'),
    ('lexus_lx600', 'Lexus LX600 VIP Edition', '#12141A', '#D4AF37'),
    ('rolls_royce', 'Rolls-Royce Cullinan Series II', '#0B0C10', '#D4AF37'),
    ('financing_bg', 'عروض التمويل الحصرية', '#0F1117', '#D4AF37')
]

for filename, title, bg_color, accent in cars:
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <defs>
        <linearGradient id="grad_{filename}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="{bg_color}" />
          <stop offset="100%" stop-color="#050608" />
        </linearGradient>
        <linearGradient id="goldGrad_{filename}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="{accent}" />
          <stop offset="100%" stop-color="#F4E090" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#grad_{filename})" />
      <circle cx="400" cy="200" r="250" fill="{accent}" opacity="0.08" />
      <path d="M 100 320 C 150 310, 220 280, 300 220 C 380 160, 520 160, 600 220 C 660 260, 720 300, 740 320 L 750 350 L 50 350 Z" fill="none" stroke="url(#goldGrad_{filename})" stroke-width="4" />
      <path d="M 200 245 C 270 200, 480 200, 560 245" fill="none" stroke="{accent}" stroke-width="2" opacity="0.7" />
      <circle cx="220" cy="350" r="45" fill="#000" stroke="{accent}" stroke-width="6" />
      <circle cx="220" cy="350" r="20" fill="{accent}" opacity="0.6" />
      <circle cx="600" cy="350" r="45" fill="#000" stroke="{accent}" stroke-width="6" />
      <circle cx="600" cy="350" r="20" fill="{accent}" opacity="0.6" />
      <rect x="0" y="420" width="800" height="80" fill="#08090C" />
      <text x="400" y="465" font-family="Cairo, Tajawal, sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF" text-anchor="middle">{title}</text>
      <text x="400" y="488" font-family="Cairo, Tajawal, sans-serif" font-size="14" fill="{accent}" text-anchor="middle">معرض آية لتجارة السيارات - أبو موسى</text>
    </svg>'''
    with open(f'img/cars/{filename}.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)

# Gallery Images
gallery_items = [
    ('showroom_1', 'صالة المعرض الفاخرة'),
    ('showroom_2', 'جناح السيارات VIP'),
    ('delivery_1', 'مراسم تسليم سيارة لعميل'),
    ('delivery_2', 'فرحة تسليم مفتاح الذهبي'),
    ('engine_close', 'محرك V12 المزدوج'),
    ('interior_luxury', 'المقصورة الملكية الفاخرة'),
]

for filename, title in gallery_items:
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#12141A" />
      <rect x="20" y="20" width="760" height="560" rx="15" fill="none" stroke="#D4AF37" stroke-width="2" opacity="0.3" />
      <circle cx="400" cy="270" r="100" fill="#D4AF37" opacity="0.1" />
      <path d="M350 240 L450 240 L400 320 Z" fill="#D4AF37" opacity="0.5" />
      <text x="400" y="420" font-family="Cairo, Tajawal, sans-serif" font-size="28" font-weight="bold" fill="#D4AF37" text-anchor="middle">{title}</text>
      <text x="400" y="460" font-family="Cairo, Tajawal, sans-serif" font-size="16" fill="#A0A6B8" text-anchor="middle">معرض آية - أبو موسى</text>
    </svg>'''
    with open(f'img/gallery/{filename}.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)

# Testimonials Avatars
clients = [
    ('client_1', 'مهندس أحمد السعدي'),
    ('client_2', 'دكتور خالد التميمي'),
    ('client_3', 'أستاذة مريم المطيري'),
]

for filename, title in clients:
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <circle cx="100" cy="100" r="100" fill="#1A1D26" />
      <circle cx="100" cy="75" r="35" fill="#D4AF37" />
      <path d="M30 170 C30 125 170 125 170 170" fill="#D4AF37" />
    </svg>'''
    with open(f'img/testimonials/{filename}.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)

print("Images generated!")
