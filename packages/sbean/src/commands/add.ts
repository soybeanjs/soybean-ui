import path from 'path';
import * as v from 'valibot';
import { Command } from 'commander';
import { addComponents } from '../utils/add-components';
import { getConfig } from '../utils/get-config';
import type { Config } from '../utils/get-config';

export const addOptionsSchema = v.object({
  components: v.array(v.string()),
  yes: v.boolean(),
  overwrite: v.boolean(),
  cwd: v.string(),
  path: v.optional(v.string())
});

export const add = new Command()
  .name('add')
  .description('add a component to your project')
  .argument('[components...]', 'component names to add')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option('-o, --overwrite', 'overwrite existing files.', false)
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .option('-p, --path <path>', 'the path to add the component to.')
  .action(async (components: string[], opts) => {
    const options = v.parse(addOptionsSchema, {
      components,
      yes: opts.yes,
      overwrite: opts.overwrite,
      cwd: path.resolve(opts.cwd),
      path: opts.path
    });

    // Ensure components were specified
    if (!options.components.length) {
      console.log('Usage: sbean add <component...>');
      console.log('\nRun "sbean search" to find available components.');
      process.exit(0);
    }

    // Read sbean.json
    let config: Config | null;

    try {
      config = await getConfig(options.cwd);
    } catch {
      console.error('No sbean.json found. Run "sbean init" first.');
      process.exit(1);
    }

    if (!config) {
      console.error('No sbean.json found. Run "sbean init" first.');
      process.exit(1);
    }

    // Confirm (unless --yes)
    if (!options.yes) {
      console.log(`Adding: ${options.components.join(', ')}`);
      console.log(`  To: ${config.resolvedPaths.ui}`);
      console.log();
    }

    await addComponents(options.components, config, {
      overwrite: options.overwrite,
      path: options.path
    });
  });
