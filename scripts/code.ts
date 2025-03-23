import { readFile, writeFile } from 'node:fs/promises';
import fg from 'fast-glob';

async function generateCodeToJson() {
  const components = fg.sync('examples/src/ui/*.vue');

  const codeRecord: Record<string, string> = {};

  for await (const component of components) {
    const name = component.replace('examples/src/ui/', '').replace('.vue', '');

    const code = await readFile(component, 'utf-8');

    codeRecord[name] = code;
  }

  await writeFile('docs/.vitepress/code.json', JSON.stringify(codeRecord, null, 2));
}

generateCodeToJson();
