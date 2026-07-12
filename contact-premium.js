// Contact Premium JS

document.addEventListener('DOMContentLoaded', () => {
    // 1. Lenis Smooth Scroll
    // Check if Lenis is already initialized to prevent duplication (though it shouldn't be for this page)
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // Register GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 2. Parallax Hero Image
        gsap.to('.hero-hub-bg', {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: ".contact-hero-hub",
                start: "top top",
                end: "bottom top",
                scrub: true,
                fastScrollEnd: true
            }
        });

        // 3. Hero Content Fade Up
        gsap.from('.gold-label', { y: 20, opacity: 0, duration: 1, delay: 0.1, ease: "power3.out" });
        gsap.from('.hero-hub-title', { y: 30, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });
        gsap.from('.hero-hub-line', { scaleX: 0, duration: 1, delay: 0.5, ease: "power3.out" });
        gsap.from('.hero-hub-subtitle', { y: 30, opacity: 0, duration: 1, delay: 0.7, ease: "power3.out" });
        gsap.from('.hero-hub-actions', { y: 30, opacity: 0, duration: 1, delay: 0.9, ease: "power3.out" });

        // 4. Staggered GSAP Reveals for Sections
        const reveals = document.querySelectorAll('.gsap-reveal');
        reveals.forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    once: true
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });

        const staggerContainers = document.querySelectorAll('.vertical-contact-flow, .quick-actions-grid, .why-contact-grid');
        staggerContainers.forEach(container => {
            const items = container.querySelectorAll('.gsap-stagger');
            if(items.length > 0) {
                gsap.from(items, {
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                        once: true
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out"
                });
            }
        });
    }
});

