import { readFileSync, existsSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import type { RolldownPluginOption } from 'rolldown';

export function cssRawPlugin(): RolldownPluginOption {
  const rawCssQueryRE = /\.css\?raw$/;

  const plugin: RolldownPluginOption = {
    name: 'raw-css-loader',
    load(id) {
      if (!rawCssQueryRE.test(id)) return null;

      const filePath = id.replace(/\?raw$/, '');
      const css = readFileSync(filePath, 'utf8');

      return `export default ${JSON.stringify(css)};`;
    }
  };

  return plugin;
}

/** a stray declaration is a generated `.d.ts` sitting beside its `.ts` source */
const strayDeclarationsIn = (dir: string) =>
  readdirSync(dir)
    .filter(file => file.endsWith('.d.ts') && existsSync(path.join(dir, `${file.slice(0, -5)}.ts`)))
    .map(file => path.join(dir, file));

/**
 * declaration emit writes `.d.ts` beside sources pulled in from outside this
 * package (tsconfig `#shared/*` → headless); remove those strays after build.
 */
export const removeStrayDeclarations = (rootDir: string, moduleIds: string[]) => {
  moduleIds
    .filter(moduleId => moduleId.endsWith('.ts') && !moduleId.startsWith(rootDir) && existsSync(moduleId))
    .map(moduleId => path.dirname(moduleId))
    .flatMap(strayDeclarationsIn)
    .forEach(file => {
      rmSync(file, { force: true });
    });
};
