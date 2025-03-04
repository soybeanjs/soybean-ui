import { defineConfig, presetTypography, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetSoybeanUI } from '@soybean-ui/unocss-preset';
import { presetSoybeanJS } from '@soybeanjs/unocss-preset';
import type { Theme } from 'unocss/preset-mini';
import { presetAnimations } from 'unocss-preset-animations';

export default defineConfig<Theme>({
  content: {
    pipeline: {
      include: [
        /\.vue($|\?)/,
        'packages/ui/dist/components/**/*.js',
        '../packages/ui/dist/components/**/*.js' // for docs
      ]
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [
    presetWind3({ dark: 'class' }),
    presetTypography(),
    presetAnimations(),
    presetSoybeanJS(),
    presetSoybeanUI()
  ]
});
