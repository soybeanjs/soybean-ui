import path from 'path';
import { Command } from 'commander';
import { applyPresetToProject } from './preset';

export const apply = new Command()
  .name('apply')
  .description('apply a preset to an existing project')
  .argument('<preset>', 'preset name or code')
  .option('-c, --cwd <cwd>', 'the working directory', process.cwd())
  .action(async (presetArg: string, opts) => {
    await applyPresetToProject(presetArg, path.resolve(opts.cwd));
  });
