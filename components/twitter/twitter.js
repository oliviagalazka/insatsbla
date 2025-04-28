function showTweetNotification(username, message) {
  const notification = document.getElementById('notification');
  const twitterUser = document.getElementById("username");
  twitterUser.textContent = `${username}`;
  const tweetText = document.getElementById("twitterTxt");
  tweetText.textContent = `${message}`;
  
  // Show the notification
  notification.classList.add('show');

  // Hide it after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}
