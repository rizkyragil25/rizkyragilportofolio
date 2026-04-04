const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id]");
const contactForm = document.querySelector(".contact-form");
const hero = document.querySelector(".hero");
const heroCard = document.querySelector(".hero-card");

/* =========================
   MOBILE MENU
========================= */
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    menuToggle.setAttribute(
      "aria-expanded",
      navMenu.classList.contains("show") ? "true" : "false"
    );
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    const isClickInsideMenu = navMenu.contains(e.target);
    const isClickToggle = menuToggle.contains(e.target);

    if (!isClickInsideMenu && !isClickToggle && navMenu.classList.contains("show")) {
      navMenu.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* =========================
   HEADER SCROLL EFFECT
========================= */
function updateHeaderOnScroll() {
  if (!header) return;

  if (window.scrollY > 24) {
    header.style.background = "rgba(5, 12, 24, 0.88)";
    header.style.borderBottom = "1px solid rgba(255,255,255,0.08)";
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.18)";
  } else {
    header.style.background = "rgba(5, 12, 24, 0.65)";
    header.style.borderBottom = "1px solid rgba(255,255,255,0.06)";
    header.style.boxShadow = "none";
  }
}

window.addEventListener("scroll", updateHeaderOnScroll);
updateHeaderOnScroll();

/* =========================
   ACTIVE NAV LINK
========================= */
function updateActiveNav() {
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");

    if (href === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

/* =========================
   SMOOTH REVEAL ANIMATION
========================= */
const revealElements = document.querySelectorAll(
  ".glass-card, .value-card, .project-card, .skill-box, .timeline-card, .contact-card, .contact-form, .profile-card, .section-heading"
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* =========================
   HERO PARALLAX LIGHT EFFECT
========================= */
function handleHeroParallax() {
  if (!hero || !heroCard || window.innerWidth <= 768) return;

  const scrollValue = window.scrollY;
  heroCard.style.transform = `translateY(${scrollValue * 0.08}px)`;
}

window.addEventListener("scroll", handleHeroParallax);

/* =========================
   CONTACT FORM VALIDATION
========================= */
function showFormMessage(message, type = "success") {
  let oldMessage = document.querySelector(".form-message");
  if (oldMessage) oldMessage.remove();

  const msg = document.createElement("div");
  msg.className = `form-message ${type}`;
  msg.textContent = message;

  msg.style.marginTop = "14px";
  msg.style.padding = "12px 14px";
  msg.style.borderRadius = "14px";
  msg.style.fontSize = "0.95rem";
  msg.style.fontWeight = "600";
  msg.style.border = "1px solid rgba(255,255,255,0.08)";

  if (type === "success") {
    msg.style.background = "rgba(40, 167, 69, 0.16)";
    msg.style.color = "#c8ffd7";
  } else {
    msg.style.background = "rgba(255, 77, 77, 0.14)";
    msg.style.color = "#ffd0d0";
  }

  contactForm.appendChild(msg);
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nameValue.length < 2) {
      showFormMessage("Nama minimal 2 karakter.", "error");
      name.focus();
      return;
    }

    if (!emailPattern.test(emailValue)) {
      showFormMessage("Masukkan email yang valid.", "error");
      email.focus();
      return;
    }

    if (messageValue.length < 10) {
      showFormMessage("Pesan minimal 10 karakter.", "error");
      message.focus();
      return;
    }

    showFormMessage(
      "Pesan berhasil ditulis. Nanti bisa dihubungkan ke EmailJS, WhatsApp, atau backend.",
      "success"
    );

    contactForm.reset();
  });
}

/* =========================
   PLACEHOLDER PROJECT LINKS
========================= */
const placeholderLinks = document.querySelectorAll('a[href="#"]');

placeholderLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const oldToast = document.querySelector(".custom-toast");
    if (oldToast) oldToast.remove();

    const toast = document.createElement("div");
    toast.className = "custom-toast";
    toast.textContent = "Link project belum diisi. Nanti bisa diganti ke demo, GitHub, atau file project.";

    toast.style.position = "fixed";
    toast.style.left = "50%";
    toast.style.bottom = "24px";
    toast.style.transform = "translateX(-50%)";
    toast.style.width = "min(92%, 520px)";
    toast.style.padding = "14px 16px";
    toast.style.borderRadius = "18px";
    toast.style.background = "rgba(9, 22, 40, 0.92)";
    toast.style.color = "#f5f9ff";
    toast.style.border = "1px solid rgba(255,255,255,0.08)";
    toast.style.boxShadow = "0 18px 50px rgba(0,0,0,0.28)";
    toast.style.backdropFilter = "blur(12px)";
    toast.style.zIndex = "9999";
    toast.style.fontSize = "0.92rem";
    toast.style.lineHeight = "1.5";
    toast.style.opacity = "0";
    toast.style.transition = "0.3s ease";

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.bottom = "30px";
    });

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.bottom = "20px";
      setTimeout(() => toast.remove(), 300);
    }, 2400);
  });
});

/* =========================
   SMALL TYPING EFFECT HERO
========================= */
const heroTitle = document.querySelector(".hero h2");

if (heroTitle) {
  const originalText = heroTitle.textContent;
  heroTitle.textContent = "";

  let index = 0;

  function typeText() {
    if (index < originalText.length) {
      heroTitle.textContent += originalText.charAt(index);
      index++;
      setTimeout(typeText, 18);
    }
  }

  window.addEventListener("load", () => {
    setTimeout(typeText, 250);
  });
}