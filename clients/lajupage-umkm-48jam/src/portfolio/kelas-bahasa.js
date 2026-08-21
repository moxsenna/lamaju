(() => {
  "use strict";

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

  const programs = {
    career: {
      label: "Rekomendasi / Career Speak",
      title: "Speak clearly when your work matters.",
      copy: "Latihan untuk rapat, presentasi singkat, menjelaskan progres, dan merespons pertanyaan tanpa kehilangan arah.",
      points: ["Meeting simulation", "Presentation clinic", "Personal feedback"],
    },
    study: {
      label: "Rekomendasi / Study Ready",
      title: "Explain what you know with more confidence.",
      copy: "Latihan untuk diskusi kelas, menjelaskan ide, memahami pertanyaan, dan menyampaikan pendapat secara terstruktur.",
      points: ["Discussion practice", "Academic vocabulary", "Answer structure"],
    },
    daily: {
      label: "Rekomendasi / Daily Flow",
      title: "Keep everyday conversations moving.",
      copy: "Latihan untuk memulai percakapan, bertanya lebih natural, menceritakan pengalaman, dan merespons tanpa terlalu lama menerjemahkan.",
      points: ["Real-life scenarios", "Pronunciation notes", "Conversation repair"],
    },
  };

  document.querySelectorAll("[data-goal]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const data = programs[tab.dataset.goal];
      document.querySelectorAll("[data-goal]").forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      document.querySelector("[data-program-label]").textContent = data.label;
      document.querySelector("[data-program-title]").textContent = data.title;
      document.querySelector("[data-program-copy]").textContent = data.copy;
      data.points.forEach((point, index) => {
        document.querySelector(`[data-point="${index}"]`).textContent = point;
      });
    });
  });

  document.querySelectorAll("[data-wa]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.alert("Ini adalah demo portfolio Lamaju. Nomor dan penawaran bisnis belum dikonfigurasi.");
    });
  });

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const reveals = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((node) => observer.observe(node));
  } else {
    reveals.forEach((node) => node.classList.add("is-visible"));
  }
})();
