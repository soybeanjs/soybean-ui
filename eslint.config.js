import { defineConfig } from '@soybeanjs/eslint-config';

export default defineConfig(
  { vue: true, unocss: true },
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-invalid-void-type': 'off',
      'consistent-return': 'off',
      'guard-for-in': 'off',
      'max-params': ['warn', 5],
      'no-plusplus': 'off',
      'no-underscore-dangle': 'off',
      'unocss/order-attributify': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-static-inline-styles': 'off',
      'vue/require-default-prop': 'off',
      'vue/return-in-computed-property': 'off'
    }
  }
);
