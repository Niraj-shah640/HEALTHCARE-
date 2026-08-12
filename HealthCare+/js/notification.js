const notification = document.getElementById("notification");

function showNotification(title, message) {
  if (!notification) return;

  notification.querySelector("h4").textContent = title;
  notification.querySelector("p").textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}
