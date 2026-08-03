import { describe, expect, it } from 'vitest';
import { parse } from 'valibot';
import { themePresetSchema } from '../src/schema';

const validPreset = {
  name: 'base.zinc',
  version: '1.0.0',
  dimension: 'base',
  light: { background: 'white', foreground: 'zinc.950' },
  dark: { background: 'zinc.950', foreground: 'zinc.50' }
};

describe('themePresetSchema', () => {
  it('accepts a valid preset', () => {
    expect(() => parse(themePresetSchema, validPreset)).not.toThrow();
  });

  it('accepts a preset without dark tokens', () => {
    const { dark: _dark, ...lightOnly } = validPreset;
    expect(() => parse(themePresetSchema, lightOnly)).not.toThrow();
  });

  it('rejects a preset missing name', () => {
    const { name: _name, ...invalid } = validPreset;
    expect(() => parse(themePresetSchema, invalid)).toThrow();
  });

  it('rejects a preset with an unknown dimension', () => {
    expect(() => parse(themePresetSchema, { ...validPreset, dimension: 'primary' })).toThrow();
  });

  it('rejects a preset with a non-enum color key', () => {
    expect(() =>
      parse(themePresetSchema, { ...validPreset, light: { background: 'white', bogus: 'red.500' } })
    ).toThrow();
  });

  it('rejects a preset with empty light tokens', () => {
    expect(() => parse(themePresetSchema, { ...validPreset, light: {} })).toThrow();
  });
});
