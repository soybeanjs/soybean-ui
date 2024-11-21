import { defineConfigWithTheme } from 'vitepress';
import unocss from 'unocss/vite';
import { version } from '../package.json';
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
      { value: 'docs', label: 'Docs', link: '/docs/overview/getting-started' },
      { value: 'examples', label: 'Examples', link: '/examples/checkbox-group' },
      {
        value: 'version',
        label: `v${version}`,
        items: [
          {
            value: 'release-notes',
            label: 'Release Notes',
            link: 'https://github.com/soybeanjs/soybean-ui/releases'
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
        link: '/docs/components/',
        items: [
          {
            text: 'Basic Components',
            items: [{ text: 'Button', link: '/components/button' }]
          },
          {
            text: 'Layout Components',
            items: [
              { text: 'Separator', link: '/components/separator' },
              { text: 'AspectRatio', link: '/components/aspect-ratio' },
              { text: 'ScrollArea', link: '/components/scroll-area' }
            ]
          },
          {
            text: 'Display Components',
            items: [{ text: 'Card', link: '/components/card' }]
          },
          {
            text: 'Data Display Components',
            items: [
              { text: 'Avatar', link: '/components/avatar' },
              { text: 'Badge', link: '/components/badge' },
              { text: 'Chip', link: '/components/chip' },
              { text: 'KeyboardKey', link: '/components/keyboard-key' }
            ]
          },
          {
            text: 'Navigation Components',
            items: [
              { text: 'Breadcrumb', link: '/components/breadcrumb' },
              { text: 'Pagination', link: '/components/pagination' },
              { text: 'Tabs', link: '/components/tabs' }
            ]
          },
          {
            text: 'Feedback Components',
            items: [
              { text: 'Alert', link: '/components/alert' },
              { text: 'Progress', link: '/components/progress' },
              { text: 'Sonner', link: '/components/sonner' }
            ]
          },
          {
            text: 'Popup & Overlay',
            items: [
              { text: 'AlertDialog', link: '/components/alert-dialog' },
              { text: 'Dialog', link: '/components/dialog' },
              { text: 'Drawer', link: '/components/drawer' },
              { text: 'DropdownMenu', link: '/components/dropdown-menu' }
            ]
          },
          {
            text: 'Form',
            items: [
              { text: 'Checkbox', link: '/components/checkbox' },
              { text: 'Form', link: '/components/form' },
              { text: 'Input', link: '/components/input' },
              { text: 'PinInput', link: '/components/pin-input' },
              { text: 'Radio', link: '/components/radio' },
              { text: 'Select', link: '/components/select' },
              { text: 'Segment', link: '/components/segment' },
              { text: 'Switch', link: '/components/switch' },
              { text: 'Textarea', link: '/components/textarea' },
              { text: 'Toggle', link: '/components/toggle' },
              { text: 'ToggleGroup', link: '/components/toggle-group' }
            ]
          }
        ]
      }
    ]
  },
  vite: {
    plugins: [unocss()]
  }
});
