import { defineConfig } from '@soybeanjs/eslint-config';

export default defineConfig(
  {
    vue: true
  },
  {
    rules: {
      'no-plusplus': 'off'
    }
  }
);
