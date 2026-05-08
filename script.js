// Hero GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- 1. Custom Cursor ---
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .project-card, .skill-card, .filter-btn, label');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        gsap.to(follower, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.3
        });
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });

    // --- 2. Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 3. Smooth Scroll with GSAP ---
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            if (target === '#') {
                gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.inOut" });
            } else {
                gsap.to(window, { duration: 1, scrollTo: target, ease: "power2.inOut" });
            }
        });
    });

    // --- 4. Active Nav Link Indicator ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections_to_watch = document.querySelectorAll('section[id], div[id="particles-js"]');

    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}` || (id === 'particles-js' && link.getAttribute('href') === '#')) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections_to_watch.forEach(section => observer.observe(section));

    // 1. GSAP staggered entrance for Hero
    gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
    });

    // Profile image entrance
    gsap.from(".profile-img", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8
    });

    // 2. TypeIt for subtitle
    new TypeIt("#hero-subtitle", {
        strings: ["Frontend Developer", "UI/UX Enthusiast", "Hackathon Builder"],
        speed: 50,
        breakLines: false,
        loop: true,
        nextStringDelay: 2000,
    }).go();

    // 3. Magnetic cursor on buttons
    const magneticBtns = document.querySelectorAll('.magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', function(e) {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // 4. Particle Background
    tsParticles.load("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            color: { value: "#000000" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 3 } },
            links: { enable: true, distance: 150, color: "#000000", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: false, straight: false, outModes: "out" }
        },
        interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { quantity: 4 } }
        },
        retina_detect: true
    });

    // 5. About Section Split Entrance
    gsap.from(".about-img", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 75%",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".about-content", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 75%",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // 6. Stats Counter Animation
    const stats = document.querySelectorAll(".stat-number");
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute("data-target"));
        gsap.to(stat, {
            scrollTrigger: {
                trigger: ".about-stats",
                start: "top 85%",
            },
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power3.out"
        });
    });

    // 7. Skills Section Staggered Entrance
    gsap.from(".skill-card-wrapper", {
        scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out"
    });

    // 8. Progress Ring Animation
    const rings = document.querySelectorAll(".progress-ring-circle");
    rings.forEach(ring => {
        const percent = ring.getAttribute("data-percent");
        const radius = ring.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;

        gsap.to(ring, {
            scrollTrigger: {
                trigger: ".skills-grid",
                start: "top 80%",
            },
            strokeDashoffset: offset,
            duration: 1.5,
            ease: "power2.out"
        });
    });

    // 9. Section Staggered Entrances (Projects, Hackathons, Certifications)
    const sectionIds = ["#projects", "#hackathons", "#certifications"];
    sectionIds.forEach(id => {
        const section = document.querySelector(id);
        if (section) {
            gsap.from(`${id} .project-card`, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                },
                scale: 0.9,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out"
            });
        }
    });

    // 10. Project Filtering Logic (Scoped to Projects section)
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectSectionCards = document.querySelectorAll("#projects .project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons and add to the clicked one
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.getAttribute("data-filter");

            projectSectionCards.forEach(card => {
                const category = card.getAttribute("data-category");

                if (filter === "all" || category === filter) {
                    gsap.to(card, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3,
                        display: "block",
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0,
                        duration: 0.3,
                        display: "none",
                        ease: "power2.out"
                    });
                }
            });
        });
    });

    // Set current year in footer
    const currentYear = document.getElementById("current-year");
    if (currentYear) currentYear.textContent = new Date().getFullYear();
});

// Global functions
function sendWhatsApp() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const text = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    const phone = "917026162108"; 
    const link = `https://wa.me/${phone}?text=${text}`;

    window.open(link, "_blank");
}

// ScrollReveal for other sections
ScrollReveal().reveal('.navbar', { origin: 'top', distance: '20px', duration: 800, delay: 200 });
ScrollReveal().reveal('.contact-section', { origin: 'bottom', distance: '60px', duration: 1000, delay: 300 });
