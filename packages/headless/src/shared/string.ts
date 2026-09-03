import { compact } from './object';

export function capitalize(str: string): string {
  if (!str) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** 'helloWorld' | 'hello_world' | 'Hello World' → 'hello-world' */
export function kebabCase(str: string): string {
  return str
    .replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replaceAll(/[\s_]+/g, '-')
    .replaceAll(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

/** 'hello-world' | 'hello_world' | 'hello world' → 'HelloWorld' */
export function pascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map(word => capitalize(word.toLowerCase()))
    .join('');
}

/** 'hello-world' | 'hello_world' | 'Hello World' → 'helloWorld' */
export function camelCase(str: string): string {
  const pascal = pascalCase(str);

  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
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

/**
 * Replace `{key}` placeholders in a template string with values from `params`.
 * Unknown keys are left as-is.
 */
export function interpolate(template: string, params: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => params[key] ?? match);
}
