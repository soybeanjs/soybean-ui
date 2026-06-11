/**
 * Registry caching system for SBean CLI.
 *
 * Caches remote registry items locally to improve performance and reduce
 * network requests. Cache is stored in ~/.sbean/cache or ${SBEAN_CACHE_DIR}.
 */

import fs from 'fs/promises';
import os from 'os';
import path from 'path';

const CACHE_DIR = process.env.SBEAN_CACHE_DIR || path.join(os.homedir(), '.sbean', 'cache');
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  etag?: string;
}

/**
 * Get the cache file path for a registry item.
 */
function getCacheFilePath(namespace: string, itemName: string): string {
  const sanitizedNamespace = namespace.replace(/[@/]/g, '_');
  return path.join(CACHE_DIR, `${sanitizedNamespace}-${itemName}.json`);
}

/**
 * Check if cache entry is still valid.
 */
function isCacheValid(entry: CacheEntry<unknown>): boolean {
  const age = Date.now() - entry.timestamp;
  return age < CACHE_TTL;
}

/**
 * Read cached registry item regardless of TTL (for 304 Not Modified handling).
 */
export async function getCachedRegistryItemRaw<T>(
  namespace: string,
  itemName: string
): Promise<{ data: T; etag?: string } | null> {
  try {
    const filePath = getCacheFilePath(namespace, itemName);
    const content = await fs.readFile(filePath, 'utf-8');
    const entry = JSON.parse(content) as CacheEntry<T>;

    return { data: entry.data, etag: entry.etag };
  } catch {
    return null;
  }
}

/**
 * Read cached registry item.
 */
export async function getCachedRegistryItem<T>(namespace: string, itemName: string): Promise<T | null> {
  try {
    const filePath = getCacheFilePath(namespace, itemName);
    const content = await fs.readFile(filePath, 'utf-8');
    const entry = JSON.parse(content) as CacheEntry<T>;

    if (isCacheValid(entry)) {
      return entry.data;
    }

    // Cache expired, delete it
    await fs.unlink(filePath).catch(() => {});
    return null;
  } catch {
    return null;
  }
}

/**
 * Write registry item to cache.
 */
export async function setCachedRegistryItem<T>(
  namespace: string,
  itemName: string,
  data: T,
  etag?: string
): Promise<void> {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });

    const filePath = getCacheFilePath(namespace, itemName);
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      etag
    };

    await fs.writeFile(filePath, JSON.stringify(entry, null, 2), 'utf-8');
  } catch {
    // Silently fail — caching is optional
  }
}

/**
 * Clear all registry cache.
 */
export async function clearRegistryCache(): Promise<void> {
  try {
    await fs.rm(CACHE_DIR, { recursive: true, force: true });
  } catch {
    // Silently fail
  }
}

/**
 * Clear cache for a specific namespace.
 */
export async function clearRegistryCacheByNamespace(namespace: string): Promise<void> {
  try {
    const files = await fs.readdir(CACHE_DIR);
    const sanitizedNamespace = namespace.replace(/[@/]/g, '_');

    for (const file of files) {
      if (file.startsWith(sanitizedNamespace)) {
        await fs.unlink(path.join(CACHE_DIR, file)).catch(() => {});
      }
    }
  } catch {
    // Silently fail
  }
}

/**
 * Get the cached ETag for a registry item.
 */
export async function getCachedRegistryItemEtag(namespace: string, itemName: string): Promise<string | null> {
  try {
    const filePath = getCacheFilePath(namespace, itemName);
    const content = await fs.readFile(filePath, 'utf-8');
    const entry = JSON.parse(content) as CacheEntry<unknown>;

    if (entry.etag) {
      return entry.etag;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Get the cache file path for the registry catalog.
 */
function getCatalogCacheFilePath(namespace: string): string {
  const sanitizedNamespace = namespace.replace(/[@/]/g, '_');
  return path.join(CACHE_DIR, `${sanitizedNamespace}-catalog.json`);
}

/**
 * Read cached registry catalog regardless of TTL (for 304 Not Modified handling).
 */
export async function getCachedRegistryCatalogRaw<T>(namespace: string): Promise<{ data: T; etag?: string } | null> {
  try {
    const filePath = getCatalogCacheFilePath(namespace);
    const content = await fs.readFile(filePath, 'utf-8');
    const entry = JSON.parse(content) as CacheEntry<T>;

    return { data: entry.data, etag: entry.etag };
  } catch {
    return null;
  }
}

/**
 * Read cached registry catalog.
 */
export async function getCachedRegistryCatalog<T>(namespace: string): Promise<T | null> {
  try {
    const filePath = getCatalogCacheFilePath(namespace);
    const content = await fs.readFile(filePath, 'utf-8');
    const entry = JSON.parse(content) as CacheEntry<T>;

    if (isCacheValid(entry)) {
      return entry.data;
    }

    // Cache expired, delete it
    await fs.unlink(filePath).catch(() => {});
    return null;
  } catch {
    return null;
  }
}

/**
 * Write registry catalog to cache.
 */
export async function setCachedRegistryCatalog<T>(namespace: string, data: T, etag?: string): Promise<void> {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });

    const filePath = getCatalogCacheFilePath(namespace);
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      etag
    };

    await fs.writeFile(filePath, JSON.stringify(entry, null, 2), 'utf-8');
  } catch {
    // Silently fail — caching is optional
  }
}

/**
 * Get the cached ETag for the registry catalog.
 */
export async function getCachedRegistryCatalogEtag(namespace: string): Promise<string | null> {
  try {
    const filePath = getCatalogCacheFilePath(namespace);
    const content = await fs.readFile(filePath, 'utf-8');
    const entry = JSON.parse(content) as CacheEntry<unknown>;

    if (entry.etag) {
      return entry.etag;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Get cache statistics (for debugging).
 */
export async function getRegistryCacheStats(): Promise<{
  totalSize: number;
  entryCount: number;
  oldestEntry: number;
  newestEntry: number;
} | null> {
  try {
    const files = await fs.readdir(CACHE_DIR);
    let totalSize = 0;
    let oldestEntry = Date.now();
    let newestEntry = 0;

    for (const file of files) {
      const filePath = path.join(CACHE_DIR, file);
      const stat = await fs.stat(filePath);
      const content = await fs.readFile(filePath, 'utf-8');
      const entry = JSON.parse(content) as CacheEntry<unknown>;

      totalSize += stat.size;
      oldestEntry = Math.min(oldestEntry, entry.timestamp);
      newestEntry = Math.max(newestEntry, entry.timestamp);
    }

    return {
      totalSize,
      entryCount: files.length,
      oldestEntry,
      newestEntry
    };
  } catch {
    return null;
  }
}
