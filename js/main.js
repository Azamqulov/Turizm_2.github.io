document.addEventListener('DOMContentLoaded', function() {
    // Çerez bildirimi
    const cookieNotice = document.getElementById('cookie-notice');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    
    // Çerez kabul edilmiş mi kontrol et
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(function() {
            cookieNotice.style.display = 'block';
        }, 1000);
    }
    
    // Çerez kabul butonu
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieNotice.style.display = 'none';
        });
    }
    
    // Mobil menü
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Slider otomatik kaydırma
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialsSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        // Otomatik kaydırma
        let scrollAmount = 0;
        const scrollStep = 1;
        
        function autoScroll() {
            if (!isDown) {
                testimonialsSlider.scrollLeft += scrollStep;
                
                // Sonuna gelince başa dön
                if (testimonialsSlider.scrollLeft >= testimonialsSlider.scrollWidth - testimonialsSlider.clientWidth) {
                    testimonialsSlider.scrollLeft = 0;
                }
            }
            
            requestAnimationFrame(autoScroll);
        }
        
        requestAnimationFrame(autoScroll);
        
        // Mouse kontrolü
        testimonialsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialsSlider.offsetLeft;
            scrollLeft = testimonialsSlider.scrollLeft;
        });
        
        testimonialsSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        testimonialsSlider.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        testimonialsSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsSlider.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Scroll animasyonu
    const scrollElements = document.querySelectorAll('.destination-card, .tour-card, .hotel-card, .feature-card, .testimonial-card, .blog-card');
    
    const elementInView = (el, offset = 0) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (1 - offset)
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 0.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                nameInput.style.borderColor = 'red';
                isValid = false;
            } else {
                nameInput.style.borderColor = '#ddd';
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.style.borderColor = 'red';
                isValid = false;
            } else {
                emailInput.style.borderColor = '#ddd';
            }
            
            if (!messageInput.value.trim()) {
                messageInput.style.borderColor = 'red';
                isValid = false;
            } else {
                messageInput.style.borderColor = '#ddd';
            }
            
            if (isValid) {
                // Form gönderimi simülasyonu
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Gönderiliyor...';
                
                setTimeout(function() {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Gönder';
                    
                    // Başarı mesajı
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.';
                    successMessage.style.backgroundColor = '#4CAF50';
                    successMessage.style.color = 'white';
                    successMessage.style.padding = '10px';
                    successMessage.style.borderRadius = '5px';
                    successMessage.style.marginTop = '20px';
                    
                    contactForm.appendChild(successMessage);
                    
                    setTimeout(function() {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    // Bülten abone formu
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailRegex.test(emailInput.value.trim())) {
                const submitBtn = newsletterForm.querySelector('button');
                submitBtn.disabled = true;
                submitBtn.textContent = '...';
                
                setTimeout(function() {
                    emailInput.value = '';
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Abone Ol';
                    
                    alert('Bültenimize başarıyla abone oldunuz!');
                }, 1000);
            } else {
                emailInput.style.borderColor = 'red';
            }
        });
    }
});