import { reactive } from 'vue';
import type { PACKAGE_MANAGERS } from './plugins/installation-tabs';

export const store = reactive({
  packageManager: 'npm' as (typeof PACKAGE_MANAGERS)[number]
});
