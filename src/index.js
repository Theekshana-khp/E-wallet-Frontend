import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import keycloak from './keycloak/keycloak';

function startApp() {

    const root = ReactDOM.createRoot(document.getElementById('root'));

    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

keycloak.init({
    onLoad: "login-required",
    pkceMethod: "S256",
}).then((authenticated) => {

    if (!authenticated) {
        window.location.reload();
        return;
    }

    setInterval(() => {
        keycloak.updateToken(30).then((refreshed) => {
            if (refreshed) {
                localStorage.setItem("token", keycloak.token);
            }
        }).catch(() => {
            console.log("Token refresh failed");
        });
    }, 60000);

    startApp();

}).catch((error) => {
    console.error("Keycloak initialization failed:", error);
});

reportWebVitals();