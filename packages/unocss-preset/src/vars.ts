import type { Theme } from 'unocss/preset-mini';

export function createUiCssVars() {
  const fontSize: Theme['fontSize'] = {
    '3xs': ['0.375rem', '0.5rem'],
    '2xs': ['0.5rem', '0.625rem'],
    xs: ['0.625rem', '0.75rem'],
    sm: ['0.75rem', '1rem'],
    md: ['0.875rem', '1.25rem'],
    lg: ['1rem', '1.5rem'],
    xl: ['1.125rem', '1.75rem'],
    '2xl': ['1.25rem', '1.75rem'],
    '3xl': ['1.5rem', '2rem'],
    '4xl': ['1.875rem', '2.25rem'],
    '5xl': ['2.25rem', '2.5rem'],
    '6xl': ['3rem', '1'],
    '7xl': ['3.75rem', '1'],
    '8xl': ['4.5rem', '1'],
    '9xl': ['6rem', '1'],
    '10xl': ['8rem', '1']
  };

  const spacing: Theme['spacing'] = {
    DEFAULT: '1rem',
    none: '0',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem'
  };

  let cssVars = '';

  for (const [key, value] of Object.entries(fontSize)) {
    cssVars += `--ui-font-size-${key}: ${value[0]};\n`;
    cssVars += `--ui-font-size-${key}-lh: ${value[1]};\n`;
  }

  for (const [key, value] of Object.entries(spacing)) {
    cssVars += `--ui-spacing-${key}: ${value};\n`;
  }

  return `
:root {
  ${cssVars}
}
  `;
}
