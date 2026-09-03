/**
 * Per-release custom notes that are injected into the generated release
 * changelog (`apps/docs/src/generated/changelog/releases.json`) in addition to
 * the git-commit-derived entries.
 *
 * The CHANGELOG itself is generated from git commits, so it cannot carry
 * maintainer-authored guidance (for example "this release has breaking
 * changes"). Add such notes here, keyed by the version string, and they will be
 * attached to that release version and rendered on the `/releases` page.
 *
 * The `summary` field is written in the default locale (English) and is
 * translatable: a `summaryKey` is generated from the version + index and
 * registered in `apps/docs/src/generated/changelog-locales/*.json`, then
 * translated for non-English locales via `pnpm sui changelog-translate`.
 */
export interface ReleaseChangelogNoteSource {
  /**
   * The tone of the note, which drives the alert color on the releases page.
   *
   * - `breaking`: the release contains breaking changes; rendered as a warning alert.
   * - `info`: general migration / highlight guidance; rendered as an info alert.
   */
  type: 'breaking' | 'info';
  /** The note body (default locale, English). Translatable via `summaryKey`. */
  summary: string;
}

export const releaseChangelogNotes: Record<string, ReleaseChangelogNoteSource[]> = {
  'v0.30.0-beta.1': [
    {
      type: 'breaking',
      summary:
        'This release ships a rebuilt theme system with renamed packages. ' +
        '@soybeanjs/shadcn-theme is now @soybeanjs/theme (createShadcnTheme → createTheme), and ' +
        '@soybeanjs/unocss-shadcn is now @soybeanjs/ui-uno (presetShadcn → presetUiUnocss, ShadcnPresetOptions → UiUnocssOptions). ' +
        'The theme menu config (menuColor / menuAccent) is removed, and custom color overrides now use `overrides: { light, dark }` ' +
        'instead of the legacy preset object (presets can also be passed through SConfigProvider `theme.preset`). ' +
        'Please update your dependencies and imports accordingly.'
    }
  ]
};

/**
 * Components newly introduced in a given release version (i.e. they did not
 * exist in any earlier version). Keyed by the version string, same as
 * `releaseChangelogNotes`.
 *
 * These are curated manually because they cannot be inferred reliably from the
 * git-commit-derived CHANGELOG entries: new components are often committed under
 * an aggregate scope (e.g. `components`) that does not resolve to a component
 * name, and pre-existing components can appear in the changelog later than they
 * were actually introduced.
 */
export const releaseIntroducedComponents: Record<string, string[]> = {
  'v0.30.0-beta.1': [
    'cascader',
    'rating',
    'palette-picker',
    'theme-customizer',
    'theme-mode-select',
    'theme-mode-switch'
  ]
};
