import { describe, expect, expectTypeOf, it } from 'vitest';
import { mergeVariants } from '../../../src/theme/shared';

describe('theme shared helpers', () => {
  it('maps alias variants from record maps to new result keys', () => {
    const result = mergeVariants({
      root: () => 'root-class',
      item: () => 'item-class',
      $alias: {
        variants: {
          root: () => 'card-root-class',
          item: () => 'card-item-class'
        },
        map: {
          root: 'cardRoot',
          item: 'cardItem'
        }
      }
    });

    expectTypeOf(result).toEqualTypeOf<Record<'root' | 'item' | 'cardRoot' | 'cardItem', string>>();

    expect(result).toEqual({
      root: 'root-class',
      item: 'item-class',
      cardRoot: 'card-root-class',
      cardItem: 'card-item-class'
    });
  });

  it('maps alias variants to new result keys', () => {
    const result = mergeVariants({
      root: () => 'root-class',
      item: () => 'item-class',
      $alias: {
        variants: {
          root: () => 'card-root-class',
          item: () => 'card-item-class'
        },
        map: [
          ['root', 'cardRoot'],
          ['item', 'cardItem']
        ]
      }
    });

    expect(result).toEqual({
      root: 'root-class',
      item: 'item-class',
      cardRoot: 'card-root-class',
      cardItem: 'card-item-class'
    });
  });

  it('combines aliased variants with the same target key and target-level classes', () => {
    const result = mergeVariants(
      {
        root: () => 'root-class',
        item: () => 'item-class',
        $alias: {
          variants: {
            root: () => 'card-root-class'
          },
          map: [['root', 'item']]
        }
      },
      {
        item: 'item-extra-class'
      }
    );

    expect(result.item).toBe('card-root-class item-class item-extra-class');
  });

  it('treats aliased classes as base classes by default', () => {
    const result = mergeVariants({
      cardRoot: () => 'root-class',
      $alias: {
        variants: {
          root: () => 'card-root-class'
        },
        map: [['root', 'cardRoot']]
      }
    });

    expect(result.cardRoot).toBe('card-root-class root-class');
  });

  it('appends aliased classes when alias base is false', () => {
    const result = mergeVariants({
      cardRoot: () => 'root-class',
      $alias: {
        base: false,
        variants: {
          root: () => 'card-root-class'
        },
        map: [['root', 'cardRoot']]
      }
    });

    expect(result.cardRoot).toBe('root-class card-root-class');
  });
});
