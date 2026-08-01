import { describe, it, expect } from 'vitest';
import { topologicallySortItems } from '../src/utils/add-components';
import type { ResolvedRegistryItem } from '../src/utils/add-components';

/**
 * Build a minimal `ResolvedRegistryItem` with the given name + dependencies.
 * The `item` and `expandedFiles` fields are irrelevant to the topo sort — they
 * are stubbed with empty/placeholder values that satisfy the type.
 */
function makeItem(name: string, dependencies: string[] = []): ResolvedRegistryItem {
  return {
    name,
    dependencies,
    item: { type: 'registry:ui', name, files: [] },
    expandedFiles: []
  };
}

function namesOf(items: ResolvedRegistryItem[]): string[] {
  return items.map(item => item.name);
}

describe('topologicallySortItems (ADR-006)', () => {
  it('returns an empty list unchanged', () => {
    expect(topologicallySortItems([])).toEqual([]);
  });

  it('returns a single item unchanged', () => {
    const items = [makeItem('button')];
    expect(namesOf(topologicallySortItems(items))).toEqual(['button']);
  });

  it('emits dependencies before dependents (linear chain)', () => {
    // dialog -> button -> utils  (utils must come first)
    const items = [makeItem('dialog', ['button']), makeItem('button', ['utils']), makeItem('utils')];
    const sorted = namesOf(topologicallySortItems(items));
    expect(sorted).toEqual(['utils', 'button', 'dialog']);
  });

  it('emits a shared dependency before all its dependents', () => {
    // button and accordion both depend on utils
    const items = [makeItem('button', ['utils']), makeItem('accordion', ['utils']), makeItem('utils')];
    const sorted = namesOf(topologicallySortItems(items));
    expect(sorted.indexOf('utils')).toBeLessThan(sorted.indexOf('button'));
    expect(sorted.indexOf('utils')).toBeLessThan(sorted.indexOf('accordion'));
  });

  it('breaks ties alphabetically for independent items (determinism)', () => {
    // zebra, alpha, mango — no deps between them
    const items = [makeItem('zebra'), makeItem('alpha'), makeItem('mango')];
    expect(namesOf(topologicallySortItems(items))).toEqual(['alpha', 'mango', 'zebra']);
  });

  it('breaks ties alphabetically within a dependency wave', () => {
    // Two dependents (alpha, zebra) share a dependency (mid).
    // Wave 0: [mid] (the root dependency); Wave 1: [alpha, zebra] (dependents, sorted).
    const items = [makeItem('zebra', ['mid']), makeItem('alpha', ['mid']), makeItem('mid')];
    const sorted = namesOf(topologicallySortItems(items));
    expect(sorted).toEqual(['mid', 'alpha', 'zebra']);
  });

  it('produces identical output across shuffled inputs (deterministic diffs)', () => {
    const base = [
      makeItem('dialog', ['button', 'utils']),
      makeItem('button', ['utils']),
      makeItem('accordion', ['utils']),
      makeItem('utils'),
      makeItem('tooltip', ['utils'])
    ];
    const shuffleA = [...base];
    const shuffleB = [base[3], base[1], base[4], base[0], base[2]];
    const shuffleC = [base[2], base[4], base[0], base[1], base[3]];
    const outA = namesOf(topologicallySortItems(shuffleA));
    const outB = namesOf(topologicallySortItems(shuffleB));
    const outC = namesOf(topologicallySortItems(shuffleC));
    expect(outA).toEqual(outB);
    expect(outB).toEqual(outC);
    // And utils (the root) is always first.
    expect(outA[0]).toBe('utils');
  });

  it('ignores self-loop dependencies', () => {
    const items = [makeItem('selfish', ['selfish'])];
    expect(namesOf(topologicallySortItems(items))).toEqual(['selfish']);
  });

  it('ignores dependencies that did not resolve (missing from set)', () => {
    // button depends on utils, but utils was never loaded — should not block button.
    const items = [makeItem('button', ['utils'])];
    expect(namesOf(topologicallySortItems(items))).toEqual(['button']);
  });

  it('deduplicates a dependency referenced multiple times by the same dependent', () => {
    // dialog lists utils twice — in-degree of dialog should still be 1.
    const items = [makeItem('dialog', ['utils', 'utils']), makeItem('utils')];
    const sorted = namesOf(topologicallySortItems(items));
    expect(sorted).toEqual(['utils', 'dialog']);
  });

  it('appends cyclic nodes alphabetically at the tail (total + deterministic)', () => {
    // a -> b -> a (cycle), plus an acyclic root 'root'
    const items = [makeItem('a', ['b']), makeItem('b', ['a']), makeItem('root')];
    const sorted = namesOf(topologicallySortItems(items));
    // root is acyclic -> emitted first; a, b are cyclic -> appended alphabetically.
    expect(sorted[0]).toBe('root');
    expect(sorted.slice(1).sort()).toEqual(['a', 'b']);
  });

  it('handles a diamond dependency (a -> b,c -> d)', () => {
    // d depends on b and c; b and c both depend on a. a first, then b/c (alpha),
    // then d.
    const items = [makeItem('d', ['b', 'c']), makeItem('b', ['a']), makeItem('c', ['a']), makeItem('a')];
    const sorted = namesOf(topologicallySortItems(items));
    expect(sorted).toEqual(['a', 'b', 'c', 'd']);
  });

  it('handles namespaced dependency names (transformed by BFS)', () => {
    // @acme/dialog depends on @acme/button depends on @acme/utils
    const items = [
      makeItem('@acme/dialog', ['@acme/button']),
      makeItem('@acme/button', ['@acme/utils']),
      makeItem('@acme/utils')
    ];
    expect(namesOf(topologicallySortItems(items))).toEqual(['@acme/utils', '@acme/button', '@acme/dialog']);
  });

  it('preserves the full ResolvedRegistryItem payload (item + expandedFiles)', () => {
    const fullItem: ResolvedRegistryItem = {
      name: 'dialog',
      dependencies: ['utils'],
      item: { type: 'registry:ui', name: 'dialog', files: [{ path: 'dialog.vue', type: 'registry:ui' }] },
      expandedFiles: [{ path: 'dialog.vue', type: 'registry:ui' }]
    };
    const utils = makeItem('utils');
    const sorted = topologicallySortItems([fullItem, utils]);
    expect(sorted[0]).toBe(utils);
    expect(sorted[1]).toBe(fullItem);
  });
});
