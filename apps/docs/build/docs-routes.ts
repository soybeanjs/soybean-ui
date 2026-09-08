import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

/** locale code -> content directory name (aligned with i18n locale codes). */
export const CONTENT_LOCALES = ['en', 'zh'] as const;

/**
 * Static (non-content) pages that must be prerendered / listed in the sitemap.
 * Mirrors the `definePage` routes under `src/pages`.
 */
export const STATIC_ROUTES = ['/', '/releases', '/headless', '/components'] as const;

export function toPosixPath(filePath: string): string {
  return filePath.split(path.sep).join('/');
}

/**
 * Content slug (relative to `src/content/{locale}`, no `.md`) -> public route path.
 *
 * The mapping mirrors the shell pages under `src/pages`:
 * - `ui/components/<slug>`  -> `/components/<slug>`
 * - `ui/<slug>`             -> `/overview/<slug>`
 * - `<section>/components/<slug>` -> `/<section>/<slug>` (ui-x / admin / chart)
 * - `<section>/<slug>`      -> `/<section>/<slug>`
 */
export function resolveContentRoutePath(inputSlug: string): string {
  // `index.md` maps to its directory root (e.g. `sbean/index` -> `/sbean`).
  const slug = inputSlug.replace(/\/index$/u, '').replace(/^index$/u, '');
  const uiComponentsMatch = slug.match(/^ui\/components\/(.+)$/u);

  if (uiComponentsMatch) {
    return `/components/${uiComponentsMatch[1]}`;
  }

  if (slug === 'ui') {
    return '/overview';
  }

  if (slug.startsWith('ui/')) {
    return `/overview/${slug.slice('ui/'.length)}`;
  }

  return `/${slug}`;
}

async function collectMarkdownSlugs(directoryPath: string, baseDir: string): Promise<string[]> {
  if (!existsSync(directoryPath)) {
    return [];
  }

  const entries = await readdir(directoryPath, { withFileTypes: true });
  const nestedSlugs = await Promise.all(
    entries.map(async entry => {
      const resolvedPath = path.join(directoryPath, entry.name);

      if (entry.isDirectory()) {
        return collectMarkdownSlugs(resolvedPath, baseDir);
      }

      if (entry.isFile() && entry.name.endsWith('.md')) {
        return [toPosixPath(path.relative(baseDir, resolvedPath)).replace(/\.md$/u, '')];
      }

      return [];
    })
  );

  return nestedSlugs.flat();
}

/**
 * Collect concrete prerender routes from markdown files under `src/content`.
 * Dynamic catch-all / param routes are not expanded by `prerender.all`, so every
 * content slug must be listed explicitly (mirrors the official ubean docs site).
 * Non-English locales get their `/zh`-prefixed mirror (`prefix_except_default`).
 */
export async function collectContentRoutes(rootDir: string): Promise<string[]> {
  const routes: string[] = [];

  for (const locale of CONTENT_LOCALES) {
    const dir = path.join(rootDir, 'src/content', locale);
    const slugs = await collectMarkdownSlugs(dir, dir);
    const prefix = locale === 'en' ? '' : `/${locale}`;

    for (const slug of slugs) {
      routes.push(`${prefix}${resolveContentRoutePath(slug)}`);
    }
  }

  return [...new Set(routes)];
}

/**
 * Full prerender / sitemap route list: static pages + content routes + `/zh`
 * mirrors of the static pages.
 */
export async function collectDocsRoutes(rootDir: string): Promise<string[]> {
  const contentRoutes = await collectContentRoutes(rootDir);
  const zhMirrors = STATIC_ROUTES.map(route => (route === '/' ? '/zh' : `/zh${route}`));

  return [...new Set([...STATIC_ROUTES, ...zhMirrors, ...contentRoutes])].sort((left, right) =>
    left.localeCompare(right)
  );
}
