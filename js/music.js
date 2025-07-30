const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll('.release-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-pointer');
    });
    card.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-pointer');
    });
});

document.addEventListener('click', (e) => {
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

window.addEventListener('scroll', () => {
    const yPos = window.scrollY * 0.3;
    document.querySelector('.video-bg').style.transform = `translateY(${yPos}px)`;
});

setInterval(() => {
    if (Math.random() > 0.7) {
        document.querySelector('.glitch').style.textShadow = '0 0 10px #fff, 0 0 20px #f00';
        setTimeout(() => {
            document.querySelector('.glitch').style.textShadow = 'none';
        }, 300);
    }
}, 3000);

document.addEventListener('DOMContentLoaded', () => {
    const homeBtn = document.querySelector('.home-btn');
    setTimeout(() => {
        homeBtn.style.opacity = '1';
        homeBtn.style.transform = 'translateY(0)';
    }, 500);
    
    homeBtn.style.opacity = '0';
    homeBtn.style.transform = 'translateY(-20px)';
    homeBtn.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', () => {
    const homeBtn = document.querySelector('.home-btn');
    const scrollY = window.scrollY;
    homeBtn.style.transform = `translateY(${Math.min(scrollY * 0.2, 10)}px)`;
});