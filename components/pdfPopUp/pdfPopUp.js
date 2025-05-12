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
        </div>` : ''}
    </div>
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
}
