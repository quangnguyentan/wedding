// Swiper-based album carousel initializer
document.addEventListener("DOMContentLoaded", () => {
  if (typeof Swiper === "undefined") return;

  const album = new Swiper(".albumSwiper", {
    loop: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 600,
    lazy: {
      loadPrevNext: true,
      loadOnTransitionStart: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // accessibility: true,
  });

  // Lightbox: reuse existing openLightboxSingle if present
  document.querySelectorAll(".albumSwiper .swiper-slide img").forEach((img) => {
    img.addEventListener("click", (e) => {
      const src = e.currentTarget.src;
      if (typeof openLightboxSingle === "function") {
        openLightboxSingle(src);
      } else {
        // fallback simple lightbox
        const lightbox = document.createElement("div");
        lightbox.className = "album-lightbox active";
        const im = document.createElement("img");
        im.src = src;
        lightbox.appendChild(im);
        const close = document.createElement("div");
        close.className = "album-lightbox-close";
        close.innerHTML = "×";
        close.onclick = () => lightbox.remove();
        lightbox.appendChild(close);
        document.body.appendChild(lightbox);
        lightbox.addEventListener("click", (ev) => {
          if (ev.target === lightbox) lightbox.remove();
        });
      }
    });
  });
});
