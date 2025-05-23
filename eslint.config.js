import { defineConfig } from '@soybeanjs/eslint-config';

export default defineConfig(
  {
    vue: true
  },
  {
    rules: {
      'max-params': 'off',
      'no-plusplus': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-static-inline-styles': 'off'
    }
  }
);
