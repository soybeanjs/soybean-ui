import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import { useConfigProvider } from '../config-provider/context';

/**
 * Shared UI-layer locale messages for the theme components (`ThemeCustomizer`,
 * `ThemeModeSelect` and `PalettePicker`).
 *
 * Only Simplified Chinese (`zh`) and English are supported: a Chinese UI locale
 * renders the `zh` labels, every other locale falls back to English.
 */
export interface ThemeLocaleMessages {
  /** Section and control labels (mode / palette / base / radius / …). */
  sections: {
    mode: string;
    palette: string;
    base: string;
    primary: string;
    radius: string;
    size: string;
    scheme: string;
    feedback: string;
    chart: string;
    sidebar: string;
    advanced: string;
    theme: string;
    custom: string;
    menu: string;
    levels: string;
    lightLevel: string;
    darkLevel: string;
    borderOpacity: string;
    cssVars: string;
    reset: string;
  };
  /** Variant group labels (surfaces / hairlines / …). */
  groups: {
    surfaces: string;
    palette: string;
    hairlines: string;
    sidebar: string;
    charts: string;
    feedback: string;
  };
  /** Variant token labels (background / card / primary / …). */
  variants: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    ring: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    input: string;
    sidebar: string;
    sidebarForeground: string;
    sidebarPrimary: string;
    sidebarPrimaryForeground: string;
    sidebarAccent: string;
    sidebarAccentForeground: string;
    sidebarBorder: string;
    sidebarRing: string;
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
    destructive: string;
    destructiveForeground: string;
    success: string;
    successForeground: string;
    warning: string;
    warningForeground: string;
    info: string;
    infoForeground: string;
    carbon: string;
    carbonForeground: string;
  };
  /** Select option labels (feedback / chart / sidebar schemes and menu settings). */
  options: {
    mode: {
      auto: string;
      light: string;
      dark: string;
    };
    level: {
      lightness: string;
      darkness: string;
    };
    size: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xl2: string;
    };
    palette: {
      slate: string;
      mist: string;
      gray: string;
      zinc: string;
      neutral: string;
      stone: string;
      taupe: string;
      olive: string;
      mauve: string;
      red: string;
      orange: string;
      amber: string;
      yellow: string;
      lime: string;
      green: string;
      emerald: string;
      teal: string;
      cyan: string;
      sky: string;
      blue: string;
      indigo: string;
      violet: string;
      purple: string;
      fuchsia: string;
      pink: string;
      rose: string;
    };
    feedback: {
      classic: string;
      vivid: string;
      subtle: string;
      modern: string;
      professional: string;
    };
    chart: {
      vivid: string;
      cool: string;
      warm: string;
      natural: string;
      minimal: string;
    };
    sidebar: {
      derived: string;
      invertedDark: string;
      soft: string;
      contrast: string;
    };
  };
  /** Labels used by the `PalettePicker` component. */
  palettePicker: {
    /** Label for the custom color option. */
    custom: string;
    /** Label for the recommended palette switch. */
    recommendedPalette: string;
    /** Labels for the simple palette keys (inherit / current / transparent / black / white). */
    simpleKeys: {
      inherit: string;
      current: string;
      transparent: string;
      black: string;
      white: string;
    };
  };
}

