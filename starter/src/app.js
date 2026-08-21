(() => {
  "use strict";

  const config = window.LP_RUNTIME_CONFIG;
  if (!config) {
    console.error("LP runtime config tidak ditemukan.");
    return;
  }

  const digitsOnly = String(config.whatsappNumber || "").replace(/\D/g, "");
  const message = String(config.whatsappMessage || "");
  const whatsappUrl = digitsOnly
    ? `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`
    : "#";

  const ctas = document.querySelectorAll('[data-cta="whatsapp"]');

  for (const cta of ctas) {
    cta.setAttribute("href", whatsappUrl);
    if (cta.getAttribute("target") === "_blank") {
      cta.setAttribute("rel", "noopener noreferrer");
    }

    cta.addEventListener("click", () => {
      const location = cta.dataset.ctaLocation || "unknown";
      const payload = {
        cta_location: location,
        offer_name: config.offerName,
        page_slug: config.pageSlug,
        link_url: whatsappUrl,
      };

      try {
        if (typeof window.gtag === "function") {
          window.gtag("event", "whatsapp_click", payload);
        }
      } catch (error) {
        console.warn("GA4 event gagal, navigasi tetap dilanjutkan.", error);
      }

      try {
        if (typeof window.fbq === "function") {
          window.fbq("track", "Contact", {
            content_name: config.offerName,
            cta_location: location,
          });
        }
      } catch (error) {
        console.warn("Meta event gagal, navigasi tetap dilanjutkan.", error);
      }
    });
  }
})();
