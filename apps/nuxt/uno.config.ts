import { defineConfig, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetUiUnocss } from '@soybeanjs/ui-uno';
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
    presetSoybean(),
    presetUiUnocss({
      resetCSS: true,
      globalCSS: true
    })
  ]
});
