/* ==========================================================================
   معرض آية لتجارة السيارات - الجافاسكربت التفاعلي الشامل للخريطة الملكية (contact-map.js)
   ========================================================================== */

(function () {
  'use strict';

  // إحداثيات معرض آية لتجارة السيارات - مدينة الباب
  const SHOWROOM_LAT = 36.350217;
  const SHOWROOM_LNG = 37.4959483;
  const SHOWROOM_COORDS = [SHOWROOM_LAT, SHOWROOM_LNG];

  // شبكة المعالم ونقاط الانطلاق المحيطة (Landmarks & Departure Points)
  const landmarks = {
    hal_roundabout: {
      name: "دوار سوق الهال (المدخل المباشر)",
      coords: [36.350650, 37.494700],
      desc: "نقطة الدخول الرئيسية والمباشرة لواجهة صالة المعرض (أقل من دقيقة)",
      driveTime: "1 دقيقة"
    },
    aleppo_highway: {
      name: "طريق حلب - الباب (المدخل الغربي)",
      coords: [36.347800, 37.480200],
      desc: "المدخل السريع القادم من اتجاه حلب وريفها الغربي مباشرة للمعرض",
      driveTime: "2 دقيقة"
    },
    city_center: {
      name: "مركز مدينة الباب (الجامع الكبير / السوق)",
      coords: [36.370500, 37.514000],
      desc: "قلب مدينة الباب والأسواق المركزية باتجاه دوار سوق الهال",
      driveTime: "5 دقائق"
    },
    vip_parking: {
      name: "مواقف زوار المعرض VIP",
      coords: [36.350100, 37.496400],
      desc: "مواقف سيارات مظللة ومجانية مخصصة لعملاء وزوار معرض آية",
      driveTime: "مباشر أمام المعرض"
    },
    al_rai_road: {
      name: "طريق الراعي - الباب (المدخل الشمالي)",
      coords: [36.378000, 37.499000],
      desc: "المدخل الشمالي القادم من اتجاه الراعي والحدود مباشرة",
      driveTime: "6 دقائق"
    }
  };

  let royalMap = null;
  let currentTileLayer = null;
  let activeRoutePolyline = null;
  let activeLandmarkMarker = null;
  let userRoutePolyline = null;
  let userMarker = null;
  let deliveryCircles = [];
  let isTourRunning = false;
  let tourTimeouts = [];
  let mapInitialized = false;

  // طبقات الخرائط المختلفة (Base Tile Layers)
  const tileLayers = {
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      options: {
        attribution: '&copy; CARTO, Aya Showroom',
        maxZoom: 19,
        subdomains: 'abcd'
      }
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      options: {
        attribution: '&copy; Esri World Imagery, Aya Showroom',
        maxZoom: 18
      }
    },
    street: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: {
        attribution: '&copy; OpenStreetMap contributors, Aya Showroom',
        maxZoom: 19
      }
    }
  };

  // تشغيل التهيئة عند جاهزية المستند مع محاولات إعادة في حال تأخر تحميل المكتبة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startInitialization);
  } else {
    startInitialization();
  }

  function startInitialization() {
    let retries = 0;
    const maxRetries = 25;

    function attemptInit() {
      const mapContainer = document.getElementById('leaflet-royal-map');
      if (!mapContainer) return;

      if (typeof L !== 'undefined') {
        if (!mapInitialized) {
          initMapFeatures();
          mapInitialized = true;
        }
      } else {
        retries++;
        if (retries < maxRetries) {
          setTimeout(attemptInit, 120);
        } else {
          console.warn('Leaflet not loaded after retries, fallback to iframe');
          fallbackToIframe();
          setupCommonHandlers();
        }
      }
    }

    attemptInit();
  }

  /**
   * تهيئة جميع وظائف الخريطة الملكية
   */
  function initMapFeatures() {
    try {
      setupLeafletMap();
    } catch (err) {
      console.warn('Leaflet init error, fallback to iframe:', err);
      fallbackToIframe();
    }

    setupCommonHandlers();
  }

  /**
   * تهيئة المعالجات المشتركة لجميع الأزرار
   */
  function setupCommonHandlers() {
    setupCopyCoordsButton();
    setupLayerSwitchers();
    setupMapControls();
    setupGeolocationDistance();
    setupLandmarksQuickJump();
    setupDeliveryZonesToggle();
    setupCinematicTour();
    setupModals();

    // تحديث أبعاد الخريطة عند تغيير حجم الشاشة أو تدوير الهاتف
    window.addEventListener('resize', () => {
      if (royalMap) {
        royalMap.invalidateSize();
      }
    });
  }

  /**
   * بناء وضبط خريطة Leaflet الملكية
   */
  function setupLeafletMap() {
    const isMobile = window.innerWidth <= 768;

    royalMap = L.map('leaflet-royal-map', {
      center: SHOWROOM_COORDS,
      zoom: isMobile ? 15.5 : 16,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      tap: true,
      touchZoom: true
    });

    royalMap.on('focus', () => { royalMap.scrollWheelZoom.enable(); });
    royalMap.on('blur', () => { royalMap.scrollWheelZoom.disable(); });

    // طبقة العرض الافتراضية
    currentTileLayer = L.tileLayer(tileLayers.dark.url, tileLayers.dark.options).addTo(royalMap);

    // ماركر المعرض الملكي مع الرادار النبضي
    const royalPinHtml = `
      <div class="royal-custom-pin-wrap" title="معرض آية لتجارة السيارات - أبو موسى">
        <div class="royal-pin-sonar"></div>
        <div class="royal-pin-sonar"></div>
        <div class="royal-pin-icon-body">
          <div class="royal-pin-inner-logo">
            <i class="fas fa-car-side"></i>
          </div>
        </div>
      </div>
    `;

    const customRoyalIcon = L.divIcon({
      html: royalPinHtml,
      className: 'royal-leaflet-custom-marker',
      iconSize: [50, 50],
      iconAnchor: [25, 45],
      popupAnchor: [0, -45]
    });

    const showroomMarker = L.marker(SHOWROOM_COORDS, {
      icon: customRoyalIcon,
      title: 'معرض آية لتجارة السيارات - أبو موسى'
    }).addTo(royalMap);

    // محتوى النافذة المنبثقة التفاعلية الفاخرة
    const popupContent = `
      <div class="royal-popup-body">
        <div class="royal-popup-title">
          <i class="fas fa-gem" style="color:var(--gold-primary);"></i> معرض آية لتجارة السيارات
        </div>
        <div class="royal-popup-sub">
          <i class="fas fa-map-marker-alt" style="color:var(--gold-primary); margin-left:4px;"></i>
          مدينة الباب - دوار سوق الهال
        </div>
        <div style="font-size:0.8rem; color:#25D366; font-weight:700; margin-bottom:8px;">
          <i class="fas fa-door-open"></i> مفتوح الآن لغاية 10:00 مساءً
        </div>
        <div class="royal-popup-buttons">
          <a href="https://www.google.com/maps/dir/?api=1&destination=${SHOWROOM_LAT},${SHOWROOM_LNG}" target="_blank" class="map-action-btn-primary" style="font-size:0.76rem; padding:6px 10px;">
            <i class="fas fa-directions"></i> بدء الملاحة
          </a>
          <a href="https://wa.me/963959124771" target="_blank" class="map-action-btn-secondary" style="font-size:0.76rem; padding:6px 10px; color:#25D366; border-color:#25D366;">
            <i class="fab fa-whatsapp"></i> واتساب
          </a>
        </div>
      </div>
    `;

    showroomMarker.bindPopup(popupContent, {
      maxWidth: isMobile ? 260 : 290,
      minWidth: isMobile ? 200 : 230,
      autoPan: true,
      autoPanPaddingTopLeft: L.point(15, isMobile ? 25 : 40),
      autoPanPaddingBottomRight: L.point(15, 20),
      closeButton: true
    }).openPopup();

    addShowroomVisualGuides();

    // تأكيد تحديث أبعاد الخريطة بعد التحميل لتفادي المربعات الرمادية
    setTimeout(() => {
      if (royalMap) royalMap.invalidateSize();
    }, 400);
  }

  /**
   * إضافة علامات استرشادية دائمة
   */
  function addShowroomVisualGuides() {
    if (!royalMap) return;

    try {
      const halIcon = L.divIcon({
        html: `<div style="background:rgba(14,17,24,0.92); border:1.5px solid #D4AF37; color:#D4AF37; font-size:0.72rem; font-weight:800; padding:3px 10px; border-radius:14px; white-space:nowrap; box-shadow:0 3px 10px rgba(0,0,0,0.6); cursor:pointer;"><i class="fas fa-circle-notch"></i> دوار سوق الهال</div>`,
        className: 'landmark-marker-label',
        iconAnchor: [50, 15]
      });
      L.marker(landmarks.hal_roundabout.coords, { icon: halIcon }).addTo(royalMap);
    } catch (e) {
      console.warn('Could not add visual guides:', e);
    }
  }

  /**
   * شريط الانطلاق السريع للمعالم ورسم المسارات الحية
   */
  function setupLandmarksQuickJump() {
    const chips = document.querySelectorAll('.map-landmark-chip');
    if (!chips.length) return;

    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        stopTour(); // إيقاف الجولة في حال كانت تعمل

        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const landmarkKey = chip.getAttribute('data-landmark');
        const target = landmarks[landmarkKey];
        if (!target || !royalMap) return;

        // إزالة المسار والماركر السابقين
        if (activeRoutePolyline) royalMap.removeLayer(activeRoutePolyline);
        if (activeLandmarkMarker) royalMap.removeLayer(activeLandmarkMarker);

        // إضافة ماركر نقطة الانطلاق
        const landmarkIcon = L.divIcon({
          html: `<div style="background:#D4AF37; color:#0b0e14; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow:0 0 15px rgba(212,175,55,0.8); font-size:1rem;"><i class="fas fa-map-pin"></i></div>`,
          iconSize: [34, 34],
          iconAnchor: [17, 34]
        });

        activeLandmarkMarker = L.marker(target.coords, { icon: landmarkIcon }).addTo(royalMap);
        activeLandmarkMarker.bindPopup(`
          <div style="direction:rtl; text-align:right; font-family:var(--font-primary);">
            <strong style="color:var(--gold-primary); font-size:0.95rem;">${target.name}</strong>
            <p style="margin:4px 0 0 0; font-size:0.8rem; color:#ccc;">${target.desc}</p>
            <div style="margin-top:6px; font-size:0.8rem; color:#25D366; font-weight:700;"><i class="fas fa-car"></i> زمن الوصول للمعرض: ${target.driveTime}</div>
          </div>
        `).openPopup();

        // رسم مسار ذهبي متقطع ومتحرك بين نقطة الانطلاق والمعرض
        activeRoutePolyline = L.polyline([target.coords, SHOWROOM_COORDS], {
          color: '#D4AF37',
          weight: 4,
          dashArray: '8, 8',
          opacity: 0.9
        }).addTo(royalMap);

        // ملاءمة الرؤية لتشمل النقطتين مع تحريك الكاميرا
        const bounds = L.latLngBounds([target.coords, SHOWROOM_COORDS]);
        royalMap.flyToBounds(bounds, { padding: [50, 50], duration: 1.2 });

        showToast(`نقطة الانطلاق: ${target.name} (~${target.driveTime})`);
      });
    });
  }

  /**
   * الجولة الافتراضية السينمائية للوصول (Cinematic Fly Tour)
   */
  function setupCinematicTour() {
    const btnTour = document.getElementById('map-btn-tour');
    const overlay = document.getElementById('map-tour-overlay');
    const btnStopTour = document.getElementById('map-tour-stop-btn');
    const tourStatusText = document.getElementById('map-tour-status-text');

    if (!btnTour) return;

    btnTour.addEventListener('click', (e) => {
      e.preventDefault();
      if (isTourRunning) {
        stopTour();
      } else {
        startTour();
      }
    });

    if (btnStopTour) {
      btnStopTour.addEventListener('click', (e) => {
        e.preventDefault();
        stopTour();
      });
    }

    function startTour() {
      if (!royalMap) return;
      isTourRunning = true;
      clearTourTimeouts();

      if (overlay) overlay.classList.add('active');
      btnTour.classList.add('active');

      // المرحلة 1: الانطلاق من مدخل طريق حلب السريع
      if (tourStatusText) tourStatusText.innerHTML = 'المرحلة 1: الانطلاق من مدخل طريق حلب - الباب...';
      royalMap.flyTo(landmarks.aleppo_highway.coords, 15, { duration: 2 });

      // المرحلة 2: التحليق فوق دوار سوق الهال
      tourTimeouts.push(setTimeout(() => {
        if (!isTourRunning) return;
        if (tourStatusText) tourStatusText.innerHTML = 'المرحلة 2: الاقتراب من دوار سوق الهال ومدخل المعرض...';
        royalMap.flyTo(landmarks.hal_roundabout.coords, 16.5, { duration: 2.5 });
      }, 3500));

      // المرحلة 3: التمركز بدقة أمام واجهة معرض آية
      tourTimeouts.push(setTimeout(() => {
        if (!isTourRunning) return;
        if (tourStatusText) tourStatusText.innerHTML = 'المرحلة 3: الوصول لصالة معرض آية لتجارة السيارات!';
        royalMap.flyTo(SHOWROOM_COORDS, 16.5, { duration: 2 });
      }, 7000));

      // إنهاء الجولة التلقائي بعد 11 ثانية
      tourTimeouts.push(setTimeout(() => {
        stopTour();
      }, 11500));
    }
  }

  function stopTour() {
    isTourRunning = false;
    clearTourTimeouts();
    const overlay = document.getElementById('map-tour-overlay');
    const btnTour = document.getElementById('map-btn-tour');
    if (overlay) overlay.classList.remove('active');
    if (btnTour) btnTour.classList.remove('active');
  }

  function clearTourTimeouts() {
    tourTimeouts.forEach(t => clearTimeout(t));
    tourTimeouts = [];
  }

  /**
   * تفعيل نطاقات الشحن والتوصيل وتجربة القيادة
   */
  function setupDeliveryZonesToggle() {
    const btnDelivery = document.getElementById('map-btn-delivery-zones');
    if (!btnDelivery) return;

    let zonesActive = false;

    btnDelivery.addEventListener('click', (e) => {
      e.preventDefault();
      if (!royalMap) return;
      zonesActive = !zonesActive;

      if (zonesActive) {
        btnDelivery.classList.add('active');

        // نطاق 1: 5 كم (توصيل فوري وتجربة قيادة منزلية مجانية)
        const zone1 = L.circle(SHOWROOM_COORDS, {
          radius: 3000,
          color: '#D4AF37',
          fillColor: '#D4AF37',
          fillOpacity: 0.12,
          weight: 2,
          dashArray: '6, 6'
        }).addTo(royalMap).bindPopup('<strong>نطاق مدينة الباب</strong>: تجربة قيادة منزلية وتوصيل فوري خلال 30 دقيقة.');

        // نطاق 2: 15 كم (شحن مجاني لكافة مناطق ريف حلب)
        const zone2 = L.circle(SHOWROOM_COORDS, {
          radius: 12000,
          color: '#9A7B1C',
          fillColor: '#9A7B1C',
          fillOpacity: 0.06,
          weight: 1.5,
          dashArray: '8, 8'
        }).addTo(royalMap).bindPopup('<strong>نطاق ريف حلب</strong>: شحن VIP مجاني بمركبات مغلقة.');

        deliveryCircles = [zone1, zone2];
        royalMap.flyTo(SHOWROOM_COORDS, 13, { duration: 1.5 });
        showToast('تم تفعيل عرض نطاقات التوصيل وتجربة القيادة');
      } else {
        btnDelivery.classList.remove('active');
        deliveryCircles.forEach(c => {
          if (royalMap) royalMap.removeLayer(c);
        });
        deliveryCircles = [];
        royalMap.flyTo(SHOWROOM_COORDS, 16, { duration: 1 });
      }
    });
  }

  /**
   * تبديل طبقات الخريطة (قمر صناعي / ليلي / شوارع)
   */
  function setupLayerSwitchers() {
    const layerBtns = document.querySelectorAll('.map-layer-btn');
    if (!layerBtns.length) return;

    layerBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        layerBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const layerType = btn.getAttribute('data-layer');
        if (!royalMap || !tileLayers[layerType]) return;

        const newLayer = L.tileLayer(tileLayers[layerType].url, tileLayers[layerType].options).addTo(royalMap);

        if (currentTileLayer) {
          royalMap.removeLayer(currentTileLayer);
        }

        currentTileLayer = newLayer;
      });
    });
  }

  /**
   * أزرار التحكم بالخريطة (تكبير، تصغير، إعادة تمركز، ملء الشاشة)
   */
  function setupMapControls() {
    const btnZoomIn = document.getElementById('map-btn-zoom-in');
    const btnZoomOut = document.getElementById('map-btn-zoom-out');
    const btnCenter = document.getElementById('map-btn-center');
    const btnFullscreen = document.getElementById('map-btn-fullscreen');

    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', (e) => {
        e.preventDefault();
        if (royalMap) royalMap.zoomIn();
      });
    }

    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', (e) => {
        e.preventDefault();
        if (royalMap) royalMap.zoomOut();
      });
    }

    if (btnCenter) {
      btnCenter.addEventListener('click', (e) => {
        e.preventDefault();
        if (royalMap) {
          royalMap.flyTo(SHOWROOM_COORDS, 16, { animate: true, duration: 1.2 });
        }
      });
    }

    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', (e) => {
        e.preventDefault();
        const mapWrapper = document.querySelector('.royal-map-card');
        if (!mapWrapper) return;

        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
          if (mapWrapper.requestFullscreen) {
            mapWrapper.requestFullscreen();
          } else if (mapWrapper.webkitRequestFullscreen) {
            mapWrapper.webkitRequestFullscreen();
          }
          btnFullscreen.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
          btnFullscreen.innerHTML = '<i class="fas fa-expand"></i>';
        }

        setTimeout(() => {
          if (royalMap) royalMap.invalidateSize();
        }, 300);
      });
    }
  }

  /**
   * حساب المسافة المباشرة ورسم المسار من موقع المستخدم
   */
  function setupGeolocationDistance() {
    const btnCalcDist = document.getElementById('map-btn-calc-dist');
    const resultBox = document.getElementById('map-distance-result');
    const resultText = document.getElementById('map-distance-text');

    if (!btnCalcDist) return;

    btnCalcDist.addEventListener('click', (e) => {
      e.preventDefault();
      if (!navigator.geolocation) {
        showToast('متصفحك لا يدعم تحديد الموقع الجغرافي');
        return;
      }

      btnCalcDist.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تحديد موقعك...';

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const userCoords = [userLat, userLng];

          const distanceKm = calculateHaversineDistance(userLat, userLng, SHOWROOM_LAT, SHOWROOM_LNG);
          const estMinutes = Math.max(2, Math.round(distanceKm * 1.5));

          btnCalcDist.innerHTML = '<i class="fas fa-location-arrow"></i> تم تحديد موقعك ومسارك!';

          if (resultBox && resultText) {
            resultText.innerHTML = `أنت على بُعد <strong>${distanceKm.toFixed(1)} كم</strong> تقريباً من المعرض (~${estMinutes} دقيقة بالسيارة)`;
            resultBox.classList.add('active');
          }

          if (royalMap) {
            if (userMarker) royalMap.removeLayer(userMarker);
            if (userRoutePolyline) royalMap.removeLayer(userRoutePolyline);

            const userIcon = L.divIcon({
              html: `<div style="background:#25D366; color:#fff; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow:0 0 14px #25D366;"><i class="fas fa-user"></i></div>`,
              iconSize: [32, 32],
              iconAnchor: [16, 16]
            });

            userMarker = L.marker(userCoords, { icon: userIcon }).addTo(royalMap);
            userMarker.bindPopup('<strong>موقعك الحالي</strong>').openPopup();

            userRoutePolyline = L.polyline([userCoords, SHOWROOM_COORDS], {
              color: '#D4AF37',
              weight: 4,
              dashArray: '8, 8',
              opacity: 0.85
            }).addTo(royalMap);

            const bounds = L.latLngBounds([userCoords, SHOWROOM_COORDS]);
            royalMap.fitBounds(bounds, { padding: [50, 50] });
          }

          showToast(`تم حساب المسافة: ${distanceKm.toFixed(1)} كم`);
        },
        () => {
          btnCalcDist.innerHTML = '<i class="fas fa-location-arrow"></i> احسب المسافة من موقعي الحالي';
          showToast('تعذر الوصول لموقعك. يرجى تفعيل إذن الموقع في المتصفح.');
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }

  function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * إدارة النوافذ المنبثقة (مودال رمز QR)
   */
  function setupModals() {
    const btnQr = document.getElementById('map-btn-open-qr');
    const modalQr = document.getElementById('map-qr-modal');
    const closeBtns = document.querySelectorAll('.map-modal-close-btn');

    if (btnQr && modalQr) {
      btnQr.addEventListener('click', (e) => {
        e.preventDefault();
        modalQr.classList.add('active');
      });
    }

    closeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.map-luxury-modal').forEach(m => m.classList.remove('active'));
      });
    });

    document.querySelectorAll('.map-luxury-modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    });
  }

  /**
   * نسخ الإحداثيات إلى الحافظة مع إشعار توست
   */
  function setupCopyCoordsButton() {
    document.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('.map-copy-coords-btn, .map-copy-coords-card');
      if (!targetBtn) return;

      e.preventDefault();
      const coordsText = `${SHOWROOM_LAT}, ${SHOWROOM_LNG}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(coordsText).then(() => {
          showToast('تم نسخ الإحداثيات الجغرافية بنجاح!');
        }).catch(() => fallbackCopy(coordsText));
      } else {
        fallbackCopy(coordsText);
      }
    });
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('تم نسخ الإحداثيات الجغرافية بنجاح!');
    } catch (err) {
      showToast('الإحداثيات: ' + text);
    }
    document.body.removeChild(textArea);
  }

  function showToast(msg) {
    let toast = document.getElementById('map-toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'map-toast-notice';
      toast.className = 'map-toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  function fallbackToIframe() {
    const container = document.getElementById('leaflet-royal-map');
    if (!container) return;
    container.innerHTML = `
      <iframe 
        src="https://maps.google.com/maps?q=${SHOWROOM_LAT},${SHOWROOM_LNG}&z=16&output=embed&hl=ar" 
        width="100%" 
        height="100%" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
        title="موقع معرض آية لتجارة السيارات على الخريطة">
      </iframe>
    `;
  }

})();
