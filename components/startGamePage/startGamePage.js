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
                <p>Idag kommer ditt fokus, tålamod och skärpa sättas på prov. Du står på samhällets frontlinje - redo att agera när det gäller liv och säkerhet. Spelar ni flera? Samarbeta nära och spela på varsin enhet. Spelar du själv? Då gäller full disciplin - du har bara dig själv.</p>
                <p>Lyssna på radion. Följ instruktionerna. Lös uppdragen.</p>
                <p>Lycka till. Och glöm inte… var inte rädda, men var rädda om er.</p>
            </div>
            <button id='start-game-button'>Starta Spelet</button>
        </div>
    `;

    const startButton = document.querySelector('#start-game-button');
    startButton.addEventListener('click', () => renderIntroVideoPage());
}