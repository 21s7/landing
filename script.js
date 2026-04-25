document.addEventListener("DOMContentLoaded", function () {
  initScrollReveal();
  initParallax();
  initCardShineEffect();
});

/**
 * Анимация появления элементов при скролле
 * Добавляет класс .revealed когда элемент попадает в область видимости
 */
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

  // Проверка при загрузке
  handleScrollReveal();

  // Проверка при скролле
  window.addEventListener("scroll", handleScrollReveal);
}

/**
 * Параллакс-эффект для фонового декоративного элемента
 * Создаёт лёгкое смещение при прокрутке страницы
 */
function initParallax() {
  const ornament = document.querySelector(".bg-ornament");

  if (!ornament) return;

  function handleParallax() {
    const scrolled = window.pageYOffset;
    ornament.style.transform = `translateY(${scrolled * 0.05}px) rotate(${
      scrolled * 0.02
    }deg)`;
  }

  // Проверка при загрузке
  handleParallax();

  // Проверка при скролле
  window.addEventListener("scroll", handleParallax);
}

/**
 * Эффект свечения на карточках при движении курсора
 * Создаёт радиальный градиент, следующий за мышью
 */
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
