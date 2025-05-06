function renderIntroVideoPage(parentSelector = 'body') {
    document.body.className = 'body-introvideopage';

    const container = document.querySelector(parentSelector);
    container.innerHTML = `
        <div class="video-wrapper">
            <video id="fullscreen-video" autoplay playsinline>
                <source src="./media/videos/introvideo.mp4" type="video/mp4" />
                Din webbläsare stödjer inte videon.
            </video>

            <div class="video-controls" style="display: none">
                <div id="replay-btn">${replayIconSVG}</div>
                <button id="next-btn">Nästa</button>
            </div>

            <div class="back-button" id="back-btn">${arrowIconSVG}</div>
        </div>
    `;

    const video = document.getElementById('fullscreen-video');
    const replayBtn = document.getElementById('replay-btn');
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');

    replayBtn.addEventListener('click', () => {
        video.currentTime = 0;
        video.play();
    });

    nextBtn.addEventListener('click', () => {
        renderLandingPage('body');
    });

    backBtn.addEventListener('click', () => {
        renderStartGamePage('body');
    });

    video.addEventListener('ended', () => {
        document.querySelector('.video-controls').style.display = 'flex';
    });
}

