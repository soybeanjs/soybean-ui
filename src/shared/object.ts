/**
 * 从对象中选择指定的属性
 *
 * @param obj - 源对象
 * @param keys - 要选择的属性键数组
 * @returns 包含指定属性的新对象
 */
export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    result[key] = obj[key];
  }

  return result;
}

/**
 * 从对象中排除指定的属性
 *
 * @param obj - 源对象
 * @param keys - 要排除的属性键数组
 * @returns 排除指定属性后的新对象
 */
export function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]) {
  const result = {} as Omit<T, K>;

  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    const k = key as unknown as K;

    if (!keys.includes(k)) {
      (result as T)[k] = obj[k];
    }
  }

  return result;
}

/**
 * 从数组中移除指定的元素
 *
 * @param array - 源数组
 * @param item - 要移除的元素
 * @returns 移除元素后的新数组
 */
export function arrayRemove<T>(array: T[], item: T) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);

  if (index !== -1) {
    updatedArray.splice(index, 1);
  }

  return updatedArray;
}

/**
 * Wraps an array around itself at a given start index Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a',
 * 'b']`
 */
export function wrapArray<T>(array: T[], startIndex: number) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}

/**
 * 使用 JSON 序列化进行深拷贝
 *
 * @param value - 要克隆的值
 * @returns 克隆后的值
 */
export function jsonClone<T>(value: T) {
  return JSON.parse(JSON.stringify(value)) as T;
}

/**
 * 使用结构化克隆或 JSON 克隆进行深拷贝
 *
 * @param value - 要克隆的值
 * @returns 克隆后的值
 */
export function cloneValue<T>(value: T) {
  if (typeof structuredClone === 'undefined') {
    return jsonClone(value);
  }

  return structuredClone(value);
}
