export interface ComponentChangelogOverride {
  components: string[];
}

export const componentChangelogOverrides: Record<string, ComponentChangelogOverride> = {
  'v0.15.4:fb274': {
    // The v0.15.4 `bottom-sheet` release is the gesture drawer family, renamed in v0.50.0.
    components: ['drawer']
  },
  'v0.16.0:6cbdc': {
    components: ['card', 'editable', 'hover-card', 'navigation-menu', 'pagination', 'popover', 'stepper']
  }
};
