import { createApp } from 'vue';
import '@unocss/reset/tailwind.css';
import 'uno.css';
import App from './App.vue';
import { router } from './router';

async function setupApp() {
  const app = createApp(App);

  app.use(router);

  app.mount('#app');
}

setupApp();
