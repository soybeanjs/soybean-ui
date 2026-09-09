import { defineConfig } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetUiUnocss } from '@soybeanjs/ui-uno';

export default defineConfig<Theme>({
  cli: {
    entry: [
      {
        patterns: ['src/styles/**/*.ts', 'src/components/**/*.vue'],
        outFile: 'dist/styles.css'
      }
    ]
  },
  presets: [
    presetUiUnocss({
      resetCSS: true,
      globalCSS: true,
      uiCSS: true
    })
  ]
});
