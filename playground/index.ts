import { createApp } from 'vue';
import '@unocss/reset/tailwind.css';
import 'uno.css';
import i18n from './plugins/i18n';
import { router } from './router';
import App from './App.vue';

const app = createApp(App);

app.use(router);

app.use(i18n);

app.mount('#app');
