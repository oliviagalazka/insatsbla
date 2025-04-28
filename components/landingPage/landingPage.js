// renderLandingPage()-funktion
function renderLandingPage(parentId) {
    document.body.className = 'body-landingpage';

    const parent = document.querySelector(parentId);
    parent.innerHTML = '';

    // Skapa wrapper
    const wrapper = document.createElement('div');
    wrapper.id = 'wrapper-landingpage';
    parent.appendChild(wrapper);

    // Skapa nav
    renderNav(wrapper.id);

    // Skapa innehåll
    wrapper.innerHTML += `
        <h1>Dagens Agenda</h1>
        <h2>Kommande insatser</h2>
        <div id="button-container"></div>
    `;

    // Skapa knappar
    const buttonContainer = document.getElementById('button-container');
    missions.forEach((mission, index) => {
        const button = document.createElement('div');
        button.className = `mission-button ${mission.locked ? 'locked' : 'unlocked'}`;

        const missionText = document.createElement('p');
        missionText.textContent = mission.text;

        const icon = document.createElement('div');
        icon.innerHTML = lockIconSVG;

        button.append(missionText, icon);
        button.addEventListener('click', () => handleMissionClick(mission, index, missions));

        buttonContainer.appendChild(button);
    });
}

// Hantera knappar
function handleMissionClick(mission, index, missions) {
    if (mission.locked) {
        console.log('Detta uppdrag är låst.');
        return;
    }

    localStorage.setItem('missionId', mission.missionId);
    console.log('Uppdrag sparat:', mission.text);

    if (index + 1 < missions.length) {
        missions[index + 1].locked = false;
    }

    renderRadioPage('body', mission);
    playRadioSound();
}

// Spela radiosignal
function playRadioSound() {
    const radioAudio = new Audio('./media/audios/radio-wave.mp3');
    radioAudio.play();
}