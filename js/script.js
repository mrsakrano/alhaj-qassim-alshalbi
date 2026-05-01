const backToTopBtn = document.getElementById('backToTop');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const contactForm = document.getElementById('contactForm');
const animatedElements = document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .faq-item, .feature-item, .quick-contact-card');

function updateBackToTopVisibility() {
    if (!backToTopBtn) {
        return;
    }

    if (window.scrollY > 320) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

function scrollToSection(targetId) {
    const target = document.querySelector(targetId);

    if (!target) {
        return;
    }

    const headerOffset = 110;
    const sectionTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
    });
}

function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 180) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const isActive = href === `#${currentSection}`;
        link.classList.toggle('active', isActive);
    });
}

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

navLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href');

        if (!targetId || targetId === '#') {
            return;
        }

        event.preventDefault();
        scrollToSection(targetId);

        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const message = document.getElementById('message')?.value.trim();

        if (!name || !phone || !message) {
            alert('يرجى تعبئة الاسم ورقم الهاتف والرسالة.');
            return;
        }

        const whatsappMessage = [
            'السلام عليكم، أرغب بحجز موعد.',
            `الاسم: ${name}`,
            `رقم الهاتف: ${phone}`,
            `الرسالة: ${message}`
        ].join('\n');

        const whatsappUrl = `https://wa.me/962777246833?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank', 'noopener');
        contactForm.reset();
    });
}

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    });

    animatedElements.forEach((element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(24px)';
        element.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        observer.observe(element);
    });
}

window.addEventListener('scroll', () => {
    updateBackToTopVisibility();
    setActiveNavLink();
});

document.addEventListener('DOMContentLoaded', () => {
    updateBackToTopVisibility();
    setActiveNavLink();
});
