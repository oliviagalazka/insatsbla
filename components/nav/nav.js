function renderNav(parentId) {
  const parent = document.getElementById(parentId);
  const nav = document.createElement('div');
  nav.id = 'nav-container';
  parent.appendChild(nav);

  nav.innerHTML = `
                  <div id='logo-thin'>INSATS</div>
                  <div id='logo-bold'>BLÅ</div>
                `;
}

function renderNav(parentId) {
  const parent = document.getElementById(parentId);
  const nav = document.createElement('div');
  nav.id = 'nav-container';
  parent.appendChild(nav);

  nav.innerHTML = `
  <div class="nav-left" id="map-wrapper" style="display: none;">
    <img src="./media/pictures/map-icon.svg" alt="Karta" id="map-icon">
  </div>
  <div class="nav-center" id="nav-logo">
    <div id='logo-thin'>INSATS</div>
    <div id='logo-bold'>BLÅ</div>
  </div>
  <div class="nav-right" id="timer-wrapper" style="display: none;">
    <p id="mission-timer"></p>
  </div>
`;

  const missionId = parseInt(localStorage.getItem('missionId'), 10);

  if (missionId === 1) {
    document.getElementById('map-wrapper').style.display = 'flex';
    document.getElementById('timer-wrapper').style.display = 'flex';

    const timer = document.getElementById('mission-timer');
    startTimer(30 * 60, timer);

    const mapIcon = document.getElementById('map-icon');
    mapIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      showMapPopup();
    });
  }

}

function startTimer(duration, display) {
  let timer = duration;
  const interval = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    display.innerHTML = `${timerIconSVG} ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (--timer < 0) {
      clearInterval(interval);
      display.textContent = 'Tiden är slut!';
      showLockedPopup("Lilla svante fick precis i sig en bulle och hann inte till djursjukhuset i tid");
    }
  }, 1000);
}

function showMapPopup() {
  const overlay = document.createElement('div');
  overlay.id = 'map-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = 1000;

  // Stäng-popup klick
  overlay.addEventListener('click', () => document.body.removeChild(overlay));

  // Kartbild
  const mapImg = document.createElement('img');
  mapImg.src = './media/pictures/karta-kungsparken.png'; // din kartbild
  mapImg.alt = 'Karta Kungsparken';
  mapImg.style.maxWidth = '90%';
  mapImg.style.maxHeight = '90%';
  mapImg.style.cursor = 'zoom-in';

  // Zoomfunktion
  mapImg.addEventListener('click', (e) => {
    e.stopPropagation(); // stoppar stängning
    if (mapImg.style.transform === 'scale(2)') {
      mapImg.style.transform = 'scale(1)';
      mapImg.style.cursor = 'zoom-in';
    } else {
      mapImg.style.transform = 'scale(2)';
      mapImg.style.cursor = 'zoom-out';
    }
  });

  overlay.appendChild(mapImg);
  document.body.appendChild(overlay);
}

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