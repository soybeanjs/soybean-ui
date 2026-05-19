import { fmt } from '@soybeanjs/oxc-config';

export default {
  ...fmt,
  ignorePatterns: ['docs/src/typings', 'playground/typings', 'CHANGELOG.md', '.agents']
};
