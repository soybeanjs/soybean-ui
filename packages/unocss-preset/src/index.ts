import type { Preset } from '@unocss/core';
import type { Theme } from 'unocss/preset-mini';
import { generateCSSVars, generateGlobalStyles } from './generate';
import themes from './theme.json';
import type { PresetShadcnOptions, ThemeColorKey, ThemeConfig, ThemeConfigColor, ThemeOptions } from './types';

export const builtinColors = themes.map(theme => theme.name) as ThemeConfigColor[];
export const builtinColorMap = themes.reduce(
  (acc, theme) => {
    acc[theme.name as ThemeConfigColor] = theme.cssVars.light.primary;
    return acc;
  },
  {} as Record<ThemeConfigColor, string>
);
export const builtinRadiuses = [0, 0.3, 0.5, 0.75, 1] as const;

/**
 * The UnoCSS preset for Soybean UI.
 *
 * @param options - The options for the preset.
 * @param globals - Whether to generate global variables, like *.border-color, body.color, body.background.
 */
export function presetSoybeanUI(options: PresetShadcnOptions = {}, globals = true): Preset<Theme> {
  return {
    name: 'unocss-preset-soybean-ui',
    preflights: [
      {
        getCSS: () => `
          @keyframes shadcn-down { from{ height: 0 } to { height: var(--soybean-accordion-content-height)} }
          @keyframes shadcn-up { from{ height: var(--soybean-accordion-content-height)} to { height: 0 } }
          @keyframes shadcn-collapsible-down { from{ height: 0 } to { height: var(--soybean-collapsible-content-height)} }
          @keyframes shadcn-collapsible-up { from{ height: var(--soybean-collapsible-content-height)} to { height: 0 } }

          ${generateCSSVars(options)}

          ${globals ? generateGlobalStyles() : ''}
        `
      }
    ],
    rules: [
      [
        'animate-accordion-down',
        {
          animation: 'shadcn-down 0.2s ease-out'
        }
      ],
      [
        'animate-accordion-up',
        {
          animation: 'shadcn-up 0.2s ease-out'
        }
      ],
      [
        'animate-collapsible-down',
        {
          animation: 'shadcn-collapsible-down 0.2s ease-out'
        }
      ],
      [
        'animate-collapsible-up',
        {
          animation: 'shadcn-collapsible-up 0.2s ease-out'
        }
      ]
    ],
    theme: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: 'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          200: 'hsl(var(--primary-200))',
          300: 'hsl(var(--primary-300))',
          400: 'hsl(var(--primary-400))',
          500: 'hsl(var(--primary-500))',
          600: 'hsl(var(--primary-600))',
          700: 'hsl(var(--primary-700))',
          800: 'hsl(var(--primary-800))',
          900: 'hsl(var(--primary-900))',
          950: 'hsl(var(--primary-950))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          50: 'hsl(var(--destructive-50))',
          100: 'hsl(var(--destructive-100))',
          200: 'hsl(var(--destructive-200))',
          300: 'hsl(var(--destructive-300))',
          400: 'hsl(var(--destructive-400))',
          500: 'hsl(var(--destructive-500))',
          600: 'hsl(var(--destructive-600))',
          700: 'hsl(var(--destructive-700))',
          800: 'hsl(var(--destructive-800))',
          900: 'hsl(var(--destructive-900))',
          950: 'hsl(var(--destructive-950))'
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          50: 'hsl(var(--success-50))',
          100: 'hsl(var(--success-100))',
          200: 'hsl(var(--success-200))',
          300: 'hsl(var(--success-300))',
          400: 'hsl(var(--success-400))',
          500: 'hsl(var(--success-500))',
          600: 'hsl(var(--success-600))',
          700: 'hsl(var(--success-700))',
          800: 'hsl(var(--success-800))',
          900: 'hsl(var(--success-900))',
          950: 'hsl(var(--success-950))'
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          50: 'hsl(var(--warning-50))',
          100: 'hsl(var(--warning-100))',
          200: 'hsl(var(--warning-200))',
          300: 'hsl(var(--warning-300))',
          400: 'hsl(var(--warning-400))',
          500: 'hsl(var(--warning-500))',
          600: 'hsl(var(--warning-600))',
          700: 'hsl(var(--warning-700))',
          800: 'hsl(var(--warning-800))',
          900: 'hsl(var(--warning-900))',
          950: 'hsl(var(--warning-950))'
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
          50: 'hsl(var(--info-50))',
          100: 'hsl(var(--info-100))',
          200: 'hsl(var(--info-200))',
          300: 'hsl(var(--info-300))',
          400: 'hsl(var(--info-400))',
          500: 'hsl(var(--info-500))',
          600: 'hsl(var(--info-600))',
          700: 'hsl(var(--info-700))',
          800: 'hsl(var(--info-800))',
          900: 'hsl(var(--info-900))',
          950: 'hsl(var(--info-950))'
        },
        carbon: {
          DEFAULT: 'hsl(var(--carbon))',
          foreground: 'hsl(var(--carbon-foreground))',
          50: 'hsl(var(--carbon-50))',
          100: 'hsl(var(--carbon-100))',
          200: 'hsl(var(--carbon-200))',
          300: 'hsl(var(--carbon-300))',
          400: 'hsl(var(--carbon-400))',
          500: 'hsl(var(--carbon-500))',
          600: 'hsl(var(--carbon-600))',
          700: 'hsl(var(--carbon-700))',
          800: 'hsl(var(--carbon-800))',
          900: 'hsl(var(--carbon-900))',
          950: 'hsl(var(--carbon-950))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontSize: {
        '4xs': ['0.375rem', '0.5rem'],
        '3xs': ['0.5rem', '0.625rem'],
        '2xs': ['0.625rem', '0.75rem']
      }
    }
  };
}

export { generateCSSVars };

export default presetSoybeanUI;

export type { ThemeConfig, ThemeColorKey, ThemeConfigColor, PresetShadcnOptions, ThemeOptions };
