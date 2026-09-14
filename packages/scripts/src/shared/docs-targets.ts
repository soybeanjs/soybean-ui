import path from 'node:path';
import process from 'node:process';

/**
 * Documentation sites that `sui gen` / `sui translate` write generated
 * artifacts into. The registry keeps the generators multi-target-capable; today
 * the single ubean-based docs site (`apps/docs`) is the only target, so no
 * `--target` filter exists — add one here when a second target appears.
 *
 * `locales` are the locale codes used for the generated `*-locales/*.json`
 * template files (decoupled from the site's runtime locale codes, which may be
 * remapped through an alias when consumed).
 */
export interface DocsTarget {
  /** Stable identifier used in CLI output. */
  key: 'docs';
  /** Root of committed generated data, e.g. `apps/docs/src/generated`. */
  generatedDir: string;
  /** Root of markdown content, e.g. `apps/docs/src/content` (holds `<locale>/**.md`). */
  contentDir: string;
  /** Locale codes for generated locale templates (first is the source/default). */
  locales: string[];
}

const repoRoot = process.cwd();

export const docsTargets: DocsTarget[] = [
  {
    key: 'docs',
    generatedDir: path.join(repoRoot, 'apps/docs/src/generated'),
    contentDir: path.join(repoRoot, 'apps/docs/src/content'),
    locales: ['en', 'zh-CN']
  }
];

export const defaultLocale = 'en';
