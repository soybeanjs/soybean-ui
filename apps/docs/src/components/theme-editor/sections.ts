import PreviewBorders from './preview-borders.vue';
import PreviewCharts from './preview-charts.vue';
import PreviewColors from './preview-colors.vue';
import PreviewContrast from './preview-contrast.vue';
import PreviewData from './preview-data.vue';
import PreviewFeedback from './preview-feedback.vue';
import PreviewFont from './preview-font.vue';
import PreviewForms from './preview-forms.vue';
import PreviewOverlay from './preview-overlay.vue';
import PreviewRadius from './preview-radius.vue';
import PreviewSidebar from './preview-sidebar.vue';
import PreviewSize from './preview-size.vue';
import PreviewSpacing from './preview-spacing.vue';
import PreviewSurfaces from './preview-surfaces.vue';
import type { ThemeEditorSection } from './types';

/**
 * The editor's preview sections, in reading order: the colour and form surfaces
 * most pages are built from come first, the dimension knobs (size / radius /
 * spacing) after them, the theme's own partitions (region, charts, contrast)
 * last. Inside a section the components are ordered common-first — the ones a
 * page uses every day before the ones that show an edge of the token contract.
 */
export const THEME_EDITOR_SECTIONS: ThemeEditorSection[] = [
  {
    key: 'colors',
    group: 'color',
    component: PreviewColors,
    tokens: ['primary', 'primary-foreground', 'primary-50…950', 'ring', 'secondary', 'accent', 'carbon']
  },
  {
    key: 'feedback',
    group: 'color',
    component: PreviewFeedback,
    tokens: ['destructive', 'success', 'warning', 'info', '-foreground']
  },
  {
    key: 'forms',
    group: 'structure',
    component: PreviewForms,
    tokens: ['input', 'border', 'ring', 'muted', 'secondary', 'accent']
  },
  {
    key: 'data',
    group: 'structure',
    component: PreviewData,
    tokens: ['card', 'popover', 'muted', 'accent', 'border', 'muted-foreground']
  },
  {
    key: 'surfaces',
    group: 'structure',
    component: PreviewSurfaces,
    tokens: [
      'background',
      'card',
      'popover',
      'card-foreground',
      'popover-foreground',
      'carbon',
      'shadow-md',
      'surfaceStyle'
    ]
  },
  {
    key: 'borders',
    group: 'structure',
    component: PreviewBorders,
    tokens: ['border', 'input', 'ring', 'border-alpha', 'borderOpacity']
  },
  {
    key: 'overlay',
    group: 'structure',
    component: PreviewOverlay,
    tokens: ['popover', 'mask', 'border', 'shadow-md', 'z-base']
  },
  {
    key: 'size',
    group: 'size',
    component: PreviewSize,
    tokens: ['size', 'text-4xs…9xl']
  },
  {
    key: 'radius',
    group: 'size',
    component: PreviewRadius,
    tokens: ['radius', 'radius-2xs…2xl', 'radius-none', 'radius-full']
  },
  {
    key: 'spacing',
    group: 'size',
    component: PreviewSpacing,
    tokens: ['spacing-unit', 'spacing-3xs…9xl', 'p-4', 'gap-md']
  },
  {
    key: 'font',
    group: 'font',
    component: PreviewFont,
    tokens: ['font-sans', 'font-heading', 'font-mono']
  },
  {
    key: 'sidebar',
    group: 'region',
    component: PreviewSidebar,
    tokens: [
      'sidebar',
      'sidebar-foreground',
      'sidebar-accent',
      'sidebar-accent-foreground',
      'sidebar-border',
      'sidebar-primary',
      'sidebar-primary-foreground',
      'sidebar-ring'
    ]
  },
  {
    key: 'charts',
    group: 'color',
    component: PreviewCharts,
    tokens: ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5']
  },
  {
    key: 'contrast',
    group: 'color',
    component: PreviewContrast,
    tokens: ['*-foreground', '*-hairline']
  }
];
