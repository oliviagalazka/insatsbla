function renderRadioPage(parent, mission) {
    document.body.className = 'body-radiopage';

    const container = document.querySelector(parent);

    container.innerHTML = `
      <div id='radio-wrapper'>
          <div id='antenna-container'></div>
          <div id='antenna'></div>
          <div id='side-button'></div>
  
          <div id='radio-body'>
              <audio id="radio-audio" src="./media/audios/radio-wave.mp3" loop></audio>
  
              <div id='radio'>
                  <div id='mic-container'>
                      <div class='mic'></div>
                      <div class='mic'></div>
                  </div>
  
                  <div id='screen-container'>
                      <div id='title'>${mission.text}</div>
                      <div id='subheadings'>
                          <div>${getSubheadingForMission(mission.text)}</div>
                      </div>
                      <div id='time'>
                          <div>${showTodaysDate()}</div>
                          <div>00:00</div>
                      </div>
                  </div>
  
                  <div id='keypad'>
                      <div class='button-containers'>
                          <button class='btn' id='green-btn'>${phoneGreenIconSVG}</button>
                          <button class='btn' id='pause-btn'>${pauseIconSVG}</button>
                          <button class='btn' id='replay-btn'>${replayIconSVG}</button>
                          <button class='btn' id='red-btn'>${phoneRedIconSVG}</button>
                      </div>
  
                      <div class='button-containers'>
                          <button class='btn'><p>1</p><p>,.?</p></button>
                          <button class='btn'><p>2</p><p>abc</p></button>
                          <button class='btn'><p>3</p><p>def</p></button>
                          <button class='btn'>${arrowIconSVG}</button>
                      </div>
  
                      <div class='button-containers'>
                          <button class='btn'><p>4</p><p>ghi</p></button>
                          <button class='btn'><p>5</p><p>jkl</p></button>
                          <button class='btn'><p>6</p><p>mno</p></button>
                          <button class='btn'>${spaceIconSVG}</button>
                      </div>
  
                      <div class='button-containers'>
                          <button class='btn'><p>7</p><p>pqrs</p></button>
                          <button class='btn'><p>8</p><p>tuv</p></button>
                          <button class='btn'><p>9</p><p>wxyz</p></button>
                          <button class='btn'><p>0</p><p>åäö</p></button>
                      </div>
                  </div>
  
                  <div id='label'>DMR Transceiver</div>
              </div>
          </div>
      </div>
    `;

    const radioAudio = document.getElementById('radio-audio');

    // Starta grundljudet vid första klicket någonstans
    document.addEventListener('click', () => {
        radioAudio.play().catch(e => console.warn("Försökte spela grundljud:", e));
    }, { once: true });

    // Hantera knapptryckningar
    const greenBtn = document.getElementById('green-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const replayBtn = document.getElementById('replay-btn');
    const redBtn = document.getElementById('red-btn');

    let newAudio = null; // variabel för nytt ljud

    let countdownInterval = null; // För att kunna stoppa räknaren
    const timeDisplay = document.querySelector('#time div:last-child'); // Elementet som visar tiden

    let hasAnsweredCall = false;


    greenBtn.addEventListener('click', () => {
        if (newAudio) {
            newAudio.pause();
            newAudio.currentTime = 0;
        }

        radioAudio.pause();
        radioAudio.currentTime = 0;

        // newAudio = new Audio(`./media/audios/${getAudioForMission(mission.missionId)}`);
        const audioSource = mission.audioOverride ?? getAudioForMission(mission.missionId);
        newAudio = new Audio(`./media/audios/${audioSource}`);
        newAudio.loop = false; // Viktigt! Inte loopa missionsljudet

        newAudio.addEventListener('loadedmetadata', () => {
            startCountdown(newAudio.duration);
        });

        newAudio.play().catch(e => console.warn("Kunde inte spela nytt ljud:", e));

        hasAnsweredCall = true;

    });


    // redBtn.addEventListener('click', () => {
    //     if (!hasAnsweredCall) {
    //         alert("Du måste ha tagit emot ditt samtal före du kan påbörja insatsen");
    //         return;
    //     }

    //     if (newAudio) {
    //         newAudio.pause();
    //     }

    //     const missionId = mission.missionId;

    //     if (missionId === 1) {
    //         renderReportPage('body');
    //     } else if (missionId === 2) {
    //         if (mission.audioOverride === 'uppdrag-2-del-2.mp3') {
    //             renderReportPage('body');
    //         } else {
    //             renderbikeVideoPage('body');
    //         }
    //     } else if (missionId === 3 || missionId === 4) {
    //         renderNewsPage('body');
    //     } else {
    //         console.warn('Okänt missionId:', missionId);
    //     }
    // });

    redBtn.addEventListener('click', () => {
        if (!hasAnsweredCall) {
            showLockedPopup('Du måste ha tagit emot ditt samtal före du kan påbörja insatsen.'); // Använd popup istället för alert
            return;
        }

        if (newAudio) {
            newAudio.pause();
        }

        const missionId = mission.missionId;

        if (missionId === 1) {
            renderReportPage('body');
        } else if (missionId === 2) {
            if (mission.audioOverride === 'uppdrag-2-del-2.mp3') {
                renderReportPage('body');
            } else {
                renderbikeVideoPage('body');
            }
        } else if (missionId === 3 || missionId === 4) {
            renderNewsPage('body');
        } else {
            console.warn('Okänt missionId:', missionId);
        }
    });



    pauseBtn.addEventListener('click', () => {
        // Om det nya ljudet är igång
        if (newAudio) {
            if (newAudio.paused) {
                // Spela upp om pausat
                newAudio.play().catch(e => console.warn("Kunde inte återuppta ljudet:", e));
            } else {
                // Pausa om ljudet är igång
                newAudio.pause();
            }
        } else if (radioAudio) {
            // Om grundljudet är igång
            if (radioAudio.paused) {
                // Spela upp om pausat
                radioAudio.play().catch(e => console.warn("Kunde inte återuppta grundljudet:", e));
            } else {
                // Pausa om ljudet är igång
                radioAudio.pause();
            }
        }
    });

    replayBtn.addEventListener('click', () => {
        if (newAudio) {
            newAudio.currentTime = 0;
            newAudio.play().catch(e => console.warn("Kunde inte spela om ljudet:", e));
        }
    });

    function startCountdown(duration) {
        clearInterval(countdownInterval); // Om det fanns en gammal räknare

        let timeLeft = Math.floor(duration);

        updateDisplay(timeLeft);

        countdownInterval = setInterval(() => {
            if (newAudio && !newAudio.paused) {
                timeLeft = Math.floor(newAudio.duration - newAudio.currentTime);
                updateDisplay(timeLeft);

                if (timeLeft <= 0) {
                    clearInterval(countdownInterval);
                }
            }
        }, 1000);
    }

    function updateDisplay(seconds) {
        const min = String(Math.floor(seconds / 60)).padStart(2, '0');
        const sec = String(seconds % 60).padStart(2, '0');
        timeDisplay.textContent = `${min}:${sec}`;
    }
}

// Hjälpfunktioner för att välja rätt ljud och text baserat på uppdraget
function getSubheadingForMission(missionText) {
    switch (missionText) {
        case '1. Giftiga Bullar': return 'Kungsparken';
        case '2. Cykelstölden': return 'Hansa';
        case '3. Hemlöse Pia': return 'Caroli';
        case '4. Kokainjakten': return 'Malmö universitet';
        default: return 'Okänd plats';
    }
}

function getAudioForMission(missionId) {
    switch (missionId) {
        case 1: return 'uppdrag-1.mp3';
        case 2: return 'uppdrag-2-del-1.mp3';
        case 3: return 'uppdrag-3.mp3';
        case 4: return 'uppdrag-4.mp3';
        default: return 'radio-wave.mp3';
    }
}