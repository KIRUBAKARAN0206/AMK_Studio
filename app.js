// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800); // 800ms delay to ensure the logo is visible
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Menu Toggle for Mobile View
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksList = document.getElementById('nav-links');

    if (menuToggle && navLinksList) {
        menuToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            
            // Animate toggle button spans
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach((span, idx) => {
                if (navLinksList.classList.contains('active')) {
                    if (idx === 0) span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                    if (idx === 1) span.style.opacity = '0';
                    if (idx === 2) span.style.transform = 'rotate(-45deg) translate(5px, -5px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // 2. Sticky Navbar Styling on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Portfolio Filter Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from other buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to current button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                 portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.remove('hidden');
                        }, 50);
                    } else {
                        item.classList.add('hidden');
                        setTimeout(() => {
                            if (item.classList.contains('hidden')) {
                                item.style.display = 'none';
                            }
                        }, 400);
                    }
                });
            });
        });
    }

    // 5. FAQ Accordion Toggle Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other items
            faqItems.forEach(el => {
                el.classList.remove('active');
                el.querySelector('.faq-content').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // 6. Contact Form Validation and Submission Experience
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;

                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-circle-notch fa-spin"></i>';

                setTimeout(() => {
                    submitBtn.innerHTML = 'Success! <i class="fa-solid fa-check"></i>';
                    submitBtn.style.background = '#10B981';
                    submitBtn.style.color = '#FFF';

                    alert(`Thank you, ${name}! Your message has been sent successfully. Our team will contact you at ${email} shortly.`);
                    
                    contactForm.reset();
                    
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.style.color = '';
                    }, 3000);
                }, 1500);
            }
        });
    }

    // 7. Pre-Booking Form Submission Experience
    const bookingForm = document.getElementById('bookingForm');
    const successModal = document.getElementById('successModal');
    const successModalMsg = document.getElementById('successModalMsg');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (bookingForm && successModal) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('booking-name').value;
            const email = document.getElementById('booking-email').value;
            const date = document.getElementById('booking-date').value;
            const categorySelect = document.getElementById('booking-category');
            const category = categorySelect ? categorySelect.options[categorySelect.selectedIndex].text : 'Service';

            if (name && email && date) {
                const submitBtn = bookingForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;

                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending Slot Request... <i class="fa-solid fa-circle-notch fa-spin"></i>';

                setTimeout(() => {
                    submitBtn.innerHTML = 'Pre-booked! <i class="fa-solid fa-check"></i>';
                    submitBtn.style.background = '#10B981';
                    submitBtn.style.color = '#FFF';

                    // Update modal message & display it
                    successModalMsg.innerHTML = `Thank you, <strong>${name}</strong>! Your pre-booking request for <strong>"${category}"</strong> on <strong>${date}</strong> has been registered successfully. Our team will contact you shortly.`;
                    successModal.classList.add('active');
                    
                    bookingForm.reset();
                    
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.style.color = '';
                    }, 3000);
                }, 1500);
            }
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                successModal.classList.remove('active');
                window.location.href = 'index.html';
            });
        }
    }

    // 9. Scroll Progress Indicator Bar
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // 10. Typewriter Text Rotator Logic
    const rotator = document.getElementById('textRotator');
    if (rotator) {
        const words = ["Memories", "Wedding Moments", "Brand Shoots", "Candid Captures", "Creative Ads", "Baby Shoots"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                rotator.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                rotator.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 150;
            
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        setTimeout(type, 1000);
    }
});

