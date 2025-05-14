function renderpdfPopUp(parent) {
  const wrapper = document.querySelector(parent);
  wrapper.innerHTML = '';

  const totalScore = parseInt(localStorage.getItem('totalScore'), 10); // Hämta poängen
  const passed = totalScore >= 14; // Justera gränsen för godkänt här

  const { goodHeader, goodTxt, badHeader, badTxt } = ending[0];

  const headerText = passed ? goodHeader : badHeader;
  const bodyText = passed ? goodTxt : badTxt;

  // Lägg till popup-innehållet
  wrapper.innerHTML = `
    <div class="pdfPopUp">
      <h1 class="glitterText">${headerText}</h1>
      <p>${bodyText}</p>
      ${passed ? `
        <div class="buttonDiv">
          <button class="pdfDownload"><span>Ladda ned certifikat</span></button>

        </div>

        ` 
        
        : ''}
    </div>
                      <button class="quitGame">Avsluta spelet</button>
  `;

  // Lägg till nedladdningsfunktion om godkänt
  if (passed) {
    const button = wrapper.querySelector(".pdfDownload");
    button.addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = "./media/pictures/diplomcertifikat.png";
      link.download = "certifikat.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  // Event för "Avsluta spelet"-knappen
  const quitButton = wrapper.querySelector(".quitGame");
  if (quitButton) {
    quitButton.addEventListener("click", () => {
      localStorage.clear(); // Rensa all data

          // Återställ missions från original
    missions.length = 0; // töm arrayen
    originalMissions.forEach(m => missions.push({ ...m }));

    // Spara tillbaka till localStorage
    localStorage.setItem('missionsState', JSON.stringify(missions));
    localStorage.setItem('missions', JSON.stringify(missions));

      renderStartGamePage('body'); // Gå tillbaka till startsidan
    });
  }


}
