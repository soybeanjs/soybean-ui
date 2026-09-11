import generatedChangelogIndex from '~/generated/changelog/index.json';
import { resolveContentRoutePath } from './content-route';

export type GeneratedChangelogEntryType =
  | 'breaking'
  | 'feature'
  | 'fix'
  | 'optimization'
  | 'refactor'
  | 'docs'
  | 'chore'
  | 'style';

export interface GeneratedChangelogEntry {
  type: GeneratedChangelogEntryType;
  scope: string;
  summary: string;
  summaryKey: string | null;
  commitHash: string | null;
  commitUrl: string | null;
  authors: string[];
  source: 'exact-scope' | 'override';
}

export interface GeneratedChangelogVersion {
  version: string;
  compareUrl: string;
  date: string;
  entries: GeneratedChangelogEntry[];
}

export interface GeneratedChangelogDocument {
  component: string;
  generatedAt: string;
  schemaVersion: 1;
  versions: GeneratedChangelogVersion[];
}

export interface GeneratedReleaseChangelogEntry extends GeneratedChangelogEntry {
  components: string[];
}

export type GeneratedReleaseChangelogNoteType = 'breaking' | 'info';

export interface GeneratedReleaseChangelogNote {
  type: GeneratedReleaseChangelogNoteType;
  summary: string;
  summaryKey: string;
  /** Content path of the upgrade guide (e.g. `ui/migration/v0.40.0`), when one exists. */
  docPath?: string;
}

export interface GeneratedReleaseChangelogVersion {
  version: string;
  compareUrl: string;
  date: string;
  entryCount: number;
  componentCount: number;
  components: string[];
  newComponents: string[];
  typeCounts: Partial<Record<GeneratedChangelogEntryType, number>>;
  notes: GeneratedReleaseChangelogNote[];
  entries: GeneratedReleaseChangelogEntry[];
}

export interface GeneratedReleaseChangelogDocument {
  generatedAt: string;
  schemaVersion: 1;
  releases: GeneratedReleaseChangelogVersion[];
}

export interface GeneratedChangelogIndexEntry {
  component: string;
  file: string;
  latestVersion: string | null;
  versionCount: number;
  entryCount: number;
}

interface GeneratedChangelogIndex {
  generatedAt: string;
  schemaVersion: number;
  components: Record<string, GeneratedChangelogIndexEntry>;
}

const generatedReleaseDocument = (await import('~/generated/changelog/releases.json'))
  .default as GeneratedReleaseChangelogDocument;

const generatedChangelogModules = import.meta.glob<GeneratedChangelogDocument>('../generated/changelog/*.json', {
  eager: true,
  import: 'default'
});

const componentChangelogDocuments = Object.fromEntries(
  Object.entries(generatedChangelogModules)
    .filter(([path]) => !path.endsWith('/index.json') && !path.endsWith('/releases.json'))
    .map(([, document]) => [document.component, document])
) as Record<string, GeneratedChangelogDocument>;

const changelogIndex = generatedChangelogIndex as GeneratedChangelogIndex;

export function getComponentChangelogDocument(component: string): GeneratedChangelogDocument {
  return (
    componentChangelogDocuments[component] ?? {
      component,
      generatedAt: changelogIndex.generatedAt,
      schemaVersion: 1,
      versions: []
    }
  );
}

export function getComponentChangelogMeta(component: string): GeneratedChangelogIndexEntry {
  return (
    changelogIndex.components[component] ?? {
      component,
      file: `${component}.json`,
      latestVersion: null,
      versionCount: 0,
      entryCount: 0
    }
  );
}

export function getReleaseChangelogDocument(): GeneratedReleaseChangelogDocument {
  return generatedReleaseDocument;
}

export interface UpgradeGuideEntry {
  /** Release version the guide belongs to (e.g. `v0.40.0-beta.1`). */
  version: string;
  /** Content path relative to `src/content/{locale}/` (e.g. `ui/migration/v0.40.0`). */
  docPath: string;
  /** Public route path of the guide (e.g. `/overview/migration/v0.40.0`). */
  path: string;
}

/**
 * Upgrade guides linked from release notes, newest first. Derived from
 * `docPath` on generated notes, so the sidebar and the releases page always
 * agree on which guides exist.
 */
export function getUpgradeGuides(): UpgradeGuideEntry[] {
  const guides = new Map<string, UpgradeGuideEntry>();

  for (const release of generatedReleaseDocument.releases) {
    for (const note of release.notes) {
      if (!note.docPath || guides.has(note.docPath)) {
        continue;
      }

      guides.set(note.docPath, {
        version: release.version,
        docPath: note.docPath,
        path: resolveContentRoutePath(note.docPath)
      });
    }
  }

  return Array.from(guides.values());
}

/** The guide whose `docPath` ends with the given version-ish slug, if any. */
export function findUpgradeGuide(versionOrSlug: string): UpgradeGuideEntry | undefined {
  return getUpgradeGuides().find(
    guide => guide.docPath.endsWith(`/${versionOrSlug}`) || guide.version === versionOrSlug
  );
}
