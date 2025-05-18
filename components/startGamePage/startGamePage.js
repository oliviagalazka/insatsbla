function renderStartGamePage(parentSelector = 'body') {
    document.body.className = 'body-startgamepage';

    const parent = document.querySelector(parentSelector);
    parent.innerHTML = `
        <div id='content-wrapper'>
            <div id='big-heading'>
                <h1>INSATS</h1>
                <h1>BLÅ</h1>
            </div>
            <div>
                <p>Idag kommer ditt fokus, tålamod och din skärpa att sättas på prov. Du står i frontlinjen för samhällets säkerhet, redo att agera när det verkligen gäller. Är ni flera? Samarbeta tätt och spela på varsin enhet. Spelar du ensam? Då krävs full disciplin - säkerheten vilar helt på dina axlar.</p>
                <p>Lyssna på radion. Följ instruktionerna. Lös uppdragen.</p>
                <p>Lycka till. Och glöm inte… var inte rädda, men var rädda om er.</p>
            </div>
            <button id='start-game-button'>Starta Spelet</button>
        </div>
    `;

    const startButton = document.querySelector('#start-game-button');
    startButton.addEventListener('click', () => renderIntroVideoPage());
}