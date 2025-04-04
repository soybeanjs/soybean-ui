import { readFile, writeFile } from 'node:fs/promises';
import fg from 'fast-glob';

async function generateCodeToJson() {
  // match components in root and subdirectories
  const components = fg.sync([
    'examples/src/ui/*.vue', // keep support for root directory components
    'examples/src/ui/*/*.vue' // add support for subdirectory components
  ]);

  const codeRecord: Record<string, string> = {};

  for await (const component of components) {
    let name;

    if (component.includes('/ui/') && !component.split('/ui/')[1].includes('/')) {
      // handle root directory components, keep original format: input
      name = component.replace('examples/src/ui/', '').replace('.vue', '');
    } else {
      // handle subdirectory components, format: button/color -> button-color
      const path = component.replace('examples/src/ui/', '').replace('.vue', '');
      const [componentName, demoName] = path.split('/');
      name = `${componentName}-${demoName}`;
    }

    const code = await readFile(component, 'utf-8');
    codeRecord[name] = code;
  }

  await writeFile('docs/.vitepress/code.json', JSON.stringify(codeRecord, null, 2));
}

generateCodeToJson();
