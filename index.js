function renderIntroVideo(parent) {
    document.body.className = 'body-introvideopage';
    const container = document.querySelector(parent);

    container.innerHTML = `
        <div class="video-wrapper">
            <video id="fullscreen-video" muted playsinline>
                <source src="./media/videos/introvideo.mp4" type="video/mp4" />
                Din webbläsare stödjer inte videon.
            </video>

            <div class="video-overlay" id="video-overlay">
                <button id="start-video-btn">Starta Video</button>
            </div>
        </div>
    `;

    const video = document.getElementById('fullscreen-video');
    const overlay = document.getElementById('video-overlay');
    const startBtn = document.getElementById('start-video-btn');

    startBtn.addEventListener('click', () => {
        // Avmuta först när användaren klickar
        video.muted = false;

        video.play()
            .then(() => {
                overlay.style.display = 'none';
            })
            .catch(e => console.warn("Kunde inte spela upp video:", e));
    });

    video.addEventListener('ended', () => {
        console.log("Videon är klar!");
        renderLandingPage('body');
    });
}

renderIntroVideo('body');
