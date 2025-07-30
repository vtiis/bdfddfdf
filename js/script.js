document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseover', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.backgroundColor = 'white';
        });
        
        link.addEventListener('mouseout', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
});

const canvas = document.getElementById('bloodCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'REE WOUNDED'.split('');
const particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -100;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.char = letters[Math.floor(Math.random() * letters.length)];
    }
    
    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = Math.random() * -100;
            this.x = Math.random() * canvas.width;
        }
    }
    
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.font = `${this.size}px Courier New`;
        ctx.fillText(this.char, this.x, this.y);
    }
}

for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();

canvas.addEventListener('click', () => {
    particles.forEach(particle => {
        particle.x += (Math.random() - 0.5) * 100;
        particle.y += (Math.random() - 0.5) * 100;
    });
});