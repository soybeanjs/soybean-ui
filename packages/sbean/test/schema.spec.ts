import { describe, it, expect } from 'vitest';
import * as v from 'valibot';
import { rawConfigSchema, PRESET_STYLES, PRESET_RADII, PRESET_ICON_LIBRARIES } from '../src/registry/config';
import { registryItemSchema, registrySchema } from '../src/registry/schema';

describe('config schema', () => {
  const minimalConfig = {
    style: 'soybean',
    iconLibrary: 'lucide',
    uno: {
      base: 'zinc',
      primary: 'indigo',
      radius: 'md'
    },
    font: {},
    menu: {
      accent: 'subtle',
      color: 'default'
    },
    aliases: {
      components: '@/components',
      utils: '@/lib/utils'
    }
  };

  it('parses a minimal valid config', () => {
    const result = v.safeParse(rawConfigSchema, minimalConfig);
    expect(result.success).toBe(true);
  });

  it('rejects invalid style', () => {
    const result = v.safeParse(rawConfigSchema, {
      ...minimalConfig,
      style: 'invalid-style'
    });
    expect(result.success).toBe(false);
  });

  it('accepts all valid styles', () => {
    for (const style of PRESET_STYLES) {
      const result = v.safeParse(rawConfigSchema, {
        ...minimalConfig,
        style
      });
      expect(result.success).toBe(true);
    }
  });

  it('accepts all valid radius values', () => {
    for (const radius of PRESET_RADII) {
      const result = v.safeParse(rawConfigSchema, {
        ...minimalConfig,
        uno: { ...minimalConfig.uno, radius }
      });
      expect(result.success).toBe(true);
    }
  });

  it('accepts all valid icon libraries', () => {
    for (const iconLibrary of PRESET_ICON_LIBRARIES) {
      const result = v.safeParse(rawConfigSchema, {
        ...minimalConfig,
        iconLibrary
      });
      expect(result.success).toBe(true);
    }
  });

  it('accepts full config with optional fields', () => {
    const fullConfig = {
      ...minimalConfig,
      $schema: 'https://ui.soybeanjs.cn/schema.json',
      uno: {
        ...minimalConfig.uno,
        chart: 'blue'
      },
      font: {
        sans: 'inter',
        heading: 'inherit'
      },
      registries: {
        '@acme': 'https://example.com/r/{name}.json'
      }
    };

    const result = v.safeParse(rawConfigSchema, fullConfig);
    expect(result.success).toBe(true);
  });
});

describe('registry item schema', () => {
  it('parses a ui component', () => {
    const item = {
      type: 'registry:ui',
      name: 'button',
      description: 'A button component',
      dependencies: ['@soybeanjs/headless', '@soybeanjs/cva'],
      files: [{ path: 'button.vue', type: 'registry:ui' }]
    };

    const result = v.safeParse(registryItemSchema, item);
    expect(result.success).toBe(true);
  });

  it('parses a style item', () => {
    const item = {
      type: 'registry:style',
      name: 'soybean-style',
      files: [],
      cssVars: {
        light: { '--background': '0 0% 100%' },
        dark: { '--background': '0 0% 3.9%' }
      }
    };

    const result = v.safeParse(registryItemSchema, item);
    expect(result.success).toBe(true);
  });

  it('parses a base item with config', () => {
    const item = {
      type: 'registry:base',
      name: 'soybean-base',
      config: {},
      files: []
    };

    const result = v.safeParse(registryItemSchema, item);
    expect(result.success).toBe(true);
  });
});

describe('registry schema', () => {
  it('parses a valid registry', () => {
    const registry = {
      name: 'soybean-ui',
      homepage: 'https://ui.soybeanjs.cn',
      items: [
        {
          type: 'registry:ui',
          name: 'button',
          dependencies: ['@soybeanjs/headless'],
          files: [{ path: 'button.vue', type: 'registry:ui' }]
        }
      ]
    };

    const result = v.safeParse(registrySchema, registry);
    expect(result.success).toBe(true);
  });
});