// Service Modal Logic
const serviceDetails = {
    'brand-ad': {
        title: 'Brand Ad Shoot',
        icon: '<div class="success-icon-wrapper" style="box-shadow: 0 0 20px rgba(255, 0, 127, 0.4); background: rgba(255, 0, 127, 0.1);"><i class="fa-solid fa-bullhorn" style="color: var(--accent-primary); font-size: 2.5rem;"></i></div>',
        content: `
            <h3 style="margin-bottom: 15px; font-size: 1.8rem; color: #fff;">Brand Ad Shoot</h3>
            <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 25px;">We design and shoot high-converting commercial advertisements, social media reels, and e-commerce product videos tailored for modern brands aiming to dominate their market.</p>
            <h4 style="margin-bottom: 15px; color: var(--accent-primary); text-align: left; font-size: 1.2rem;">What's Included in this Service:</h4>
            <ul style="color: var(--text-muted); list-style: none; padding: 0; text-align: left;">
                <li style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--accent-primary); margin-top: 4px;"></i> <span>Commercial Concept Writing & Creative Storyboarding</span></li>
                <li style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--accent-primary); margin-top: 4px;"></i> <span>Professional Product Videography with Cinematic Lighting</span></li>
                <li style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--accent-primary); margin-top: 4px;"></i> <span>Advanced Visual Effects (VFX) & Custom Sound Design</span></li>
                <li style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--accent-primary); margin-top: 4px;"></i> <span>Multiple aspect ratios optimized for Reels, Shorts, and TV</span></li>
            </ul>
        `
    },
    'event': {
        title: 'Event Coverage',
        icon: '<div class="success-icon-wrapper" style="box-shadow: 0 0 20px rgba(0, 240, 255, 0.4); background: rgba(0, 240, 255, 0.1);"><i class="fa-solid fa-calendar-check" style="color: var(--accent-secondary); font-size: 2.5rem;"></i></div>',
        content: `
            <h3 style="margin-bottom: 15px; font-size: 1.8rem; color: #fff;">Event Coverage</h3>
            <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 25px;">Comprehensive visual coverage for high-profile music concerts, product launches, corporate meets, and live stage events. We capture the energy and exact essence of your event.</p>
            <h4 style="margin-bottom: 15px; color: var(--accent-secondary); text-align: left; font-size: 1.2rem;">What's Included in this Service:</h4>
            <ul style="color: var(--text-muted); list-style: none; padding: 0; text-align: left;">
                <li style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--accent-secondary); margin-top: 4px;"></i> <span>Multi-Camera Live Event Filming Setup</span></li>
                <li style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--accent-secondary); margin-top: 4px;"></i> <span>High-Resolution Candid & Press Photography</span></li>
                <li style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--accent-secondary); margin-top: 4px;"></i> <span>Cinematic Highlight Teasers & Full-length Aftermovies</span></li>
                <li style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--accent-secondary); margin-top: 4px;"></i> <span>Professional Live Audio Recording from Mixing Console</span></li>
            </ul>
        `
    },
    'wedding': {
        title: 'Wedding Function',
        icon: '<div class="success-icon-wrapper" style="box-shadow: 0 0 20px rgba(124, 58, 237, 0.4); background: rgba(124, 58, 237, 0.1);"><i class="fa-solid fa-ring" style="color: #7C3AED; font-size: 2.5rem;"></i></div>',
        content: `
            <h3 style="margin-bottom: 15px; font-size: 2rem; color: #fff;">Wedding Packages</h3>
            <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 25px;">Cinematic wedding coverage capturing your special moments beautifully. Choose a package that suits your grand day.</p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; text-align: left; margin-bottom: 20px;">
                
                <!-- Package 35k -->
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(124, 58, 237, 0.3); border-radius: 15px; padding: 25px;">
                    <div style="color: #7C3AED; font-size: 1.6rem; font-weight: bold; margin-bottom: 15px;">₹35,000/-</div>
                    <ul style="color: #fff; font-size: 0.95rem; list-style: none; padding: 0; margin-bottom: 15px;">
                        <li><i class="fa-solid fa-camera" style="color: #10B981; margin-right: 8px;"></i> Traditional Photo</li>
                        <li><i class="fa-solid fa-video" style="color: #10B981; margin-right: 8px;"></i> Traditional Video</li>
                    </ul>
                    <h5 style="color: var(--accent-primary); margin-bottom: 10px; font-size: 0.95rem;">Deliverables:</h5>
                    <ul style="color: var(--text-muted); font-size: 0.9rem; list-style: none; padding: 0;">
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Unlimited photos</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Album 36x12 (280) - 80 Pages</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> HQ video with pendrive</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Family Photo Frame - 2nos</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Couple Photo Frame - 1no</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Calendar - 1no</li>
                    </ul>
                </div>

                <!-- Package 55k -->
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(124, 58, 237, 0.5); border-radius: 15px; padding: 25px;">
                    <div style="color: #7C3AED; font-size: 1.6rem; font-weight: bold; margin-bottom: 15px;">₹55,000/-</div>
                    <ul style="color: #fff; font-size: 0.95rem; list-style: none; padding: 0; margin-bottom: 15px;">
                        <li><i class="fa-solid fa-camera" style="color: #10B981; margin-right: 8px;"></i> Traditional Photo</li>
                        <li><i class="fa-solid fa-video" style="color: #10B981; margin-right: 8px;"></i> Traditional Video</li>
                        <li><i class="fa-solid fa-camera-retro" style="color: #10B981; margin-right: 8px;"></i> Candid Photo</li>
                        <li><i class="fa-solid fa-heart" style="color: #10B981; margin-right: 8px;"></i> Post Wedding Shoot</li>
                    </ul>
                    <h5 style="color: var(--accent-primary); margin-bottom: 10px; font-size: 0.95rem;">Deliverables:</h5>
                    <ul style="color: var(--text-muted); font-size: 0.9rem; list-style: none; padding: 0;">
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Unlimited photos</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Album 36x12 (330) - 100 Pages</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> HQ video with pendrive</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Family Photo Frame - 2no's</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Couple Photo Frame - 1no</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Calendar - 2no's</li>
                    </ul>
                </div>

                <!-- Package 85k -->
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(124, 58, 237, 0.7); border-radius: 15px; padding: 25px; box-shadow: 0 0 20px rgba(124,58,237,0.15);">
                    <div style="color: #7C3AED; font-size: 1.6rem; font-weight: bold; margin-bottom: 15px;">₹85,000/-</div>
                    <ul style="color: #fff; font-size: 0.95rem; list-style: none; padding: 0; margin-bottom: 15px;">
                        <li><i class="fa-solid fa-camera" style="color: #10B981; margin-right: 8px;"></i> Traditional Photo</li>
                        <li><i class="fa-solid fa-video" style="color: #10B981; margin-right: 8px;"></i> Traditional Video</li>
                        <li><i class="fa-solid fa-camera-retro" style="color: #10B981; margin-right: 8px;"></i> Candid Photo</li>
                        <li><i class="fa-solid fa-film" style="color: #10B981; margin-right: 8px;"></i> Candid Video</li>
                        <li><i class="fa-solid fa-heart" style="color: #10B981; margin-right: 8px;"></i> Post Wedding Shoot</li>
                    </ul>
                    <h5 style="color: var(--accent-primary); margin-bottom: 10px; font-size: 0.95rem;">Deliverables:</h5>
                    <ul style="color: var(--text-muted); font-size: 0.9rem; list-style: none; padding: 0;">
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Unlimited photos</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Album 36x12 (350) - 100 Pages</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Candid Album (150) - 50 Pages</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> HQ video with pendrive</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Candid Video</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Family Frame (2), Couple Frame (1)</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Calendar - 2no's</li>
                    </ul>
                </div>

                <!-- Package 1.15L -->
                <div style="background: rgba(124, 58, 237, 0.1); border: 1px solid rgba(124, 58, 237, 1); border-radius: 15px; padding: 25px; box-shadow: 0 0 30px rgba(124,58,237,0.3); position: relative;">
                    <div style="position: absolute; top: -12px; right: 20px; background: #7C3AED; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: bold;">Premium</div>
                    <div style="color: #7C3AED; font-size: 1.6rem; font-weight: bold; margin-bottom: 15px;">₹1,15,000/-</div>
                    <ul style="color: #fff; font-size: 0.95rem; list-style: none; padding: 0; margin-bottom: 15px;">
                        <li><i class="fa-solid fa-camera" style="color: #10B981; margin-right: 8px;"></i> Traditional Photo</li>
                        <li><i class="fa-solid fa-video" style="color: #10B981; margin-right: 8px;"></i> Traditional Video</li>
                        <li><i class="fa-solid fa-camera-retro" style="color: #10B981; margin-right: 8px;"></i> Candid Photo</li>
                        <li><i class="fa-solid fa-film" style="color: #10B981; margin-right: 8px;"></i> Candid Video</li>
                        <li><i class="fa-solid fa-plane-up" style="color: #10B981; margin-right: 8px;"></i> Drone</li>
                        <li><i class="fa-solid fa-heart" style="color: #10B981; margin-right: 8px;"></i> Pre & Post Wedding Shoot</li>
                    </ul>
                    <h5 style="color: var(--accent-primary); margin-bottom: 10px; font-size: 0.95rem;">Deliverables:</h5>
                    <ul style="color: var(--text-muted); font-size: 0.9rem; list-style: none; padding: 0;">
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Unlimited photos</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Album 36x12 (400) - 120 Pages</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Candid Album (180) - 60 Pages</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> HQ video with pendrive</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Candid Video</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Family Frame (2), Couple Frame (1)</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Calendar - 2no's</li>
                        <li style="margin-bottom: 6px;"><i class="fa-solid fa-gift" style="margin-right: 8px;"></i> Mug - 1no</li>
                    </ul>
                </div>

            </div>
            
            <div style="background: rgba(255, 204, 0, 0.1); border: 1px solid rgba(255, 204, 0, 0.3); padding: 15px; border-radius: 10px; text-align: left; font-size: 0.9rem; color: #fff;">
                <i class="fa-solid fa-circle-info" style="color: #FFC107; margin-right: 8px;"></i> <strong>Note:</strong> Transport and Accommodation charges are extra.
            </div>
        `
    }
};

window.openServiceModal = function(serviceId) {
    const modal = document.getElementById('serviceModal');
    const contentDiv = document.getElementById('modal-content');
    if (modal && contentDiv && serviceDetails[serviceId]) {
        contentDiv.innerHTML = serviceDetails[serviceId].icon + serviceDetails[serviceId].content;
        modal.classList.add('active');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const closeServiceModal = document.getElementById('closeServiceModal');
    const serviceModal = document.getElementById('serviceModal');
    if (closeServiceModal && serviceModal) {
        closeServiceModal.addEventListener('click', () => {
            serviceModal.classList.remove('active');
        });
        
        // Close modal when clicking outside of the card
        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) {
                serviceModal.classList.remove('active');
            }
        });
    }
});
