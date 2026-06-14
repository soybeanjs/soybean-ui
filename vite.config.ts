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
      'build-ui': {
        command: 'pnpm --filter @soybeanjs/ui build',
        dependsOn: ['build-headless']
      },
      'build-playground': {
        command: 'pnpm --filter @soybeanjs/ui-playground build',
        dependsOn: ['build-headless']
      },
      'dev-docs': {
        command: 'pnpm --filter @soybeanjs/ui-docs dev',
        dependsOn: ['build-ui']
      },
      'build-docs': {
        command: 'pnpm --filter @soybeanjs/ui-docs build && vp fmt',
        dependsOn: ['build-ui']
      }
    }
  }
});
