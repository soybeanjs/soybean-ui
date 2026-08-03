import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getExportName, getShortName, presetIndexFileContent, presetTsFileContent } from './generate-lib';
import type { PresetJson } from './generate-lib';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const presetsDir = resolve(rootDir, 'presets');
const generatedDir = resolve(rootDir, 'src/generated');

const files = readdirSync(presetsDir)
  .filter(file => file.endsWith('.json'))
  .sort();

const entries: Array<{ dimension: string; shortName: string; exportName: string }> = [];

for (const file of files) {
  const preset = JSON.parse(readFileSync(resolve(presetsDir, file), 'utf8')) as PresetJson;
  const shortName = getShortName(preset.name);
  const exportName = getExportName(preset.dimension, shortName);
  const dir = resolve(generatedDir, preset.dimension);

  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, `${shortName}.ts`), presetTsFileContent(preset));

  entries.push({ dimension: preset.dimension, shortName, exportName });
}

writeFileSync(resolve(generatedDir, 'index.ts'), presetIndexFileContent(entries));

console.log(`generated ${entries.length} presets`);
