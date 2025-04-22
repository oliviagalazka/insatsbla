function renderRadioPage(parent) {
    const container = document.querySelector(parent);

    container.innerHTML = `

    <div class="device-wrapper">
  <div class="antenna"></div>
  <div class="side-button"></div>
                    <div class="device">

                    <div class="mic-container">
                        <div class="mic"></div>
                        <div class="mic"></div>
                    </div>

                    <div class="screen">
                        <p class="zone">Zone 1</p>
                        <p class="status">Insats blå</p>
                        <p class="incident">Cykelstölden</p>
                        <div class="info-bar">
                            <span id="date">14/4/2025</span>
                            <span id="timer">00:00:00</span>
                        </div>
                    </div>

                    <div class="keypad">
                        <div class="row">
                            <button class="btn green">📞</button>
                            <button class="btn">◀️</button>
                            <button class="btn">🔁</button>
                            <button class="btn red">📴</button>
                        </div>

                        <div class="row">
                            <button class="btn">1.,.?</button>
                            <button class="btn">2abc</button>
                            <button class="btn">3def</button>
                            <button class="btn">⏎</button>
                        </div>

                        <div class="row">
                            <button class="btn">4ghi</button>
                            <button class="btn">5jkl</button>
                            <button class="btn">6mno</button>
                            <button class="btn">✔</button>
                        </div>

                        <div class="row">
                            <button class="btn">7pqrs</button>
                            <button class="btn">8tuv</button>
                            <button class="btn">9wxyz</button>
                            <button class="btn">0åäö</button>
                        </div>
                    </div>

                    <div class="label">DMR Transceiver</div>
                </div>
                </div>`;
}