export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    result[key] = obj[key];
  }

  return result;
}

export function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]) {
  const result = {} as Omit<T, K>;

  for (const key in obj) {
    const k = key as unknown as K;

    if (!keys.includes(k)) {
      (result as T)[k] = obj[k];
    }
  }

  return result;
}
