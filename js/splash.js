/* ============================================
   SPLASH SCREEN & ENVELOPE ANIMATIONS
   ============================================ */

function initSplashScreen() {
  const splashScreen = document.getElementById("splashScreen");
  const splashEnvelope = document.getElementById("splashEnvelope");

  if (!splashScreen || !splashEnvelope) return;

  document.body.style.overflow = "hidden";

  splashEnvelope.addEventListener("click", () => {
    splashEnvelope.classList.add("opening");

    setTimeout(() => {
      splashScreen.classList.add("hidden");
      document.body.style.overflow = "auto";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1100);
  });
}

function initSaveTheDateEnvelope() {
  const stdEnvelopeWrapper = document.getElementById("stdEnvelopeWrapper");
  const stdSection = document.getElementById("save-the-date-section");

  if (!stdEnvelopeWrapper || !stdSection) return;

  stdEnvelopeWrapper.classList.remove("opened");

  let isOpened = false;

  const stdObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isOpened) {
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

  stdObserver.observe(stdSection);
}

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

document.addEventListener("DOMContentLoaded", () => {
  initSplashScreen();
  initSaveTheDateEnvelope();
  initTimelineAnimation();
});
