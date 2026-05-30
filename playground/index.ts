import { createApp } from 'vue';
import 'uno.css';
import { setupI18n } from './i18n';
import { router } from './router';
import App from './App.vue';

const app = createApp(App);

app.use(router);

setupI18n(app);

app.mount('#app');
