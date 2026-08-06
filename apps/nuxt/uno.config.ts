import { defineConfig, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetAnimations } from 'unocss-preset-animations';
import { presetUiUnocss } from '@soybeanjs/ui-unocss';
import { presetSoybean } from '@soybeanjs/unocss-preset';

export default defineConfig<Theme>({
  content: {
    pipeline: {
      include: [/\.vue($|\?)/]
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [
    presetWind3({ dark: 'class' }),
    presetAnimations(),
    presetSoybean(),
    presetUiUnocss({
      resetCSS: true,
      globalCSS: true
    })
  ]
});
