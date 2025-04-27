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

    greenBtn.addEventListener('click', () => {
        if (newAudio) {
            newAudio.pause();
            newAudio.currentTime = 0;
        }

        radioAudio.pause();
        radioAudio.currentTime = 0;

        newAudio = new Audio(`./media/audios/${getAudioForMission(mission.text)}`);
        newAudio.loop = false; // Viktigt! Inte loopa missionsljudet

        newAudio.addEventListener('loadedmetadata', () => {
            startCountdown(newAudio.duration);
        });

        newAudio.play().catch(e => console.warn("Kunde inte spela nytt ljud:", e));
    });

    redBtn.addEventListener('click', () => {
        newAudio.pause();
        renderbikeVideoPage('body');
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

// SVG-ikoner
const phoneGreenIconSVG = `
    <svg width="14" height="14" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.133798 14.1562C-0.143542 10.2109 -0.260731 10.5039 2.6299 7.29677C10.3369 -1.24232 14.8569 -1.74622 18.1219 2.99208C18.1532 3.03895 18.1805 3.07411 18.2157 3.11708C29.9187 17.6561 29.2506 15.2191 19.8054 30.0821C19.3836 30.7461 19.3562 31.5313 19.7351 32.2227C24.7351 41.336 28.8874 45.4887 37.9971 50.4847C38.6885 50.8636 39.4737 50.8401 40.1377 50.4144C55.0007 40.9691 52.5637 40.3014 67.1027 52.0042C67.1457 52.0393 67.1848 52.0667 67.2277 52.0979C71.966 55.3635 71.4621 59.887 62.923 67.5899C59.716 70.4805 60.0089 70.3672 56.0636 70.086C31.1966 68.3282 1.8918 39.0242 0.133798 14.1562Z" fill="green"/>
    </svg>
`;

const phoneRedIconSVG = `
    <svg width="15.76" height="6.22" viewBox="0 0 86 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M82.6586 13.196C85.6445 15.7896 85.5202 15.4996 85.744 19.8113C86.3323 31.2991 83.4925 34.8515 77.8333 33.8097C77.7781 33.7987 77.7339 33.7932 77.6787 33.7876C59.1228 31.7823 61.3183 33.0331 57.4874 15.8447C57.3161 15.0768 56.7803 14.5023 56.0235 14.2813C46.0439 11.3728 40.1713 11.3725 30.1971 14.2813C29.4403 14.5023 28.9016 15.0741 28.7332 15.8447C24.9023 33.0332 27.0976 31.7821 8.54189 33.7876C8.48664 33.7932 8.43969 33.8014 8.38721 33.8097C2.72759 34.8511 -0.114687 31.2962 0.476595 19.8113C0.700324 15.4997 0.573325 15.7869 3.56191 13.196C22.3885 -3.14466 63.8312 -3.14523 82.6586 13.196Z" fill="red"/>
    </svg>
`;

const replayIconSVG = `
    <svg width="16" height="16" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.8628 8.31888L18.7474 12.6676C19.5905 13.0917 19.5905 14.4101 18.7474 14.8342L10.8628 19.1829C10.0809 19.6479 8.99762 19.0092 9.02826 18.0996V9.40221C8.9976 8.49264 10.086 7.84875 10.8628 8.31888ZM23.1013 5.27329H24.3123C25.6563 5.23752 25.6614 3.26505 24.3123 3.22927H20.5716C20.0095 3.22927 19.5496 3.68916 19.5496 4.25128V7.992C19.5854 9.33595 21.5579 9.34105 21.5936 7.992V6.66849C27.6338 13.6796 22.5083 24.7428 13.2489 24.7069C7.20877 24.7069 2.29303 19.7911 2.29303 13.7509C2.29303 7.71077 7.20877 2.79499 13.2489 2.79499C13.811 2.79499 14.2709 2.33511 14.2709 1.77299C14.2709 1.21086 13.811 0.750977 13.2489 0.750977C6.0795 0.750977 0.249023 6.5815 0.249023 13.7509C0.249023 20.9204 6.0795 26.7509 13.2489 26.7509C24.2813 26.7918 30.337 13.5772 23.1013 5.27329Z" fill="white" />
    </svg>
`;

const pauseIconSVG = `
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.533 0C11.6083 0 10.957 0.845601 10.957 1.75182V10.2494C10.957 11.1557 11.6083 12 12.533 12H14.4489C15.3735 12 16.0248 11.1557 16.0248 10.2494V1.75182C16.0248 0.845601 15.3735 0 14.4489 0H12.533ZM18.5044 0C17.5797 0 16.9272 0.845601 16.9272 1.75182V10.2494C16.9272 11.1557 17.5797 12 18.5044 12H20.419C21.3437 12 22 11.1557 22 10.2494V1.75182C22 0.845601 21.3437 0 20.419 0H18.5044ZM2.05871 0.00761499C1.72147 0.00990569 1.38884 0.095617 1.09318 0.250078C0.462429 0.57959 -0.00041791 1.22256 2.83157e-07 2.02095V9.99429C0.00855979 11.5861 1.86268 12.5416 3.18095 11.6547C3.18264 11.6547 3.18433 11.6547 3.18601 11.6547L9.07021 7.67248C9.07189 7.67249 9.07358 7.67249 9.07527 7.67248C9.62423 7.29532 9.9537 6.66576 9.94979 5.9981C9.94861 5.33572 9.61986 4.71683 9.07525 4.34275C9.07357 4.34274 9.07188 4.34274 9.07019 4.34275L3.186 0.346556C3.18431 0.34655 3.18262 0.34655 3.18094 0.346556C2.82986 0.110267 2.44092 0.00502017 2.05871 0.00761499Z" fill="white"/>
    </svg>
`;

const arrowIconSVG = `
    <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.21883 1.73168L4.72986 5.17502H16V7.62439H4.83924L8.32899 11.0679L6.5738 12.7998L4.07809e-07 6.37868L6.46385 -0.000195503L8.21883 1.73168Z" fill="white"/>
    </svg>
`;

const spaceIconSVG = `
    <svg width="16" height="5" viewBox="0 0 16 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.8 0C1.24182 0 1.6 0.3731 1.6 0.833333V2.5C1.6 2.96025 1.95818 3.33333 2.4 3.33333H13.6C14.0418 3.33333 14.4 2.96025 14.4 2.5V0.833333C14.4 0.3731 14.7582 0 15.2 0C15.6418 0 16 0.3731 16 0.833333V2.5C16 3.88075 14.9255 5 13.6 5H2.4C1.07452 5 0 3.88075 0 2.5V0.833333C0 0.3731 0.358176 0 0.8 0Z" fill="white"/>
    </svg>
`;

// Funktion för att alltid visa dagens datum på radioskärmen
function showTodaysDate() {
    return new Date().toLocaleDateString('sv-SE');
}

// Hjälpfunktioner för att välja rätt ljud och text baserat på uppdraget
function getSubheadingForMission(missionText) {
    switch (missionText) {
        case '1. Giftiga Bullar': return 'Kundsparken';
        case '2. Cykelstölden': return 'Hansa';
        case '3. Hemlöse Pia': return 'Caroli';
        case '4. Kokainjakten': return 'Malmö universitet';
    }
}

function getAudioForMission(missionText) {
    switch (missionText) {
        case '1. Giftiga Bullar': return 'uppdrag-1.mp3';
        case '2. Cykelstölden': return 'uppdrag-2-del-1.mp3';
        case '3. Hemlöse Pia': return 'uppdrag-3.mp3';
        case '4. Kokainjakten': return 'uppdrag-4.mp3';
    }
}