import * as v from 'valibot';
import type { Config } from './config';
import { BUILTIN_REGISTRIES, DEFAULT_REGISTRY_NAMESPACE } from './constants';
import { getCachedRegistryItem, setCachedRegistryItem } from './cache';
import { registryItemSchema } from './schema';
import type { RegistryItem } from './schema';

type RegistryConfigSource = Pick<Config, 'registries'> | null | undefined;

function parseRegistrySpecifier(specifier: string): { namespace: string | null; name: string } {
  if (specifier.startsWith('@')) {
    const slashIndex = specifier.indexOf('/');

    if (slashIndex > 0) {
      return {
        namespace: specifier.slice(0, slashIndex),
        name: specifier.slice(slashIndex + 1)
      };
    }
  }

  return {
    namespace: null,
    name: specifier
  };
}

function getRegistrySources(config?: RegistryConfigSource): Record<string, string> {
  return {
    ...BUILTIN_REGISTRIES,
    ...config?.registries
  };
}

function buildRegistryItemUrl(registryUrl: string, name: string): string {
  if (registryUrl.includes('{name}')) {
    return registryUrl.replace('{name}', name);
  }

  return `${registryUrl.replace(/\/$/, '')}/${name}.json`;
}

function buildRegistryCatalogUrl(registryUrl: string): string {
  if (registryUrl.includes('{name}')) {
    return registryUrl.replace('{name}', 'registry');
  }

  return `${registryUrl.replace(/\/$/, '')}/registry.json`;
}

function resolveRegistryTargets(specifier: string, config?: RegistryConfigSource) {
  const parsed = parseRegistrySpecifier(specifier);
  const sources = getRegistrySources(config);

  if (parsed.namespace) {
    const registryUrl = sources[parsed.namespace];

    if (!registryUrl) {
      return [];
    }

    return [
      {
        namespace: parsed.namespace,
        registryUrl,
        itemName: parsed.name,
        displayName: specifier
      }
    ];
  }

  return Object.entries(sources).map(([namespace, registryUrl]) => ({
    namespace,
    registryUrl,
    itemName: parsed.name,
    displayName:
      namespace === DEFAULT_REGISTRY_NAMESPACE || namespace === '@sbean' ? parsed.name : `${namespace}/${parsed.name}`
  }));
}

function attachRegistryMeta(
  item: RegistryItem,
  namespace: string,
  registryUrl: string,
  displayName: string
): RegistryItem {
  return {
    ...item,
    name: displayName,
    meta: {
      ...item.meta,
      registryNamespace: namespace,
      registryUrl
    }
  };
}

/**
 * Fetch a single registry item from the remote registry.
 * Checks local cache first, falls back to network if not cached.
 *
 * URL pattern: https://ui.soybeanjs.cn/r/{name}.json
 */
export async function fetchRegistryItem(
  name: string,
  config?: RegistryConfigSource,
  registryUrl?: string
): Promise<RegistryItem | null> {
  const targets = registryUrl
    ? [
        {
          namespace: DEFAULT_REGISTRY_NAMESPACE,
          registryUrl,
          itemName: parseRegistrySpecifier(name).name,
          displayName: name
        }
      ]
    : resolveRegistryTargets(name, config);

  for (const target of targets) {
    // Check cache first
    const cached = await getCachedRegistryItem<RegistryItem>(target.namespace, target.itemName);
    if (cached) {
      return attachRegistryMeta(cached, target.namespace, target.registryUrl, target.displayName);
    }

    const url = buildRegistryItemUrl(target.registryUrl, target.itemName);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          continue;
        }

        throw new Error(`Registry fetch failed: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      const item = v.parse(registryItemSchema, json);

      // Cache the result
      await setCachedRegistryItem(target.namespace, target.itemName, item);

      return attachRegistryMeta(item, target.namespace, target.registryUrl, target.displayName);
    } catch (error) {
      if (error instanceof v.ValiError) {
        console.warn(`  ⚠ Invalid registry item for "${name}": validation failed`);
        return null;
      }

      if (targets.length === 1) {
        throw error;
      }
    }
  }

  return null;
}

/**
 * Fetch the remote registry catalog (registry.json).
 */
export async function fetchRegistryCatalog(
  config?: RegistryConfigSource,
  registryUrl?: string
): Promise<RegistryItem[]> {
  const sources = registryUrl ? { [DEFAULT_REGISTRY_NAMESPACE]: registryUrl } : getRegistrySources(config);
  const entries = Object.entries(sources);
  const items: RegistryItem[] = [];
  const seen = new Set<string>();

  for (const [namespace, sourceUrl] of entries) {
    const url = buildRegistryCatalogUrl(sourceUrl);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          continue;
        }

        throw new Error(`Registry fetch failed: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      const catalogItems = Array.isArray(json)
        ? (json as unknown[])
        : Array.isArray((json as Record<string, unknown>).items)
          ? (((json as Record<string, unknown>).items as unknown[]) ?? [])
          : [];

      for (const entry of catalogItems) {
        const item = v.parse(registryItemSchema, entry);
        const displayName =
          namespace === DEFAULT_REGISTRY_NAMESPACE || namespace === '@sbean' ? item.name : `${namespace}/${item.name}`;

        if (seen.has(displayName)) {
          continue;
        }

        seen.add(displayName);
        items.push(attachRegistryMeta(item, namespace, sourceUrl, displayName));
      }
    } catch (error) {
      if (error instanceof v.ValiError) {
        console.warn(`  ⚠ Remote registry catalog validation failed for ${namespace}`);
        continue;
      }

      console.warn(`  ⚠ Failed to fetch remote registry ${namespace}: ${(error as Error).message}`);
    }
  }

  return items;
}
