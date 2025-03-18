import { writeFile } from 'node:fs/promises';
import fg from 'fast-glob';
import { toCamelCase, toPascalCase } from './_shared';

function generatePrimitivesNames() {
  const base = 'packages/primitives/src/components';

  const components = fg.sync(`**/*.vue`, { cwd: base });

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

  writeFile('packages/primitives/src/constant/components.json', JSON.stringify(nameRecords, null, 2));
}

generatePrimitivesNames();
