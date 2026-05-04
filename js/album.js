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
  function moveToIndex(index) {
    if (isAnimating) return;
    isAnimating = true;

    const slideWidth = slides[0].offsetWidth + 20; // width + gap
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
    currentIndex++;
    if (currentIndex >= slides.length * 2) {
      currentIndex = 0;
      carousel.style.transition = "none";
      carousel.style.webkitTransition = "none";
      moveToIndex(0);
      setTimeout(() => {
        carousel.style.transition = "transform 0.5s ease";
        carousel.style.webkitTransition = "-webkit-transform 0.5s ease";
      }, 50);
    } else {
      moveToIndex(currentIndex);
    }
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
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 3000);
  }

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
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoScroll(); // Reset interval
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoScroll(); // Reset interval
    });
  }

  // Touch/Swipe support for mobile - iOS FIX
  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;

  carousel.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      isDragging = true;
      isPaused = true;
      carousel.style.cursor = "grabbing";
    },
    {passive: true},
  );

  carousel.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      touchEndX = e.touches[0].clientX;

      // Prevent vertical scroll on horizontal swipe
      const deltaX = Math.abs(touchEndX - touchStartX);
      const deltaY = Math.abs(
        e.touches[0].clientY - (e.touches[0].clientY || 0),
      );

      if (deltaX > deltaY) {
        e.preventDefault();
      }
    },
    {passive: false},
  ); // IMPORTANT: passive: false for iOS

  carousel.addEventListener(
    "touchend",
    () => {
      if (!isDragging) return;

      const swipeDistance = touchStartX - touchEndX;

      if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      isDragging = false;
      isPaused = false;
      carousel.style.cursor = "grab";
      startAutoScroll();
    },
    {passive: true},
  );

  // Click to view fullscreen (optional)
  slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  clonedSlides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
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

  // Initialize
  moveToIndex(0);
  startAutoScroll();

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
