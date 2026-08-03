import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { builtinBaseCoreTemplate, builtinBasePresetKeys, CHART_TEMPLATE } from '../../theme/src/core-template';
import { deriveFeedbackColors } from '../../theme/src/derive';

const presetsDir = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'presets');

mkdirSync(presetsDir, { recursive: true });

function writePreset(fileName: string, preset: { name: string; dimension: string; light: object; dark: object }) {
  writeFileSync(resolve(presetsDir, fileName), `${JSON.stringify({ version: '1.0.0', ...preset }, null, 2)}\n`);
}

for (const key of builtinBasePresetKeys) {
  const core = builtinBaseCoreTemplate[key];

  writePreset(`base.${key}.json`, {
    name: `base.${key}`,
    dimension: 'base',
    light: core.light,
    dark: core.dark
  });
}

const feedback = deriveFeedbackColors();

writePreset('feedback.classic.json', {
  name: 'feedback.classic',
  dimension: 'feedback',
  light: feedback.light,
  dark: feedback.dark
});

writePreset('chart.default.json', {
  name: 'chart.default',
  dimension: 'chart',
  light: CHART_TEMPLATE.light,
  dark: CHART_TEMPLATE.dark
});

console.log('official replica presets written to presets/');
