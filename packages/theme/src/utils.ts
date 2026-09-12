/**
 * Dependency-free object utilities copied from `@soybeanjs/headless/shared`
 * (`defu` from `object.ts`, `keysOf` from `guard.ts`). Kept here so the theme
 * package does not reference headless sources at build time.
 */

function isObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    value !== undefined &&
    !Array.isArray(value) &&
    typeof value === 'object' &&
    !(value instanceof Date)
  );
}

type UnionToIntersection<U> = (U extends unknown ? (arg: U) => void : never) extends (arg: infer I) => void ? I : never;

/**
 * Recursive defaults merge: `defu({ a: 1 }, { a: 2, b: 3 })` → `{ a: 1, b: 3 }`.
 * Left side wins; plain objects merge recursively, arrays and other types are taken from the left side.
 */
export function defu<T extends object, D extends object[]>(
  source: T | undefined,
  ...defaults: D
): UnionToIntersection<T | D[number]> {
  const result: Record<string, unknown> = {};

  for (const obj of [source, ...defaults]) {
    if (!isObject(obj)) {
      continue;
    }

    for (const key of Object.keys(obj)) {
      const value = obj[key];
      const current = result[key];

      if (current === undefined) {
        result[key] = value;
      } else if (isObject(current) && isObject(value)) {
        result[key] = defu(current, value);
      }
    }
  }

  return result as UnionToIntersection<T | D[number]>;
}

/**
 * Object keys as a typed tuple.
 */
export function keysOf<TRecord extends object>(record: TRecord) {
  return Object.keys(record) as (keyof TRecord)[];
}
