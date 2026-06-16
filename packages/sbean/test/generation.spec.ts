import { describe, expect, it } from 'vitest';
import { UI_SOURCE_PATH } from '../src/registry/constants';
import { expandRegistryItemFiles } from '../src/utils/add-components';
import { transformImports } from '../src/utils/transformers/transform-import';
import { resolveTargetPath } from '../src/utils/updaters/update-files';
import type { RegistryItemFile } from '../src/registry/schema';

describe('generated file mapping', () => {
  it('preserves the source package structure under ui/src', () => {
    const targetPath = resolveTargetPath(
      {
        path: `${UI_SOURCE_PATH}/components/button/button-icon.vue`,
        type: 'registry:ui'
      },
      {
        uiDir: '/tmp/project/src/ui'
      }
    );

    expect(targetPath).toBe('/tmp/project/src/ui/components/button/button-icon.vue');
  });

  it('maps theme files preserving the source path', () => {
    const targetPath = resolveTargetPath(
      {
        path: `${UI_SOURCE_PATH}/theme/index.ts`,
        type: 'registry:theme'
      },
      {
        uiDir: '/tmp/project/src/ui'
      }
    );

    expect(targetPath).toBe('/tmp/project/src/ui/theme/index.ts');
  });

  it('maps style files preserving the source path', () => {
    const targetPath = resolveTargetPath(
      {
        path: `${UI_SOURCE_PATH}/styles/button.ts`,
        type: 'registry:style'
      },
      {
        uiDir: '/tmp/project/src/ui'
      }
    );

    expect(targetPath).toBe('/tmp/project/src/ui/styles/button.ts');
  });
});

describe('generated import mapping', () => {
  it('rewrites @/ styles, theme, components under #ui/ prefix', () => {
    const output = transformImports(
      [
        "import { buttonVariants } from '@/styles/button';",
        "import type { ThemeSize } from '@/theme';",
        "import Icon from '@/components/icon/icon.vue';"
      ].join('\n'),
      {
        uiAlias: '#ui',
        iconLibrary: 'lucide'
      }
    );

    expect(output).toContain('#ui/styles/button');
    expect(output).toContain('#ui/theme');
    expect(output).toContain('#ui/components/icon/icon.vue');
  });
});

describe('registry source expansion', () => {
  it('pulls sibling ui dependencies from local source files', async () => {
    const files: RegistryItemFile[] = [
      {
        path: `${UI_SOURCE_PATH}/components/button/button-icon.vue`,
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
        path: `${UI_SOURCE_PATH}/components/button/button.vue`,
        type: 'registry:ui',
        content: ['<script setup lang="ts">', "import { buttonVariants } from '@/styles/button';", '</script>'].join(
          '\n'
        )
      },
      {
        path: `${UI_SOURCE_PATH}/components/button/types.ts`,
        type: 'registry:lib',
        content: "import type { ThemeColor } from '@/theme';"
      }
    ];

    const expandedFiles = await expandRegistryItemFiles(files);
    const expandedPaths = expandedFiles.map(file => file.path);

    expect(expandedPaths).toContain(`${UI_SOURCE_PATH}/components/icon/icon.vue`);
    expect(expandedPaths).toContain(`${UI_SOURCE_PATH}/components/config-provider/context.ts`);
    expect(expandedPaths).toContain(`${UI_SOURCE_PATH}/styles/button.ts`);
    expect(expandedPaths).toContain(`${UI_SOURCE_PATH}/theme/index.ts`);
  });
});
