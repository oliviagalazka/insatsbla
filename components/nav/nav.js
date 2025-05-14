function renderNav(parentId) {
  const parent = document.getElementById(parentId);
  const nav = document.createElement('div');
  nav.id = 'nav-container';
  parent.appendChild(nav);

  nav.innerHTML = `
    <div class="nav-left" id="nav-left-group">
    <div id="info-icon">${infoIcon}</div>
      <div id="map-wrapper" style="display: none;">
        <img src="./media/pictures/map-icon.svg" alt="Karta" id="map-icon">
      </div>
    </div>
    <div class="nav-center" id="nav-logo">
      <div id='logo-thin'>INSATS</div>
      <div id='logo-bold'>BLÅ</div>
    </div>
    <div class="nav-right" id="info-wrapper">
      <div id="timer-wrapper" style="display: none;">
      <p id="mission-timer"></p>
    </div>
    </div>
  `;

  // Tillbakaknapp på landingpage
  if (document.body.classList.contains('body-landingpage')) {
    const backBtn = document.createElement('div');
    backBtn.id = 'back-to-intro-btn';
    backBtn.innerHTML = arrowIconSVG;
    backBtn.style.position = 'absolute';
    backBtn.style.top = '1rem';
    backBtn.style.left = '1rem';
    backBtn.style.zIndex = '1000';
    document.body.appendChild(backBtn);

    backBtn.addEventListener('click', () => {
      console.log('Klickade på tillbakaknapp!');
      document.body.innerHTML = '';
      renderIntroVideoPage('body');
    });
  }

  // Visa kartan och timern i mission 1
  const missionId = parseInt(localStorage.getItem('missionId'), 10);
  if (!document.body.classList.contains('body-landingpage') && missionId === 1) {
    document.getElementById('map-wrapper').style.display = 'flex';
    document.getElementById('timer-wrapper').style.display = 'flex';

    const timer = document.getElementById('mission-timer');
    startTimer(30 * 60, timer);

    document.getElementById('map-icon').addEventListener('click', (e) => {
      e.stopPropagation();
      showMapPopup();
    });
  }

  // Info-popup
  document.getElementById('info-icon').addEventListener('click', (e) => {
    e.stopPropagation();
    showInfoPopup();
  });
}


function startTimer(duration, display) {
  let timer = duration;
  let warningShown = false;

  const interval = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    display.innerHTML = `${timerIconSVG} ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (!warningShown && timer === 10 * 60) {
      showLockedPopup('Det är bara 10 minuter kvar på tiden...');
      warningShown = true;
    }

    if (timer <= 0) {
      clearInterval(interval);
      display.textContent = 'Tiden är slut!';
      const autoSubmitBtn = document.getElementById('submitBtn');
      if (autoSubmitBtn) autoSubmitBtn.click();
    }

    timer--;
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

// function showInfoPopup() {
//   const overlay = document.createElement('div');
//   overlay.id = 'info-overlay';
//   overlay.style.position = 'fixed';
//   overlay.style.top = 0;
//   overlay.style.left = 0;
//   overlay.style.width = '100vw';
//   overlay.style.height = '100vh';
//   overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
//   overlay.style.display = 'flex';
//   overlay.style.alignItems = 'center';
//   overlay.style.justifyContent = 'center';
//   overlay.style.zIndex = 1000;

//   overlay.addEventListener('click', () => document.body.removeChild(overlay));

//   // Hämta missionId från localStorage
//   const missionId = parseInt(localStorage.getItem('missionId'), 10);

//   // Sätt bild baserat på missionId
//   const infoImg = document.createElement('img');
//   infoImg.alt = 'Information';
//   infoImg.style.maxWidth = '90%';
//   infoImg.style.maxHeight = '90%';

//   switch (missionId) {
//     case 1:
//       infoImg.src = './media/pictures/i1.png';
//       break;
//     case 2:
//       infoImg.src = './media/pictures/i2b.png';
//       break;
//     case 3:
//       infoImg.src = './media/pictures/i3.png';
//       break;
//     case 4:
//       infoImg.src = './media/pictures/i4.png'; // fallback-bild
//       break;
//   }

//   overlay.appendChild(infoImg);
//   document.body.appendChild(overlay);
// }


function showInfoPopup() {
  const overlay = document.createElement('div');
  overlay.id = 'info-overlay';
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

  overlay.addEventListener('click', () => document.body.removeChild(overlay));

  const missionId = parseInt(localStorage.getItem('missionId'), 10);
  const bikeReportStep = localStorage.getItem('bikeReportStep');

  const infoImg = document.createElement('img');
  infoImg.alt = 'Information';
  infoImg.style.maxWidth = '90%';
  infoImg.style.maxHeight = '90%';

  switch (missionId) {
    case 1:
      infoImg.src = './media/pictures/i1.png';
      break;
    case 2:
      if (bikeReportStep === 'second') {
        infoImg.src = './media/pictures/i2b.png';
      } else {
        infoImg.src = './media/pictures/i2a.png';
      }
      break;
    case 3:
      infoImg.src = './media/pictures/i3.png';
      break;
    case 4:
      infoImg.src = './media/pictures/i4.png';
      break;
  }

  overlay.appendChild(infoImg);
  document.body.appendChild(overlay);
}
