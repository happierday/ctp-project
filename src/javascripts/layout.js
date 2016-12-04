import Auth0Lock from "auth0-lock";

const loginButtons = document.querySelectorAll('.login-button');
if (loginButtons.length) {
    const lock = new Auth0Lock(auth0.clientID, auth0.domain, {
        auth: {
            redirectUrl: auth0.callbackURL,
            responseType: 'code',
            params: {scope: 'openid name email picture'}
        }
    });

    if (location.search === '?login') {
        lock.show();
    }

    for (let i = 0; i < loginButtons.length; i++) {
        loginButtons.item(i).addEventListener('click', () => {
            lock.show();
        });
    }
} else {
    const logoutHandler = function () {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/logout');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                location.href = '/';
            }
        };
        xhr.send();
    };

    const logoutButtons = document.querySelectorAll('.logout-button');
    for (let i = 0; i < logoutButtons.length; i++) {
        logoutButtons.item(i).addEventListener('click', logoutHandler);
    }
}