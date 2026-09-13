import { defineConfig } from 'vite-plus';
import { lint, fmt } from '@soybeanjs/oxc-config';

export default defineConfig({
  staged: {
    '*': 'vp check --fix'
  },
  fmt: {
    ...fmt,
    ignorePatterns: ['apps/docs/src/typings']
  },
  lint,
  run: {
    tasks: {
      'build-ui': {
        command: 'pnpm --filter @vean/ui build',
        dependsOn: ['build-headless']
      },
      'dev-docs': {
        command: 'pnpm --filter @vean/docs dev',
        dependsOn: ['build-ui']
      },
      'build-docs': {
        command: 'pnpm --filter @vean/docs build && vp fmt',
        dependsOn: ['build-ui']
      }
    }
  }
});
