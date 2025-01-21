import { defineConfig, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetSoybeanJS } from '@soybeanjs/unocss-preset';
import { presetAnimations } from 'unocss-preset-animations';
import { presetSoybeanUI } from '@soybean-ui/unocss-preset';

export default defineConfig<Theme>({
  content: {
    pipeline: {
      include: [
        /\.vue($|\?)/,
        'packages/ui/dist/index.mjs',
        '../packages/ui/dist/index.mjs' // for docs
      ]
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  // @ts-expect-error ignore the error in presetSoybeanUI
  presets: [presetUno({ dark: 'class' }), presetTypography(), presetAnimations(), presetSoybeanJS(), presetSoybeanUI()]
});
