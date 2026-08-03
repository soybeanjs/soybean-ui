/**
 * shared pure helpers for the generate/validate toolchain
 */

export interface PresetJson {
  name: string;
  version: string;
  dimension: string;
  light?: Record<string, string>;
  dark?: Record<string, string>;
}

/**
 * derive the short preset name from the dotted preset name
 *
 * `base.zinc` -> `zinc`; `feedback.classic` -> `classic`
 */
export function getShortName(name: string): string {
  return name.split('.').slice(1).join('.');
}

/**
 * derive the export identifier from dimension + short name
 *
 * `base` + `zinc` -> `baseZinc`; `theme` + `soybean` -> `themeSoybean`
 */
export function getExportName(dimension: string, shortName: string): string {
  return `${dimension}${shortName[0].toUpperCase()}${shortName.slice(1)}`;
}

/**
 * serialize a preset JSON into a type-safe generated TS file
 */
export function presetTsFileContent(preset: PresetJson): string {
  const shortName = getShortName(preset.name);
  const exportName = getExportName(preset.dimension, shortName);

  const tokens: Record<string, Record<string, string>> = {};

  if (preset.light) {
    tokens.light = preset.light;
  }

  if (preset.dark) {
    tokens.dark = preset.dark;
  }

  const body = JSON.stringify(tokens, null, 2);

  return `import type { CustomThemeColorPreset } from '@soybeanjs/theme';

export const ${exportName} = ${body} as const satisfies CustomThemeColorPreset;
`;
}

/**
 * aggregate index file re-exporting every generated preset
 */
export function presetIndexFileContent(
  entries: Array<{ dimension: string; shortName: string; exportName: string }>
): string {
  return `${entries
    .map(({ exportName, dimension, shortName }) => `export { ${exportName} } from './${dimension}/${shortName}';`)
    .join('\n')}\n`;
}
