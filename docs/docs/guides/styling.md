# Styling

## config UnoCSS

```ts
import { defineConfig,  presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetSoybeanUI } from '@soybean-ui/unocss-preset';

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.vue($|\?)/, /.*\/soy-ui\/dist\/variants\/.*\.js/]
    }
  },
  presets: [presetWind3(), presetSoybeanUI()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
```

