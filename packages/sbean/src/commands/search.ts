import path from 'path';
import * as v from 'valibot';
import { Command } from 'commander';
import { getConfig } from '../utils/get-config';
import { readRegistryWithIncludes } from '../registry/loader';
import type { RegistryItem } from '../registry/schema';

export const searchOptionsSchema = v.object({
  query: v.optional(v.string()),
  cwd: v.string(),
  all: v.boolean()
});

export const search = new Command()
  .name('search')
  .description('search for components in the registry')
  .argument('[query]', 'search query')
  .option('-a, --all', 'show all components', false)
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .action(async (query: string | undefined, opts) => {
    const options = v.parse(searchOptionsSchema, {
      query,
      cwd: path.resolve(opts.cwd),
      all: opts.all
    });

    const config = await getConfig(options.cwd);

    if (!config) {
      console.error('No sbean.json found. Run "sbean init" first.');
      process.exit(1);
    }

    const registryFile = path.join(config.resolvedPaths.cwd, 'registry.json');

    let items: RegistryItem[] = [];

    try {
      const result = await readRegistryWithIncludes(registryFile, {
        cwd: config.resolvedPaths.cwd
      });
      items = result.registry.items;
    } catch {
      console.log('  No local registry.json found.');
      console.log('  Run "sbean build" to generate one from your UI source.');
      console.log();
      console.log('  Or add a remote registry in sbean.json:');
      console.log('    "registries": {');
      console.log('      "@custom": "https://example.com/r/{name}.json"');
      console.log('    }');
      console.log();
      process.exit(0);
    }

    // Filter by query
    let filtered = items;

    if (!options.all && options.query) {
      const q = options.query.toLowerCase();
      filtered = items.filter(item => {
        const name = item.name.toLowerCase();
        const desc = (item.description ?? '').toLowerCase();
        const cats = (item.categories ?? []).join(' ').toLowerCase();
        return name.includes(q) || desc.includes(q) || cats.includes(q);
      });
    }

    if (filtered.length === 0) {
      console.log(`\n  No components found${options.query ? ` for "${options.query}"` : ''}.`);
      console.log();
      process.exit(0);
    }

    console.log();
    console.log(`  Found ${filtered.length} component(s)${options.query ? ` matching "${options.query}"` : ''}:`);
    console.log();

    for (const item of filtered) {
      const type = item.type.replace('registry:', '');
      const depCount = item.registryDependencies?.length ?? 0;

      console.log(`  ${item.name.padEnd(24)} ${type.padEnd(12)} ${depCount ? `deps: ${depCount}` : ''}`);
      if (item.description) {
        console.log(`  ${''.padEnd(24)} ${item.description.slice(0, 60)}`);
      }
    }

    console.log();
    console.log(`  Run "sbean add <name>" to add a component.`);
    console.log(`  Run "sbean view <name>" to see its source code.`);
    console.log();
  });
