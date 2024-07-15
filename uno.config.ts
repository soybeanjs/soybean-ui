import { defineConfig, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetAnimations } from 'unocss-preset-animations';
import { presetShadcn } from '@soybean-unify/unocss-preset-shadcn';
import { presetSoybeanUnify } from '@soybean-unify/unocss-preset';

export default defineConfig<Theme>({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist']
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetUno({ dark: 'class' }), presetAnimations(), presetSoybeanUnify(), presetShadcn()]
});
