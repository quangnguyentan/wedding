/* ============================================
   HORIZONTAL ALBUM CAROUSEL JAVASCRIPT
   Add this to your js/main.js file
   Or create a new js/album.js file
   ============================================ */

// ===================================
// HORIZONTAL ALBUM CAROUSEL
// ===================================
function initAlbumCarousel() {
  const carousel = document.getElementById("albumCarousel");
  const slides = document.querySelectorAll(".album-slide");
  const prevBtn = document.querySelector(".album-prev");
  const nextBtn = document.querySelector(".album-next");

  if (!carousel || slides.length === 0) return;

  let currentIndex = 0;
  let isAnimating = false;
  let autoScrollInterval;
  let isPaused = false;

  // Clone slides for infinite loop
  const clonedSlides = [];
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    const img = clone.querySelector && clone.querySelector("img");
    if (img) {
      try {
        img.loading = "lazy";
        img.decoding = "async";
      } catch (e) {}
    }
    carousel.appendChild(clone);
    clonedSlides.push(clone);
  });

  // Update center slide
  function updateCenterSlide() {
    const allSlides = carousel.querySelectorAll(".album-slide");
    allSlides.forEach((slide, index) => {
      slide.classList.remove("center");
    });

    const centerIndex = Math.floor(currentIndex % allSlides.length);
    if (allSlides[centerIndex]) {
      allSlides[centerIndex].classList.add("center");
    }
  }

  // Move to specific index - iOS FIX
  function moveToIndex(index, force = false) {
    if (isAnimating && !force) return;
    isAnimating = true;

    // compute slide width including the current CSS gap (responsive)
    const computed = window.getComputedStyle(carousel);
    const gap = parseFloat(computed.gap || computed.columnGap) || 20;
    const slideWidth = slides[0].offsetWidth + gap; // width + gap
    const offset = -index * slideWidth + window.innerWidth / 2 - slideWidth / 2;

    // iOS Safari fix: use both webkit and standard transform
    carousel.style.webkitTransform = `translateX(${offset}px)`;
    carousel.style.transform = `translateX(${offset}px)`;
    currentIndex = index;

    updateCenterSlide();

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  // Next slide - iOS FIX
  function nextSlide() {
    if (isAnimating) return;

    currentIndex++;

    // Đến hết ảnh gốc + clone
    if (currentIndex >= slides.length) {
      // move to the clone (animated)
      moveToIndex(currentIndex);

      // After the transform transition finishes, jump to the real first slide
      // without animation. Use transitionend to avoid timer races on iOS.
      const onTransitionEnd = (e) => {
        // ensure we react only to transform transitions on the carousel
        const prop =
          e.propertyName || (e.originalEvent && e.originalEvent.propertyName);
        if (
          e.target !== carousel ||
          (prop !== "transform" && prop !== "-webkit-transform")
        )
          return;

        carousel.removeEventListener("transitionend", onTransitionEnd);
        carousel.removeEventListener("webkitTransitionEnd", onTransitionEnd);

        carousel.style.transition = "none";
        carousel.style.webkitTransition = "none";

        currentIndex = 0;
        // force the instant jump to the real first slide (bypass isAnimating)
        moveToIndex(0, true);

        // Force reflow
        carousel.offsetHeight;

        carousel.style.transition = "transform .5s ease";
        carousel.style.webkitTransition = "-webkit-transform .5s ease";
      };

      carousel.addEventListener("transitionend", onTransitionEnd);
      carousel.addEventListener("webkitTransitionEnd", onTransitionEnd);

      return;
    }

    moveToIndex(currentIndex);
  }

  // Previous slide
  function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = slides.length - 1;
    }
    moveToIndex(currentIndex);
  }

  // Auto scroll
  function startAutoScroll() {
    stopAutoScroll();

    autoScrollInterval = setTimeout(function run() {
      if (!document.hidden && document.hasFocus() && !isDragging && !isPaused) {
        nextSlide();
      }

      autoScrollInterval = setTimeout(run, 3000);
    }, 3000);
  }

  function stopAutoScroll() {
    clearTimeout(autoScrollInterval);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  });

  // Pause on hover
  carousel.addEventListener("mouseenter", () => {
    isPaused = true;
    carousel.classList.add("paused");
  });

  carousel.addEventListener("mouseleave", () => {
    isPaused = false;
    carousel.classList.remove("paused");
  });

  // Button controls
  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();

      nextSlide();
      startAutoScroll();

      return false;
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();

      prevSlide();
      startAutoScroll();

      return false;
    });
  }

  // Touch/Swipe support for mobile - iOS FIX
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let isDragging = false;
  let moved = false;
  carousel.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchEndX = touchStartX;

      moved = false;
      isDragging = true;
      isPaused = true;
      carousel.style.cursor = "grabbing";
    },
    { passive: true },
  );

  carousel.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      touchEndX = e.touches[0].clientX;

      if (Math.abs(touchEndX - touchStartX) > 10) {
        moved = true;
      }

      const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
      const deltaY = Math.abs(e.touches[0].clientY - touchStartY);

      touchEndX = e.touches[0].clientX;

      if (deltaX > deltaY) {
        e.preventDefault();
      }
    },
    { passive: false },
  ); // IMPORTANT: passive: false for iOS

  carousel.addEventListener(
    "touchend",
    () => {
      if (!isDragging) return;
      if (moved) {
        const swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > 50) {
          if (swipeDistance > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      }
      isDragging = false;
      isPaused = false;
      moved = false;
      carousel.style.cursor = "grab";
      startAutoScroll();
    },
    { passive: true },
  );

  // Click to view fullscreen (optional)
  slides.forEach((slide, index) => {
    slide.addEventListener("click", (e) => {
      if (moved) {
        e.preventDefault();
        return;
      }

      openLightbox(index);
    });
  });

  clonedSlides.forEach((slide, index) => {
    slide.addEventListener("click", (e) => {
      if (moved) {
        e.preventDefault();
        return;
      }
      openLightbox(index);
    });
  });

  // Lightbox functionality
  function openLightbox(index) {
    const lightbox = document.createElement("div");
    lightbox.className = "album-lightbox active";

    const img = document.createElement("img");
    img.src = slides[index].querySelector("img").src;

    const closeBtn = document.createElement("div");
    closeBtn.className = "album-lightbox-close";
    closeBtn.innerHTML = "×";
    closeBtn.onclick = () => lightbox.remove();

    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.remove();
      }
    });
  }

  // Initialize after carousel images have loaded to get stable measurements
  const carouselImages = carousel.querySelectorAll("img");
  if (carouselImages.length === 0) {
    moveToIndex(0);
    startAutoScroll();
  } else {
    let loaded = 0;
    const tryInit = () => {
      loaded++;
      if (loaded >= carouselImages.length) {
        moveToIndex(0);
        startAutoScroll();
      }
    };

    carouselImages.forEach((img) => {
      if (img.complete && img.naturalWidth !== 0) {
        // already loaded
        loaded++;
      } else {
        img.addEventListener("load", tryInit, { once: true });
        img.addEventListener("error", tryInit, { once: true });
      }
    });

    // In case all images were already complete
    if (loaded >= carouselImages.length) {
      moveToIndex(0);
      startAutoScroll();
    }
  }

  // Reinitialize on window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      moveToIndex(currentIndex);
    }, 250);
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initAlbumCarousel();
});
