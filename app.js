// WhatsApp Form Submission
document
  .getElementById("whatsapp-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const institution = document.getElementById("institution").value;
    const package = document.getElementById("package").value;
    const participants = document.getElementById("participants").value;
    const message = document.getElementById("message").value;

    // Format WhatsApp message
    const whatsappMessage = `Halo, saya ingin mendaftar pelatihan IoT. Berikut data saya:

*Nama:* ${name}
*Email:* ${email}
*No. WhatsApp:* ${phone}
*Sekolah/Institusi:* ${institution}
*Paket:* ${package}
*Jumlah Peserta:* ${participants}
*Pesan Tambahan:* ${message || "-"}

Mohon info langkah selanjutnya untuk pendaftaran. Terima kasih.`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Replace with your WhatsApp number
    const whatsappNumber = "628156041142";

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Optional: Show confirmation message
    alert(
      "Formulir pendaftaran Anda akan dikirim melalui WhatsApp. Mohon selesaikan pendaftaran dengan mengirim pesan tersebut.",
    );
  });

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Animation on scroll
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

document
  .querySelectorAll(".feature-card, .project-card, .pricing-card")
  .forEach((card) => {
    observer.observe(card);
  });
