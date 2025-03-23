document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    const transitionDuration = 5000; // 5 secondes par image

    function updateMainImage() {
        // Retire la classe active de toutes les miniatures
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        // Ajoute la classe active à la miniature courante
        thumbnails[currentIndex].classList.add('active');
        
        // Met à jour l'image principale
        const newImageUrl = thumbnails[currentIndex].querySelector('img').src;
        mainImage.style.backgroundImage = `url(${newImageUrl})`;
        
        // Passe à l'image suivante
        currentIndex = (currentIndex + 1) % thumbnails.length;
    }

    // Initialise la première image
    updateMainImage();

    // Change d'image toutes les 5 secondes
    setInterval(updateMainImage, 5000);

    // Gestion des flèches
    prevBtn.addEventListener('click', () => {
        if (thumbnails[currentIndex].classList.contains('expanding')) return;
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        updateMainImage();
    });

    nextBtn.addEventListener('click', () => {
        if (thumbnails[currentIndex].classList.contains('expanding')) return;
        currentIndex = (currentIndex + 1) % thumbnails.length;
        updateMainImage();
    });

    // Gestion du sélecteur de langue
    const languageSelector = document.getElementById('language');
    languageSelector.addEventListener('change', function(e) {
        // Ici vous pouvez ajouter la logique pour changer la langue
        console.log('Langue sélectionnée:', e.target.value);
    });

    // Ajout de la gestion du scroll pour la navbar
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        const logo = document.querySelector('.logo h1');
        const links = document.querySelectorAll('.nav-links a');
        
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            logo.style.color = '#333';
            links.forEach(link => link.style.color = '#333');
        } else {
            nav.classList.remove('scrolled');
            logo.style.color = '#fff';
            links.forEach(link => link.style.color = '#fff');
        }
    });
}); 