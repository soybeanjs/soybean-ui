import { defineConfig } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetUiUnocss } from '@soybeanjs/ui-uno';

export default defineConfig<Theme>({
  presets: [
    presetUiUnocss({
      resetCSS: true,
      globalCSS: true,
      uiCSS: true,
      preflights: [
        {
          getCSS: () => createCSS()
        }
      ]
    })
  ]
});

function createCSS() {
  let css = '';

  const radioGroupClass = `
.radio-group-indicator-enter-active {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.radio-group-indicator-enter-from {
  opacity: 0;
  transform: scale(0);
}
`;

  css += radioGroupClass;

  return css;
}
