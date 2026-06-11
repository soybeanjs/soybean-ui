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
  path: v.optional(v.string()),
  dryRun: v.boolean(),
  diff: v.boolean(),
  view: v.boolean(),
  all: v.boolean(),
  silent: v.boolean()
});

export const add = new Command()
  .name('add')
  .description('add a component to your project')
  .argument('[components...]', 'component names to add')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option('-o, --overwrite', 'overwrite existing files.', false)
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .option('-p, --path <path>', 'the path to add the component to.')
  .option('--dry-run', 'preview the files to be added without writing them.', false)
  .option('--diff', 'show the diff between the local file and the registry file.', false)
  .option('--view', 'view the component source code without adding it.', false)
  .option('-a, --all', 'add all available components.', false)
  .option('-s, --silent', 'mute output.', false)
  .action(async (components: string[], opts) => {
    const options = v.parse(addOptionsSchema, {
      components,
      yes: opts.yes,
      overwrite: opts.overwrite,
      cwd: path.resolve(opts.cwd),
      path: opts.path,
      dryRun: opts.dryRun,
      diff: opts.diff,
      view: opts.view,
      all: opts.all,
      silent: opts.silent
    });

    // Get all available components if --all is used
    if (options.all) {
      try {
        const config = await getConfig(options.cwd);
        if (config) {
          // TODO: Load all components from registry
          // This will be implemented in the registry system
          if (!options.silent) {
            console.log('--all flag: will add all available components from registry');
          }
        }
      } catch {
        // Silently continue
      }
    }

    // Ensure components were specified (unless viewing or using --all)
    if (!options.components.length && !options.all && !options.view) {
      console.log('Usage: sbean add <component...>');
      console.log('\nRun "sbean search" to find available components.');
      process.exit(0);
    }

    // Read sbean.json
    let config: Config | null;

    try {
      config = await getConfig(options.cwd);
    } catch {
      if (!options.silent) {
        console.error('No sbean.json found. Run "sbean init" first.');
      }
      process.exit(1);
    }

    if (!config) {
      if (!options.silent) {
        console.error('No sbean.json found. Run "sbean init" first.');
      }
      process.exit(1);
    }

    // Handle --view mode (show source code without adding)
    if (options.view) {
      for (const componentName of options.components) {
        if (!options.silent) {
          console.log(`\n=== Viewing: ${componentName} ===\n`);
        }
        // TODO: Implement view logic in addComponents
      }
      return;
    }

    // Confirm (unless --yes)
    if (!options.yes && !options.silent && !options.dryRun && !options.diff) {
      console.log(`Adding: ${options.components.join(', ')}`);
      console.log(`  To: ${config.resolvedPaths.ui}`);
      console.log();
    }

    await addComponents(options.components, config, {
      overwrite: options.overwrite,
      path: options.path,
      dryRun: options.dryRun,
      diff: options.diff,
      silent: options.silent
    });
  });
