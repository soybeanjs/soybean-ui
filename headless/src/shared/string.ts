import { compact } from './object';

/**
 * Convert string to path
 *
 * @param str - The string to convert
 * @returns Path
 */
export function stringToPath(str: string) {
  return compact(str.replace(/["|']|\]/g, '').split(/\.|\[/));
}

/**
 * Check if string is a key
 *
 * @param str - The string to check
 * @returns Whether the string is a key
 */
export function isKey(str: string) {
  return /^\w*$/.test(str);
}

/**
 * Replace `{key}` placeholders in a template string with values from `params`.
 * Unknown keys are left as-is.
 */
export function interpolate(template: string, params: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => params[key] ?? match);
}
