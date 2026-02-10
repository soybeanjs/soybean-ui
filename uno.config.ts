import { defineConfig, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetShadcn } from '@soybeanjs/unocss-shadcn';
import { presetSoybean } from '@soybeanjs/unocss-preset';
import { presetAnimations } from 'unocss-preset-animations';
import type { Theme } from 'unocss/preset-mini';

export default defineConfig<Theme>({
  cli: {
    entry: [{ patterns: ['src/components/**/*.vue', 'src/components/**/variants.ts'], outFile: 'dist/styles.css' }]
  },
  content: {
    pipeline: {
      include: [/\.vue($|\?)/]
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetWind3({ dark: 'class' }), presetAnimations(), presetSoybean(), presetShadcn()],
  shortcuts: {
    'playground-title': 'mb-3 text-base font-semibold'
  }
});
