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
 * translated for non-English locales via `pnpm sui gen changelog --translate`.
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
  /**
   * Optional content path of the upgrade guide for this release, relative to
   * `src/content/{locale}/` (e.g. `ui/migration/v0.40.0`). When set, the
   * releases page renders a link to `/overview/migration/<version>`.
   */
  docPath?: string;
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
  ],
  'v0.40.0-beta.1': [
    {
      type: 'breaking',
      summary:
        'This release removes the published peripheral packages @soybeanjs/ui-x, @soybeanjs/admin and @soybeanjs/chart. ' +
        'In headless, the RovingFocusGroup/RovingFocusItem components are replaced by the useRovingFocusGroup/useRovingFocusGroupItem ' +
        'composables, PropsToContext is renamed to ToContext, and transformPropsToContext becomes toContext with plain (non-invoked) ' +
        'function values. STable no longer rounds by default, and headless components stop injecting global helper classes. ' +
        'See the upgrade guide for the full migration walkthrough.',
      docPath: 'ui/migration/v0.40.0'
    }
  ],
  'v0.50.0': [
    {
      type: 'breaking',
      summary:
        'This release swaps all three engines and renames two families. The date engine moves from @internationalized/date to ' +
        'date-fns with native Date values; the table engine is rebuilt on @tanstack/vue-table (TanStack column/state naming, no legacy aliases); ' +
        'the form engine is rebuilt on @tanstack/vue-form (useForm returns a context object, initialValues becomes defaultValues). ' +
        'NavigationMenu is removed in favor of NavMenu; SDrawer renames to SSheet while SBottomSheet becomes the new gesture-driven SDrawer; ' +
        'presentation-only headless families (card/empty/list/skeleton/badge/tag) are removed, and SPopper/SArrow are no longer exported ' +
        'from the UI package. See the upgrade guide for the full migration walkthrough.',
      docPath: 'ui/migration/v0.50.0'
    },
    {
      type: 'info',
      summary:
        'Date components (Calendar, DateField, DatePicker, TimeField and their range variants) now operate on native Date values built ' +
        'on date-fns. The dedicated date guide maps CalendarDate/Time/DateTime values, calendar math and formatting/parsing to the new model.',
      docPath: 'ui/migration/v0.50.0-date'
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
