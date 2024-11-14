import { defineConfig, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetSoybeanJS } from '@soybeanjs/unocss-preset';
import { presetAnimations } from 'unocss-preset-animations';
import { presetSoybeanUI } from '@soybean-ui/unocss-preset';

export default defineConfig<Theme>({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist']
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetUno({ dark: 'class' }), presetAnimations(), presetSoybeanJS(), presetSoybeanUI()]
});
