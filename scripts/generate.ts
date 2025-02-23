import fs from 'node:fs';
import enquirer from 'enquirer';
import { toCamelCase, toKebabCase, toPascalCase } from './_shared';

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

function generateVariants(componentNames: string[], module: string, dir: string) {
  let template = `// @unocss-include
import { tv } from 'tailwind-variants';

export const ${module}Variants = tv({
  slots: {\n`;

  componentNames.forEach(componentName => {
    const slotName = toCamelCase(toCamelCase(componentName).replace(module, ''));
    if (!slotName) {
      return;
    }

    template += `    ${slotName}: '',\n`;
  });

  template += `  }\n`;
  template += `});\n\n`;

  template += `export type ${toPascalCase(module)}Slots = keyof typeof ${module}Variants.slots;`;

  fs.writeFileSync(dir, template);
}

interface GenerateOptions {
  module: string;
  components: string[];
}

async function resolvePrompt() {
  const { module, components: _components } = await enquirer.prompt<GenerateOptions>([
    {
      type: 'input',
      name: 'module',
      message: '请输入组件模块名称'
    },
    {
      type: 'list',
      name: 'components',
      message: '请输入组件名称'
    }
  ]);

  const kbName = toKebabCase(module);
  const dir = `packages/ui/src/components/${kbName}`;
  const variantsDir = `packages/variants/src/variants/${kbName}.ts`;

  const components = _components.map(component => {
    let name = toKebabCase(component);

    if (!name.startsWith(kbName)) {
      name = `${kbName}-${name}`;
    }

    return name;
  });

  components.unshift(kbName);

  return { module, components, dir, variantsDir };
}

async function start() {
  const { module, components, dir, variantsDir } = await resolvePrompt();

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  generateTypes(components, dir);
  generateExports(components, dir);
  generateVariants(components, module, variantsDir);

  components.forEach(component => {
    generateComponent(component, module, dir);
  });
}

start();
