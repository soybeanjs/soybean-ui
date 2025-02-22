import fs from 'node:fs';
import fg from 'fast-glob';

function getComponentFiles(module: string) {
  const kbName = toKebabCase(module);
  const dir = `packages/ui/src/components/${kbName}`;

  const files = fg.sync(`**/*.vue`, { onlyFiles: true, cwd: dir });

  const componentNames: string[] = [];

  files
    .filter(file => file.includes('-'))
    .forEach(file => {
      const componentName = file.replace('.vue', '');

      componentNames.push(toKebabCase(componentName));

      generateComponent(toKebabCase(componentName), module, dir);
    });

  generateTypes(componentNames, dir);
  generateExports(componentNames, dir);
  generateVariants(componentNames, module);
}

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
import { ${cpName} } from '@soybean-ui/primitives';
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

function generateTypes(componentNames: string[], dir: string) {
  const filePath = `${dir}/types.ts`;
  let template = `import type {\n`;

  componentNames.forEach(componentName => {
    template += `  ${toPascalCase(componentName)}Props as _${toPascalCase(componentName)}Props,\n`;
  });

  template += `} from '@soybean-ui/primitives';\n\n`;

  componentNames.forEach(componentName => {
    template += `export interface ${toPascalCase(componentName)}Props extends _${toPascalCase(componentName)}Props {}\n\n`;
  });

  fs.writeFileSync(filePath, template);
}

function generateExports(componentNames: string[], dir: string) {
  const filePath = `${dir}/index.ts`;
  let template = ``;

  componentNames.forEach(componentName => {
    template += `import S${toPascalCase(componentName)} from './${componentName}.vue';\n`;
  });

  template += `\nexport {\n`;

  componentNames.forEach(componentName => {
    template += `  S${toPascalCase(componentName)},\n`;
  });

  template += `}\nexport * from './types';`;

  fs.writeFileSync(filePath, template);
}

function generateVariants(componentNames: string[], module: string) {
  const kbName = toKebabCase(module);
  const variantsDir = `packages/variants/src/variants/${kbName}.ts`;
  let template = `// @unocss-include
import { tv } from 'tailwind-variants';

export const ${module}Variants = tv({
  slots: {\n`;

  componentNames.forEach(componentName => {
    const slotName = toCamelCase(toCamelCase(componentName).replace(module, '')) || 'root';

    template += `    ${slotName}: '',\n`;
  });

  template += `  }\n`;
  template += `});\n\n`;

  template += `export type ${toPascalCase(module)}Slots = keyof typeof ${module}Variants.slots;`;

  fs.writeFileSync(variantsDir, template);
}

function start() {
  getComponentFiles('numberField');
}

start();
