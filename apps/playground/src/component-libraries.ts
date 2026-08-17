/**
 * Component library registry for the playground.
 *
 * Maps component names (kebab-case, matching example directory names) to their
 * source library. Components not listed here default to `'ui'`.
 *
 * To add a new library (e.g. `@soybeanjs/admin`), add a new key with its
 * component list and the playground dropdown will pick it up automatically.
 */
export interface LibraryOption {
  value: string;
  label: string;
  icon: string;
}

export const libraryOptions: LibraryOption[] = [
  { value: 'ui', label: 'UI', icon: 'lucide:layout-grid' },
  { value: 'ui-x', label: 'UI-X', icon: 'lucide:sparkles' },
  { value: 'chart', label: 'Chart', icon: 'lucide:chart-column' }
];

/** Components belonging to `@soybeanjs/ui-x`. All others default to `'ui'`. */
const uiXComponents = new Set([
  'bubble',
  'bubble-list',
  'sender',
  'markdown',
  'attachments',
  'file-card',
  'code-block',
  'conversations',
  'welcome',
  'prompts',
  'sources',
  'suggestion',
  'think',
  'thought-chain',
  'actions',
  'actions-copy',
  'actions-feedback',
  'folder',
  'notification',
  'mermaid'
]);

/** Component names belonging to `@soybeanjs/chart`. */
const chartComponents = new Set(['bar', 'line', 'area', 'pie', 'scatter']);

/** Returns the library value for a given component name. */
export function getComponentLibrary(componentName: string): string {
  if (uiXComponents.has(componentName)) return 'ui-x';
  if (chartComponents.has(componentName)) return 'chart';
  return 'ui';
}
