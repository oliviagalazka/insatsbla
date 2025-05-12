function renderpersonRegPage(parent) {
  document.body.className = 'regPage';
  const wrapper = document.querySelector(parent);

  wrapper.innerHTML = 
  `
  <div class="polisInfo">
    <p>Polismyndigheten</p>
    <P>Porslingsgatan 4B</P>
    <p>221 32 Malmö</p>
    <p>0723995982</p>
  </div>

  <div class="img1Container">
   <img class="img1" src="./media/pictures/rapportImg.png" alt="Polisens logga">
   <h1 class="regPageH1">PERSONREGISTER</h1>
  </div>

  <div class="personInfo">
    <img class="img2" src="./media/pictures/drugGirl.jpg">

    <div class="personInfoTxt">
      <div class="personInfoBox">
        <P><B>Namn:</B></P>
        <p>Hanna Larsson</p>
      </div>
      <div class="personInfoBox">
        <P><B>Personnummer:</B></P>
          <p>19990807580</p>
      </div>
      <div class="personInfoBox">
        <P><B>Adress:</B></P>
          <p>Zenithgatan 3</p>
      </div>
        <div class="personInfoBox">
       <P><B></B></P>
       <p>212 14 Malmö</p>

      </div>
    </div>
  </div>

`;


const lastResult = JSON.parse(localStorage.getItem('lastMissionResult'));
if (lastResult?.missionId === 4 && lastResult?.allCorrect !== undefined) {
  if (!document.querySelector('.stamp')) {
    const stamp = document.createElement('img');
    stamp.src = './media/pictures/fallet_avslutat.png';
    stamp.alt = 'Fallet avslutat';
    stamp.className = 'stamp';
    document.body.appendChild(stamp);

    // Lägg till en delay på t.ex. 3 sekunder innan stämpeln visas
    setTimeout(() => {
      stamp.classList.add('show');
    }, 800); // 3000 ms = 3 sekunder
  }
}
}

