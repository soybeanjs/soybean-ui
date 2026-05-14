import { entriesOf } from '@soybeanjs/utils';
import type { ClassValue } from '@soybeanjs/headless/types';
import { cn } from './merge';

type VariantFactory = (...args: any[]) => string;

type InternalVariantKey = '$alias' | '$base';

type VariantKeys<T extends Record<string, unknown>> = Exclude<Extract<keyof T, string>, InternalVariantKey>;

type BaseVariants<T extends Record<string, unknown>> = Partial<Record<VariantKeys<T>, string | (() => string)>>;

type VariantDefinition<T extends Record<string, unknown>> = {
  [K in VariantKeys<T>]: T[K] extends VariantFactory ? T[K] : never;
} & {
  $base?: BaseVariants<T>;
};

type VariantAliasMapRecord<TSourceKey extends string = string, TTargetKey extends string = string> = Partial<
  Record<TSourceKey, TTargetKey>
>;

type VariantAliasMapEntries<
  TSourceKey extends string = string,
  TTargetKey extends string = string
> = readonly (readonly [sourceKey: TSourceKey, targetKey: TTargetKey])[];

type VariantAliasMap<TSourceKey extends string = string, TTargetKey extends string = string> =
  | VariantAliasMapEntries<TSourceKey, TTargetKey>
  | VariantAliasMapRecord<TSourceKey, TTargetKey>;

type VariantAliasTargetKeys<TMap> = TMap extends readonly (readonly [string, infer TTargetKey])[]
  ? Extract<TTargetKey, string>
  : TMap extends Record<string, infer TTargetKey>
    ? Extract<TTargetKey, string>
    : never;

type ValidateVariantAliasMap<TMap, TSourceKey extends string> = TMap extends readonly (readonly [string, unknown])[]
  ? VariantAliasMapEntries<TSourceKey, VariantAliasTargetKeys<TMap>>
  : TMap extends Record<string, unknown>
    ? VariantAliasMapRecord<TSourceKey, VariantAliasTargetKeys<TMap>>
    : never;

type RuntimeVariantAliasConfig = {
  variants: VariantDefinition<Record<string, VariantFactory>>;
  map: VariantAliasMap;
  base?: boolean;
};

type RuntimeVariantAliases = RuntimeVariantAliasConfig | readonly RuntimeVariantAliasConfig[];

type ValidateVariantAlias<TAlias> = TAlias extends {
  variants: infer TVariants extends Record<string, unknown>;
  map: infer TMap;
  base?: infer TBase;
}
  ? {
      variants: VariantDefinition<TVariants>;
      map: ValidateVariantAliasMap<TMap, VariantKeys<TVariants>>;
      base?: Extract<TBase, boolean>;
    }
  : never;

type ValidateVariantAliases<TAliases> = TAliases extends readonly unknown[]
  ? { [K in keyof TAliases]: ValidateVariantAlias<TAliases[K]> }
  : ValidateVariantAlias<TAliases>;

type VariantInputAliases<T extends Record<string, unknown>> = T extends { $alias?: infer TAliases }
  ? ValidateVariantAliases<TAliases>
  : never;

type AliasTargetKeys<TAliases> = TAliases extends readonly unknown[]
  ? AliasTargetKeys<TAliases[number]>
  : TAliases extends { map: infer TMap }
    ? VariantAliasTargetKeys<TMap>
    : never;

type VariantResultKeys<T extends Record<string, unknown>> = VariantKeys<T> | AliasTargetKeys<VariantInputAliases<T>>;

type RuntimeVariantsWithMeta = VariantDefinition<Record<string, unknown>> & {
  $alias?: RuntimeVariantAliases;
};

type VariantBucket = Record<string, ClassValue[]>;

type NormalizedVariantEntry = {
  targetKey: string;
  classes: ClassValue[];
  prepend?: boolean;
};

function isDefinedClassValue(value: ClassValue): value is Exclude<ClassValue, null | undefined | false> {
  return value !== null && value !== undefined && value !== false;
}

export function mergeVariants<const T extends Record<string, unknown>>(
  variants: T & VariantDefinition<T> & { $alias?: VariantInputAliases<T> },
  ...classes: Array<Partial<Record<VariantResultKeys<T>, ClassValue>> | null | undefined>
): Record<VariantResultKeys<T>, string> {
  const mergedVariants = normalizeVariantEntries(variants as RuntimeVariantsWithMeta).reduce<VariantBucket>(
    (acc, entry) => {
      appendVariantClasses(acc, entry.targetKey, entry.classes, entry.prepend);

      return acc;
    },
    {}
  );

  const result = entriesOf(mergedVariants).reduce(
    (acc, [key, value]) => {
      acc[key as VariantResultKeys<T>] = cn(
        ...value,
        ...classes
          .filter(Boolean)
          .map(variantClass => variantClass?.[key as VariantResultKeys<T>])
          .filter(Boolean)
      );

      return acc;
    },
    {} as Record<VariantResultKeys<T>, string>
  );

  return result;
}

function isVariantAliasConfigArray(aliases: RuntimeVariantAliases): aliases is readonly RuntimeVariantAliasConfig[] {
  return Array.isArray(aliases);
}

function isVariantAliasMapEntries(map: VariantAliasMap): map is VariantAliasMapEntries {
  return Array.isArray(map);
}

function normalizeAliases(aliases?: RuntimeVariantAliases): RuntimeVariantAliasConfig[] {
  if (!aliases) {
    return [];
  }

  if (isVariantAliasConfigArray(aliases)) {
    return Array.from(aliases);
  }

  return [aliases];
}

function normalizeVariantEntries(variants: RuntimeVariantsWithMeta): NormalizedVariantEntry[] {
  const { $alias: aliases, $base: baseVariants, ...restVariants } = variants;

  const entries: NormalizedVariantEntry[] = entriesOf(restVariants as Record<string, VariantFactory>).map(
    ([key, variant]) => ({
      targetKey: key,
      classes: [resolveVariantClass(baseVariants?.[key]), variant() ?? '']
    })
  );

  for (const alias of normalizeAliases(aliases)) {
    const { $base: aliasBase, ...aliasVariants } = alias.variants;

    for (const [sourceKey, targetKey] of normalizeAliasMap(alias.map)) {
      const variant = aliasVariants[sourceKey];

      if (!variant) {
        continue;
      }

      entries.push({
        targetKey,
        classes: [resolveVariantClass(aliasBase?.[sourceKey]), variant() ?? ''],
        prepend: alias.base ?? true
      });
    }
  }

  return entries;
}

function normalizeAliasMap(map: VariantAliasMap): VariantAliasMapEntries {
  if (isVariantAliasMapEntries(map)) {
    return Array.from(map);
  }

  return entriesOf(map as VariantAliasMapRecord).reduce<ReadonlyArray<readonly [string, string]>>(
    (acc, [sourceKey, targetKey]) => {
      if (!targetKey) {
        return acc;
      }

      return [...acc, [sourceKey, targetKey] as const];
    },
    []
  );
}

function resolveVariantClass(value?: string | (() => string)) {
  return typeof value === 'function' ? value() : value;
}

function appendVariantClasses(target: VariantBucket, key: string, values: ClassValue[], prepend = false) {
  const classes = values.filter(isDefinedClassValue);

  target[key] ??= [];

  target[key] = prepend ? [...classes, ...target[key]] : [...target[key], ...classes];
}

export function mergeUi<T extends Record<string, ClassValue>>(
  target?: T,
  ...sources: Array<Partial<T> | null | undefined>
) {
  if (!target) return {} as T;

  return entriesOf(target).reduce((acc, [key, value]) => {
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
