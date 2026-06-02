// 1. Init AOS Animation
AOS.init({
    duration: 800,
    once: true,
    offset: 50
});

// 2. Theme Toggle Logic
const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

if (toggleBtn) {
    const icon = toggleBtn.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    toggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if(theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

// 3. Custom Cursor Logic (FIXED IMPLEMENTATION)
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        // Tampilkan kursor setelah user mulai menggerakkan mouse (mencegah bug di pojok kiri atas)
        cursorDot.style.opacity = "1";
        cursorOutline.style.opacity = "1";

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 250, fill: "forwards" });
    });

    // Hover Effects berbasis class (Aman dari Bug Hex/RGBA)
    const hoverTargets = 'a, button, .bento-item, .code-card, .bio-item, .social-mini-btn';
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });
}

// 4. Update Local Time
const timeDisplay = document.getElementById('local-time');
if (timeDisplay) {
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        timeDisplay.textContent = timeString + " WIB";
    }
    setInterval(updateTime, 1000);
    updateTime();
}

// 5. Navbar Scroll Effect (FIXED via CSS Variables)
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.boxShadow = "var(--shadow-sm)";
            nav.style.background = "var(--nav-bg-scroll)";
        } else {
            nav.style.boxShadow = "none";
            nav.style.background = "var(--nav-bg-top)";
        }
    }
});

// 6. Mobile Navbar Logic (Hamburger)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }));

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// 7. Tech Stack Card Theme Toggle Feature
const techThemeToggle = document.getElementById('tech-theme-toggle');
if (techThemeToggle) {
    const techIcon = techThemeToggle.querySelector('i');
    const techText = techThemeToggle.querySelector('span');

    function syncTechToggleIcon(theme) {
        if (theme === 'light') {
            techIcon.className = 'fas fa-moon';
            techText.textContent = 'Dark';
        } else if (theme === 'dark') {
            techIcon.className = 'fas fa-leaf';
            techText.textContent = 'Moss';
        } else {
            techIcon.className = 'fas fa-sun';
            techText.textContent = 'Light';
        }
    }

    // Sinkronisasi icon awal sesuai tema aktif saat ini
    syncTechToggleIcon(html.getAttribute('data-theme') || 'dark');

    techThemeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme') || 'dark';
        let newTheme = 'dark';
        
        if (currentTheme === 'dark') {
            newTheme = 'hulk'; // Masuk ke tema botanical moss Anda
        } else if (currentTheme === 'hulk') {
            newTheme = 'light';
        } else {
            newTheme = 'dark';
        }

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        syncTechToggleIcon(newTheme);
        
        // Menyelaraskan icon navbar global jika ada di halaman yang sama
        if (typeof updateIcon === "function") {
            updateIcon(newTheme);
        }
    });
}