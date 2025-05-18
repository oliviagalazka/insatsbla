function updateTotalScore(scoreToAdd) {
  const currentScore = parseInt(localStorage.getItem('totalScore'), 10) || 0;
  const newScore = currentScore + scoreToAdd;
  localStorage.setItem('totalScore', newScore);
}

// renderReportPage-funktion - HELT OMARBETAD FÖR ATT FIXA FLÖDET
function renderReportPage(parentId) {
  localStorage.setItem('currentView', 'report');

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

  // Skapa en kopia av mission-objektet som vi kan modifiera
  const missionCopy = JSON.parse(JSON.stringify(mission));

  // Hämta befintliga rapporter
  const existingReports = JSON.parse(localStorage.getItem('reportAnswers')) || [];
  const previousReport = existingReports.find(r => r.missionId === missionId);

  // Hämta tidigare svar om de finns
  let previousAnswers = [];
  if (previousReport) {
    previousAnswers = previousReport.answers;
  }

  // Kontrollera om detta är andra rapportvisningen i cykelstölden (missionId === 2)
  const isSecondReportStep = localStorage.getItem('bikeReportStep') === 'second';

  // Skapa wrapper
  const wrapper = document.createElement('div');
  wrapper.id = 'wrapper-reportpage';
  parent.appendChild(wrapper);

  // Skapa nav
  renderNav(wrapper.id);

  // Skapa innehåll
  const content = document.createElement('div');
  content.innerHTML = `
    <div class="rapportInfo">
      <img src="./media/pictures/rapportImg.png" alt="Polisens emblem">
      <div class="rapportText">
        <h1>${missionId === 4 ? 'Polisens databas' : 'Insatsrapport'}</h1>
        <p>Aspirantgrupp: Insats Blå</p>
        <p>Datum: ${showTodaysDate()}</p>
      </div>
    </div>

    <div class="rapportDiv">
      <h1>${missionCopy.mission}</h1>
      <form id="reportForm">
      ${renderInputs(missionCopy, previousAnswers, isSecondReportStep)}
        </div>
        <div class="skickaIn">
        ${missionId !== 4 ? '<p>Jag intygar på heder och samvete att ovanstående uppgifter är riktiga och sanningsenliga.</p>' : ''}
        <button id="submitBtn" type="submit">${missionId === 4 ? 'Sök' : 'Skicka in'}</button>
      </div>

      </form>
  `;

  wrapper.appendChild(content);

  // Lägg till eventlyssnare på knappen för submit
  const submitBtn = document.getElementById('submitBtn');

  submitBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Förhindrar att sidan laddas om

    const form = document.getElementById('reportForm');
    const inputs = form.querySelectorAll('input[type="text"]');
    let answers = [];  // Definiera answers här

    let score = 0;
    let results = []; // För popup

    inputs.forEach((input, index) => {
      const userAnswer = input.value.trim().toLowerCase();
      answers.push(userAnswer);

      const correctEntry = missionCopy.questions[index];
      let isCorrect = false;

      if (correctEntry && correctEntry.correctAnswers) {
        isCorrect = correctEntry.correctAnswers.some(correct =>
          correct.toLowerCase() === userAnswer
        );
      }

      if (isCorrect) score++;

      results.push({
        question: correctEntry?.question || 'Okänd fråga',
        userAnswer,
        isCorrect,
        correctAnswers: correctEntry?.correctAnswers || []
      });
    });


    // Kontrollera om det finns dubblettsvar EFTER loopen
    const uniqueAnswers = new Set(answers);
    const hasDuplicates = uniqueAnswers.size < answers.length;


    let allCorrect = score === missionCopy.questions.length;

    if (missionId === 1 && hasDuplicates) {
      allCorrect = false;
    }

    // Hämta befintliga rapporter igen (kan ha ändrats)
    const existingReports = JSON.parse(localStorage.getItem('reportAnswers')) || [];
    const reportIndex = existingReports.findIndex(r => r.missionId === missionCopy.missionId);

    // Visa stämpeln
    if (missionId !== 4) {
      const stamp = document.createElement('img');
      stamp.src = './media/pictures/fallet_avslutat.png';
      stamp.alt = 'Fallet avslutat';
      stamp.className = 'stamp';
      document.body.appendChild(stamp);

      setTimeout(() => stamp.classList.add('show'), 5);
    }

    if (missionId === 4) {
      showResultsPopup(results, score);
    } else {
      setTimeout(() => {
        showResultsPopup(results, score);
      }, 3000);
    }

    function showResultsPopup(results, score) {
      const overlay = document.createElement('div');
      overlay.id = 'popup-overlay';

      const popup = document.createElement('div');
      popup.id = 'results-popup';
      popup.innerHTML = `
        <h2>Resultatrapport</h2>
        <p>Du fick <b>${score} rätt</b>!</p>
        <div class="results-list">
          ${results.map(r => `
            <div class="result-item ${r.isCorrect ? 'correct' : 'incorrect'}">
              <p><strong>Fråga:</strong> ${r.question}</p>
              <p><strong>Ditt svar:</strong> ${r.userAnswer}</p>
              ${r.isCorrect ? '<p>Rätt!</p>' : `<p>Fel. Rätt svar: ${r.correctAnswers[0]}</p>`
        }
            </div >
      `).join('')}
        </div>
        <button id="closePopup">Klar</button>
      `;

      overlay.appendChild(popup);
      document.body.appendChild(overlay);

      document.getElementById('closePopup').addEventListener('click', () => {
        document.body.removeChild(overlay);

        // 🧠 Flyttad navigeringslogik hit
        if (missionId === 2) {
          if (isSecondReportStep) {
            if (reportIndex !== -1) {
              existingReports[reportIndex].answers = answers;
              localStorage.setItem('reportAnswers', JSON.stringify(existingReports));
              localStorage.removeItem('bikeReportStep');

              localStorage.setItem('lastMissionResult', JSON.stringify({
                missionId: missionId,
                allCorrect: allCorrect
              }));

              renderNewsPage('body');
            }
          } else {
            const report = {
              missionId: missionCopy.missionId,
              questions: missionCopy.questions,
              answers: answers
            };
            if (reportIndex !== -1) {
              existingReports[reportIndex] = report;
            } else {
              existingReports.push(report);
            }
            localStorage.setItem('reportAnswers', JSON.stringify(existingReports));
            localStorage.setItem('bikeReportStep', 'second');

            const newMission = {
              missionId: missionId,
              text: missionCopy.mission,
              audioOverride: 'uppdrag-2-del-2.mp3'
            };
            renderRadioPage('body', newMission);
            playRadioSound();
          }
        } else {
          const report = {
            missionId: missionCopy.missionId,
            questions: missionCopy.questions,
            answers: answers
          };
          if (reportIndex !== -1) {
            existingReports[reportIndex] = report;
          } else {
            existingReports.push(report);
          }
          localStorage.setItem('reportAnswers', JSON.stringify(existingReports));

          let missions = JSON.parse(localStorage.getItem('missions'));
          if (missions) {
            const currentIndex = missions.findIndex(m => m.missionId === missionCopy.missionId);
            if (currentIndex !== -1 && currentIndex + 1 < missions.length) {
              missions[currentIndex + 1].locked = false;
              localStorage.setItem('missions', JSON.stringify(missions));
            }
          }
          localStorage.setItem('lastMissionResult', JSON.stringify({
            missionId: missionId,
            allCorrect: allCorrect
          }));
          if (missionId === 4) {
            renderpersonRegPage('body'); // Visa personregistret först

            setTimeout(() => {
              // Spara i localStorage att mission 4 är färdigrapporterad
              let missionsState = JSON.parse(localStorage.getItem('missionsState')) || [];
              const index = missionsState.findIndex(m => m.missionId === 4);
              if (index !== -1) {
                missionsState[index].locked = false;
              } else {
                missionsState.push({ missionId: 4, locked: false });
              }
              localStorage.setItem('missionsState', JSON.stringify(missionsState));
              localStorage.setItem('personregComplete', 'true');

              renderLandingPage('body');
            }, 5000); // 10 sekunder
          } else if (missionId === 3) {
            renderLandingPage('body');
          } else {
            renderNewsPage('body');
          }

        }
      });

      // === Lägg till poängräkning till total score om tillämpligt ===
      if (missionId === 2) {
        if (isSecondReportStep) {
          updateTotalScore(score); // Endast ANDRA rapporten räknas
        }
      } else {
        updateTotalScore(score);
      }

    }
  });

}

function renderInputs(mission, previousAnswers = [], isSecondStep = false) {
  let html = '';
  const visibleQuestions = mission.questions.filter(q => !q.visibleIfSecondStep || isSecondStep);

  visibleQuestions.forEach((q, i) => {
    const value = previousAnswers[i] || '';
    const isLast = i === visibleQuestions.length - 1;

    // Om andra steget i cykelstölden och detta inte är sista fältet → readonly
    const readonlyAttr = (isSecondStep && !isLast) ? 'readonly' : '';

    html += `<div class="inputDiv">
      <p>${q.question}</p>
      <input type="text" required value="${value}" ${readonlyAttr}>
    </div>`;
  });

  return html;
}