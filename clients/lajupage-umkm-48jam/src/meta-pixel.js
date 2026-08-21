(() => {
  "use strict";

  if (window.__lamajuMetaPixelInitialized) return;
  window.__lamajuMetaPixelInitialized = true;

  const pixelId = "3208899346164826";

  if (typeof window.fbq !== "function") {
    const fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  }

  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
})();
