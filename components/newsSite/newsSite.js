function renderNewsPage(parent) {
  document.body.className = 'body-newsSite';

  const wrapper = document.querySelector(parent);
  wrapper.innerHTML = `
    <h1>SYDSVENSKAN</h1>
    
    <div class="newsNav">
      <div class="places">
        <p>Malmö</p>
        <p>Lund</p>
      </div>
      <div class="xtra">
        <p>+Allt</p>
      </div>
    </div>

    <div class="notis">
      <p class="red">Just nu</p>
      <p>Farliga bullar i Kungsparken</p>
    </div>

    <div class="notis">
      <p class="red">Direkt</p>
      <p>Polisens duktiga arbete i parken</p>
    </div>

    <div class="newsTxt">
      <img src="../../media/pictures/cykeltjuven.png" alt="Statz">
      <p>
      ${newsText[0].text}
      </p>
    </div>
  `;
}
