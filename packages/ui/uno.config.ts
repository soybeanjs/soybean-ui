import { defineConfig, presetWind3 } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetAnimations } from 'unocss-preset-animations';
import { presetUiUnocss } from '@soybeanjs/ui-unocss';

export default defineConfig<Theme>({
  presets: [
    presetWind3({ dark: 'class' }),
    presetAnimations(),
    presetUiUnocss({
      resetCSS: true,
      globalCSS: true,
      uiCSS: true
    })
  ]
});
