/* ============================================
   ENVELOPE ANIMATION JAVASCRIPT
   Add this to your js/main.js file
   Or create a new js/envelope.js file
   ============================================ */

// ===================================
// ENVELOPE ANIMATION
// ===================================
function initEnvelopeAnimation() {
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const envelopeSection = document.getElementById("envelope-section");

  if (!envelopeWrapper) return;

  let isOpened = false;

  // Open envelope on click
  envelopeWrapper.addEventListener("click", () => {
    if (!isOpened) {
      openEnvelope();
      isOpened = true;
    }
  });

  // Function to open envelope
  function openEnvelope() {
    envelopeWrapper.classList.add("opened");
  }

  // IntersectionObserver for auto-open on scroll (Save the Date section)
  const envelopeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isOpened) {
          // Auto-open when section comes into view
          setTimeout(() => {
            openEnvelope();
            isOpened = true;
          }, 300); // Small delay for better UX

          envelopeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of section is visible
      rootMargin: "0px",
    },
  );

  // Observe the envelope section for auto-open on scroll
  if (envelopeSection) {
    envelopeObserver.observe(envelopeSection);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initEnvelopeAnimation();
});

// ===================================
// TIMELINE SCROLL ANIMATION
// ===================================
function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll("[data-timeline]");

  if (timelineItems.length === 0) return;

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    },
  );

  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });
}

// Initialize timeline animation
document.addEventListener("DOMContentLoaded", () => {
  initTimelineAnimation();
});
