function renderNewsPage(parent) {
  localStorage.setItem('currentView', 'news');

  document.body.className = 'body-newsSite';

  const wrapper = document.querySelector(parent);
  const missionId = parseInt(localStorage.getItem('missionId'), 10);
  const currentNews = newsText.find(news => news.missionId === missionId);

  wrapper.innerHTML = `<img src="./media/pictures/sydsvenskan_logo.png" alt="Statz" class="newsLogo">

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
  <p>${currentNews.notis1}</p>
</div>

<div class="notis">
  <p class="red">Direkt</p>
  <p>${currentNews.notis2}</p>
</div>

<div class="newsTxt">
  <img src="${currentNews.imgSource}" alt="Statz">
  <p>${currentNews.text}</p>
</div>

<button id="nextBtn">Nästa</button>
`;

  const nextBtn = document.getElementById('nextBtn');
  nextBtn.addEventListener('click', () => {
    if (missionId === 1) {
      renderLandingPage('body');
    } else if (missionId === 3) {
      renderReportPage('body');
    } else if (missionId === 4) {
      renderReportPage('body');
    } else if (missionId === 2) {
      renderLandingPage('body'); // För mission 2, gå tillbaka till landingPage
    }
  });
}