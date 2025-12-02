// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initKeycloak } from "./services/keycloak";
import './assets/global.css'



async function bootstrap() {
  const app = createApp(App);

  // Initialize Keycloak (optional login)
  const keycloak = await initKeycloak();

  // Provide instance to all components
  app.provide("keycloak", keycloak);

  app.use(router);

  app.mount("#app");
}

bootstrap();