const themeLocaleEn: ThemeLocaleMessages = {
  sections: {
    mode: 'Mode',
    palette: 'Palette',
    base: 'Base',
    primary: 'Primary',
    radius: 'Radius',
    size: 'Size',
    scheme: 'Scheme',
    feedback: 'Feedback',
    chart: 'Chart',
    sidebar: 'Sidebar',
    advanced: 'Advanced',
    theme: 'Theme',
    custom: 'Custom',
    menu: 'Menu',
    levels: 'Levels',
    lightLevel: 'Light Level',
    darkLevel: 'Dark Level',
    borderOpacity: 'Border Opacity',
    cssVars: 'CSS Variable Theme',
    reset: 'Reset'
  },
  groups: {
    surfaces: 'Surfaces',
    palette: 'Palette',
    hairlines: 'Hairlines',
    sidebar: 'Sidebar',
    charts: 'Charts',
    feedback: 'Feedback'
  },
  variants: {
    background: 'Background',
    foreground: 'Foreground',
    card: 'Card',
    cardForeground: 'Card Foreground',
    popover: 'Popover',
    popoverForeground: 'Popover Foreground',
    primary: 'Primary',
    primaryForeground: 'Primary Foreground',
    ring: 'Ring',
    secondary: 'Secondary',
    secondaryForeground: 'Secondary Foreground',
    muted: 'Muted',
    mutedForeground: 'Muted Foreground',
    accent: 'Accent',
    accentForeground: 'Accent Foreground',
    border: 'Border',
    input: 'Input',
    sidebar: 'Sidebar',
    sidebarForeground: 'Sidebar Foreground',
    sidebarPrimary: 'Sidebar Primary',
    sidebarPrimaryForeground: 'Sidebar Primary Foreground',
    sidebarAccent: 'Sidebar Accent',
    sidebarAccentForeground: 'Sidebar Accent Foreground',
    sidebarBorder: 'Sidebar Border',
    sidebarRing: 'Sidebar Ring',
    chart1: 'Chart 1',
    chart2: 'Chart 2',
    chart3: 'Chart 3',
    chart4: 'Chart 4',
    chart5: 'Chart 5',
    destructive: 'Destructive',
    destructiveForeground: 'Destructive Foreground',
    success: 'Success',
    successForeground: 'Success Foreground',
    warning: 'Warning',
    warningForeground: 'Warning Foreground',
    info: 'Info',
    infoForeground: 'Info Foreground',
    carbon: 'Carbon',
    carbonForeground: 'Carbon Foreground'
  },
  options: {
    mode: {
      auto: 'Auto',
      light: 'Light',
      dark: 'Dark'
    },
    level: {
      lightness: 'Lightness',
      darkness: 'Darkness'
    },
    size: {
      xs: 'XS',
      sm: 'SM',
      md: 'MD',
      lg: 'LG',
      xl: 'XL',
      xl2: '2XL'
    },
    palette: {
      slate: 'Slate',
      mist: 'Mist',
      gray: 'Gray',
      zinc: 'Zinc',
      neutral: 'Neutral',
      stone: 'Stone',
      taupe: 'Taupe',
      olive: 'Olive',
      mauve: 'Mauve',
      red: 'Red',
      orange: 'Orange',
      amber: 'Amber',
      yellow: 'Yellow',
      lime: 'Lime',
      green: 'Green',
      emerald: 'Emerald',
      teal: 'Teal',
      cyan: 'Cyan',
      sky: 'Sky',
      blue: 'Blue',
      indigo: 'Indigo',
      violet: 'Violet',
      purple: 'Purple',
      fuchsia: 'Fuchsia',
      pink: 'Pink',
      rose: 'Rose'
    },
    feedback: {
      classic: 'Classic',
      vivid: 'Vivid',
      subtle: 'Subtle',
      modern: 'Modern',
      professional: 'Professional'
    },
    chart: {
      vivid: 'Vivid',
      cool: 'Cool',
      warm: 'Warm',
      natural: 'Natural',
      minimal: 'Minimal'
    },
    sidebar: {
      derived: 'Derived',
      invertedDark: 'Inverted Dark',
      soft: 'Soft',
      contrast: 'Contrast'
    }
  },
  palettePicker: {
    custom: 'Custom',
    recommendedPalette: 'Recommended palette',
    simpleKeys: {
      inherit: 'Inherit',
      current: 'Current',
      transparent: 'Transparent',
      black: 'Black',
      white: 'White'
    }
  }
};

