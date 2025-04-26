document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    const transitionDuration =1000;

    function updateMainImage() {
    
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        
        thumbnails[currentIndex].classList.add('active');
        
        
        const newImageUrl = thumbnails[currentIndex].querySelector('img').src;
        mainImage.style.backgroundImage = `url(${newImageUrl})`;
        
        
        currentIndex = (currentIndex + 1) % thumbnails.length;
    }

    
    updateMainImage();

    
    setInterval(updateMainImage, 5000);


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
        
        if (window.scrollY > 50){       
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