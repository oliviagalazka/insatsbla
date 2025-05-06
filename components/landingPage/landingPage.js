// Renderar startsidan (landningssidan) för spelet
function renderLandingPage(selector) {
    localStorage.setItem('currentView', 'landing');
    document.body.className = 'body-landingpage'; // Byt bakgrund/stil för landningssidan

    const parent = document.querySelector(selector);
    parent.innerHTML = ''; // Rensa tidigare innehåll

    // Skapa en wrapper för sidan
    const wrapper = document.createElement('div');
    wrapper.id = 'wrapper-landingpage';
    parent.appendChild(wrapper);

    renderNav(wrapper.id);             // Rendera navigationsmenyn
    renderLandingContent(wrapper);     // Lägg till rubriker och behållare


    const savedMissions = localStorage.getItem('missionsState');


    if (savedMissions) {
        const saved = JSON.parse(savedMissions);
        saved.forEach((savedMission, i) => {
            if (missions[i]) {
                missions[i].locked = savedMission.locked;
            }
        });
    }

    renderMissionButtons();            // Skapa uppdragsknappar

    const lastResult = JSON.parse(localStorage.getItem('lastMissionResult'));

    if (lastResult && typeof lastResult.missionId === 'number') {
      const tweetData = tweets.find(t => t.missionId === lastResult.missionId);
      if (tweetData) {
        const tweetTypeArray = lastResult.allCorrect ? tweetData.good : tweetData.bad;
        const shuffledTweets = [...tweetTypeArray].sort(() => 0.5 - Math.random());
        const selectedTweets = shuffledTweets.slice(0, 2);
        selectedTweets.forEach((tweet, index) => {
            setTimeout(() => {
              createTweetNotification(tweet.username, tweet.text);
            }, index * 5000); // 5 sekunder mellan varje tweet (4.5s visning + liten paus)
          });
          
      }
    
      // Ta bort efter visning så det inte visas igen varje gång
      localStorage.removeItem('lastMissionResult');
    }
    

}

// Renderar rubriker och en behållare för knapparna
function renderLandingContent(wrapper) {
    wrapper.innerHTML += `
        <h1>Dagens Agenda</h1>
        <h2>Insatser</h2>
        <div id="button-container"></div>
    `;
}

// Renderar uppdragsknappar utifrån missions-arrayen
function renderMissionButtons() {
    const buttonContainer = document.getElementById('button-container');

    missions.forEach((mission, index) => {
        // Skapa knapp-element
        const button = document.createElement('div');
        button.className = `mission-button ${mission.locked ? 'locked' : 'unlocked'}`;

        // Lägg till uppdragstext
        const missionText = document.createElement('p');
        missionText.textContent = mission.text;

        // Välj rätt ikon beroende på låst status
        const icon = document.createElement('div');
        icon.innerHTML = mission.locked ? lockedIconSVG : unlockedIconSVG;

        // Bygg ihop knappen
        button.append(missionText, icon);

        // Lägg till klickhändelse
        button.addEventListener('click', () => handleMissionClick(mission, index, missions));

        // Lägg till knappen i DOM:en
        buttonContainer.appendChild(button);
    });
}

// Hanterar vad som händer när en uppdragsknapp klickas
function handleMissionClick(mission, index, missions) {
    if (mission.locked) {
        showLockedPopup('Denna insats är låst. Slutför föregående insats först.');
        return;
    }

    // Spara uppdragets ID i localStorage
    localStorage.setItem('missionId', mission.missionId);
    console.log('Uppdrag sparat:', mission.text);

    // Lås upp nästa uppdrag (om det finns)
    if (index + 1 < missions.length) {
        missions[index + 1].locked = false;
    }

    // Spara uppdaterade missions-arrayen till localStorage
    localStorage.setItem('missionsState', JSON.stringify(missions));


    // Gå vidare till radiosidan
    renderRadioPage('body', mission);
    playRadioSound();
}

// Visar en popup om användaren klickar på ett låst uppdrag
function showLockedPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'locked-popup';
    popup.textContent = message;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000);
}


// Spelar upp radiosignalen när ett uppdrag startar
function playRadioSound() {
    const radioAudio = new Audio('./media/audios/radio-wave.mp3');
    radioAudio.play();
}