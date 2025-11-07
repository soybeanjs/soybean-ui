import { createApp } from 'vue';
import '@unocss/reset/tailwind.css';
import 'uno.css';
import App from './App.vue';
import { router } from './router';

createApp(App).use(router).mount('#app');
