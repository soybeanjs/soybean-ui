import { createCli } from '../src/cli';

/**
 * The declaration is the CLI contract: these assertions fail when a command,
 * its arguments, or a translate option is renamed or dropped, which is exactly
 * the surface the docs and the release pipeline call.
 */
describe('cli declaration', () => {
  it('declares the three command groups plus the workspace commands', () => {
    expect(createCli().commands.map(command => command.name)).toEqual([
      'gen',
      'translate',
      'check',
      'size',
      'stub',
      'reorder-imports',
      'sync-template-versions'
    ]);
  });

  it('requires the target argument of gen/translate/check', () => {
    const commands = Object.fromEntries(createCli().commands.map(command => [command.name, command]));

    expect(commands.gen!.args).toEqual([
      { value: 'surface', required: true, variadic: false },
      { value: 'name', required: false, variadic: false }
    ]);
    expect(commands.translate!.args).toEqual([{ value: 'surface', required: true, variadic: false }]);
    expect(commands.check!.args).toEqual([{ value: 'target', required: true, variadic: false }]);
  });

  it('accepts variadic paths for reorder-imports', () => {
    const command = createCli().commands.find(entry => entry.name === 'reorder-imports');

    expect(command?.args).toEqual([{ value: 'paths', required: false, variadic: true }]);
  });

  it('declares every option the translate driver consumes', () => {
    const translate = createCli().commands.find(command => command.name === 'translate');

    expect(translate?.options.map(option => option.name)).toEqual([
      'locale',
      'sourceLocale',
      'batchSize',
      'limit',
      'overwrite',
      'dryRun'
    ]);
    expect(translate?.options.find(option => option.name === 'overwrite')?.isBoolean).toBe(true);
    expect(translate?.options.find(option => option.name === 'batchSize')?.isBoolean).toBeUndefined();
  });

  it('declares every option the size driver consumes', () => {
    const size = createCli().commands.find(command => command.name === 'size');

    expect(size?.args).toEqual([]);
    expect(size?.options.map(option => option.name)).toEqual(['budget', 'baseline', 'reportDir', 'write']);
    // `--no-write` is normalized by cac to a boolean `write` that defaults to true.
    expect(size?.options.find(option => option.name === 'write')?.isBoolean).toBe(true);
    expect(size?.options.find(option => option.name === 'reportDir')?.isBoolean).toBeUndefined();
  });

  it('exposes the version and help flags', () => {
    const globalOptions = createCli().globalCommand.options.map(option => option.name);

    expect(globalOptions).toContain('help');
    expect(globalOptions).toContain('version');
  });
});
