import type { ClassValue } from '@soybeanjs/headless';
import { cn } from './merge';

/**
 * Merge slot variants with props and root class.
 * @param variants - The variants to merge.
 * @param props - The props to merge.
 * @param rootCls - The root class to merge.
 * @returns The merged variants.
 */
export function mergeSlotVariants<T extends Record<string, (...args: any[]) => string>, P extends Record<keyof T, any>>(
  variants: T,
  props?: Partial<P>,
  rootCls?: ClassValue | unknown
) {
  return Object.entries(variants).reduce(
    (acc, [$key, variant]) => {
      const key = $key as keyof T;

      const rootClass = key === 'root' ? rootCls : undefined;

      acc[key] = cn(variant(), props?.[key], rootClass as ClassValue);
      return acc;
    },
    {} as Record<keyof T, string>
  );
}

export function mergeUi<S extends Record<string, ClassValue>, T extends Partial<S>>(target: T, source: S) {
  return Object.entries(target).reduce((acc, [key, value]) => {
    Object.assign(acc, { [key]: cn(value, source[key]) });
    return acc;
  }, {} as S);
}
