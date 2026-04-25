/**
 * ============================================
 * SCRIPT.JS — Анимации и интерактивность
 * для лендинга Sarigma
 * ============================================
 */

document.addEventListener("DOMContentLoaded", function () {
  initLoadingScreen();
  initScrollReveal();
  initParallax();
  initCardShineEffect();
});

/* ==========================================
     LOADING SCREEN
     ========================================== */
function initLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  const progressBar = document.querySelector(".loading-progress-bar");

  if (!loadingScreen) return;

  // Запрещаем скролл пока идёт загрузка
  document.body.style.overflow = "hidden";

  // Длительность загрузки: 1000 мс
  const totalDuration = 1000;
  // Частота обновления прогресс-бара: каждые 50 мс
  const intervalTime = 50;
  const steps = totalDuration / intervalTime; // 20 шагов
  const increment = 100 / steps; // по 5% за шаг

  let progress = 0;

  const progressInterval = setInterval(() => {
    progress += increment;

    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      if (progressBar) {
        progressBar.style.width = "100%";
      }
      // Плавно скрываем
      hideLoadingScreen(loadingScreen);
    }

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }, intervalTime);
}
function hideLoadingScreen(loadingScreen) {
  loadingScreen.classList.add("fade-out");

  // Разрешаем скролл после анимации
  setTimeout(() => {
    document.body.style.overflow = "";
  }, 500);

  // Удаляем элемент из DOM после завершения анимации
  setTimeout(() => {
    if (loadingScreen && loadingScreen.parentNode) {
      loadingScreen.parentNode.removeChild(loadingScreen);
    }
  }, 800);
}

/* ==========================================
     SCROLL REVEAL
     ========================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal-on-scroll");

  function handleScrollReveal() {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("revealed");
      }
    });
  }

  handleScrollReveal();
  window.addEventListener("scroll", handleScrollReveal);
}

/* ==========================================
     PARALLAX
     ========================================== */
function initParallax() {
  const ornament = document.querySelector(".bg-ornament");

  if (!ornament) return;

  function handleParallax() {
    const scrolled = window.pageYOffset;
    ornament.style.transform = `translateY(${scrolled * 0.05}px) rotate(${
      scrolled * 0.02
    }deg)`;
  }

  handleParallax();
  window.addEventListener("scroll", handleParallax);
}

/* ==========================================
     CARD SHINE EFFECT
     ========================================== */
function initCardShineEffect() {
  const cards = document.querySelectorAll(".product-card, .media-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}
