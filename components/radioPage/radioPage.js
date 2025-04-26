function renderRadioPage(parentSelector) {
    const container = document.querySelector(parentSelector);

    container.innerHTML = '';

    container.innerHTML = `
                            <div id='radio-wrapper'>

                                <div id='antenna-container'></div>
                                <div id='antenna'></div>
                                <div id='side-button'></div>

                                <div id='radio-body'>
                                <audio id="radio-audio" src="./components/radioPage/radio-wave.mp3" loop></audio>

                                    <div id='radio'>
                                    
                                        <div id='mic-container'>
                                            <div class='mic'></div>
                                            <div class='mic'></div>
                                        </div>

                                        <div id='screen-container'>
                                            <div id='title'>Hansa</div>
                                            <div id='subheadings'>
                                                <div>Cykelstölden</div>
                                            </div>
                                            <div id='time'>
                                                <div>14/4/2025</div>
                                                <div>00:00:44</div>
                                            </div>
                                        </div>

                                        <div id='keypad'>
                                            <div class='button-containers'>
                                                <button class='btn'>${phoneGreen}</button>
                                                <button class='btn'>${pause}</button>
                                                <button class='btn'>${replay}</button>
                                                <button class='btn'>${phoneRed}</button>
                                            </div>

                                            <div class='button-containers'>
                                                <button class='btn'><p>1</p><p>,.?</p></button>
                                                <button class='btn'><p>2</p><p>abc</p></button>
                                                <button class='btn'><p>3</p><p>def</p></button>
                                                <button class='btn'>${arrow}</button>
                                            </div>

                                            <div class='button-containers'>
                                                <button class='btn'><p>4</p><p>ghi</p></button>
                                                <button class='btn'><p>5</p><p>jkl</p></button>
                                                <button class='btn'><p>6</p><p>mno</p></button>
                                                <button class='btn'>${space}</button>
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

    document.addEventListener('click', () => {
        const audio = document.getElementById('radio-audio');
        audio.play().catch(e => console.warn("Försökte spela ljud, men fick:", e));
    }, { once: true }); // Bara första klicket

    const greenBtn = document.querySelector('.btn'); // använd rätt selektor!
    greenBtn.addEventListener('click', () => {
        const audio = document.getElementById('radio-audio');
        audio.pause();
    });
}


const phoneGreen = `<svg width="14" height="14" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.133798 14.1562C-0.143542 10.2109 -0.260731 10.5039 2.6299 7.29677C10.3369 -1.24232 14.8569 -1.74622 18.1219 2.99208C18.1532 3.03895 18.1805 3.07411 18.2157 3.11708C29.9187 17.6561 29.2506 15.2191 19.8054 30.0821C19.3836 30.7461 19.3562 31.5313 19.7351 32.2227C24.7351 41.336 28.8874 45.4887 37.9971 50.4847C38.6885 50.8636 39.4737 50.8401 40.1377 50.4144C55.0007 40.9691 52.5637 40.3014 67.1027 52.0042C67.1457 52.0393 67.1848 52.0667 67.2277 52.0979C71.966 55.3635 71.4621 59.887 62.923 67.5899C59.716 70.4805 60.0089 70.3672 56.0636 70.086C31.1966 68.3282 1.8918 39.0242 0.133798 14.1562Z" fill="green"/>
                    </svg>`;

const phoneRed = `<svg width="15.76" height="6.22" viewBox="0 0 86 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M82.6586 13.196C85.6445 15.7896 85.5202 15.4996 85.744 19.8113C86.3323 31.2991 83.4925 34.8515 77.8333 33.8097C77.7781 33.7987 77.7339 33.7932 77.6787 33.7876C59.1228 31.7823 61.3183 33.0331 57.4874 15.8447C57.3161 15.0768 56.7803 14.5023 56.0235 14.2813C46.0439 11.3728 40.1713 11.3725 30.1971 14.2813C29.4403 14.5023 28.9016 15.0741 28.7332 15.8447C24.9023 33.0332 27.0976 31.7821 8.54189 33.7876C8.48664 33.7932 8.43969 33.8014 8.38721 33.8097C2.72759 34.8511 -0.114687 31.2962 0.476595 19.8113C0.700324 15.4997 0.573325 15.7869 3.56191 13.196C22.3885 -3.14466 63.8312 -3.14523 82.6586 13.196Z" fill="red"/>
                </svg>`;

const replay = `<svg width="16" height="16" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8628 8.31888L18.7474 12.6676C19.5905 13.0917 19.5905 14.4101 18.7474 14.8342L10.8628 19.1829C10.0809 19.6479 8.99762 19.0092 9.02826 18.0996V9.40221C8.9976 8.49264 10.086 7.84875 10.8628 8.31888ZM23.1013 5.27329H24.3123C25.6563 5.23752 25.6614 3.26505 24.3123 3.22927H20.5716C20.0095 3.22927 19.5496 3.68916 19.5496 4.25128V7.992C19.5854 9.33595 21.5579 9.34105 21.5936 7.992V6.66849C27.6338 13.6796 22.5083 24.7428 13.2489 24.7069C7.20877 24.7069 2.29303 19.7911 2.29303 13.7509C2.29303 7.71077 7.20877 2.79499 13.2489 2.79499C13.811 2.79499 14.2709 2.33511 14.2709 1.77299C14.2709 1.21086 13.811 0.750977 13.2489 0.750977C6.0795 0.750977 0.249023 6.5815 0.249023 13.7509C0.249023 20.9204 6.0795 26.7509 13.2489 26.7509C24.2813 26.7918 30.337 13.5772 23.1013 5.27329Z" fill="white" />
                </svg>`;

const pause = `<svg width="16" height="16" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.5 0C14.5507 0 0 14.5507 0 32.5C0 50.4493 14.5507 65 32.5 65C50.4493 65 65 50.4493 65 32.5C65 14.5507 50.4493 0 32.5 0ZM28.2824 46.4286H21.8493V18.5714H28.2824V46.4286ZM43.1544 46.4286H36.7213V18.5714H43.1544V46.4286Z" fill="white"/>
                </svg>`;

const arrow = `<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.21883 1.73168L4.72986 5.17502H16V7.62439H4.83924L8.32899 11.0679L6.5738 12.7998L4.07809e-07 6.37868L6.46385 -0.000195503L8.21883 1.73168Z" fill="white"/>
                </svg>`;

const space = `<svg width="16" height="5" viewBox="0 0 16 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.8 0C1.24182 0 1.6 0.3731 1.6 0.833333V2.5C1.6 2.96025 1.95818 3.33333 2.4 3.33333H13.6C14.0418 3.33333 14.4 2.96025 14.4 2.5V0.833333C14.4 0.3731 14.7582 0 15.2 0C15.6418 0 16 0.3731 16 0.833333V2.5C16 3.88075 14.9255 5 13.6 5H2.4C1.07452 5 0 3.88075 0 2.5V0.833333C0 0.3731 0.358176 0 0.8 0Z" fill="white"/>
                </svg>`;