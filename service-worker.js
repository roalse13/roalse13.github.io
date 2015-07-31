
self.addEventListener('push', function (event) {
    console.log('is at push');
    console.log(event);


    console.log('data :' + event.data);
    console.log('Received a push message', event);

    var title = 'Tittle.';
    var body = 'New notification message.';
    var icon = '/images/icon-192x192.png';
    var tag = 'simple-push-demo-notification-tag';                    
                    
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  

});

function json(response) {  
    console.log(response)
  return response.json()  
}

self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification.tag);
    // Android doesn't close the notification when you click on it  
    // See: http://crbug.com/463146  
    event.notification.close();

    // This looks to see if the current window is already open and  
    // focuses if it is  
    event.waitUntil(
            clients.matchAll({
                type: "window"
            })
            .then(function (clientList) {
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url == '/' && 'focus' in client)
                        return client.focus();
                }
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
            );
});