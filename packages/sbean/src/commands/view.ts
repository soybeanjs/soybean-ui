import path from 'path';
import * as v from 'valibot';
import { Command } from 'commander';
import { getConfig } from '../utils/get-config';
import { fetchRegistryItem } from '../registry/fetcher';
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

    let registryResult: any = null;
    try {
      registryResult = await readRegistryWithIncludes(registryFile, {
        cwd: config.resolvedPaths.cwd
      });
    } catch {
      registryResult = null;
    }

    const rootDir = registryResult?.usesInclude ? path.dirname(registryFile) : config.resolvedPaths.cwd;

    // Try local first, then remote
    let resolvedItem = registryResult?.registry.items.find((i: any) => i.name === options.component) ?? null;

    if (!resolvedItem) {
      console.log('  Fetching from ui.soybeanjs.cn...');
      resolvedItem = await fetchRegistryItem(options.component, config);
    }

    if (!resolvedItem) {
      console.error(`Component "${options.component}" not found in registry.`);
      console.log('Run "sbean search" to see available components.');
      process.exit(1);
    }

    // If we have a local registry, resolve file contents; remote items already have content
    if (registryResult) {
      resolvedItem = await createRegistryItem(resolvedItem as any, rootDir);
    }

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
