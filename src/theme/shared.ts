import type { ClassValue } from '@soybeanjs/headless';
import { cn } from './merge';

export function mergeSlotVariants<T extends Record<string, (...args: any[]) => string>, P extends Record<keyof T, any>>(
  variants: T,
  props?: Partial<P>
) {
  return Object.entries(variants).reduce(
    (acc, [$key, variant]) => {
      const key = $key as keyof T;
      acc[key] = cn(variant(), props?.[key]);
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
