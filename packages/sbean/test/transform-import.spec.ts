/**
 * Tests for import path transformation and icon replacement.
 */
import { describe, it, expect } from 'vitest';
import { transformImports, transformIcons } from '../src/utils/transformers/transform-import';
import type { TransformContext } from '../src/utils/transformers/transform-import';

const DEFAULT_CTX: TransformContext = {
  uiAlias: '#ui',
  iconLibrary: 'lucide'
};

describe('transformImports', () => {
  it('rewrites @/styles/ imports to #ui/styles/', () => {
    const input = `import { buttonVariants } from '@/styles/button';`;
    const output = transformImports(input, DEFAULT_CTX, 'soybean');
    expect(output).toContain(`#ui/styles/button`);
  });

  it('rewrites @/theme imports to #ui/theme', () => {
    const input = `import type { ThemeSize } from '@/theme';`;
    const output = transformImports(input, DEFAULT_CTX, 'soybean');
    expect(output).toContain(`#ui/theme`);
  });

  it('rewrites @/theme/ sub-path imports', () => {
    const input = `import { ColorPalette } from '@/theme/colors';`;
    const output = transformImports(input, DEFAULT_CTX, 'soybean');
    expect(output).toContain(`#ui/theme/colors`);
  });

  it('rewrites @/components/ imports to #ui/components/', () => {
    const input = `import Icon from '@/components/icon/icon.vue';`;
    const output = transformImports(input, DEFAULT_CTX, 'soybean');
    expect(output).toContain(`#ui/components/icon/icon.vue`);
  });

  it('rewrites @/registry/<style>/ui to #ui', () => {
    const input = `import Button from '@/registry/soybean/ui/button';`;
    const output = transformImports(input, DEFAULT_CTX, 'soybean');
    expect(output).toContain(`#ui/button`);
  });

  it('rewrites @/registry/<style>/components to #ui/components', () => {
    const input = `import { Something } from '@/registry/soybean/components/something';`;
    const output = transformImports(input, DEFAULT_CTX, 'soybean');
    expect(output).toContain(`#ui/components/something`);
  });

  it('rewrites @/registry/<style>/lib to #ui/lib', () => {
    const input = `import { cn } from '@/registry/soybean/lib/utils';`;
    const output = transformImports(input, DEFAULT_CTX, 'soybean');
    expect(output).toContain(`#ui/lib/utils`);
  });

  it('handles different style preset names', () => {
    const input = `import Button from '@/registry/clean/ui/button';`;
    const output = transformImports(input, DEFAULT_CTX, 'clean');
    expect(output).toContain(`#ui/button`);
  });

  it('does not rewrite non-matching imports', () => {
    const input = `import { ref } from 'vue';`;
    const output = transformImports(input, DEFAULT_CTX, 'soybean');
    expect(output).toBe(input);
  });

  it('handles multiple imports in one source', () => {
    const input = [
      `import { buttonVariants } from '@/styles/button';`,
      `import type { ThemeSize } from '@/theme';`,
      `import { ref } from 'vue';`,
      `import Icon from '@/components/icon/icon.vue';`
    ].join('\n');

    const output = transformImports(input, DEFAULT_CTX, 'soybean');

    expect(output).toContain(`#ui/styles/button`);
    expect(output).toContain(`#ui/theme`);
    expect(output).toContain(`#ui/components/icon/icon.vue`);
    expect(output).toContain(`import { ref } from 'vue'`);
  });
});

describe('transformIcons', () => {
  it('replaces lucide prefix with material-symbols', () => {
    const input = `const icon = 'lucide:chevron-left';`;
    const output = transformIcons(input, 'material-symbols');
    expect(output).toContain(`'material-symbols:chevron-left'`);
  });

  it('replaces lucide prefix with tabler', () => {
    const input = `"lucide:search"`;
    const output = transformIcons(input, 'tabler');
    expect(output).toContain(`"tabler:search"`);
  });

  it('replaces ph prefix with lucide', () => {
    const input = `'ph:arrow-right'`;
    const output = transformIcons(input, 'lucide');
    expect(output).toContain(`'lucide:arrow-right'`);
  });

  it('replaces solar prefix with tabler', () => {
    const input = `'solar:home'`;
    const output = transformIcons(input, 'tabler');
    expect(output).toContain(`'tabler:home'`);
  });

  it('replaces radix-icons prefix', () => {
    const input = `'radix-icons:check'`;
    const output = transformIcons(input, 'lucide');
    expect(output).toContain(`'lucide:check'`);
  });

  it('does not change when prefix already matches', () => {
    const input = `'lucide:star'`;
    const output = transformIcons(input, 'lucide');
    expect(output).toBe(input);
  });

  it('replaces all known prefixes in multi-line source', () => {
    const input = [`const icon1 = 'lucide:home';`, `const icon2 = "ph:user";`, `const icon3 = 'solar:settings';`].join(
      '\n'
    );

    const output = transformIcons(input, 'tabler');

    expect(output).toContain(`'tabler:home'`);
    expect(output).toContain(`"tabler:user"`);
    expect(output).toContain(`'tabler:settings'`);
  });
});
