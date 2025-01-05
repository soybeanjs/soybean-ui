import fs from 'node:fs';
import fg from 'fast-glob';

function getComponentFiles(dir: string, module: string) {
  const files = fg.sync(`**/*.vue`, { onlyFiles: true, cwd: dir });
  files.forEach(file => {
    const componentName = file.replace('.vue', '');
    generateComponent(toKebabCase(componentName), module, dir);
  });
}

getComponentFiles('packages/ui/src/components/sidebar', 'sidebar');

function toKebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function toPascalCase(str: string) {
  return str.replace(/(^\w|-\w)/g, letter => letter.toUpperCase()).replace(/-/g, '');
}

function toCamelCase(str: string) {
  const res = str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  return res.charAt(0).toLowerCase() + res.slice(1);
}

function getVueTemplate(componentName: string, module: string) {
  const cpName = toPascalCase(componentName);
  const slotName = toCamelCase(toCamelCase(componentName).replace(module, '')) || 'root';

  return `<script setup lang="ts">
import { computed } from 'vue';
import { ${cpName} } from '@soybean-ui/primitive';
import { ${module}Variants, cn } from '@soybean-ui/variants';
import type { ${cpName}Props } from './types';

defineOptions({
  name: 'S${cpName}',
});

const { class: cls } = defineProps<${cpName}Props>();

const { ${slotName} } = ${module}Variants();

const mergedCls = computed(() => cn(${slotName}(), cls));
</script>

<template>
  <${cpName} :class="mergedCls">
    <slot />
  </${cpName}>
</template>
`;
}

function generateComponent(componentName: string, module: string, dir: string) {
  const filePath = `${dir}/${componentName}.vue`;
  const template = getVueTemplate(componentName, module);

  fs.writeFileSync(filePath, template);
}
