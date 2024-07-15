import { defineComponent } from 'vue';

import UiPage from './views/ui';

export default defineComponent(
  () => {
    return () => <UiPage />;
  },
  { name: 'App' }
);
