/**
 * WCAG 2.1 contrast math over **hsl channel strings** (the canonical form the
 * guard compares in). The contrast guard (§7 of docs/theme.md) uses it
 * to verify every declared token pair at generation time; `oklch` output is
 * converted to hsl by the caller so this module stays format-agnostic and
 * dependency-free.
 */

/**
 * an sRGB triple with components in `[0, 1]`.
 */
export interface Rgb {
  r: number;
  g: number;
  b: number;
}

const CHANNEL_PATTERN = /^([\d.]+)(?:\s|%|deg)*\s+([\d.]+)%?\s+([\d.]+)%?/;

/**
 * parse an hsl channel triple (`240 4.8% 95.9%`) into sRGB.
 *
 * Returns `undefined` when the value is not a parseable channel triple, so
 * callers can distinguish "unparseable" from "no contrast".
 */
export function hslChannelToRgb(channel: string): Rgb | undefined {
  const match = CHANNEL_PATTERN.exec(channel.trim());

  if (!match) {
    return undefined;
  }

  const hue = Number(match[1]);
  const saturation = Number(match[2]) / 100;
  const lightness = Number(match[3]) / 100;
  const a = saturation * Math.min(lightness, 1 - lightness);
  const f = (n: number): number => {
    const k = (n + hue / 30) % 12;

    return lightness - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };

  return { r: f(0), g: f(8), b: f(4) };
}

/**
 * WCAG 2.1 relative luminance of an sRGB triple.
 */
export function relativeLuminance({ r, g, b }: Rgb): number {
  const linear = (value: number): number => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);

  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

/**
 * the WCAG contrast ratio between two hsl channel triples.
 *
 * Returns `undefined` when either side cannot be parsed.
 */
export function contrastRatio(a: string, b: string): number | undefined {
  const rgbA = hslChannelToRgb(a);
  const rgbB = hslChannelToRgb(b);

  if (!rgbA || !rgbB) {
    return undefined;
  }

  const sorted = [relativeLuminance(rgbA), relativeLuminance(rgbB)].sort((x, y) => y - x);
  const lighter = sorted[0] as number;
  const darker = sorted[1] as number;

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * round a ratio to 2 decimals, for stable reports and snapshots.
 */
export function roundRatio(ratio: number): number {
  return Math.round(ratio * 100) / 100;
}
