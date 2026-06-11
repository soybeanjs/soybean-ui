import { defineConfig } from 'vite-plus';
import { lint, fmt } from '@soybeanjs/oxc-config';

export default defineConfig({
  staged: {
    '*': 'vp check --fix'
  },
  fmt: {
    ...fmt,
    ignorePatterns: ['apps/playground/src/typings', 'apps/docs/src/typings']
  },
  lint,
  run: {
    tasks: {
      'init:lib': {
        command: 'pnpm --filter @soybeanjs/shadcn-theme build && pnpm --filter @soybeanjs/unocss-shadcn build'
      },
      'build:headless': {
        command: 'pnpm --filter @soybeanjs/headless build'
      },
      'build:sbean': {
        command: 'pnpm --filter sbean build'
      },
      'build:ui': {
        command: 'pnpm --filter @soybeanjs/ui build',
        dependsOn: ['build:headless']
      },
      'dev:playground': {
        command: 'pnpm --filter @soybeanjs/ui-playground dev'
      },
      'build:playground': {
        command: 'pnpm --filter @soybeanjs/ui-playground build',
        dependsOn: ['build:headless']
      },
      'dev:docs': {
        command: 'pnpm --filter @soybeanjs/ui-docs dev',
        dependsOn: ['build:ui']
      },
      'build:docs': {
        command: 'pnpm --filter @soybeanjs/ui-docs build',
        dependsOn: ['build:ui']
      }
    }
  }
});
