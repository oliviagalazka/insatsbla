function createTweetNotification(username, message) {
  // Kontrollera om container för tweets finns, skapa den om den inte finns
  let tweetContainer = document.getElementById('tweetNotifications');
  if (!tweetContainer) {
    tweetContainer = document.createElement('div');
    tweetContainer.id = 'tweetNotifications';
    document.body.appendChild(tweetContainer);
  }

  // Skapa wrapper div
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  // Skapa notification div
  const notification = document.createElement('div');
  notification.id = 'notification';
  notification.classList.add('hidden');

  // Skapa logoContainer div
  const logoContainer = document.createElement('div');
  logoContainer.classList.add('logoContainer');

  // Skapa twitterLogo div och lägg till bild och text
  const twitterLogo = document.createElement('div');
  twitterLogo.classList.add('twitterLogo');
  const img = document.createElement('img');
  img.src = './media/pictures/twitter.png';
  twitterLogo.appendChild(img);

  const logoText = document.createElement('p');
  logoText.textContent = 'TWITTER';
  twitterLogo.appendChild(logoText);

  // Lägg till twitterLogo i logoContainer
  logoContainer.appendChild(twitterLogo);

  // Skapa p för "now"
  const now = document.createElement('p');
  now.classList.add('now');
  now.textContent = 'now';

  // Lägg till "now" i logoContainer
  logoContainer.appendChild(now);

  // Lägg till logoContainer i notification
  notification.appendChild(logoContainer);

  // Skapa h3 för användarnamn
  const usernameElement = document.createElement('h3');
  usernameElement.id = 'username';
  usernameElement.textContent = username;

  // Lägg till användarnamn i notification
  notification.appendChild(usernameElement);

  // Skapa p för tweet-text
  const tweetText = document.createElement('p');
  tweetText.id = 'twitterTxt';
  tweetText.textContent = message;

  // Lägg till tweet-text i notification
  notification.appendChild(tweetText);

  // Lägg till notification i wrapper
  wrapper.appendChild(notification);

  // Lägg till wrapper i tweetContainer
  tweetContainer.appendChild(wrapper);

  // Visa notifikationen
  setTimeout(() => {
    notification.classList.remove('hidden');
    notification.classList.add('show');
  }, 10);

  // Dölja den efter 3 sekunder
  setTimeout(() => {
    notification.classList.remove('show');
    notification.classList.add('hidden');
  }, 4500);
}
