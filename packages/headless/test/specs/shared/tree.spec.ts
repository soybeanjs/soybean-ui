import { describe, expect, it } from 'vitest';
import { getTreePaths } from '../../../src/shared';

interface Node {
  value: string;
  children?: Node[];
}

const tree: Node[] = [
  {
    value: 'a',
    children: [{ value: 'a1' }, { value: 'a2', children: [{ value: 'a2b' }] }]
  },
  { value: 'b' }
];

describe('getTreePaths', () => {
  it('returns the root-to-node path for a nested target', () => {
    expect(getTreePaths('a2b', tree)).toEqual(['a', 'a2', 'a2b']);
  });

  it('returns the path for a top-level node', () => {
    expect(getTreePaths('b', tree)).toEqual(['b']);
  });

  it('returns an empty path when the target is missing', () => {
    expect(getTreePaths('missing', tree)).toEqual([]);
  });

  it('returns an empty path for nullish targets', () => {
    expect(getTreePaths(null as unknown as string, tree)).toEqual([]);
    expect(getTreePaths(undefined as unknown as string, tree)).toEqual([]);
  });

  it('returns an empty path for an empty tree', () => {
    expect(getTreePaths('a', [])).toEqual([]);
  });
});
