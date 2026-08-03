import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { getExportName, getShortName, presetIndexFileContent, presetTsFileContent } from '../scripts/generate-lib';
import type { PresetJson } from '../scripts/generate-lib';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

describe('generate idempotency', () => {
  it('presetTsFileContent is deterministic', () => {
    const preset: PresetJson = {
      name: 'base.zinc',
      version: '1.0.0',
      dimension: 'base',
      light: { background: 'white' },
      dark: { background: 'zinc.950' }
    };

    expect(presetTsFileContent(preset)).toBe(presetTsFileContent(preset));
  });

  it('generated files match a fresh regeneration (idempotent)', () => {
    const files = readdirSync(resolve(rootDir, 'presets'))
      .filter(file => file.endsWith('.json'))
      .sort();

    const entries: Array<{ dimension: string; shortName: string; exportName: string }> = [];

    for (const file of files) {
      const preset = JSON.parse(readFileSync(resolve(rootDir, 'presets', file), 'utf8')) as PresetJson;
      const shortName = getShortName(preset.name);
      const exportName = getExportName(preset.dimension, shortName);

      entries.push({ dimension: preset.dimension, shortName, exportName });

      const generatedPath = resolve(rootDir, 'src/generated', preset.dimension, `${shortName}.ts`);
      expect(readFileSync(generatedPath, 'utf8'), file).toBe(presetTsFileContent(preset));
    }

    const indexPath = resolve(rootDir, 'src/generated/index.ts');
    expect(readFileSync(indexPath, 'utf8')).toBe(presetIndexFileContent(entries));
  });
});
