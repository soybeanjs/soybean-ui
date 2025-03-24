import { defineConfigWithTheme, postcssIsolateStyles } from 'vitepress';
import unocss from 'unocss/vite';
import { version } from '../package.json';
import ComponentPreview from './plugins/previewer';
import type { CustomThemeConfig } from './types';

export default defineConfigWithTheme<CustomThemeConfig>({
  title: 'Soybean UI',
  description: 'an elegant and powerful ui library like shadcn',
  head: [
    ['meta', { name: 'author', content: 'Soybean' }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'soybean, soybean-ui, soybean-ui docs'
      }
    ],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
      }
    ],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  markdown: {
    headers: {
      level: [2, 3]
    },
    anchor: {
      callback(token) {
        // set tw `group` modifier to heading element
        token.attrSet('class', 'group relative border-none mb-4 lg:-ml-2 lg:pl-2 lg:pr-2 w-max');
      }
    },
    preConfig(md) {
      md.use(ComponentPreview);
    }
  },
  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [{ icon: 'github', link: 'https://github.com/soybeanjs/soybean-ui' }],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3]
    },
    nav: [
      { value: 'docs', label: 'Docs', linkProps: { href: '/docs/overview/getting-started' } },
      { value: 'primitives', label: 'Primitives', linkProps: { href: '/primitives/index' } },
      {
        value: 'version',
        label: `v${version}`,
        children: [
          {
            value: 'release-notes',
            label: 'Release Notes',
            linkProps: { href: 'https://github.com/soybeanjs/soybean-ui/releases' }
          }
        ]
      }
    ],
    sidebar: [
      {
        text: 'Overview',
        icon: 'lucide:rocket',
        items: [
          { text: 'Introduction', link: '/docs/overview/introduction' },
          { text: 'Getting Started', link: '/docs/overview/getting-started' },
          { text: 'Installation', link: '/docs/overview/installation' }
        ]
      },
      {
        text: 'Guides',
        icon: 'lucide:book-open',
        items: [{ text: 'Styling', link: '/docs/guides/styling' }]
      },
      {
        text: 'Components',
        icon: 'lucide:box',
        items: [
          { text: 'Accordion', link: '/docs/components/accordion' },
          { text: 'Alert', link: '/docs/components/alert' },
          { text: 'AlertDialog', link: '/docs/components/alert-dialog' },
          { text: 'AspectRatio', link: '/docs/components/aspect-ratio' },
          { text: 'Avatar', link: '/docs/components/avatar' },
          { text: 'Badge', link: '/docs/components/badge' },
          { text: 'Breadcrumb', link: '/docs/components/breadcrumb' },
          { text: 'Button', link: '/docs/components/button' },
          { text: 'Calendar', link: '/docs/components/calendar', badge: 'wip' },
          { text: 'Card', link: '/docs/components/card' },
          { text: 'Carousel', link: '/docs/components/carousel' },
          { text: 'Checkbox', link: '/docs/components/checkbox' },
          { text: 'Collapsible', link: '/docs/components/collapsible' },
          { text: 'Combobox', link: '/docs/components/combobox' },
          { text: 'Command', link: '/docs/components/command' },
          { text: 'ContextMenu', link: '/docs/components/context-menu' },
          { text: 'DataTable', link: '/docs/components/data-table', badge: 'wip' },
          { text: 'Date Picker', link: '/docs/components/date-picker', badge: 'wip' },
          { text: 'Dialog', link: '/docs/components/dialog' },
          { text: 'Drawer', link: '/docs/components/drawer' },
          { text: 'DropdownMenu', link: '/docs/components/dropdown-menu' },
          { text: 'Form', link: '/docs/components/form' },
          { text: 'HoverCard', link: '/docs/components/hover-card' },
          { text: 'Input', link: '/docs/components/input' },
          { text: 'KeyboardKey', link: '/docs/components/keyboard-key' },
          { text: 'Menubar', link: '/docs/components/menubar' },
          { text: 'NavigationMenu', link: '/docs/components/navigation-menu' },
          { text: 'NumberField', link: '/docs/components/number-field' },
          { text: 'Pagination', link: '/docs/components/pagination' },
          { text: 'PinInput', link: '/docs/components/pin-input' },
          { text: 'Popover', link: '/docs/components/popover' },
          { text: 'Progress', link: '/docs/components/progress' },
          { text: 'Radio', link: '/docs/components/radio' },
          { text: 'RangeCalendar', link: '/docs/components/range-calendar', badge: 'wip' },
          { text: 'Resizable', link: '/docs/components/resizable' },
          { text: 'ScrollArea', link: '/docs/components/scroll-area' },
          { text: 'Segment', link: '/docs/components/segment' },
          { text: 'Select', link: '/docs/components/select' },
          { text: 'Separator', link: '/docs/components/separator' },
          { text: 'Sheet', link: '/docs/components/sheet' },
          { text: 'Sidebar', link: '/docs/components/sidebar', badge: 'wip' },
          { text: 'Skeleton', link: '/docs/components/skeleton' },
          { text: 'Slider', link: '/docs/components/slider' },
          { text: 'Sonner', link: '/docs/components/sonner' },
          { text: 'Stepper', link: '/docs/components/stepper' },
          { text: 'Switch', link: '/docs/components/switch' },
          { text: 'Table', link: '/docs/components/table', badge: 'wip' },
          { text: 'Tabs', link: '/docs/components/tabs' },
          { text: 'Tag', link: '/docs/components/tag' },
          { text: 'TagsInput', link: '/docs/components/tags-input' },
          { text: 'Textarea', link: '/docs/components/textarea' },
          { text: 'Toast', link: '/docs/components/toast' },
          { text: 'Toggle', link: '/docs/components/toggle' },
          { text: 'ToggleGroup', link: '/docs/components/toggle-group' },
          { text: 'Tooltip', link: '/docs/components/tooltip' },
          { text: 'Tree', link: '/docs/components/tree', badge: 'wip' }
        ]
      }
    ]
  },
  vite: {
    // @ts-expect-error ignore type
    plugins: [unocss({ configFile: '../uno.config.ts' })],
    css: {
      postcss: {
        plugins: [postcssIsolateStyles({ includeFiles: [/vp-doc\.css/] })]
      }
    },
    server: {
      port: 1997,
      open: true,
      host: true
    }
  }
});
