import { describe, it, expect } from 'vitest';
import { buildChartColorCss } from '../../src/utils/chart-style';
import type { ChartConfig } from '../../src/types';

describe('buildChartColorCss', () => {
  it('generates scoped css variables for colored config entries', () => {
    const config: ChartConfig = {
      desktop: { label: 'Desktop', color: 'var(--chart-1)' },
      mobile: { label: 'Mobile', theme: { light: '#f43f5e', dark: '#fb7185' } }
    };

    const css = buildChartColorCss('chart-abc', config);

    expect(css).toContain('[data-chart=chart-abc]');
    expect(css).toContain('--color-desktop: var(--chart-1);');
    expect(css).toContain('--color-mobile: #f43f5e;');
    expect(css).toContain('.dark [data-chart=chart-abc]');
    expect(css).toContain('--color-mobile: #fb7185;');
  });

  it('omits entries without a color or theme', () => {
    const css = buildChartColorCss('chart-1', {
      plain: { label: 'No color' },
      colored: { label: 'A', color: 'red' }
    });

    expect(css).not.toContain('--color-plain');
    expect(css).toContain('--color-colored: red;');
  });

  it('returns an empty string when no colors are configured', () => {
    expect(buildChartColorCss('chart-1', { a: { label: 'A' } })).toBe('');
  });
});
