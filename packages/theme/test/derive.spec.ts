import { describe, it, expect } from 'vitest';
import { createTheme } from '../src/core';
import { CHART_TEMPLATE, builtinPrimaryPresetKeys } from '../src/core-template';
import { deriveBasePreset, deriveFeedbackColors, derivePrimaryPreset } from '../src/derive';
import { generateThemePreset } from '../src/preset';
import { DARK_BORDER, DARK_INPUT } from '../src/tokens';

describe('deriveBasePreset - light level offsets (§4.2)', () => {
  it('light level 0 matches the baseline template', () => {
    const base = deriveBasePreset('zinc');

    expect(base.light.background).toBe('white');
    expect(base.light.card).toBe('white');
    expect(base.light.popover).toBe('white');
    expect(base.light.foreground).toBe('zinc.950');
    expect(base.light.primaryForeground).toBe('zinc.50');
    expect(base.light.secondary).toBe('zinc.100');
    expect(base.light.secondaryForeground).toBe('zinc.900');
    expect(base.light.muted).toBe('zinc.100');
    expect(base.light.mutedForeground).toBe('zinc.500');
    expect(base.light.accent).toBe('zinc.100');
    expect(base.light.accentForeground).toBe('zinc.900');
    expect(base.light.carbon).toBe('zinc.800');
    expect(base.light.carbonForeground).toBe('zinc.50');
    expect(base.light.border).toBe('zinc.200');
    expect(base.light.input).toBe('zinc.200');
  });

  it('lightLevel 1 darkens surfaces one step', () => {
    const shifted = deriveBasePreset('zinc', 1);

    expect(shifted.light.background).toBe('zinc.50');
    expect(shifted.light.card).toBe('zinc.50');
    expect(shifted.light.popover).toBe('zinc.50');
    expect(shifted.light.muted).toBe('zinc.200');
    expect(shifted.light.secondary).toBe('zinc.200');
    expect(shifted.light.mutedForeground).toBe('zinc.600');
    expect(shifted.light.accent).toBe('zinc.200');
  });

  it('lightLevel 2 darkens surfaces two steps', () => {
    const shifted = deriveBasePreset('zinc', 2);

    expect(shifted.light.background).toBe('zinc.100');
    expect(shifted.light.card).toBe('zinc.100');
    expect(shifted.light.muted).toBe('zinc.300');
    expect(shifted.light.secondary).toBe('zinc.300');
    expect(shifted.light.mutedForeground).toBe('zinc.700');
    expect(shifted.light.accent).toBe('zinc.300');
  });

  it('foreground / primaryForeground / carbon / border / input never shift in light mode (D8)', () => {
    const shifted = deriveBasePreset('zinc', 2);

    expect(shifted.light.foreground).toBe('zinc.950');
    expect(shifted.light.primaryForeground).toBe('zinc.50');
    expect(shifted.light.secondaryForeground).toBe('zinc.900');
    expect(shifted.light.carbon).toBe('zinc.800');
    expect(shifted.light.carbonForeground).toBe('zinc.50');
    expect(shifted.light.border).toBe('zinc.200');
    expect(shifted.light.input).toBe('zinc.200');
  });
});

describe('deriveBasePreset - dark level offsets (§4.2)', () => {
  it('dark level 0 matches the baseline template', () => {
    const base = deriveBasePreset('zinc');

    expect(base.dark.background).toBe('zinc.950');
    expect(base.dark.card).toBe('zinc.900');
    expect(base.dark.popover).toBe('zinc.900');
    expect(base.dark.foreground).toBe('zinc.50');
    expect(base.dark.primaryForeground).toBe('zinc.900');
    expect(base.dark.secondary).toBe('zinc.800');
    expect(base.dark.secondaryForeground).toBe('zinc.50');
    expect(base.dark.muted).toBe('zinc.800');
    expect(base.dark.mutedForeground).toBe('zinc.400');
    expect(base.dark.accent).toBe('zinc.800');
    expect(base.dark.accentForeground).toBe('zinc.50');
    expect(base.dark.carbon).toBe('zinc.100');
    expect(base.dark.carbonForeground).toBe('zinc.900');
    expect(base.dark.border).toBe(DARK_BORDER);
    expect(base.dark.input).toBe(DARK_INPUT);
  });

  it('darkLevel 1 brightens surfaces one step', () => {
    const shifted = deriveBasePreset('zinc', 0, 1);

    expect(shifted.dark.background).toBe('zinc.900');
    expect(shifted.dark.card).toBe('zinc.800');
    expect(shifted.dark.popover).toBe('zinc.800');
    expect(shifted.dark.muted).toBe('zinc.700');
    expect(shifted.dark.secondary).toBe('zinc.700');
    expect(shifted.dark.mutedForeground).toBe('zinc.300');
    expect(shifted.dark.accent).toBe('zinc.700');
  });

  it('darkLevel 3 clamps at the table end', () => {
    const shifted = deriveBasePreset('zinc', 0, 3);

    expect(shifted.dark.background).toBe('zinc.700');
    expect(shifted.dark.card).toBe('zinc.600');
    expect(shifted.dark.popover).toBe('zinc.600');
    expect(shifted.dark.muted).toBe('zinc.500');
    expect(shifted.dark.secondary).toBe('zinc.500');
    expect(shifted.dark.mutedForeground).toBe('zinc.100');
    expect(shifted.dark.accent).toBe('zinc.500');
  });

  it('foreground / border / input / carbon never shift in dark mode (D8)', () => {
    const shifted = deriveBasePreset('zinc', 0, 3);

    expect(shifted.dark.foreground).toBe('zinc.50');
    expect(shifted.dark.primaryForeground).toBe('zinc.900');
    expect(shifted.dark.carbon).toBe('zinc.100');
    expect(shifted.dark.carbonForeground).toBe('zinc.900');
    expect(shifted.dark.border).toBe(DARK_BORDER);
    expect(shifted.dark.input).toBe(DARK_INPUT);
  });
});

