// Portfolio Premium JS

document.addEventListener('DOMContentLoaded', () => {
    // 1. Lenis Smooth Scroll
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

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Parallax Hero Image
    gsap.to('.portfolio-hero-bg', {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".portfolio-hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 3. Hero Content Fade Up
    gsap.from('.portfolio-hero-title', { y: 50, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
    gsap.from('.portfolio-hero-line', { scaleX: 0, duration: 1, delay: 0.5, ease: "power3.out" });
    gsap.from('.portfolio-hero-subtitle', { y: 30, opacity: 0, duration: 1, delay: 0.7, ease: "power3.out" });

    // 4. Portfolio Filter Logic
    const filterBtns = document.querySelectorAll('.premium-filter-btn');
    const portfolioItems = document.querySelectorAll('.masonry-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    gsap.to(item, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" });
                } else {
                    gsap.to(item, { scale: 0.8, opacity: 0, duration: 0.4, ease: "power2.in", onComplete: () => {
                        if (!btn.classList.contains('active')) return; // Check if still inactive
                        if (filterValue !== 'all' && category !== filterValue) {
                            item.style.display = 'none';
                        }
                    }});
                }
            });
        });
    });

    // 5. Lightbox Logic
    const lightbox = document.getElementById('portfolioLightbox');
    const lbImg = document.getElementById('lbImg');
    const lbTitle = document.getElementById('lbTitle');
    const lbCat = document.getElementById('lbCat');
    const lbDesc = document.getElementById('lbDesc');
    const lbCounter = document.getElementById('lbCounter');
    
    let currentIndex = 0;
    // Get currently visible items only
    let activeItems = [];

    function updateActiveItems() {
        activeItems = Array.from(document.querySelectorAll('.masonry-item')).filter(item => item.style.display !== 'none');
    }

    function openLightbox(index) {
        updateActiveItems();
        currentIndex = index;
        const item = activeItems[currentIndex];
        
        lbImg.src = item.querySelector('img').src;
        lbTitle.textContent = item.querySelector('.hover-title').textContent;
        lbCat.textContent = item.querySelector('.hover-category').textContent;
        lbDesc.textContent = item.getAttribute('data-desc') || 'A premium visual capture by AMF Studio.';
        lbCounter.textContent = `${currentIndex + 1} / ${activeItems.length}`;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImg() {
        if (currentIndex < activeItems.length - 1) {
            openLightbox(currentIndex + 1);
        } else {
            openLightbox(0); // loop
        }
    }

    function prevImg() {
        if (currentIndex > 0) {
            openLightbox(currentIndex - 1);
        } else {
            openLightbox(activeItems.length - 1); // loop
        }
    }

    // Attach click events to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Don't open if clicked on button inside
            if(e.target.closest('.hover-btn')) return;
            updateActiveItems();
            const index = activeItems.indexOf(item);
            if(index !== -1) openLightbox(index);
        });
    });

    // Lightbox Controls
    document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
    document.getElementById('lbNext')?.addEventListener('click', nextImg);
    document.getElementById('lbPrev')?.addEventListener('click', prevImg);

    // Keyboard Nav
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImg();
        if (e.key === 'ArrowLeft') prevImg();
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // 6. GSAP Reveal Animations for New Sections
    const reveals = document.querySelectorAll('.gsap-reveal');
    reveals.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // 7. Video Showcase Hover logic is CSS, but let's add simple popup logic if needed
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            alert('Premium Video Player opens here.'); // Placeholder for actual video player
        });
    });
});
