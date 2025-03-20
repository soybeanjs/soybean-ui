# Styling

## Config UnoCSS

```ts
import { defineConfig,  presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetSoybeanUI } from '@soybean-ui/unocss-preset';

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.vue($|\?)/, /.*\/soy-ui.*\.js/]
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetWind3({ dark: 'class' }), presetSoybeanUI()],
});
```

## Update UI theme

- add options for `presetSoybeanUI`

```ts
import { defineConfig,  presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetSoybeanUI } from '@soybean-ui/unocss-preset';

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.vue($|\?)/, /.*\/soy-ui.*\.js/]
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetWind3({ dark: 'class' }), presetSoybeanUI({ color: 'orange' })],
});
```

- ThemeOptions

```ts
interface ThemeOptions {
    /**
     * theme color options
     *
     * @default 'default'
     */
    color?: ColorOptions | false;
    /** feedback color */
    feedbackColor?: FeedbackColorOfThemeCssVarsVariant;
    /**
     * theme radius
     *
     * @default 0.5
     */
    radius?: number | false;
    /**
     * dark theme selector
     *
     * @default '.dark'
     */
    darkSelector?: string;
}
```

