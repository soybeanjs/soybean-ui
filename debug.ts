import { writeFile } from 'node:fs/promises';
import fg from 'fast-glob';

function start() {
  const files = fg.sync('src/views/ui/modules/**.vue');

  const components = files.map(file => {
    const name = file.split('/').pop()?.replace('.vue', '');
    return name as string;
  });
  components.forEach(async component => {
    const name = toCamelCase(component);

    const content = `# ${name[0].toUpperCase() + name.slice(1)}`;

    await writeFile(`docs/docs/components/${component}.md`, content);
  });
}

function toCamelCase(str: string) {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

start();