describe('derivePrimaryPreset (§3.2 / D7)', () => {
  it('neutral family: {p}.800/.200 + ring {p}.400/.500', () => {
    const primary = derivePrimaryPreset('zinc');

    expect(primary.light.primary).toBe('zinc.800');
    expect(primary.light.ring).toBe('zinc.400');
    expect(primary.dark.primary).toBe('zinc.200');
    expect(primary.dark.ring).toBe('zinc.500');
  });

  it('chromatic family: {p}.500 in both modes + ring {p}.400/.900', () => {
    const primary = derivePrimaryPreset('indigo');

    expect(primary.light.primary).toBe('indigo.500');
    expect(primary.light.ring).toBe('indigo.400');
    expect(primary.dark.primary).toBe('indigo.500');
    expect(primary.dark.ring).toBe('indigo.900');
  });

  it('light-green family uses {p}.600 as the dark primary (baseline template)', () => {
    for (const key of ['lime', 'green', 'emerald'] as const) {
      const primary = derivePrimaryPreset(key);

      expect(primary.light.primary).toBe(`${key}.500`);
      expect(primary.dark.primary).toBe(`${key}.600`);
    }
  });

  it('chart colors reuse the fixed template for every palette (D7)', () => {
    for (const key of builtinPrimaryPresetKeys) {
      const primary = derivePrimaryPreset(key);

      expect(primary.light.chart1).toBe(CHART_TEMPLATE.light.chart1);
      expect(primary.light.chart2).toBe(CHART_TEMPLATE.light.chart2);
      expect(primary.light.chart3).toBe(CHART_TEMPLATE.light.chart3);
      expect(primary.light.chart4).toBe(CHART_TEMPLATE.light.chart4);
      expect(primary.light.chart5).toBe(CHART_TEMPLATE.light.chart5);
      expect(primary.dark.chart1).toBe(CHART_TEMPLATE.dark.chart1);
      expect(primary.dark.chart2).toBe(CHART_TEMPLATE.dark.chart2);
      expect(primary.dark.chart3).toBe(CHART_TEMPLATE.dark.chart3);
      expect(primary.dark.chart4).toBe(CHART_TEMPLATE.dark.chart4);
      expect(primary.dark.chart5).toBe(CHART_TEMPLATE.dark.chart5);
    }
  });
});

describe('deriveFeedbackColors (ADR-6 / D9)', () => {
  it('uses fixed classic values', () => {
    const feedback = deriveFeedbackColors();

    expect(feedback.light).toEqual({
      destructive: 'red.500',
      success: 'green.500',
      warning: 'amber.500',
      info: 'blue.500'
    });
    expect(feedback.dark).toEqual({
      destructive: 'red.400',
      success: 'green.400',
      warning: 'amber.400',
      info: 'blue.400'
    });
  });
});

describe('sidebar derivation (§3.2)', () => {
  it('derives sidebar colors from base ⊕ primary', () => {
    const preset = generateThemePreset({ base: 'zinc', primary: 'indigo' });

    expect(preset.light.sidebar).toBe(preset.light.background);
    expect(preset.light.sidebarForeground).toBe(preset.light.foreground);
    expect(preset.light.sidebarPrimary).toBe(preset.light.primary);
    expect(preset.light.sidebarPrimaryForeground).toBe(preset.light.primaryForeground);
    expect(preset.light.sidebarAccent).toBe(preset.light.accent);
    expect(preset.light.sidebarAccentForeground).toBe(preset.light.accentForeground);
    expect(preset.light.sidebarBorder).toBe(preset.light.border);
    expect(preset.light.sidebarRing).toBe(preset.light.ring);
    expect(preset.dark.sidebar).toBe(preset.dark.card);
    expect(preset.dark.sidebarPrimary).toBe(preset.dark.primary);
  });
});

describe('custom preset override (ADR-5)', () => {
  it('overrides derived values with the highest priority', () => {
    const preset = generateThemePreset(
      { base: 'zinc', primary: 'indigo' },
      {},
      {
        light: { primary: 'red.600', chart1: 'purple.400' },
        dark: { primary: 'red.400' }
      }
    );

    expect(preset.light.primary).toBe('red.600');
    expect(preset.light.chart1).toBe('purple.400');
    expect(preset.dark.primary).toBe('red.400');
    expect(preset.dark.chart1).toBe(CHART_TEMPLATE.dark.chart1);
  });
});

describe('createTheme', () => {
  it('emits the full CSS variable contract', () => {
    const css = createTheme();

    expect(css).toContain('--background:');
    expect(css).toContain('--foreground:');
    expect(css).toContain('--primary:');
    expect(css).toContain('--chart-5:');
    expect(css).toContain('--size: 16px');
    expect(css).toContain('--radius: 0.625rem');
    expect(css).toContain('.dark');
  });

  it('level offsets change the generated CSS', () => {
    const level0 = createTheme({ base: 'zinc' });
    const shifted = createTheme({ base: 'zinc', lightLevel: 2, darkLevel: 3 });

    expect(shifted).not.toBe(level0);
  });
});
