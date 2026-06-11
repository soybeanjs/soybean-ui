/**
 * Unit tests for the registry search engine.
 */
import { describe, it, expect } from 'vitest';
import type { RegistryItem } from '../src/registry/schema';
import { searchRegistry, findSimilarComponents, getRegistryStats } from '../src/registry/search';

function makeItem(overrides: Partial<RegistryItem> = {}): RegistryItem {
  return {
    name: 'button',
    type: 'registry:ui',
    ...overrides
  } as RegistryItem;
}

const FIXTURES: RegistryItem[] = [
  makeItem({
    name: 'button',
    type: 'registry:ui',
    description: 'A button component',
    categories: ['form'],
    meta: { tags: ['button', 'action'] }
  }),
  makeItem({
    name: 'button-group',
    type: 'registry:ui',
    description: 'A group of buttons',
    categories: ['form', 'layout'],
    meta: { tags: ['button', 'group'] }
  }),
  makeItem({ name: 'dialog', type: 'registry:ui', description: 'A modal dialog', categories: ['overlay', 'feedback'] }),
  makeItem({
    name: 'accordion',
    type: 'registry:ui',
    description: 'A collapsible accordion',
    categories: ['layout', 'disclosure']
  }),
  makeItem({
    name: 'input',
    type: 'registry:ui',
    description: 'Form input field',
    categories: ['form', 'input'],
    meta: { tags: ['form', 'input', 'text'] }
  }),
  makeItem({ name: 'utils', type: 'registry:lib', description: 'Utility functions' }),
  makeItem({
    name: 'use-clipboard',
    type: 'registry:hook',
    description: 'Clipboard composable hook',
    categories: ['utility']
  }),
  makeItem({ name: 'soybean-theme', type: 'registry:theme', description: 'Theme variables' })
];

describe('searchRegistry', () => {
  it('returns all items when no query or filters', () => {
    const result = searchRegistry(FIXTURES, {});
    expect(result.total).toBe(FIXTURES.length);
    expect(result.items.length).toBe(FIXTURES.length);
  });

  it('filters by exact name match', () => {
    const result = searchRegistry(FIXTURES, { query: 'button' });
    expect(result.total).toBeGreaterThanOrEqual(2);
    // Exact match should be first
    expect(result.items[0].name).toBe('button');
  });

  it('finds items by partial name match', () => {
    const result = searchRegistry(FIXTURES, { query: 'butt' });
    expect(result.total).toBeGreaterThanOrEqual(2);
    expect(result.items.some(i => i.name === 'button')).toBe(true);
    expect(result.items.some(i => i.name === 'button-group')).toBe(true);
  });

  it('finds items by description', () => {
    const result = searchRegistry(FIXTURES, { query: 'modal' });
    expect(result.items.some(i => i.name === 'dialog')).toBe(true);
  });

  it('finds items by tag', () => {
    const result = searchRegistry(FIXTURES, { query: 'action' });
    expect(result.items.some(i => i.name === 'button')).toBe(true);
  });

  it('filters by type', () => {
    const result = searchRegistry(FIXTURES, { type: 'registry:lib' });
    expect(result.total).toBe(1);
    expect(result.items[0].name).toBe('utils');
  });

  it('filters by type with partial match', () => {
    const result = searchRegistry(FIXTURES, { type: 'hook' });
    expect(result.total).toBe(1);
    expect(result.items[0].name).toBe('use-clipboard');
  });

  it('combines query and type filters', () => {
    const result = searchRegistry(FIXTURES, { query: 'button', type: 'registry:ui' });
    expect(result.total).toBeGreaterThanOrEqual(2);
    for (const item of result.items) {
      expect(item.type).toBe('registry:ui');
      expect(item.name.toLowerCase()).toContain('button');
    }
  });

  it('paginates results', () => {
    const result = searchRegistry(FIXTURES, { limit: 3, offset: 0 });
    expect(result.items.length).toBe(3);
    expect(result.total).toBe(FIXTURES.length);
    expect(result.offset).toBe(0);
    expect(result.limit).toBe(3);
  });

  it('handles offset pagination', () => {
    const result = searchRegistry(FIXTURES, { limit: 3, offset: 3 });
    expect(result.items.length).toBeLessThanOrEqual(3);
    expect(result.offset).toBe(3);
  });

  it('sorts by name when no query', () => {
    const result = searchRegistry(FIXTURES, { sortBy: 'name' });
    const names = result.items.map(i => i.name);
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  it('returns empty for no matches', () => {
    const result = searchRegistry(FIXTURES, { query: 'zzzznonexistent' });
    expect(result.total).toBe(0);
    expect(result.items.length).toBe(0);
  });

  it('scores fuzzy matches', () => {
    const result = searchRegistry(FIXTURES, { query: 'buton' });
    expect(result.total).toBeGreaterThanOrEqual(1);
    // Fuzzy match for "button" with distance 1
    expect(result.items.some(i => i.name === 'button')).toBe(true);
  });
});

describe('findSimilarComponents', () => {
  it('finds items with shared tags', () => {
    const button = FIXTURES.find(i => i.name === 'button')!;
    const similar = findSimilarComponents(button, FIXTURES, 3);
    // button-group shares the 'button' tag
    expect(similar.some(i => i.name === 'button-group')).toBe(true);
  });

  it('excludes the source item from results', () => {
    const button = FIXTURES.find(i => i.name === 'button')!;
    const similar = findSimilarComponents(button, FIXTURES, 10);
    expect(similar.every(i => i.name !== 'button')).toBe(true);
  });

  it('respects the limit parameter', () => {
    const button = FIXTURES.find(i => i.name === 'button')!;
    const similar = findSimilarComponents(button, FIXTURES, 1);
    expect(similar.length).toBeLessThanOrEqual(1);
  });
});

describe('getRegistryStats', () => {
  it('returns correct total count', () => {
    const stats = getRegistryStats(FIXTURES);
    expect(stats.totalCount).toBe(FIXTURES.length);
  });

  it('groups by type', () => {
    const stats = getRegistryStats(FIXTURES);
    expect(stats.byType['registry:ui']).toBeGreaterThanOrEqual(5);
    expect(stats.byType['registry:lib']).toBe(1);
    expect(stats.byType['registry:hook']).toBe(1);
    expect(stats.byType['registry:theme']).toBe(1);
  });

  it('computes total size and avg description length', () => {
    const stats = getRegistryStats(FIXTURES);
    expect(stats.totalSize).toBeGreaterThan(0);
    expect(stats.avgDescriptionLength).toBeGreaterThan(0);
  });
});
