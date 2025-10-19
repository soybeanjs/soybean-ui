import { compact } from './object';

/**
 * Convert string to kebab-case format
 *
 * @example
 *   toKebabCase('helloWorld'); // 'hello-world'
 *   toKebabCase('HelloWorld'); // 'hello-world'
 *
 * @param str - The string to convert
 * @returns String in kebab-case format
 */
export function toKebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Convert string to PascalCase format
 *
 * @example
 *   toPascalCase('hello-world'); // 'HelloWorld'
 *   toPascalCase('hello_world'); // 'HelloWorld'
 *
 * @param str - The string to convert
 * @returns String in PascalCase format
 */
export function toPascalCase(str: string) {
  return str.replace(/(^\w|-\w)/g, char => char.replace('-', '').toUpperCase());
}

/**
 * Convert string to camelCase format
 *
 * @example
 *   toCamelCase('hello-world'); // 'helloWorld'
 *   toCamelCase('hello_world'); // 'helloWorld'
 *
 * @param str - The string to convert
 * @returns String in camelCase format
 */
export function toCamelCase(str: string) {
  return str.replace(/(-\w)/g, char => char.replace('-', '').toUpperCase());
}

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
