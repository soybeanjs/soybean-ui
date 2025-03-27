import { writeFile } from 'node:fs/promises';
import fg from 'fast-glob';
import { toCamelCase, toPascalCase } from './_shared';

function _generatePrimitivesNames() {
  const base = 'packages/soy-ui/src/components';

  const components = fg.sync(`**/index.ts`, { cwd: base });

  const nameRecords: Record<string, string[]> = {};

  components.forEach(component => {
    const [moduleName, componentName] = component.replace('.vue', '').split('/');

    const key = toCamelCase(moduleName);
    const name = toPascalCase(componentName);

    if (!nameRecords[key]) {
      nameRecords[key] = [];
    }

    nameRecords[key].push(name);
  });

  writeFile('components.json', JSON.stringify(nameRecords, null, 2));
}
function generateUiNames() {
  const base = 'packages/soy-ui/src/components';

  const components = fg.sync(`**/index.ts`, { cwd: base });

  let code = ``;

  components.forEach(component => {
    const [moduleName] = component.split('/');

    code += `- ${moduleName}\n`;
  });

  writeFile('components.txt', code);
}

generateUiNames();
