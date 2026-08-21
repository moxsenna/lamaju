(() => {
  'use strict';

  const config = window.LAJUPAGE_CONFIG || {};
  const digitsOnly = String(config.whatsappNumber || '').replace(/\D/g, '');
  const hasValidWhatsApp = /^\d{8,15}$/.test(digitsOnly);
  const message = String(config.whatsappMessage || 'Halo, saya tertarik membuat landing page.').trim();
  const whatsappUrl = hasValidWhatsApp
    ? `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`
    : '#';

  const setupDialog = document.querySelector('[data-setup-dialog]');

  function trackWhatsAppClick(location, href) {
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'whatsapp_click', {
          cta_location: location,
          offer_name: 'Landing Page Custom Rp299.000',
          page_slug: 'lajupage-portfolio',
          link_url: href
        });
      }
    } catch (error) {
      console.warn('GA4 tracking gagal:', error);
    }

    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Contact', {
          content_name: 'Landing Page Custom Rp299.000',
          cta_location: location
        });
      }
    } catch (error) {
      console.warn('Meta Pixel tracking gagal:', error);
    }
  }

  document.querySelectorAll('[data-cta="whatsapp"]').forEach((link) => {
    link.setAttribute('href', whatsappUrl);
    if (hasValidWhatsApp) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }

    link.addEventListener('click', (event) => {
      if (!hasValidWhatsApp) {
        event.preventDefault();
        if (setupDialog && typeof setupDialog.showModal === 'function') {
          setupDialog.showModal();
        }
        return;
      }
      trackWhatsAppClick(link.dataset.ctaLocation || 'unknown', whatsappUrl);
    });
  });

  document.querySelectorAll('[data-whatsapp-display]').forEach((element) => {
    element.textContent = config.whatsappDisplay || (hasValidWhatsApp ? `+${digitsOnly}` : 'Atur nomor di config.js');
  });

  document.querySelectorAll('[data-dialog-close]').forEach((button) => {
    button.addEventListener('click', () => setupDialog?.close());
  });

  setupDialog?.addEventListener('click', (event) => {
    const rect = setupDialog.getBoundingClientRect();
    const clickedOutside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (clickedOutside) setupDialog.close();
  });

  const menuButton = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menu?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menu?.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });

  const header = document.querySelector('[data-header]');
  const stickyCta = document.querySelector('[data-sticky-cta]');
  const updateScrollState = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 20);
    stickyCta?.classList.toggle('is-visible', window.scrollY > 620 && window.scrollY < document.documentElement.scrollHeight - window.innerHeight - 550);
  };
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const tiltCard = document.querySelector('[data-tilt-card]');
  if (tiltCard && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tiltCard.addEventListener('pointermove', (event) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      tiltCard.style.transform = `rotateY(${x * 5}deg) rotateX(${y * -5}deg) rotate(1.6deg)`;
    });
    tiltCard.addEventListener('pointerleave', () => {
      tiltCard.style.transform = 'rotateY(0) rotateX(0) rotate(1.6deg)';
    });
  }

  const demoData = {
    beauty: {
      category: 'SKINCARE LOKAL', title: 'Barrier care untuk kulit yang ingin istirahat.',
      desc: 'Editorial, tenang, dan fokus pada tekstur produk untuk membangun rasa aman.',
      angle: 'Simple recovery routine', cta: 'Konsultasi produk', style: 'Soft editorial',
      url: 'nara-skin.lajupage.site', logo: 'NARA.', eyebrow: 'BARRIER RESET SERUM',
      heading: 'Kulit tenang dimulai dari rutinitas yang sederhana.',
      body: 'Formula ringan untuk menemani kulit yang terasa kering, kusam, dan mudah tidak nyaman.',
      button: 'Temukan rutinitasmu', product: 'NARA', productClass: 'product-dropper'
    },
    food: {
      category: 'F&B / MINUMAN', title: 'Rasa khas yang terlihat berani sejak layar pertama.',
      desc: 'Warna segar, tipografi padat, dan visual produk yang terasa dekat dengan keseharian.',
      angle: 'Daily energy, no ceremony', cta: 'Pesan menu favorit', style: 'Bold & playful',
      url: 'tumbuh-coffee.lajupage.site', logo: 'TUMBUH!', eyebrow: 'KOPI SUSU BOTOLAN',
      heading: 'Kopi enak yang tidak minta hari Anda berhenti.',
      body: 'Racikan creamy dengan rasa kopi yang tetap terasa—siap ikut ke meja kerja atau perjalanan.',
      button: 'Lihat varian rasa', product: 'TUMBUH!', productClass: 'product-cup'
    },
    service: {
      category: 'JASA PROFESIONAL', title: 'Kompetensi terasa jelas tanpa harus terlihat kaku.',
      desc: 'Struktur tegas, kontras tinggi, dan hierarchy yang membantu calon klien memahami proses.',
      angle: 'Clarity before commitment', cta: 'Jadwalkan konsultasi', style: 'Confident editorial',
      url: 'ruanglegal.lajupage.site', logo: 'RUANG/LEGAL', eyebrow: 'KONSULTASI LEGAL BISNIS',
      heading: 'Keputusan bisnis lebih tenang ketika risikonya terbaca.',
      body: 'Pendampingan legal praktis untuk pemilik usaha yang membutuhkan jawaban jelas dan langkah terukur.',
      button: 'Ceritakan kebutuhan Anda', product: 'RUANG\nLEGAL', productClass: 'product-card'
    }
  };

  const stage = document.querySelector('[data-demo-stage]');
  const tabs = document.querySelectorAll('[data-demo]');
  const fields = {
    category: '[data-demo-category]', title: '[data-demo-title]', desc: '[data-demo-desc]',
    angle: '[data-demo-angle]', cta: '[data-demo-cta]', style: '[data-demo-style]',
    url: '[data-demo-url]', logo: '[data-demo-logo]', eyebrow: '[data-demo-eyebrow]',
    heading: '[data-demo-heading]', body: '[data-demo-body]', button: '[data-demo-button]', product: '[data-demo-product]'
  };

  function setDemo(key) {
    const data = demoData[key];
    if (!stage || !data) return;
    stage.dataset.theme = key;
    Object.entries(fields).forEach(([name, selector]) => {
      const element = stage.querySelector(selector);
      if (element) element.textContent = data[name];
    });
    const product = stage.querySelector('[data-demo-product]');
    if (product) {
      product.className = `demo-product ${data.productClass}`;
      if (data.productClass === 'product-dropper') {
        const cap = document.createElement('i');
        product.prepend(cap);
      }
    }
    tabs.forEach((tab) => {
      const active = tab.dataset.demo === key;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
  }
  tabs.forEach((tab) => tab.addEventListener('click', () => setDemo(tab.dataset.demo)));

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
