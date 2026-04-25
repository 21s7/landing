/**
 * ============================================
 * SCRIPT.JS — Анимации и интерактивность
 * для лендинга Sarigma
 * ============================================
 */

document.addEventListener("DOMContentLoaded", function () {
  initLoadingScreen();
  initParallax();
  initCardShineEffect();
});

/* ==========================================
     LOADING SCREEN
     ========================================== */
function initLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  const progressBar = document.querySelector(".loading-progress-bar");

  if (!loadingScreen) {
    // Если экрана загрузки нет — сразу запускаем анимации
    initHeroAnimations();
    return;
  }

  // Запрещаем скролл пока идёт загрузка
  document.body.style.overflow = "hidden";

  // Длительность загрузки: 1000 мс
  const totalDuration = 1000;
  const intervalTime = 50;
  const steps = totalDuration / intervalTime;
  const increment = 100 / steps;

  let progress = 0;

  const progressInterval = setInterval(() => {
    progress += increment;

    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      if (progressBar) {
        progressBar.style.width = "100%";
      }
      hideLoadingScreen(loadingScreen);
    }

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }, intervalTime);
}

function hideLoadingScreen(loadingScreen) {
  loadingScreen.classList.add("fade-out");

  // Запускаем анимации героя сразу после начала скрытия
  initHeroAnimations();

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
     HERO ANIMATIONS — запускаются после загрузки
     ========================================== */
function initHeroAnimations() {
  // Находим все элементы с анимациями
  const animatedElements = document.querySelectorAll(
    ".animate-fade-in, .animate-slide-up, .animate-scale-in"
  );

  // Сбрасываем анимацию (на случай если уже применилась)
  animatedElements.forEach((el) => {
    el.style.animation = "none";
    el.offsetHeight; // форсируем reflow
    el.style.animation = "";
  });
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
