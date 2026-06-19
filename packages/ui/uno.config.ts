import { defineConfig, presetWind3 } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetAnimations } from 'unocss-preset-animations';
import { presetShadcn } from '@soybeanjs/unocss-shadcn';

export default defineConfig<Theme>({
  presets: [
    presetWind3({ dark: 'class' }),
    presetAnimations(),
    presetShadcn({
      generated: {
        ui: true
      }
    })
  ]
});
