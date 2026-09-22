import type { Component } from 'vue';

/**
 * Preview groups the editor toolbar can filter by. Every section belongs to
 * exactly one group; `all` is the unfiltered view and owns no sections.
 */
export type ThemeEditorGroup = 'all' | 'color' | 'size' | 'font' | 'structure' | 'region';

/** A group that owns sections (everything but the `all` filter). */
export type ThemeEditorSectionGroup = Exclude<ThemeEditorGroup, 'all'>;

/**
 * One preview section: a theme configuration dimension plus the components that
 * consume it, ordered common-first.
 */
export interface ThemeEditorSection {
  /** i18n key under `themeEditor.sections` (resolves `.title` / `.description`). */
  key: string;
  /** the toolbar group this section belongs to. */
  group: ThemeEditorSectionGroup;
  /** the preview SFC rendered inside the section card. */
  component: Component;
  /**
   * The theme tokens the section exercises, shown as reference chips. Token
   * names are code (`--muted-foreground`), so they are never translated.
   */
  tokens: string[];
}
