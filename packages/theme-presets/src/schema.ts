import { check, literal, object, optional, pipe, record, string, union } from 'valibot';
import { DIMENSIONS, THEME_COLOR_KEYS } from './types';

/**
 * color token keys (runtime enum of the theme color contract)
 */
const colorKeySchema = union(THEME_COLOR_KEYS.map(key => literal(key)));

const colorTokensSchema = pipe(
  record(colorKeySchema, string()),
  check(tokens => Object.keys(tokens).length > 0, 'color tokens must not be empty')
);

/**
 * theme preset schema
 *
 * - `dimension` is a classification id only (never constrains the key set)
 * - `light` / `dark` carry any subset of the theme color keys
 */
export const themePresetSchema = object({
  name: string(),
  version: string(),
  dimension: union(DIMENSIONS.map(dimension => literal(dimension))),
  light: colorTokensSchema,
  dark: optional(colorTokensSchema)
});
