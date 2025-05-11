// Function to load the navbar
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(html => {
            const navContent = document.getElementById('nav-content');
            if (!navContent) {
                console.error('Navbar container not found');
                return;
            }
            
            navContent.innerHTML = html;
            
            // Load required styles
            const styles = [
                { href: 'css/navbar.css', rel: 'stylesheet' },
                { href: 'css/auth.css', rel: 'stylesheet' },
                { href: 'css/user-style.css', rel: 'stylesheet' }
            ];
            
            styles.forEach(style => {
                if (!document.querySelector(`link[href="${style.href}"]`)) {
                    const link = document.createElement('link');
                    link.rel = style.rel;
                    link.href = style.href;
                    document.head.appendChild(link);
                }
            });
            
            // Load scripts in correct order
            const scripts = [
                { src: 'js/navbar.js' },
                { src: 'js/auth.js' }
            ];
            
            // Function to load scripts sequentially
            const loadScript = (index) => {
                if (index >= scripts.length) return;
                
                const script = document.createElement('script');
                script.src = scripts[index].src;
                script.onload = () => loadScript(index + 1);
                document.body.appendChild(script);
            };
            
            // Start loading scripts
            loadScript(0);
        })
        .catch(error => console.error('Error loading navbar:', error));
}

// Load navbar when DOM is ready
document.addEventListener('DOMContentLoaded', loadNavbar); 