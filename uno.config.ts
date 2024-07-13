import { defineConfig } from '@unocss/vite';
import presetUno from '@unocss/preset-uno';
import type { Theme } from '@unocss/preset-uno';
import { presetAnimations } from 'unocss-preset-animations';
import { presetShadcn } from '@soybean-unify/unocss-preset-shadcn';
import { presetSoybeanUnify } from '@soybean-unify/unocss-preset';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';

export default defineConfig<Theme>({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist']
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetUno({ dark: 'class' }), presetAnimations(), presetSoybeanUnify(), presetShadcn()]
});
