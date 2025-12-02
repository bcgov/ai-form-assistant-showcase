// src/keycloak.js
import Keycloak from "keycloak-js";


// const loginOptions = {
//   redirectUri: import.meta.env.VITE_SSO_REDIRECT_URI,
//   idpHint: '',
// }

const keycloak = new Keycloak({
  url: `${import.meta.env.VITE_SSO_AUTH_SERVER_URL}`,
  realm: `${import.meta.env.VITE_SSO_REALM}`,
  clientId: `${import.meta.env.VITE_SSO_CLIENT_ID}`,
});

export async function initKeycloak() {

  console.log("initKeycloak called");

  const authenticated = await keycloak.init({
    onLoad: "check-sso",       // <- optional login, does NOT force
    checkLoginIframe: false,
    pkceMethod: "S256",
  });

  // if (!authenticated) {
  //   console.warn("Not authenticated!");
  //   keycloak.login();
  // }

  // Token refresh loop
  setInterval(() => {
    keycloak
      .updateToken(60) // refresh if token expires in <60s
      .then((refreshed) => {
        if (refreshed) console.debug("Token refreshed:", new Date());
      })
      .catch(() => {
        console.warn("Failed to refresh token, logging out");
        keycloak.logout();
      });
  }, 30000);

  return keycloak;
}

// expose a login helper so components can import and trigger login
// export const login = (options = {}) => {
//   try {
//     return keycloak.login({ ...loginOptions, ...options })
//   } catch (err) {
//     console.log('Keycloak login error', err)
//   }
// }

// since we have to perform logout at siteminder, we cannot use keycloak-js logout method so manually triggering logout through a function
// if using post_logout_redirect_uri, then either client_id or id_token_hint has to be included and post_logout_redirect_uri need to match
// one of valid post logout redirect uris in the client configuration
// export const logout = () => {
//   window.location.href = `https://logon7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl=${encodeURIComponent(
//     `${import.meta.env.VITE_SSO_AUTH_SERVER_URL}/realms/${
//       import.meta.env.VITE_SSO_REALM
//     }/protocol/openid-connect/logout?post_logout_redirect_uri=` +
//       import.meta.env.VITE_SSO_REDIRECT_URI +
//       '&client_id=' +
//       import.meta.env.VITE_SSO_CLIENT_ID
//   )}`
// }


export default keycloak;
