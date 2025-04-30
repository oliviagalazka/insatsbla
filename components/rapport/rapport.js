localStorage.setItem('missionId', 2);

function renderReportPage(parentId) {
  document.body.className = 'body-reportpage';

  const parent = document.querySelector(parentId);
  parent.innerHTML = '';

  // Hämta missionId från localStorage
  const missionId = parseInt(localStorage.getItem('missionId'), 10);

  // Hitta rätt mission baserat på missionId
  const mission = reportContent.find(m => m.missionId === missionId);

  if (!mission) {
    parent.innerHTML = '<p>Fel: Kunde inte hitta något uppdrag.</p>';
    return;
  }

  // Skapa wrapper
  const wrapper = document.createElement('div');
  wrapper.id = 'wrapper-reportpage';
  parent.appendChild(wrapper);

  // Skapa nav
  renderNav(wrapper.id);

  // Skapa innehåll
  wrapper.innerHTML = `
    <div class="rapportInfo">
      <img src="../../media/pictures/rapportImg.png" alt="Polisens emblem">
      <div class="rapportText">
        <h1>Insatsrapport</h1>
        <p>Aspirantgrupp: Insats blå</p>
        <p>Datum: ${showTodaysDate()}</p>
      </div>
    </div>

    <div class="rapportDiv">
      <h1>${mission.mission}</h1>
      <form id="reportForm">
        ${renderInputs(mission)}
        </div>
          <div class="skickaIn">
            <p>Jag intygar på heder och samvete att ovanstående uppgifter är riktiga och sanningsenliga.</p>
            <button id="submitBtn" type="submit">Skicka in</button>
          </div>
      </form>
  `;

  // Lägg till eventlyssnare på knappen för submit
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Förhindrar att sidan laddas om

    // Hämta formulär och inputs
    const form = document.getElementById('reportForm');
    const inputs = form.querySelectorAll('input[type="text"]');
    const answers = [];

    // Hämta endast användarens svar
    inputs.forEach((input) => {
      answers.push(input.value);
    });
    
    // Skapa en ny insatsrapport
    const report = {
      missionId: mission.missionId,
      questions: mission.questions,
      answers: answers
    };
    
    // Hämta tidigare rapporter om de finns
    const existingReports = JSON.parse(localStorage.getItem('reportAnswers')) || [];
    
    // Lägg till nya rapporten
    existingReports.push(report);
    
    // Spara tillbaka
    localStorage.setItem('reportAnswers', JSON.stringify(existingReports));
    

    // Rendera RadioPage
    let newMission = {
      missionId: mission.missionId,
      text: mission.mission,
      audioOverride: null // standard: inget override
    };

    // Om cykelstölden (missionId 2), byt till annan ljudfil
    if (mission.missionId === 2) {
      newMission.audioOverride = 'uppdrag-2-del-2.mp3';
    }

    // Visa stämpel alltid, oavsett mission
    const stamp = document.createElement('img');
    stamp.src = '../../media/pictures/fallet_avslutat.png';
    stamp.alt = 'Fallet avslutat';
    stamp.className = 'stamp';
    document.body.appendChild(stamp);

    // Starta animation
    setTimeout(() => {
      stamp.classList.add('show');
    }, 10);

    // Gå till nästa sida efter animationen
    setTimeout(() => {
      renderRadioPage('body', newMission);
    }, 800);
  });

}

function renderInputs(mission) {
  let html = '';

  mission.questions.forEach((question) => {
    html += `
      <div class="inputDiv">
        <p>${question}</p>
        <input type="text" required>
      </div>
    `;
  });

  return html;
}

renderReportPage('body');
