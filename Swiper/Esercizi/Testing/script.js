document.addEventListener("DOMContentLoaded", () => {
    const bg = document.getElementById("background");
    if (!bg) {
      console.error("#background non trovato");
      return;
    }
  
    // Effetto gradiente che si muove col mouse
    document.addEventListener("mousemove", (e) => {
      const x = Math.sin((e.clientX / window.innerWidth) * Math.PI * 2) * 50;
      const y = Math.cos((e.clientY / window.innerHeight) * Math.PI * 2) * 50;
      bg.style.background = `linear-gradient(${x + y}deg, #ff6b6b, #fddb3a)`;
    });
  
    // Immagini del carosello
    const immagini = [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "https://images.unsplash.com/photo-1617143207675-e7e6371f5f5d",
      "https://images.unsplash.com/photo-1739138054456-0aca1b90e4a9"
    ];
  
    const container = document.getElementById("carousel-container");
    if (!container) {
      console.error("carousel-container non trovato");
      return;
    }
  
    immagini.forEach((src) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.style.backgroundImage = `url(${src})`;
      container.appendChild(slide);
    });
  
    new Swiper(".swiper-container", {
      loop: true,
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      effect: "fade",
      fadeEffect: { crossFade: true },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      speed: 1000
    });
  });
  