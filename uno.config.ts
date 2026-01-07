import { defineConfig, presetTypography, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetShadcn } from '@soybeanjs/unocss-shadcn';
import { presetSoybeanJS } from '@soybeanjs/unocss-preset';
import { presetAnimations } from 'unocss-preset-animations';
import type { Theme } from 'unocss/preset-mini';

export default defineConfig<Theme>({
  cli: {
    entry: [{ patterns: ['src/components/**/*.vue', 'src/variants/*.ts'], outFile: 'dist/styles.css' }]
  },
  content: {
    pipeline: {
      include: [/\.vue($|\?)/]
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [
    presetWind3({ dark: 'class' }),
    presetTypography({
      selectorName: 'prose-slate'
    }),
    presetAnimations(),
    // @ts-expect-error ignore type
    presetSoybeanJS(),
    // @ts-expect-error ignore type
    presetShadcn()
  ],
  safelist: 'prose-slate dark:prose-slate-invert md:max-w-270! m-auto text-left'.split(' '),
  shortcuts: {
    'playground-title': 'mb-3 text-base font-semibold'
  }
});
