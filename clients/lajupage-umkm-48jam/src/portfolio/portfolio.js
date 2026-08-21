(() => {
  "use strict";

  const filters = document.querySelectorAll("[data-filter]");
  const projects = document.querySelectorAll("[data-category]");

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      projects.forEach((project) => {
        const categories = project.dataset.category.split(/\s+/);
        project.hidden = filter !== "all" && !categories.includes(filter);
      });
    });
  });

  const config = window.LP_RUNTIME_CONFIG || {};
  const digitsOnly = String(config.whatsappNumber || "").replace(/\D/g, "");
  const message = "Halo Lamaju, saya sudah melihat portfolio dan ingin mendiskusikan landing page untuk usaha saya.";
  const whatsappUrl = /^[1-9][0-9]{7,14}$/.test(digitsOnly)
    ? `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`
    : "../#kontak";

  document.querySelectorAll('[data-cta="whatsapp"]').forEach((link) => {
    link.href = whatsappUrl;
    if (whatsappUrl.startsWith("https://")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    link.addEventListener("click", () => {
      const location = link.dataset.ctaLocation || "portfolio";
      try {
        if (typeof window.gtag === "function") {
          window.gtag("event", "whatsapp_click", {
            cta_location: location,
            offer_name: config.offerName || "Paket Landing Page UMKM 48 Jam",
            page_slug: config.pageSlug || "lajupage-umkm-48jam",
            link_url: whatsappUrl,
          });
        }
      } catch (error) {
        console.warn("GA4 tracking gagal; navigasi tetap dilanjutkan.", error);
      }
      try {
        if (typeof window.fbq === "function") {
          window.fbq("track", "Lead", {
            content_name: config.offerName || "Paket Landing Page UMKM 48 Jam",
            cta_location: location,
          });
        }
      } catch (error) {
        console.warn("Meta tracking gagal; navigasi tetap dilanjutkan.", error);
      }
    });
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
