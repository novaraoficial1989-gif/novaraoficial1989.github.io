// ==================== TRANSICIÓN DE PÁGINA ====================
const overlay = document.getElementById('page-transition-overlay');

// Entrada - revelar la página
window.addEventListener('load', () => {
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 100);
});

// Fix para navegación atrás en móviles (bfcache)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        overlay.classList.remove('active');
        overlay.classList.add('hidden');
    }
});

// Salida - navegar con transición
document.querySelectorAll('a[data-nav-link]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('#')) {
            e.preventDefault();
            overlay.classList.remove('hidden');
            overlay.classList.add('active');
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        }
    });
});

// Efecto de scroll en la barra de navegación
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Botón de menú móvil
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('bx-menu');
    icon.classList.toggle('bx-x');
});

// Cerrar menú móvil al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = navToggle.querySelector('i');
        icon.classList.add('bx-menu');
        icon.classList.remove('bx-x');
    });
});

// Enlace de navegación activo según el scroll
const sections = document.querySelectorAll('section[id], header[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.querySelectorAll('a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current ||
            (current === 'inicio' && a.getAttribute('href') === '#')) {
            a.classList.add('active');
        }
    });
});

// Animación de revelado al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.method-card, .program-card, .about-image, .about-content').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// ==================== TOGGLE DEL SUBMENÚ DE CONTACTO ====================
const contactToggle = document.getElementById('contact-toggle');
const contactSubmenu = document.getElementById('contact-submenu');

if (contactToggle && contactSubmenu) {
    contactToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        contactToggle.classList.toggle('open');
        contactSubmenu.classList.toggle('open');
    });

    // Cerrar submenú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (!contactToggle.contains(e.target) && !contactSubmenu.contains(e.target)) {
            contactToggle.classList.remove('open');
            contactSubmenu.classList.remove('open');
        }
    });
}
