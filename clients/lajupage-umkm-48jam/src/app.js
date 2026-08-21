(() => {
  "use strict";

  const config = window.LP_RUNTIME_CONFIG || {};
  const digitsOnly = String(config.whatsappNumber || "").replace(/\D/g, "");
  const hasValidWhatsApp = /^[1-9][0-9]{7,14}$/.test(digitsOnly);
  const defaultMessage = String(config.whatsappMessage || "Halo Lamaju, saya tertarik membuat landing page.").trim();
  const locationMessages = {
    header: "Halo Lamaju, saya ingin konsultasi gratis pembuatan landing page UMKM 48 Jam.",
    hero: "Halo Lamaju, saya ingin membuat landing page kilat 48 jam untuk usaha saya.",
    outcome: "Halo Lamaju, saya mau cek apakah produk/usaha saya cocok untuk paket landing page 48 jam.",
    pricing: "Halo Lamaju, saya ingin amankan slot Paket Landing Page UMKM Rp299.000 hari ini.",
    final: "Halo Lamaju, saya sudah punya foto produk dan harga. Mau konsultasi pembuatan landing page 48 jam.",
    sticky: "Halo Lamaju, saya tertarik dengan Paket UMKM 48 Jam Rp299.000.",
    footer: "Halo Lamaju, saya ingin tanya informasi seputar landing page UMKM 48 Jam.",
    "portfolio-final": "Halo Lamaju, saya sudah melihat galeri demo dan ingin diskusi landing page untuk usaha saya.",
  };

  function getWhatsAppUrl(location) {
    if (!hasValidWhatsApp) return "#";
    const text = locationMessages[location] || defaultMessage;
    return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(text)}`;
  }

  const setupDialog = document.querySelector("[data-setup-dialog]");

  function trackWhatsAppClick(location) {
    const payload = {
      cta_location: location,
      offer_name: config.offerName || "Paket Landing Page UMKM 48 Jam",
      page_slug: config.pageSlug || "lajupage-umkm-48jam",
      link_url: getWhatsAppUrl(location),
    };

    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", "whatsapp_click", payload);
      }
    } catch (error) {
      console.warn("GA4 tracking gagal; navigasi WhatsApp tetap dilanjutkan.", error);
    }

    try {
      if (typeof window.fbq === "function") {
        window.fbq("track", "Contact", {
          content_name: payload.offer_name,
          cta_location: location,
        });
      }
    } catch (error) {
      console.warn("Meta tracking gagal; navigasi WhatsApp tetap dilanjutkan.", error);
    }
  }

  document.querySelectorAll('[data-cta="whatsapp"]').forEach((link) => {
    const loc = link.dataset.ctaLocation || "unknown";
    link.setAttribute("href", getWhatsAppUrl(loc));
    if (hasValidWhatsApp) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }

    link.addEventListener("click", (event) => {
      if (!hasValidWhatsApp) {
        event.preventDefault();
        if (setupDialog && typeof setupDialog.showModal === "function") setupDialog.showModal();
        return;
      }
      trackWhatsAppClick(loc);
    });
  });

  document.querySelectorAll("[data-whatsapp-display]").forEach((element) => {
    element.textContent = config.whatsappNumber ? `+${digitsOnly}` : "WhatsApp CS";
  });

  let selectedCategory = "Kuliner";
  let brandName = "";

  const briefChips = document.querySelectorAll("[data-brief-cat]");
  const brandInput = document.querySelector("[data-brief-brand]");
  const finalCta = document.querySelector('[data-cta-location="final"]');

  function updateFinalCta() {
    if (!finalCta) return;
    const cleanBrand = (brandName || "").trim();
    const brandPhrase = cleanBrand ? ` bernama "${cleanBrand}"` : "";
    locationMessages.final = `Halo Lamaju, saya punya usaha ${selectedCategory}${brandPhrase}. Saya ingin konsultasi pembuatan landing page 48 jam.`;
    finalCta.setAttribute("href", getWhatsAppUrl("final"));
  }

  briefChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      briefChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      selectedCategory = chip.dataset.briefCat || "Usaha";
      updateFinalCta();
    });
  });

  brandInput?.addEventListener("input", (e) => {
    brandName = e.target.value;
    updateFinalCta();
  });

  document.querySelectorAll("[data-dialog-close]").forEach((button) => {
    button.addEventListener("click", () => setupDialog?.close());
  });

  setupDialog?.addEventListener("click", (event) => {
    const rect = setupDialog.getBoundingClientRect();
    const clickedOutside = event.clientX < rect.left || event.clientX > rect.right
      || event.clientY < rect.top || event.clientY > rect.bottom;
    if (clickedOutside) setupDialog.close();
  });

  const menuButton = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  const closeMenu = () => {
    menuButton?.setAttribute("aria-expanded", "false");
    menu?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menu?.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });
  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });

  const header = document.querySelector("[data-header]");
  const stickyCta = document.querySelector("[data-sticky-cta]");
  const updateScrollState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 20);
    const documentEnd = document.documentElement.scrollHeight - window.innerHeight - 550;
    stickyCta?.classList.toggle("is-visible", window.scrollY > 620 && window.scrollY < documentEnd);
  };
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  const tiltCard = document.querySelector("[data-tilt-card]");
  if (tiltCard && window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
    tiltCard.addEventListener("pointermove", (event) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      tiltCard.style.transform = `rotateY(${x * 5}deg) rotateX(${y * -5}deg) rotate(1.6deg)`;
    });
    tiltCard.addEventListener("pointerleave", () => {
      tiltCard.style.transform = "rotateY(0) rotateX(0) rotate(1.6deg)";
    });
  }

  const demoData = {
    food: {
      category: "KULINER RUMAHAN", title: "Sambal rumahan yang membuat nasi hangat sulit ditinggalkan.",
      desc: "Visual berani, produk terlihat nyata, harga jelas, dan jalur pemesanan singkat.",
      angle: "Pedas rumahan, siap kirim", cta: "Pesan lewat WhatsApp", style: "Bold & menggugah selera",
      url: "sambal-bu-rara.lamaju.site", logo: "BU RARA", eyebrow: "SAMBAL TERI RUMAHAN",
      heading: "Pedas gurih yang bikin lauk sederhana terasa istimewa.",
      body: "Dimasak harian dari cabai pilihan, teri renyah, dan bumbu rumahan tanpa rasa yang tanggung.",
      button: "Lihat paket sambal", product: "BU RARA", productClass: "product-cup",
    },
    beauty: {
      category: "BEAUTY UMKM", title: "Skincare lokal yang terasa terpercaya sejak layar pertama.",
      desc: "Tampilan bersih, manfaat mudah dipindai, dan konsultasi produk langsung ke WhatsApp.",
      angle: "Rutinitas sederhana untuk kulit nyaman", cta: "Konsultasi produk", style: "Soft editorial",
      url: "nara-skin.lamaju.site", logo: "NARA.", eyebrow: "BARRIER RESET SERUM",
      heading: "Kulit nyaman dimulai dari rutinitas yang tidak berlebihan.",
      body: "Formula ringan untuk menemani kulit yang terasa kering, kusam, dan mudah tidak nyaman.",
      button: "Tanya produk yang cocok", product: "NARA", productClass: "product-dropper",
    },
    service: {
      category: "JASA LOKAL", title: "Jasa profesional yang terlihat jelas, dekat, dan mudah dihubungi.",
      desc: "Informasi layanan, area kerja, keunggulan, dan estimasi proses disusun agar calon pelanggan cepat yakin.",
      angle: "Jelas sebelum pesan", cta: "Cek jadwal layanan", style: "Confident editorial",
      url: "bersihin-sepatu.lamaju.site", logo: "BERSIH.IN", eyebrow: "LAUNDRY SEPATU ANTAR-JEMPUT",
      heading: "Sepatu bersih tanpa harus keluar rumah.",
      body: "Cukup kirim lokasi dan foto sepatu. Tim kami jemput, rawat, lalu antar kembali sesuai jadwal.",
      button: "Cek area penjemputan", product: "BERSIH\nIN", productClass: "product-card",
    },
  };
  const stage = document.querySelector("[data-demo-stage]");
  const tabs = document.querySelectorAll("[data-demo]");
  const fields = {
    category: "[data-demo-category]", title: "[data-demo-title]", desc: "[data-demo-desc]",
    angle: "[data-demo-angle]", cta: "[data-demo-cta]", style: "[data-demo-style]",
    url: "[data-demo-url]", logo: "[data-demo-logo]", eyebrow: "[data-demo-eyebrow]",
    heading: "[data-demo-heading]", body: "[data-demo-body]", button: "[data-demo-button]", product: "[data-demo-product]",
  };

  function setDemo(key) {
    const data = demoData[key];
    if (!stage || !data) return;
    stage.dataset.theme = key;
    Object.entries(fields).forEach(([name, selector]) => {
      const element = stage.querySelector(selector);
      if (element) element.textContent = data[name];
    });
    const product = stage.querySelector("[data-demo-product]");
    if (product) {
      product.className = `demo-product ${data.productClass}`;
      if (data.productClass === "product-dropper") product.prepend(document.createElement("i"));
    }
    tabs.forEach((tab) => {
      const active = tab.dataset.demo === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
  }
  tabs.forEach((tab) => tab.addEventListener("click", () => setDemo(tab.dataset.demo)));

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
