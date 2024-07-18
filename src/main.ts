import { createApp } from 'vue';
import '@unocss/reset/tailwind-compat.css';
import 'uno.css';
// import '@soybean-unify/ui/style.css';
import App from './App.vue';

async function setupApp() {
  const app = createApp(App);

  app.mount('#app');
}

setupApp();
