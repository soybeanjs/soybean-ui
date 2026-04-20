import type { ClassValue } from '@soybeanjs/headless';
import { cn } from './merge';

/**
 * Merge slot variants with props and root class.
 * @param variants - The variants to merge.
 * @param uis - The uis to merge.
 * @returns The merged variants.
 */
export function mergeSlotVariants<
  T extends Record<string, (...args: any[]) => string>,
  P extends Record<keyof T, ClassValue>
>(variants: T, ...uis: Array<Partial<P> | null | undefined>) {
  return Object.entries(variants).reduce(
    (acc, [$key, variant]) => {
      const key = $key as keyof T;

      acc[key] = cn(
        variant(),
        ...uis
          .filter(Boolean)
          .map(u => u?.[key])
          .filter(Boolean)
      );
      return acc;
    },
    {} as Record<keyof T, string>
  );
}

export function mergeUi<T extends Record<string, ClassValue>, S extends Record<keyof T, ClassValue>>(
  target?: T,
  ...sources: Array<Partial<S> | null | undefined>
) {
  if (!target) return {} as T;

  return Object.entries(target).reduce((acc, [$key, value]) => {
    const key = $key as keyof T;

    Object.assign(acc, {
      [key]: cn(
        value,
        ...sources
          .filter(Boolean)
          .map(s => s?.[key])
          .filter(Boolean)
      )
    });

    return acc;
  }, {} as T);
}

export function mergeBaseVariants<T extends Record<string, () => string>, B extends Partial<Record<keyof T, string>>>(
  variants: T,
  baseVariants: B
): Record<keyof T, () => string> {
  return Object.entries(variants).reduce(
    (acc, [$key, variant]) => {
      const key = $key as keyof T;
      const base = baseVariants[key];

      acc[key] = () => `${base ?? ''} ${variant()}`.trim();

      return acc;
    },
    {} as Record<keyof T, () => string>
  );
}
