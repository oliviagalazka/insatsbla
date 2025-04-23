function renderRapport(parent) {
  const wrapper = document.querySelector(parent);
  container.innerHTML = `
    <div class="rapportInfo">
      <img src="../../media/pictures/rapportImg.png" alt="Polisens emblem">
      <div class="rapportText">
        <h1>Utryckningsrapport</h1>
        <p>Aspirantgrupp: Insats blå</p>
        <p>Datum: 9/4/2025</p>
      </div>
    </div>

    <div class="rapportDiv">
      <h1>Cykelstölden</h1>

      <div class="inputDiv">
        <p>Hade förövaren något på huvudet?</p>
        <input type="text">
      </div>

      <div class="inputDiv">
        <p>Vilken färg var förövarens jacka?</p>
        <input type="text">
      </div>

      <div class="inputDiv">
        <p>Bar förövaren på något?</p>
        <input type="text">
      </div>

      <div class="inputDiv"> 
        <p>Vad kastade förövaren ifrån sig?</p>
        <input type="text">
      </div>

      <div class="inputDiv">
        <p>Vad hade förövaren på fötterna?</p>
        <input type="text">
      </div>
    </div>

    <div class="skickaIn">
      <p>
        Jag intygar på heder och samvete att ovanstående uppgifter är riktiga och sanningsenliga.
      </p>
      <button>Skicka in</button>
    </div>
  `;
}
