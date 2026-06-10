import { describe, expect, it } from 'vitest';
import { expandRegistryItemFiles } from '../src/utils/add-components';
import { transformImports } from '../src/utils/transformers/transform-import';
import { resolveTargetPath } from '../src/utils/updaters/update-files';
import type { RegistryItemFile } from '../src/registry/schema';

describe('generated file mapping', () => {
  it('preserves component folders', () => {
    const targetPath = resolveTargetPath(
      {
        path: 'packages/ui/src/components/button/button-icon.vue',
        type: 'registry:ui'
      },
      {
        uiDir: '/tmp/project/src/components/ui',
        libDir: '/tmp/project/src/lib'
      }
    );

    expect(targetPath).toBe('/tmp/project/src/components/ui/button/button-icon.vue');
  });

  it('maps theme files into the ui theme directory', () => {
    const targetPath = resolveTargetPath(
      {
        path: 'packages/ui/src/theme/index.ts',
        type: 'registry:theme'
      },
      {
        uiDir: '/tmp/project/src/components/ui',
        libDir: '/tmp/project/src/lib'
      }
    );

    expect(targetPath).toBe('/tmp/project/src/components/ui/theme/index.ts');
  });
});

describe('generated import mapping', () => {
  it('rewrites styles and theme imports under the ui alias', () => {
    const output = transformImports(
      ["import { buttonVariants } from '@/styles/button';", "import type { ThemeSize } from '@/theme';"].join('\n'),
      {
        componentsAlias: '@/components',
        uiAlias: '@/components/ui',
        utilsAlias: '@/lib/utils',
        libAlias: '@/lib',
        iconLibrary: 'lucide'
      },
      'soybean'
    );

    expect(output).toContain('@/components/ui/styles/button');
    expect(output).toContain('@/components/ui/theme');
  });
});

describe('registry source expansion', () => {
  it('pulls sibling ui dependencies from local source files', async () => {
    const files: RegistryItemFile[] = [
      {
        path: 'packages/ui/src/components/button/button-icon.vue',
        type: 'registry:ui',
        content: [
          '<script setup lang="ts">',
          "import { computed } from 'vue';",
          "import Icon from '../icon/icon.vue';",
          "import Button from './button.vue';",
          '</script>'
        ].join('\n')
      },
      {
        path: 'packages/ui/src/components/button/button.vue',
        type: 'registry:ui',
        content: ['<script setup lang="ts">', "import { buttonVariants } from '@/styles/button';", '</script>'].join(
          '\n'
        )
      },
      {
        path: 'packages/ui/src/components/button/types.ts',
        type: 'registry:lib',
        content: "import type { ThemeColor } from '@/theme';"
      }
    ];

    const expandedFiles = await expandRegistryItemFiles(files);
    const expandedPaths = expandedFiles.map(file => file.path);

    expect(expandedPaths).toContain('packages/ui/src/components/icon/icon.vue');
    expect(expandedPaths).toContain('packages/ui/src/components/config-provider/context.ts');
    expect(expandedPaths).toContain('packages/ui/src/styles/button.ts');
    expect(expandedPaths).toContain('packages/ui/src/theme/index.ts');
  });
});
