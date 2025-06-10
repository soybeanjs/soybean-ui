import { cn } from './merge';

export function mergeSlotVariants<T extends Record<string, (...args: any[]) => string>, P extends Record<keyof T, any>>(
  variants: T,
  props?: Partial<P>
) {
  return Object.entries(variants).reduce(
    (acc, [$key, variant]) => {
      const key = $key as keyof T;
      acc[key] = cn(variant(props?.[key]), props?.[key]);
      return acc;
    },
    {} as Record<keyof T, string>
  );
}
