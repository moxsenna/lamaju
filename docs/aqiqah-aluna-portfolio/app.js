(() => {
  'use strict';

  const config = window.AQIQAH_CONFIG || {};
  const digitsOnly = String(config.whatsappNumber || '').replace(/\D/g, '');
  const hasValidWhatsApp = /^\d{8,15}$/.test(digitsOnly);
  const baseMessage = String(config.whatsappMessage || 'Halo, saya ingin konsultasi paket aqiqah.').trim();
  const setupDialog = document.querySelector('[data-setup-dialog]');

  function getWhatsAppUrl(customMessage = baseMessage) {
    if (!hasValidWhatsApp) return '#';
    return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(customMessage)}`;
  }

  function trackWhatsAppClick(location, href, packageName = '') {
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'whatsapp_click', {
          cta_location: location,
          offer_name: packageName || 'Konsultasi Aqiqah',
          page_slug: 'aqiqah-aluna-portfolio',
          link_url: href
        });
      }
    } catch (error) {
      console.warn('GA4 tracking gagal:', error);
    }

    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Contact', {
          content_name: packageName || 'Konsultasi Aqiqah',
          cta_location: location
        });
      }
    } catch (error) {
      console.warn('Meta Pixel tracking gagal:', error);
    }
  }

  function bindWhatsAppLinks() {
    document.querySelectorAll('[data-cta="whatsapp"]').forEach((link) => {
      const packageName = link.dataset.packageCta || '';
      const message = packageName
        ? `Halo Aqiqah Aluna, saya tertarik dengan Paket ${packageName}. Bisa dibantu jelaskan detail dan cek jadwalnya?`
        : baseMessage;
      const href = getWhatsAppUrl(message);

      link.setAttribute('href', href);
      if (hasValidWhatsApp) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }

      link.addEventListener('click', (event) => {
        if (!hasValidWhatsApp) {
          event.preventDefault();
          if (setupDialog && typeof setupDialog.showModal === 'function') setupDialog.showModal();
          return;
        }
        trackWhatsAppClick(link.dataset.ctaLocation || 'unknown', href, packageName);
      });
    });
  }

  bindWhatsAppLinks();

  document.querySelectorAll('[data-whatsapp-display]').forEach((element) => {
    element.textContent = config.whatsappDisplay || (hasValidWhatsApp ? `+${digitsOnly}` : 'Atur nomor di config.js');
  });

  document.querySelectorAll('[data-dialog-close]').forEach((button) => {
    button.addEventListener('click', () => setupDialog?.close());
  });

  setupDialog?.addEventListener('click', (event) => {
    const rect = setupDialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) setupDialog.close();
  });

  const menuButton = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  function closeMenu() {
    menuButton?.setAttribute('aria-expanded', 'false');
    menu?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menu?.classList.toggle('is-open', !open);
    document.body.classList.toggle('menu-open', !open);
  });
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 860) closeMenu(); });

  const header = document.querySelector('[data-header]');
  const mobileCta = document.querySelector('[data-mobile-cta]');
  function updateScrollState() {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 18);
    const nearBottom = y > document.documentElement.scrollHeight - window.innerHeight - 650;
    mobileCta?.classList.toggle('is-visible', y > 650 && !nearBottom);
  }
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -35px' });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('is-visible'));
  }

  const packageData = {
    putri: {
      hangat: { price: 'Rp2.490.000', animal: '1 ekor kambing betina', box: '50 nasi box' },
      berkah: { price: 'Rp3.190.000', animal: '1 ekor kambing jantan', box: '70 nasi box' },
      bahagia: { price: 'Rp4.150.000', animal: '1 ekor kambing premium', box: '100 nasi box' }
    },
    putra: {
      hangat: { price: 'Rp4.690.000', animal: '2 ekor kambing betina', box: '100 nasi box' },
      berkah: { price: 'Rp5.890.000', animal: '2 ekor kambing jantan', box: '140 nasi box' },
      bahagia: { price: 'Rp7.750.000', animal: '2 ekor kambing premium', box: '200 nasi box' }
    }
  };

  const genderButtons = document.querySelectorAll('[data-gender]');
  function setGender(gender) {
    const data = packageData[gender];
    if (!data) return;

    genderButtons.forEach((button) => {
      const active = button.dataset.gender === gender;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    document.querySelectorAll('[data-package]').forEach((card) => {
      const item = data[card.dataset.package];
      if (!item) return;
      const price = card.querySelector('[data-price]');
      const animal = card.querySelector('[data-animal]');
      const box = card.querySelector('[data-box]');
      if (price) price.textContent = item.price;
      if (animal) animal.textContent = item.animal;
      if (box) box.textContent = item.box;
      card.animate([
        { opacity: .55, transform: 'translateY(5px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 260, easing: 'ease-out' });
    });
  }
  genderButtons.forEach((button) => button.addEventListener('click', () => setGender(button.dataset.gender)));

  document.querySelectorAll('.accordion-item button').forEach((button) => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const panel = button.closest('.accordion-item')?.querySelector('.accordion-panel');
      button.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
