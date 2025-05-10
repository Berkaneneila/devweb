// Scroll‑reveal using IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  const opts = { threshold: 0.1 };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal-visible');
        io.unobserve(e.target);
      }
    });
  }, opts);

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
});