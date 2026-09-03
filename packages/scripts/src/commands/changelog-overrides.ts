export interface ComponentChangelogOverride {
  components: string[];
}

export const componentChangelogOverrides: Record<string, ComponentChangelogOverride> = {
  'v0.15.4:fb274': {
    components: ['bottom-sheet']
  },
  'v0.16.0:6cbdc': {
    components: ['card', 'editable', 'hover-card', 'navigation-menu', 'pagination', 'popover', 'stepper']
  }
};
