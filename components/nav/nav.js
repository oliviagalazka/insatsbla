// function renderNav(parentId) {
//   const parent = document.getElementById(parentId);
//   const nav = document.createElement('div');
//   nav.id = 'nav-container';
//   parent.appendChild(nav);

//   nav.innerHTML = `
//                   <div id='logo-thin'>INSATS</div>
//                   <div id='logo-bold'>BLÅ</div>
//                 `;
// }

// function renderNav(parentId) {
//   const parent = document.getElementById(parentId);
//   const nav = document.createElement('div');
//   nav.id = 'nav-container';
//   parent.appendChild(nav);

//   nav.innerHTML = `
//   <div class="nav-left" id="map-wrapper" style="display: none;">
//     <img src="./media/pictures/map-icon.svg" alt="Karta" id="map-icon">
//   </div>
//   <div class="nav-center" id="nav-logo">
//     <div id='logo-thin'>INSATS</div>
//     <div id='logo-bold'>BLÅ</div>
//   </div>
//   <div class="nav-right" id="timer-wrapper" style="display: none;">
//     <p id="mission-timer"></p>
//   </div>
// `;

//   const missionId = parseInt(localStorage.getItem('missionId'), 10);

//   if (missionId === 1) {
//     document.getElementById('map-wrapper').style.display = 'flex';
//     document.getElementById('timer-wrapper').style.display = 'flex';

//     const timer = document.getElementById('mission-timer');
//     startTimer(30 * 60, timer);

//     const mapIcon = document.getElementById('map-icon');
//     mapIcon.addEventListener('click', (e) => {
//       e.stopPropagation();
//       showMapPopup();
//     });
//   }

// }

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

  // Lägg till tillbakaknapp om vi är på landingpage
  if (document.body.classList.contains('body-landingpage')) {
    const backBtn = document.createElement('div');
    backBtn.id = 'back-to-intro-btn';
    backBtn.innerHTML = arrowIconSVG;
    backBtn.style.position = 'absolute';
    backBtn.style.top = '1rem';
    backBtn.style.left = '1rem';
    backBtn.style.zIndex = '1000';
    document.body.appendChild(backBtn);

    // Eventlyssnare direkt efter att knappen finns
    backBtn.addEventListener('click', () => {
      console.log('Klickade på tillbakaknapp!');
      document.body.innerHTML = '';
      renderIntroVideoPage('body');
    });
  }

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

// function startTimer(duration, display) {
//   let timer = duration;
//   const interval = setInterval(() => {
//     const minutes = Math.floor(timer / 60);
//     const seconds = timer % 60;
//     display.innerHTML = `${timerIconSVG} ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

//     if (timer <= 0) {
//       clearInterval(interval);
//       display.textContent = 'Tiden är slut!';
//       const autoSubmitBtn = document.getElementById('submitBtn');
//       if (autoSubmitBtn) autoSubmitBtn.click();
//     }

//     timer--; // flytta ned
//   }, 1000);
// }

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