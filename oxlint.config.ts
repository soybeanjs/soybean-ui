import { lint } from '@soybeanjs/oxc-config';

export default {
  ...lint,
  ignorePatterns: ['node_modules', 'dist', 'build']
};
