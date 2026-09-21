import { components as ariaComponents } from '../../aria/src/constants/components';
import { components as uiComponents } from '../../ui/src/constants/components';
import { kebabCase } from '../../aria/src/shared/string';
import { resolveChangelogComponent } from '../src/commands/changelog';
import { componentRenameMap } from '../src/commands/changelog-notes';

describe('commands/changelog component attribution', () => {
  it('resolves aria families and UI-only components alike', () => {
    expect(resolveChangelogComponent('table')).toBe('table');
    expect(resolveChangelogComponent('badge')).toBe('badge');
    expect(resolveChangelogComponent('card')).toBe('card');
    expect(resolveChangelogComponent('empty')).toBe('empty');
    expect(resolveChangelogComponent('list')).toBe('list');
    expect(resolveChangelogComponent('sheet')).toBe('sheet');
    expect(resolveChangelogComponent('spinner')).toBe('spinner');
  });

  it('follows renames to the successor component', () => {
    expect(resolveChangelogComponent('bottom-sheet')).toBe('drawer');
  });

  it('stops attributing removed families', () => {
    expect(resolveChangelogComponent('navigation-menu')).toBeNull();
    expect(resolveChangelogComponent('projects')).toBeNull();
  });

  it('only maps renames onto components that exist in a catalog', () => {
    const catalogNames = new Set(
      [...Object.keys(ariaComponents), ...Object.keys(uiComponents)].map(name => kebabCase(name))
    );

    for (const [from, to] of Object.entries(componentRenameMap)) {
      expect(catalogNames.has(from)).toBe(false);
      expect(catalogNames.has(to)).toBe(true);
    }
  });
});