const themeLocaleZh: ThemeLocaleMessages = {
  sections: {
    mode: '模式',
    palette: '调色板',
    base: '基础色',
    primary: '主色',
    radius: '圆角',
    size: '尺寸',
    scheme: '配色方案',
    feedback: '反馈',
    chart: '图表',
    sidebar: '侧边栏',
    advanced: '高级',
    theme: '主题',
    custom: '自定义',
    menu: '菜单',
    levels: '层级',
    lightLevel: '浅色层级',
    darkLevel: '深色层级',
    borderOpacity: '边框透明度',
    cssVars: 'CSS变量主题',
    reset: '重置'
  },
  groups: {
    surfaces: '表面',
    palette: '调色板',
    hairlines: '描边',
    sidebar: '侧边栏',
    charts: '图表',
    feedback: '反馈'
  },
  variants: {
    background: '背景',
    foreground: '前景',
    card: '卡片',
    cardForeground: '卡片前景',
    popover: '浮层',
    popoverForeground: '浮层前景',
    primary: '主色',
    primaryForeground: '主色前景',
    ring: '焦点环',
    secondary: '次要',
    secondaryForeground: '次要前景',
    muted: '弱化',
    mutedForeground: '弱化前景',
    accent: '强调',
    accentForeground: '强调前景',
    border: '边框',
    input: '输入框',
    sidebar: '侧边栏',
    sidebarForeground: '侧边栏前景',
    sidebarPrimary: '侧边栏主色',
    sidebarPrimaryForeground: '侧边栏主色前景',
    sidebarAccent: '侧边栏强调',
    sidebarAccentForeground: '侧边栏强调前景',
    sidebarBorder: '侧边栏边框',
    sidebarRing: '侧边栏焦点环',
    chart1: '图表 1',
    chart2: '图表 2',
    chart3: '图表 3',
    chart4: '图表 4',
    chart5: '图表 5',
    destructive: '危险',
    destructiveForeground: '危险前景',
    success: '成功',
    successForeground: '成功前景',
    warning: '警告',
    warningForeground: '警告前景',
    info: '信息',
    infoForeground: '信息前景',
    carbon: '炭黑',
    carbonForeground: '炭黑前景'
  },
  options: {
    mode: {
      auto: '自动',
      light: '浅色',
      dark: '深色'
    },
    level: {
      lightness: '亮度',
      darkness: '暗度'
    },
    size: {
      xs: '特小',
      sm: '小',
      md: '中',
      lg: '大',
      xl: '特大',
      xl2: '超大'
    },
    palette: {
      slate: '石板灰',
      mist: '雾灰',
      gray: '灰',
      zinc: '锌',
      neutral: '中性',
      stone: '石色',
      taupe: '灰褐',
      olive: '橄榄',
      mauve: '紫红',
      red: '红',
      orange: '橙',
      amber: '琥珀',
      yellow: '黄',
      lime: '青柠',
      green: '绿',
      emerald: '翠绿',
      teal: '青',
      cyan: '青蓝',
      sky: '天蓝',
      blue: '蓝',
      indigo: '靛蓝',
      violet: '紫罗兰',
      purple: '紫',
      fuchsia: '品红',
      pink: '粉',
      rose: '玫红'
    },
    feedback: {
      classic: '经典',
      vivid: '鲜明',
      subtle: '柔和',
      modern: '现代',
      professional: '专业'
    },
    chart: {
      vivid: '鲜明',
      cool: '冷色',
      warm: '暖色',
      natural: '自然',
      minimal: '极简'
    },
    sidebar: {
      derived: '派生',
      invertedDark: '反转深色',
      soft: '柔和',
      contrast: '高对比'
    }
  },
  palettePicker: {
    custom: '自定义',
    recommendedPalette: '推荐色板',
    simpleKeys: {
      inherit: '继承',
      current: '当前',
      transparent: '透明',
      black: '黑色',
      white: '白色'
    }
  }
};

/**
 * Resolve the shared theme locale messages for the current UI locale.
 *
 * Chinese (`zh`-prefixed) locales use the `zh` labels; every other locale
 * (including the default `en`) falls back to English.
 */
export function useThemeLocale(): ComputedRef<ThemeLocaleMessages> {
  const config = useConfigProvider();

  return computed(() => {
    const locale = config?.locale ?? 'en';

    return locale.startsWith('zh') ? themeLocaleZh : themeLocaleEn;
  });
}
