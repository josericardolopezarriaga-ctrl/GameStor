let isMuted = true;
const audio = document.getElementById('background-music');
const volumeIcon = document.getElementById('volume-icon');

window.addEventListener('load', () => {
    audio.volume = 0.3;
    audio.play().catch(() => {
        document.addEventListener('click', () => {
            if(isMuted){
                audio.play();
                isMuted = false;
                volumeIcon.textContent = '🔊';
            }
        }, { once: true });
    });
});

function toggleMute(){
    if(isMuted){
        audio.muted = false;
        audio.play();
        volumeIcon.textContent = '🔊';
        isMuted = false;
    } else {
        audio.muted = true;
        volumeIcon.textContent = '🔇';
        isMuted = true;
    }
}