import { reorderImports } from '../src/commands/reorder-imports';

describe('reorder-imports', () => {
  describe('reorderImports', () => {
    it('moves Props before Emits on a single-line import', () => {
      const source = `import type { ButtonEmits, ButtonProps } from './types';\n`;

      expect(reorderImports(source)).toEqual({
        changed: true,
        content: `import type { ButtonProps, ButtonEmits } from './types';\n`
      });
    });

    it('leaves an already ordered Props-first import untouched', () => {
      const source = `import type { ButtonProps, ButtonEmits } from './types';\n`;

      expect(reorderImports(source)).toEqual({ changed: false, content: source });
    });

    it('ignores blocks with only Props or only Emits', () => {
      const source = `import type { ButtonProps } from './types';\nimport type { ButtonEmits } from './types';\n`;

      expect(reorderImports(source)).toEqual({ changed: false, content: source });
    });

    it('reorders multi-line import blocks', () => {
      const source = `import type {\n  ButtonEmits,\n  ButtonProps\n} from './types';\n`;
      const expected = `import type {\n  ButtonProps,\n  ButtonEmits\n} from './types';\n`;

      expect(reorderImports(source)).toEqual({ changed: true, content: expected });
    });

    it('moves Props ahead of other non-Props specifiers while keeping their relative order', () => {
      const source = `import type { ButtonEmits, ButtonProps, ButtonSlots } from './types';\n`;
      const expected = `import type { ButtonProps, ButtonEmits, ButtonSlots } from './types';\n`;

      expect(reorderImports(source)).toEqual({ changed: true, content: expected });
    });

    it('handles `as` aliases when detecting specifier kinds', () => {
      const source = `import type { AriaButtonEmits as ButtonEmits, AriaButtonProps as ButtonProps } from './types';\n`;

      expect(reorderImports(source).changed).toBe(true);
      expect(reorderImports(source).content).toContain(
        'AriaButtonProps as ButtonProps, AriaButtonEmits as ButtonEmits'
      );
    });

    it('reorders every affected import block in a file', () => {
      const source = [
        `import type { ButtonEmits, ButtonProps } from './types';`,
        `import { ref } from 'vue';`,
        `import type { GroupEmits, GroupProps } from './group-types';`
      ].join('\n');

      const result = reorderImports(source);
      const lines = result.content.split('\n');

      expect(lines[0]).toBe(`import type { ButtonProps, ButtonEmits } from './types';`);
      expect(lines[1]).toBe(`import { ref } from 'vue';`);
      expect(lines[2]).toBe(`import type { GroupProps, GroupEmits } from './group-types';`);
    });
  });
});
