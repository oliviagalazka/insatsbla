// renderReportPage-funktion - HELT OMARBETAD FÖR ATT FIXA FLÖDET
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
        <p>Aspirantgrupp: Insats blå</p>
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

    let allCorrect = true;  // Deklarera allCorrect här

    // Samla in användarens svar och kontrollera korrekthet
    inputs.forEach((input, index) => {
      const userAnswer = input.value.trim().toLowerCase();
      answers.push(userAnswer);

      const correctEntry = missionCopy.questions[index];
      if (correctEntry && correctEntry.correctAnswers) {
        const isCorrect = correctEntry.correctAnswers.some(correct =>
          correct.toLowerCase() === userAnswer
        );

        if (!isCorrect) {
          allCorrect = false;
        }
      }
    });

    // Kontrollera om det finns dubblettsvar EFTER loopen
    const uniqueAnswers = new Set(answers);
    const hasDuplicates = uniqueAnswers.size < answers.length;

    // Om dubbletter finns i Mission 1, sätt allCorrect till false
    if (hasDuplicates && missionId === 1) {
      allCorrect = false;
    }


    // Hämta befintliga rapporter igen (kan ha ändrats)
    const existingReports = JSON.parse(localStorage.getItem('reportAnswers')) || [];
    const reportIndex = existingReports.findIndex(r => r.missionId === missionCopy.missionId);

    // Visa stämpel
    const stamp = document.createElement('img');
    stamp.src = './media/pictures/fallet_avslutat.png';
    stamp.alt = 'Fallet avslutat';
    stamp.className = 'stamp';
    document.body.appendChild(stamp);

    setTimeout(() => stamp.classList.add('show'), 5);

    // Hitta rätt tweet-uppsättning baserat på missionId
    const tweetData = tweets.find(t => t.missionId === missionId);

    if (tweetData) {
      const tweetType = allCorrect ? tweetData.good : tweetData.bad;

      // Välj två slumpade tweets från rätt kategori
      const shuffledTweets = [...tweetType].sort(() => 0.5 - Math.random());
      const selectedTweets = shuffledTweets.slice(0, 2);

      // Visa tweets som notiser
      selectedTweets.forEach(tweet => {
        createTweetNotification(tweet.username, tweet.text);
      });
    }

    // Hantera Mission 2 specifikt
    if (missionId === 2) {
      if (isSecondReportStep) {
        // Andra rapporten för Mission 2
        if (reportIndex !== -1) {
          // Uppdatera den befintliga rapporten med nya svar
          existingReports[reportIndex].answers = answers;
          localStorage.setItem('reportAnswers', JSON.stringify(existingReports));

          // Ta bort flaggan för andra steget
          localStorage.removeItem('bikeReportStep');

          // Navigera till nyhetssidan efter andra rapporten
          setTimeout(() => {
            renderNewsPage('body');
          }, 4500);
        }
      } else {
        // Första rapporten för Mission 2
        // Spara första rapportens svar
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

        // Sätt flaggan för andra rapporten
        localStorage.setItem('bikeReportStep', 'second');

        // Navigera till radiosidan med del 2 av uppdraget
        setTimeout(() => {
          const newMission = {
            missionId: missionId,
            text: missionCopy.mission,
            audioOverride: 'uppdrag-2-del-2.mp3'
          };
          renderRadioPage('body', newMission);
        }, 800);
      }
    } else {
      // Hantering för Mission 1, 3 och 4
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

      // Lås upp nästa mission
      let missions = JSON.parse(localStorage.getItem('missions'));
      if (missions) {
        const currentIndex = missions.findIndex(m => m.missionId === missionCopy.missionId);
        if (currentIndex !== -1 && currentIndex + 1 < missions.length) {
          missions[currentIndex + 1].locked = false;
          localStorage.setItem('missions', JSON.stringify(missions));
        }
      }



      // Navigera vidare beroende på missionId
      setTimeout(() => {
        if (missionId === 3 || missionId === 4) {
          renderLandingPage('body');
        } else {
          renderNewsPage('body');
        }
      }, 4500);
    }
  });

}

// renderInputs-funktion för att skapa inmatningsfält för användaren
function renderInputs(mission, previousAnswers = [], isSecondStep = false) {
  let html = '';

  // Mission 2, steg 2: tidigare svar + nytt fält
  if (mission.missionId === 2 && isSecondStep) {
    for (let i = 0; i < mission.questions.length; i++) {
      const q = mission.questions[i];
      const value = previousAnswers[i] || '';
      html += `<div class="inputDiv">
        <p>${q.question}</p>
        <input type="text" required value="${value}">
      </div>`;
    }

    // Extra fält för koordinater
    html += `<div class="inputDiv">
      <p>Cykelns koordinater:</p>
      <input type="text" required value="">
    </div>`;
  } else {
    // Övriga missioner och steg 1 i mission 2
    mission.questions.forEach((q, i) => {
      const value = previousAnswers[i] || '';
      html += `<div class="inputDiv">
        <p>${q.question}</p>
        <input type="text" required value="${value}">
      </div>`;
    });
  }

  return html;
}
