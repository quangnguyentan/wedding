/* ============================================
   SPLASH SCREEN & ENVELOPE ANIMATIONS
   ============================================ */

// ===================================
// SPLASH SCREEN ANIMATION
// ===================================
function initSplashScreen() {
  const splashScreen = document.getElementById("splashScreen");
  const splashEnvelope = document.getElementById("splashEnvelope");

  if (!splashScreen || !splashEnvelope) return;

  // Prevent scrolling when splash is visible
  document.body.style.overflow = "hidden";

  // Click on envelope to enter site
  splashEnvelope.addEventListener("click", () => {
    // Add opening animation class
    splashEnvelope.classList.add("opening");

    // Wait for envelope opening animation to complete
    setTimeout(() => {
      // Then fade out splash screen
      splashScreen.classList.add("hidden");
      document.body.style.overflow = "auto";

      // Scroll to top of page
      window.scrollTo({top: 0, behavior: "smooth"});
    }, 2500); // Give time for full envelope animation (1.8s) + buffer
  });
}

// ===================================
// SAVE THE DATE ENVELOPE ANIMATION
// ===================================
function initSaveTheDateEnvelope() {
  const stdEnvelopeWrapper = document.getElementById("stdEnvelopeWrapper");
  const stdSection = document.getElementById("save-the-date-section");

  if (!stdEnvelopeWrapper || !stdSection) return;

  // Reset animation state khi reload page
  stdEnvelopeWrapper.classList.remove("opened");
  
  let isOpened = false;

  // IntersectionObserver for auto-open on scroll
  const stdObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isOpened) {
          // Auto-open when section comes into view
          setTimeout(() => {
            stdEnvelopeWrapper.classList.add("opened");
            isOpened = true;
          }, 500);

          stdObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "0px",
    },
  );

  // Observe the save-the-date section
  stdObserver.observe(stdSection);
}

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

// Initialize all animations
document.addEventListener("DOMContentLoaded", () => {
  initSplashScreen();
  initSaveTheDateEnvelope();
  initTimelineAnimation();
});

// Add envelope opening animation
const envelopeStyle = document.createElement("style");
envelopeStyle.textContent = `
    @keyframes envelopeOpen {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(envelopeStyle);
