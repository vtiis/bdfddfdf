document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.luxury-cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    const audio = document.getElementById('track-preview');
    const playBtn = document.querySelector('.play-btn');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    const progress = document.querySelector('.progress');
    const timeDisplay = document.querySelector('.time-display');
    
    const moreBtn = document.querySelector('.more-btn');
    const dropdown = document.querySelector('.dropdown-platforms');
    
    const artwork = document.querySelector('.artwork-parallax');
    
    let isPlaying = false;
    let cursorX = 0;
    let cursorY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        if (artwork) {
            const rect = artwork.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const moveX = (cursorX - centerX) / 20;
            const moveY = (cursorY - centerY) / 20;
            
            artwork.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
        }
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
            cursor.style.borderColor = 'var(--secondary)';
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = 'var(--primary)';
        });
    });
    
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        } else {
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
        
        isPlaying = !isPlaying;
    });
    
    audio.addEventListener('timeupdate', function() {
        const currentTime = audio.currentTime;
        const duration = audio.duration || 15;
        
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };
        
        timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    });
    
    audio.addEventListener('ended', function() {
        audio.currentTime = 0;
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        progress.style.width = '0%';
    });
    
    document.querySelector('.waveform').addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        audio.currentTime = clickPosition * (audio.duration || 15);
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.more-platforms')) {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.marginBottom = '15px';
        }
    });
});