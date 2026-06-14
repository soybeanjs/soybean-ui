import generatedChangelogIndex from '~/generated/changelog/index.json';

export type GeneratedChangelogEntryType = 'feature' | 'fix' | 'optimization' | 'refactor' | 'docs' | 'chore' | 'style';

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

export interface GeneratedReleaseChangelogVersion {
  version: string;
  compareUrl: string;
  date: string;
  entryCount: number;
  componentCount: number;
  components: string[];
  typeCounts: Partial<Record<GeneratedChangelogEntryType, number>>;
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
