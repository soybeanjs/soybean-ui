import { createApp } from 'vue';
import '@unocss/reset/tailwind-compat.css';
import 'uno.css';
import App from './App';

async function setupApp() {
  const app = createApp(App);

  app.mount('#app');
}

setupApp();
