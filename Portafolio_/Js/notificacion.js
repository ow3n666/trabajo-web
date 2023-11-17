const notificationsContainer = document.getElementById('notifications');

setInterval(() => {
    const newNotification = {
        message: 'Nueva notificacion en tiempo real',
        timestamp: new Date().toLocaleTimeString()
    };
    displayNotification(newNotification);
},10000);


function displayNotification(notification){
    const notificationsElement = document.createElement('div');
    notificationsElement.classList.add('notification');
    notificationsElement.innerHTML = `<p> ${notification.message}</p>
    <small>${notification.timestamp}</small>`;

    notificationsContainer.prepend(notificationsElement);
}