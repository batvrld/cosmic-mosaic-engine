document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    // 1. Apply saved theme on load
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        // Change icon to sun
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    }

    // 2. Handle toggle click
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Update local storage and icon
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.querySelector('i').classList.remove('fa-sun');
            themeToggle.querySelector('i').classList.add('fa-moon');
        }
    });

    // --- Original Script Logic (Hamburger, Accordion, Counter, WhatsApp) ---

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.getElementById('main-nav');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                hamburger.classList.remove('active');
            }
        });
    });

    // Interactive Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const contentId = header.getAttribute('data-target');
            const content = document.getElementById(contentId);

            document.querySelectorAll('.accordion-content').forEach(c => {
                if (c !== content && c.classList.contains('open')) {
                    c.classList.remove('open');
                    const otherHeader = document.querySelector(`[data-target="${c.id}"]`);
                    if (otherHeader) otherHeader.classList.remove('active');
                }
            });

            content.classList.toggle('open');
            header.classList.toggle('active');
        });
    });

    // Animate Counter on Viewport Entry
    const counterElements = document.querySelectorAll('.counter-value');
    let countersAnimated = false; 

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        let current = 0;
        const duration = 2000;
        const step = target / (duration / 10);

        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 10);
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                counterElements.forEach(animateCounter);
                countersAnimated = true;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const funFactsSection = document.querySelector('.fun-facts');
    if (funFactsSection) {
        observer.observe(funFactsSection);
    }

    // Send to WhatsApp Function
    const admissionForm = document.getElementById('admission-form');

    if (admissionForm) {
        admissionForm.addEventListener('submit', sendToWhatsApp);
    }

    function sendToWhatsApp(event) {
        event.preventDefault();

        const studentName = document.getElementById('studentName').value;
        const parentName = document.getElementById('parentName').value;
        const email = document.getElementById('email').value;
        const grade = document.getElementById('grade').value;
        const mobile = document.getElementById('mobile').value;
        const message = document.getElementById('message').value;

        const schoolWhatsAppNumber = '917373747474';
        
        const whatsappMessage = `
*New Admission Inquiry for RD International School:*
Parent Name: ${parentName}
Student Name: ${studentName}
Grade Interest: ${grade || 'Not Specified'}
Mobile: ${mobile}
Email: ${email}
Message: ${message}
`;

        const encodedMessage = encodeURIComponent(whatsappMessage.trim());
        const whatsappUrl = `https://wa.me/${schoolWhatsAppNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    }
});