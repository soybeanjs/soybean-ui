import { definePreset } from 'unocss';
import type { Preflight } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { createShadcnTheme } from '@soybeanjs/shadcn-theme';
import type { ThemeOptions } from '@soybeanjs/shadcn-theme';
import globalStyle from './global.css?raw';
import resetStyle from './reset.css?raw';

export interface ShadcnPresetOptions extends ThemeOptions {
  /**
   * whether to generate the CSS for the theme
   */
  generated?: boolean;
  /**
   * whether to include the global CSS preflight (including border color, background color, etc.)
   *
   * only effective when `generated` is true, as the global CSS relies on the generated CSS variables
   *
   * @default true
   */
  globalCss?: boolean;
  /**
   * whether to include the reset CSS preflight (including box-sizing, border-width, etc.)
   *
   * only effective when `generated` is true, as the reset CSS relies on the generated CSS variables
   *
   * @default true
   */
  resetCss?: boolean;
}

export const presetShadcn = definePreset<ShadcnPresetOptions, Theme>((options?: ShadcnPresetOptions) => {
  const { globalCss = true, resetCss = true } = options || {};

  const preflights: Preflight[] = [];

  if (options?.generated) {
    if (resetCss) {
      preflights.push({
        getCSS: () => resetStyle
      });
    }
    if (globalCss) {
      preflights.push({
        getCSS: () => globalStyle
      });
    }

    preflights.push({
      getCSS: () => {
        let css = '';

        if (options?.generated) {
          const { getCss } = createShadcnTheme(options);
          css = getCss();
        }

        return css;
      }
    });
  }

  return {
    name: 'unocss-preset-shadcn',
    preflights,
    theme: {
      animation: {
        keyframes: {
          'collapsible-down': '{from{ height: 0 } to { height: var(--soybean-collapsible-content-height)}}',
          'collapsible-up': '{from{ height: var(--soybean-collapsible-content-height)} to { height: 0 }}'
        },
        durations: {
          'collapsible-down': '200ms',
          'collapsible-up': '200ms'
        },
        timingFns: {
          'collapsible-down': 'ease-out',
          'collapsible-up': 'ease-out'
        }
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
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
        border: 'hsl(var(--border) / var(--border-alpha, 1))',
        input: 'hsl(var(--input) / var(--input-alpha, 1))',
        ring: 'hsl(var(--ring))',
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
        sidebar: 'hsl(var(--sidebar))',
        'sidebar-foreground': 'hsl(var(--sidebar-foreground))',
        'sidebar-primary': 'hsl(var(--sidebar-primary))',
        'sidebar-primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
        'sidebar-accent': 'hsl(var(--sidebar-accent))',
        'sidebar-accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
        'sidebar-border': 'hsl(var(--sidebar-border) / var(--sidebar-border-alpha, 1))',
        'sidebar-ring': 'hsl(var(--sidebar-ring))',
        'chart-1': 'hsl(var(--chart-1))',
        'chart-2': 'hsl(var(--chart-2))',
        'chart-3': 'hsl(var(--chart-3))',
        'chart-4': 'hsl(var(--chart-4))',
        'chart-5': 'hsl(var(--chart-5))'
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
});
