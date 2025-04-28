
let newsText = [
  {
    missionId: 1,
    notis1:"Farliga bullar i Kungsparken",
    notis2:"Polisens duktiga arbete i parken",
    imgSource: "/media/pictures/giftiga_bullar.png",
    text:"detta är uppdrag 1"
  },
  {
    missionId:2,
    notis1:"Cykeltjuv i farten",
    notis2:"Cykelstölder i Malmö ökar lavinartat",
    imgSource:"/media/pictures/cykeltjuven.png",
    text:"<b>Cykelsäsongen börjar dra igång på allvar - och med den kommer cykelstölderna. Från april och framåt ökar antalet anmälda cykelstölder månad för månad.</b><br><br> Inte minst märks det i Malmö. 2024 gjordes 4 712 anmälningar om cykelstölder i kommunen, enligt siffror från Brottsförebyggande rådet, vilket motsvarar 13 anmälningar per 1 000 invånare. Det är tredje flest i landet och näst flest i Skåne, efter Lund - där det noterades 15,6 anmälningar per 1 000 invånare. <br><br> Dock är inte alla delar av Malmö lika hårt drabbade. Det visar data för de senaste fem åren. Det rör sig om mellan en handfull och drygt 800 anmälda stölder per område. Området med flest anmälda cykelstölder i Malmö kommun är Västra hamnen, det det handlar om 826 anmälningar under perioden 2020-2024."
  },
  {
    missionId:3,
    notis1:"Malmö, andra staden med högst hemlöshet",
    notis2:"Polisens arbete för hemlösa tar aldrig slut",
    imgSource:"/media/pictures/hemlose_pia.png",
    text:"detta är uppdrag 3"
  },
  {
    missionId:4,
    notis1:"Droger funna på skola i Malmö",
    notis2:"Polisen hatar droger!",
    imgSource:"/media/pictures/kokainjakten.png",
    text:"detta är uppdrag 4"
  },
];


function renderNewsPage(parent) {
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

renderNewsPage('body');