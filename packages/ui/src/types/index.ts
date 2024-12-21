export type { SelectEvent, AcceptableValue } from '@soybean-ui/primitive';
export type { ThemeColor, ThemeOrientation, ThemeSize, ThemeAlign, ThemeSide } from '@soybean-ui/variants';

export type AnchorTarget = '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null;

export type AnchorRel = 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | (string & {}) | null;
