// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll animations
const observerOptions = {
  root: null,
  rootMargin: "0px 0px -100px 0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  }
});

// WhatsApp Form Submission
document
  .getElementById("whatsapp-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const institution = document.getElementById("institution").value.trim();
    const selectedPackage = document.getElementById("package").value; // Renamed 'package' to 'selectedPackage'
    const participants = document.getElementById("participants").value;
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!name || !email || !phone || !institution || !selectedPackage) {
      alert("Mohon lengkapi semua field yang wajib diisi (*)");
      return;
    }

    // Format WhatsApp message
    const whatsappMessage = `🎓 *PENDAFTARAN PELATIHAN ESP32 IoT*

📝 *Data Peserta:*
• Nama: ${name}
• Email: ${email}
• WhatsApp: ${phone}
• Sekolah/Institusi: ${institution}

📦 *Detail Pendaftaran:*
• Paket: ${selectedPackage}
• Jumlah Peserta: ${participants} orang

${message ? `💬 *Pesan Tambahan:*\n${message}\n` : ""}
---
Mohon konfirmasi ketersediaan jadwal dan proses pembayaran untuk pelatihan ESP32 IoT. Terima kasih! 🙏`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // WhatsApp number (replace with actual number)
    const whatsappNumber = "6281560411142";

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Show success message
    alert(
      "Formulir pendaftaran ESP32 akan dikirim melalui WhatsApp. Silakan lanjutkan dengan mengirim pesan tersebut.",
    );

    // Optional: Reset form
    // this.reset();
  });

// Mobile menu toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (mobileMenu) {
  mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    // Animate hamburger menu
    const spans = mobileMenu.querySelectorAll("span");
    if (mobileMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
}

// Add mobile navigation styles
const mobileNavStyles = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: var(--white);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 50px;
            transition: left 0.3s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .nav-links.active {
            left: 0;
        }

        .nav-links li {
            margin: 20px 0;
        }

        .nav-links a {
            font-size: 1.2rem;
            padding: 10px 20px;
        }
    }
`;

// Add mobile styles to head
const styleSheet = document.createElement("style");
styleSheet.textContent = mobileNavStyles;
document.head.appendChild(styleSheet);

// Add loading animation to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (this.type === "submit") {
      return; // Let form submission handle this
    }

    // Add ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Preload animations
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Add scroll progress indicator
const createScrollProgress = () => {
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrolled =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    progressBar.style.width = scrolled + "%";
  });
};

// Initialize scroll progress
createScrollProgress();

// Add typing effect for hero title
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.innerHTML = "";

  const timer = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
};

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-text h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 1000);
  }
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  if (hero && heroContent) {
    const rate = scrolled * -0.5;
    heroContent.style.transform = `translateY(${rate}px)`;
  }
});

// Add counter animation for stats
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent);
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 20);
  });
};

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters();
      heroObserver.unobserve(entry.target);
    }
  });
});

const heroSection = document.querySelector(".hero");
if (heroSection) {
  heroObserver.observe(heroSection);
}

// Add form validation enhancements
const enhanceFormValidation = () => {
  const form = document.getElementById("whatsapp-form");
  const inputs = form.querySelectorAll(".form-control");

  inputs.forEach((input) => {
    // Add real-time validation
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        validateField(this);
      }
    });
  });

  const validateField = (field) => {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = "";

    // Remove existing error styling
    field.classList.remove("error");
    const existingError = field.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Validate based on field type
    if (field.hasAttribute("required") && !value) {
      isValid = false;
      errorMessage = "Field ini wajib diisi";
    } else if (field.type === "email" && value && !isValidEmail(value)) {
      isValid = false;
      errorMessage = "Format email tidak valid";
    } else if (field.type === "tel" && value && !isValidPhone(value)) {
      isValid = false;
      errorMessage = "Format nomor telepon tidak valid";
    }

    if (!isValid) {
      field.classList.add("error");
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.textContent = errorMessage;
      errorDiv.style.cssText =
        "color: var(--danger); font-size: 0.8rem; margin-top: 4px;";
      field.parentNode.appendChild(errorDiv);
    }

    return isValid;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^(\+62|62|0)[0-9]{9,13}$/.test(phone.replace(/\s/g, ""));
  };
};

// Add error styling to CSS
const errorStyles = `
    .form-control.error {
        border-color: var(--danger);
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
`;

const errorStyleSheet = document.createElement("style");
errorStyleSheet.textContent = errorStyles;
document.head.appendChild(errorStyleSheet);

// Initialize form validation
enhanceFormValidation();

// Add smooth reveal animation for project cards
const revealCards = () => {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.6s ease";
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  cards.forEach((card) => {
    cardsObserver.observe(card);
  });
};

// Initialize card reveal animation
revealCards();

console.log("PraktIoT ESP32 Landing Page loaded successfully! 🚀");
