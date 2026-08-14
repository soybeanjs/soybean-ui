import { defineConfig } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetUiUnocss } from '@soybeanjs/ui-uno';

export default defineConfig<Theme>({
  presets: [
    presetUiUnocss({
      resetCSS: true,
      globalCSS: true,
      uiCSS: true
    })
  ]
});
