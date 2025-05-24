/**
 * 将字符串转换为 kebab-case 格式
 *
 * @example
 *   toKebabCase('helloWorld'); // 'hello-world'
 *   toKebabCase('HelloWorld'); // 'hello-world'
 *
 * @param str - 要转换的字符串
 * @returns kebab-case 格式的字符串
 */
export function toKebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * 将字符串转换为 PascalCase 格式
 *
 * @example
 *   toPascalCase('hello-world'); // 'HelloWorld'
 *   toPascalCase('hello_world'); // 'HelloWorld'
 *
 * @param str - 要转换的字符串
 * @returns PascalCase 格式的字符串
 */
export function toPascalCase(str: string) {
  return str.replace(/(^\w|-\w)/g, char => char.replace('-', '').toUpperCase());
}

/**
 * 将字符串转换为 camelCase 格式
 *
 * @example
 *   toCamelCase('hello-world'); // 'helloWorld'
 *   toCamelCase('hello_world'); // 'helloWorld'
 *
 * @param str - 要转换的字符串
 * @returns camelCase 格式的字符串
 */
export function toCamelCase(str: string) {
  return str.replace(/(-\w)/g, char => char.replace('-', '').toUpperCase());
}
