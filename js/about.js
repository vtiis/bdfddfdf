document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.luxury-cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    let cursorX = 0;
    let cursorY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
    });
    
    function animateCursorTrail() {
        const diffX = cursorX - trailX;
        const diffY = cursorY - trailY;
        
        trailX += diffX * 0.1;
        trailY += diffY * 0.1;
        
        cursorTrail.style.left = `${trailX}px`;
        cursorTrail.style.top = `${trailY}px`;
        
        requestAnimationFrame(animateCursorTrail);
    }
    
    animateCursorTrail();
    
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.borderColor = '#ff3366';
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = 'white';
        });
    });
    
    document.addEventListener('click', function(e) {
        if (e.target.closest('a')) return;
        
        const stain = document.createElement('div');
        stain.className = 'blood-stain fresh';
        stain.style.left = `${e.clientX}px`;
        stain.style.top = `${e.clientY}px`;
        stain.style.width = `${Math.random() * 80 + 20}px`;
        stain.style.height = stain.style.width;
        document.getElementById('blood-stains').appendChild(stain);
        
        setTimeout(() => stain.remove(), 15000);
    });
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.bio-text, .contact-list li, .social-card');
        
        elements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };
    
    document.querySelectorAll('.bio-text, .contact-list li, .social-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});