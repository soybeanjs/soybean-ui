import { computed, inject } from 'vue';
import type { ComputedRef } from 'vue';
import { UI_CONFIG_PROVIDER_CONTEXT_KEY } from '../../constants';
import type { ConfigProviderContext } from '../config-provider/types';

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
    surfaceStyle: string;
    contrast: string;
    cssVars: string;
    reset: string;
  };
  /** Variant group labels (surfaces / hairlines / …). */
  groups: {
    surfaces: string;
    fills: string;
    hairlines: string;
    brand: string;
    sidebar: string;
    feedback: string;
    charts: string;
  };
  /** Variant token labels (background / card / primary / …). */
  variants: {
    background: string;
    surface: string;
    elevated: string;
    carbon: string;
    foreground: string;
    mutedForeground: string;
    foregroundSubtle: string;
    carbonForeground: string;
    muted: string;
    accent: string;
    accentForeground: string;
    secondary: string;
    secondaryForeground: string;
    border: string;
    borderStrong: string;
    input: string;
    ring: string;
    primary: string;
    primaryForeground: string;
    sidebarSurface: string;
    sidebarForeground: string;
    sidebarBorder: string;
    sidebarAccent: string;
    sidebarAccentForeground: string;
    sidebarPrimary: string;
    destructive: string;
    destructiveForeground: string;
    destructiveText: string;
    destructiveSubtle: string;
    destructiveBorder: string;
    success: string;
    successForeground: string;
    successText: string;
    successSubtle: string;
    successBorder: string;
    warning: string;
    warningForeground: string;
    warningText: string;
    warningSubtle: string;
    warningBorder: string;
    info: string;
    infoForeground: string;
    infoText: string;
    infoSubtle: string;
    infoBorder: string;
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
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
    surfaceStyle: {
      layered: string;
      flat: string;
    };
    contrast: {
      off: string;
      aa: string;
      aaa: string;
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
    surfaceStyle: 'Surface Style',
    contrast: 'Contrast Policy',
    cssVars: 'CSS Variable Theme',
    reset: 'Reset'
  },
  groups: {
    surfaces: 'Surfaces',
    fills: 'Fills',
    hairlines: 'Hairlines',
    brand: 'Brand',
    sidebar: 'Sidebar',
    feedback: 'Status',
    charts: 'Charts'
  },
  variants: {
    background: 'Background',
    surface: 'Surface',
    elevated: 'Elevated',
    carbon: 'Carbon',
    foreground: 'Foreground',
    mutedForeground: 'Muted Foreground',
    foregroundSubtle: 'Foreground Subtle',
    carbonForeground: 'Carbon Foreground',
    muted: 'Muted',
    accent: 'Accent',
    accentForeground: 'Accent Foreground',
    secondary: 'Secondary',
    secondaryForeground: 'Secondary Foreground',
    border: 'Border',
    borderStrong: 'Border Strong',
    input: 'Input',
    ring: 'Ring',
    primary: 'Primary',
    primaryForeground: 'Primary Foreground',
    sidebarSurface: 'Sidebar Surface',
    sidebarForeground: 'Sidebar Foreground',
    sidebarBorder: 'Sidebar Border',
    sidebarAccent: 'Sidebar Accent',
    sidebarAccentForeground: 'Sidebar Accent Foreground',
    sidebarPrimary: 'Sidebar Primary',
    destructive: 'Destructive',
    destructiveForeground: 'Destructive Foreground',
    destructiveText: 'Destructive Text',
    destructiveSubtle: 'Destructive Subtle',
    destructiveBorder: 'Destructive Border',
    success: 'Success',
    successForeground: 'Success Foreground',
    successText: 'Success Text',
    successSubtle: 'Success Subtle',
    successBorder: 'Success Border',
    warning: 'Warning',
    warningForeground: 'Warning Foreground',
    warningText: 'Warning Text',
    warningSubtle: 'Warning Subtle',
    warningBorder: 'Warning Border',
    info: 'Info',
    infoForeground: 'Info Foreground',
    infoText: 'Info Text',
    infoSubtle: 'Info Subtle',
    infoBorder: 'Info Border',
    chart1: 'Chart 1',
    chart2: 'Chart 2',
    chart3: 'Chart 3',
    chart4: 'Chart 4',
    chart5: 'Chart 5'
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
    },
    surfaceStyle: {
      layered: 'Layered',
      flat: 'Flat'
    },
    contrast: {
      off: 'Off',
      aa: 'AA',
      aaa: 'AAA'
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
    surfaceStyle: '表面风格',
    contrast: '对比度策略',
    cssVars: 'CSS变量主题',
    reset: '重置'
  },
  groups: {
    surfaces: '表面',
    fills: '填充',
    hairlines: '描边',
    brand: '品牌',
    sidebar: '侧边栏',
    feedback: '状态',
    charts: '图表'
  },
  variants: {
    background: '背景',
    surface: '容器面',
    elevated: '浮层面',
    carbon: '反相面',
    foreground: '前景文字',
    mutedForeground: '次要文字',
    foregroundSubtle: '三级文字',
    carbonForeground: '反相文字',
    muted: '弱化面',
    accent: '交互面',
    accentForeground: '交互面文字',
    secondary: '次级',
    secondaryForeground: '次级文字',
    border: '分隔线',
    borderStrong: '强调边界',
    input: '输入框边界',
    ring: '焦点环',
    primary: '主色',
    primaryForeground: '主色前景',
    sidebarSurface: '侧栏基底',
    sidebarForeground: '侧栏文字',
    sidebarBorder: '侧栏边界',
    sidebarAccent: '侧栏交互面',
    sidebarAccentForeground: '侧栏交互面文字',
    sidebarPrimary: '侧栏强调色',
    destructive: '危险',
    destructiveForeground: '危险前景',
    destructiveText: '危险文字',
    destructiveSubtle: '危险软底',
    destructiveBorder: '危险边框',
    success: '成功',
    successForeground: '成功前景',
    successText: '成功文字',
    successSubtle: '成功软底',
    successBorder: '成功边框',
    warning: '警告',
    warningForeground: '警告前景',
    warningText: '警告文字',
    warningSubtle: '警告软底',
    warningBorder: '警告边框',
    info: '信息',
    infoForeground: '信息前景',
    infoText: '信息文字',
    infoSubtle: '信息软底',
    infoBorder: '信息边框',
    chart1: '图表 1',
    chart2: '图表 2',
    chart3: '图表 3',
    chart4: '图表 4',
    chart5: '图表 5'
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
    },
    surfaceStyle: {
      layered: '层叠',
      flat: '扁平'
    },
    contrast: {
      off: '关闭',
      aa: 'AA',
      aaa: 'AAA'
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
  const config = inject<ConfigProviderContext>(UI_CONFIG_PROVIDER_CONTEXT_KEY);

  return computed(() => {
    const locale = config?.locale ?? 'en';

    return locale.startsWith('zh') ? themeLocaleZh : themeLocaleEn;
  });
}
