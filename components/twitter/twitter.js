function showTweetNotification(message) {
  const notification = document.getElementById('notification');
  
  // Show the notification
  notification.classList.add('show');

  // Hide it after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

showTweetNotification("hej");