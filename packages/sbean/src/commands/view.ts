import path from 'path';
import * as v from 'valibot';
import { Command } from 'commander';
import { getConfig } from '../utils/get-config';
import { readRegistryWithIncludes, createRegistryItem } from '../registry/loader';

export const viewOptionsSchema = v.object({
  component: v.string(),
  cwd: v.string()
});

export const view = new Command()
  .name('view')
  .description('view the source of a component')
  .argument('<component>', 'component name to view')
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .action(async (component: string, opts) => {
    const options = v.parse(viewOptionsSchema, {
      component,
      cwd: path.resolve(opts.cwd)
    });

    const config = await getConfig(options.cwd);

    if (!config) {
      console.error('No sbean.json found. Run "sbean init" first.');
      process.exit(1);
    }

    const registryFile = path.join(config.resolvedPaths.cwd, 'registry.json');

    let result;
    try {
      result = await readRegistryWithIncludes(registryFile, {
        cwd: config.resolvedPaths.cwd
      });
    } catch {
      console.error('No registry.json found. Run "sbean build" first.');
      process.exit(1);
    }

    const item = result.registry.items.find(i => i.name === options.component);

    if (!item) {
      console.error(`Component "${options.component}" not found in registry.`);
      console.log('Run "sbean search" to see available components.');
      process.exit(1);
    }

    const rootDir = result.usesInclude ? path.dirname(registryFile) : config.resolvedPaths.cwd;

    const resolvedItem = await createRegistryItem(item, rootDir);

    console.log();
    console.log(`  ${resolvedItem.name}`);
    console.log(`  ${'─'.repeat(resolvedItem.name.length)}`);
    console.log();

    if (resolvedItem.description) {
      console.log(`  ${resolvedItem.description}`);
      console.log();
    }

    console.log(`  Type:          ${resolvedItem.type}`);
    console.log(`  Dependencies:  ${(resolvedItem.dependencies ?? []).join(', ') || 'none'}`);
    console.log(`  Registry Deps: ${(resolvedItem.registryDependencies ?? []).join(', ') || 'none'}`);

    if (resolvedItem.categories?.length) {
      console.log(`  Categories:    ${resolvedItem.categories.join(', ')}`);
    }

    console.log();

    if (resolvedItem.files?.length) {
      for (const file of resolvedItem.files) {
        console.log(`  ── ${file.path} ──`);
        console.log();

        if (file.content) {
          const lines = file.content.split('\n');
          for (let i = 0; i < lines.length; i++) {
            const lineNum = String(i + 1).padStart(4, ' ');
            console.log(`  ${lineNum} │ ${lines[i]}`);
          }
        } else {
          console.log('  (no content)');
        }
        console.log();
      }
    }

    if (resolvedItem.css) {
      console.log(`  ── CSS ──`);
      console.log();
      console.log(resolvedItem.css);
      console.log();
    }
  });
