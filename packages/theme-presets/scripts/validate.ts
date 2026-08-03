import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'valibot';
import { themePresetSchema } from '../src/schema';

const presetsDir = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'presets');

const files = readdirSync(presetsDir)
  .filter(file => file.endsWith('.json'))
  .sort();

const failures: string[] = [];

for (const file of files) {
  const preset = JSON.parse(readFileSync(resolve(presetsDir, file), 'utf8'));

  try {
    parse(themePresetSchema, preset);
  } catch (error) {
    failures.push(`[${file}] ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length > 0) {
  console.error(`${failures.length}/${files.length} preset(s) failed validation:\n`);
  for (const failure of failures) {
    console.error(failure);
  }
  process.exit(1);
}

console.log(`${files.length} preset(s) validated`);
