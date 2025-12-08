import type { ThemeColor, ThemeSize } from '@soybeanjs/ui';
import { transformRecordToOption } from '../shared';

export const themeSizeRecord: Record<ThemeSize, string> = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  '2xl': '2xl'
};

export const themeSizeOptions = transformRecordToOption(themeSizeRecord);

export const themeColorRecord: Record<ThemeColor, string> = {
  primary: 'primary',
  destructive: 'destructive',
  success: 'success',
  warning: 'warning',
  info: 'info',
  carbon: 'carbon',
  secondary: 'secondary',
  accent: 'accent'
};

export const themeColorOptions = transformRecordToOption(themeColorRecord);
