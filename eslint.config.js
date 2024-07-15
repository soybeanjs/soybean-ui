import { defineConfig } from '@soybeanjs/eslint-config';

export default defineConfig(
  { vue: true, unocss: true },
  {
    rules: {
      'consistent-return': 'off',
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index', 'App']
        }
      ],
      'vue/require-default-prop': 'off',
      'vue/return-in-computed-property': 'off',
      'vue/no-undef-properties': ['error', { ignores: ['as', 'asChild'] }],
      'unocss/order-attributify': 'off'
    }
  }
);
