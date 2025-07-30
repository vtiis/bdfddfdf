document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    
    document.body.style.cursor = 'none';
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-pointer');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-pointer');
        });
    });
});

document.addEventListener('click', (e) => {
    if (e.target.closest('.inject-btn')) return;
    
    const stain = document.createElement('div');
    stain.className = 'blood-stain fresh';
    stain.style.left = `${e.clientX}px`;
    stain.style.top = `${e.clientY}px`;
    stain.style.width = `${Math.random() * 80 + 20}px`;
    stain.style.height = stain.style.width;
    document.getElementById('blood-stains').appendChild(stain);
    
    setTimeout(() => stain.remove(), 15000);
});