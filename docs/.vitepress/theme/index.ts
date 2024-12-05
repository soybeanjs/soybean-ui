import type { Theme } from 'vitepress';
import 'uno.css';
import '@unocss/reset/tailwind.css';
import '@soybean-ui/vue/style.css';
import './style.css';
import Layout from './layout/index.vue';

const theme: Theme = {
  Layout
};

export default theme;
