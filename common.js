document.getElementById('footer-placeholder').innerHTML = `
    <footer class="footer">
    <div class="footer-container">
        <!-- Logo and Description -->
        <div class="footer-section about">
            <h3 class="footer-logo">World Tours</h3>
            <p>Discover the beauty of Algeria with our expertly curated tours and travel experiences. Let us guide you through breathtaking landscapes and rich culture.</p>
            <div class="social-icons">
                <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
            </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-section links">
            <h4>Quick Links</h4>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="destinations.html">Destinations</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer-section contact">
            <h4>Contact Info</h4>
            <p><i class="fas fa-map-marker-alt"></i> 123 Street, Algiers, Algeria</p>
            <p><i class="fas fa-phone-alt"></i> +213 123 456 789</p>
            <p><i class="fas fa-envelope"></i> info@worldtours.com</p>
        </div>

        <!-- Newsletter -->
        <div class="footer-section newsletter">
            <h4>Newsletter</h4>
            <p>Subscribe to our newsletter for the latest updates and offers.</p>
            <form class="newsletter-form">
                <input type="email" placeholder="Your Email" required>
                <button type="submit"><i class="fas fa-paper-plane"></i></button>
            </form>
        </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
        <p>&copy; 2023 World Tours. All Rights Reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
    </div>
</footer>
`;