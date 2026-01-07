import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';


import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';

import App from '@/App.vue';
import getRouter from '@/router';
import { AuthService, ConfigService } from '@/services';

import '@bcgov/bc-sans/css/BCSans.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@/assets/main.scss';


/**
 * @function initializeApp
 * Initializes and mounts the Vue instance
 */
function initializeApp(): void {
  library.add(fas);

  const app = createApp(App);
  const pinia = createPinia();
  pinia.use(
    createPersistedState({
      key: (id) => `aifas.${id}`
    })
  );

  app.use(pinia);
  app.use(getRouter());


  /* PrimeVue Configuration */
  const blueAura = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}', 100: '{blue.100}', 200: '{blue.200}', 300: '{blue.300}',
      400: '{blue.400}', 500: '{blue.500}', 600: '{blue.600}', 700: '{blue.700}',
      800: '{blue.800}', 900: '{blue.900}', 950: '{blue.950}'
    }
  }
});
  app.use(PrimeVue, {
    theme: {
        preset: blueAura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: true
        }
    }
 });
  app.use(ToastService);
  app.use(ConfirmationService);
  app.component('FontAwesomeIcon', FontAwesomeIcon);
  app.directive('tooltip', Tooltip);

  // Mount the app
  app.mount('#app');
}

/**
 * @function initializeServices
 * Initializes and mounts the service singletons
 * Services must load in the following order: config, auth, then app.
 * @param {Function} [next=undefined] Optional callback function
 */
async function initializeServices(next?: Function): Promise<void> {
  await ConfigService.init();
  await AuthService.init();
  if (next) next();
}

initializeServices(initializeApp);
