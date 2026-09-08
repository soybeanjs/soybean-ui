import path from 'node:path';
import process from 'node:process';

/**
 * Documentation sites that `sui gen api` / `sui gen changelog` write generated
 * artifacts into. The registry keeps the generators multi-target-capable; today
 * the single ubean-based docs site (`apps/docs`) is the only target.
 *
 * `locales` are the locale codes used for the generated `*-locales/*.json`
 * template files (decoupled from the site's runtime locale codes, which may be
 * remapped through an alias when consumed).
 */
export interface DocsTarget {
  /** Stable identifier used in CLI output and `--target` filtering. */
  key: 'docs';
  /** Root of committed generated data, e.g. `apps/docs/src/generated`. */
  generatedDir: string;
  /** Locale codes for generated locale templates (first is the source/default). */
  locales: string[];
}

const repoRoot = process.cwd();

export const docsTargets: DocsTarget[] = [
  {
    key: 'docs',
    generatedDir: path.join(repoRoot, 'apps/docs/src/generated'),
    locales: ['en', 'zh-CN']
  }
];

export const defaultLocale = 'en';

/**
 * Resolve the targets to run for. With no `--target` flag every configured
 * target is used; otherwise only the matching keys.
 */
export function resolveDocsTargets(argv: string[]): DocsTarget[] {
  const index = argv.indexOf('--target');

  if (index === -1) {
    return docsTargets;
  }

  const requested = argv[index + 1];
  const keys = (requested ?? '')
    .split(',')
    .map(key => key.trim())
    .filter(Boolean);

  if (!keys.length) {
    throw new Error('--target requires a value: docs');
  }

  const resolved = docsTargets.filter(target => keys.includes(target.key));

  if (resolved.length !== keys.length) {
    const known = docsTargets.map(target => target.key).join(', ');

    throw new Error(`Unknown --target value: ${keys.join(', ')}. Expected one of: ${known}.`);
  }

  return resolved;
}
