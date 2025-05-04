document.addEventListener('DOMContentLoaded', function() {
    const leftBtn = document.querySelector('.slider-btn.left');
    const rightBtn = document.querySelector('.slider-btn.right');
    const container = document.querySelector('.testimonials-container');
    const card = document.querySelector('.testimonial-card');

    if (!container || !card) return;

    const scrollAmount = card.offsetWidth + 24; // card width + gap

    leftBtn.addEventListener('click', function() {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', function() {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}); 