import { describe, it, expect } from 'vitest';
import { generateThemePreset } from '../src/preset';
import type { FullThemePreset } from '../src/types';

const LIGHT_LEVELS = [0, 1, 2] as const;
const DARK_LEVELS = [0, 1, 2, 3] as const;

/**
 * snapshot guard for the 3×4 level offset matrix (§4.2 / ADR-4)
 *
 * each combo snapshots the full 40-key theme preset for zinc/indigo;
 * a change to any offset table or derivation rule shows up here.
 */
describe('level offset snapshots - 3×4 combos', () => {
  for (const lightLevel of LIGHT_LEVELS) {
    for (const darkLevel of DARK_LEVELS) {
      it(`lightLevel=${lightLevel} darkLevel=${darkLevel}`, () => {
        const preset: FullThemePreset = generateThemePreset({ base: 'zinc', primary: 'indigo', lightLevel, darkLevel });

        expect(preset).toMatchSnapshot();
      });
    }
  }
});
