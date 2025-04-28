function renderNewsPage(parent) {
  document.body.className = 'body-newsSite';

  const wrapper = document.querySelector(parent);
  // 1. Läs missionId från localStorage
  const missionId = parseInt(localStorage.getItem('missionId'));

  // 2. Hitta rätt objekt i newsText
  const currentNews = newsText.find(news => news.missionId === missionId);

  wrapper.innerHTML = `
  <img src="./media/pictures/sydsvenskan_logo.png" alt="Statz" class="newsLogo">
    
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
  `;
}
