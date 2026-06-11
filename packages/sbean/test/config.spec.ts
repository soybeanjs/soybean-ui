/**
 * Tests for config management and validation.
 */
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as v from 'valibot';
import { rawConfigSchema } from '../src/registry/config';
import { getConfig, createDefaultConfig, writeConfig, resolveConfigPaths } from '../src/utils/get-config';

describe('config management', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'sbean-test-'));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  describe('createDefaultConfig', () => {
    it('creates a default config with correct values', async () => {
      const config = await createDefaultConfig(tmpDir);

      expect(config.style).toBe('soybean');
      expect(config.iconLibrary).toBe('lucide');
      expect(config.uno.base).toBe('zinc');
      expect(config.uno.primary).toBe('indigo');
      expect(config.uno.radius).toBe('md');
      expect(config.menu.accent).toBe('subtle');
      expect(config.menu.color).toBe('default');
    });

    it('creates config with resolved paths', async () => {
      const config = await createDefaultConfig(tmpDir);

      expect(config.resolvedPaths).toBeDefined();
      expect(config.resolvedPaths.cwd).toBe(tmpDir);
      expect(config.resolvedPaths.components).toContain('components');
      expect(config.resolvedPaths.utils).toContain('utils');
      expect(config.resolvedPaths.ui).toContain('ui');
    });

    it('accepts overrides', async () => {
      const config = await createDefaultConfig(tmpDir, {
        style: 'clean',
        uno: { base: 'stone', primary: 'green', radius: 'lg' },
        iconLibrary: 'tabler'
      });

      expect(config.style).toBe('clean');
      expect(config.uno.base).toBe('stone');
      expect(config.uno.primary).toBe('green');
      expect(config.uno.radius).toBe('lg');
      expect(config.iconLibrary).toBe('tabler');
    });
  });

  describe('writeConfig / getConfig', () => {
    it('writes and reads config roundtrip', async () => {
      const config = await createDefaultConfig(tmpDir, {
        style: 'dense',
        uno: { base: 'slate', primary: 'amber', radius: 'xs' }
      });

      await writeConfig(tmpDir, config);
      const read = await getConfig(tmpDir);

      expect(read).not.toBeNull();
      expect(read!.style).toBe('dense');
      expect(read!.uno.base).toBe('slate');
      expect(read!.uno.primary).toBe('amber');
      expect(read!.uno.radius).toBe('xs');
    });

    it('returns null when no sbean.json exists', async () => {
      const config = await getConfig(tmpDir);
      expect(config).toBeNull();
    });

    it('validates config on read (rejects invalid)', async () => {
      // Write an invalid config manually
      await fs.writeFile(
        path.join(tmpDir, 'sbean.json'),
        JSON.stringify({
          style: 'invalid-style',
          iconLibrary: 'lucide',
          uno: { base: 'zinc', primary: 'indigo', radius: 'md' },
          font: {},
          menu: { accent: 'subtle', color: 'default' },
          aliases: { components: '@/components', utils: '@/lib/utils' }
        }),
        'utf-8'
      );

      await expect(getConfig(tmpDir)).rejects.toThrow();
    });

    it('writes config without resolvedPaths', async () => {
      const config = await createDefaultConfig(tmpDir);
      await writeConfig(tmpDir, config);

      const raw = JSON.parse(await fs.readFile(path.join(tmpDir, 'sbean.json'), 'utf-8'));
      expect(raw.resolvedPaths).toBeUndefined();
      expect(raw.style).toBe('soybean');
    });
  });

  describe('resolveConfigPaths', () => {
    it('resolves @/ aliases to src/ paths', async () => {
      const resolved = await resolveConfigPaths(tmpDir, {
        style: 'soybean',
        iconLibrary: 'lucide',
        uno: { base: 'zinc', primary: 'indigo', radius: 'md' },
        font: {},
        menu: { accent: 'subtle', color: 'default' },
        aliases: { components: '@/components', utils: '@/lib/utils', ui: '@/components/ui', lib: '@/lib' }
      });

      expect(resolved.resolvedPaths.components).toBe(path.join(tmpDir, 'src', 'components'));
      expect(resolved.resolvedPaths.utils).toBe(path.join(tmpDir, 'src', 'lib', 'utils'));
      expect(resolved.resolvedPaths.ui).toBe(path.join(tmpDir, 'src', 'components', 'ui'));
      expect(resolved.resolvedPaths.lib).toBe(path.join(tmpDir, 'src', 'lib'));
    });

    it('falls back for ui and lib when not specified', async () => {
      const resolved = await resolveConfigPaths(tmpDir, {
        style: 'soybean',
        iconLibrary: 'lucide',
        uno: { base: 'zinc', primary: 'indigo', radius: 'md' },
        font: {},
        menu: { accent: 'subtle', color: 'default' },
        aliases: { components: '@/components', utils: '@/lib/utils' }
      });

      expect(resolved.resolvedPaths.ui).toContain('ui');
      expect(resolved.resolvedPaths.lib).toContain('lib');
    });
  });
});

describe('config schema validation', () => {
  const minimalConfig = {
    style: 'soybean',
    iconLibrary: 'lucide',
    uno: { base: 'zinc', primary: 'indigo', radius: 'md' },
    font: {},
    menu: { accent: 'subtle', color: 'default' },
    aliases: { components: '@/components', utils: '@/lib/utils' }
  };

  it('validates minimal config', () => {
    const result = v.safeParse(rawConfigSchema, minimalConfig);
    expect(result.success).toBe(true);
  });

  it('rejects invalid base color', () => {
    const result = v.safeParse(rawConfigSchema, {
      ...minimalConfig,
      uno: { ...minimalConfig.uno, base: 'rainbow' }
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid primary color', () => {
    const result = v.safeParse(rawConfigSchema, {
      ...minimalConfig,
      uno: { ...minimalConfig.uno, primary: 'rainbow' }
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid radius', () => {
    const result = v.safeParse(rawConfigSchema, {
      ...minimalConfig,
      uno: { ...minimalConfig.uno, radius: 'huge' }
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid menu accent', () => {
    const result = v.safeParse(rawConfigSchema, {
      ...minimalConfig,
      menu: { ...minimalConfig.menu, accent: 'crazy' }
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid menu color', () => {
    const result = v.safeParse(rawConfigSchema, {
      ...minimalConfig,
      menu: { ...minimalConfig.menu, color: 'rainbow' }
    });
    expect(result.success).toBe(false);
  });
});
