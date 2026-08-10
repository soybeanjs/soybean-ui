import type { LocaleMessages, LocaleRegistry } from '../types';

const messages: LocaleMessages = {
  pagination: {
    firstPage: 'Première page',
    prevPage: 'Page précédente',
    nextPage: 'Page suivante',
    lastPage: 'Dernière page',
    pageLabel: 'Page {value}'
  },
  pageTabs: {
    closeTab: "Fermer l'onglet",
    pinTab: "Épingler l'onglet",
    unpinTab: "Désépingler l'onglet"
  },
  table: {
    emptyTitle: 'Pas de données',
    emptyDescription: "Il n'y a pas de données à afficher.",
    selectAllRows: 'Sélectionner toutes les lignes',
    sortByColumn: 'Trier par {column}',
    sortByColumnAsc: 'Trier par {column}, actuellement par ordre croissant',
    sortByColumnDesc: 'Trier par {column}, actuellement par ordre décroissant',
    resizeColumn: 'Redimensionner la colonne {column}',
    expandRow: 'Développer la ligne {row}',
    collapseRow: 'Réduire la ligne {row}',
    selectRow: 'Sélectionner la ligne {row}',
    filterSelected: '{count} sélectionné(s)',
    filterKeywordActive: 'Mot-clé actif',
    filterOptionsCount: '{count} options',
    filterNoOptions: 'Aucune option de filtre',
    filterEdit: 'Modifier le filtre pour {column}',
    filter: 'Filtrer {column}',
    filterSearch: 'Rechercher les options de filtre pour {column}',
    filterNoMatching: 'Aucune option correspondante',
    filterClear: 'Effacer',
    filterSelect: 'Sélectionner {label}',
    filterSearchPlaceholder: 'Rechercher {column}'
  },
  calendar: {
    prevPage: 'Page précédente',
    nextPage: 'Page suivante',
    selectMonth: 'Sélectionner un mois',
    selectYear: "Sélectionner l'année"
  },
  datePicker: {
    toggle: 'Ouvrir le calendrier',
    popupLabel: 'Choisir une date'
  },
  dateRangePicker: {
    toggle: 'Ouvrir le calendrier',
    popupLabel: 'Choisir une plage de dates'
  },
  cascader: {
    clear: 'Effacer',
    noResults: 'Pas de données',
    removeTag: 'Supprimer {label}',
    search: 'Rechercher'
  },
  clipboard: {
    copy: 'Copier',
    copied: 'Copié'
  },
  layout: {
    toggleSidebar: 'Basculer la barre latérale'
  },
  input: {
    clear: 'Effacer la saisie'
  },
  inputNumber: {
    increment: 'Augmenter',
    decrement: 'Diminuer',
    clear: 'Effacer la valeur'
  },
  textarea: {
    clear: 'Effacer la zone de texte'
  },
  tagsInput: {
    addTag: 'Ajouter une balise',
    clear: 'Effacer les balises'
  },
  treeMenu: {
    openActions: 'Ouvrir les actions de {label}'
  },
  progress: {
    loading: 'Chargement'
  },
  anchor: {
    nav: "Navigation d'ancrage"
  },
  breadcrumb: {
    nav: "Fil d'Ariane"
  },
  stepper: {
    step: 'Étape {step}',
    ariaLabel: 'Progression par étapes',
    stepOf: 'Étape {current} sur {total}'
  },
  editable: {
    cancel: 'Annuler',
    edit: 'Modifier',
    submit: 'Soumettre'
  },
  combobox: {
    clearInput: 'Effacer la saisie',
    noResults: 'Aucun résultat trouvé.',
    search: 'Rechercher',
    options: 'Options'
  },
  autocomplete: {
    toggleSuggestions: 'Basculer les suggestions',
    clearInput: 'Effacer la saisie',
    noResults: 'Aucun résultat trouvé.',
    options: 'Options'
  },
  command: {
    noResults: 'Aucun résultat trouvé.'
  },
  dialog: {
    cancel: 'Annuler',
    confirm: 'Confirmer'
  },
  rating: {
    ariaLabel: 'Évaluation',
    starN: '{count} sur {max} étoiles',
    empty: 'Aucune évaluation'
  },
  slider: {
    valueN: 'Valeur {index} sur {total}',
    minimum: 'Minimum',
    maximum: 'Maximum'
  },
  password: {
    clearInput: 'Effacer la saisie',
    showPassword: 'Afficher le mot de passe',
    hidePassword: 'Masquer le mot de passe'
  },
  date: {
    daySegment: 'jour,',
    monthSegment: 'mois,',
    yearSegment: 'année,',
    hourSegment: 'heure,',
    minuteSegment: 'minute,',
    secondSegment: 'seconde,',
    dayPeriodSegment: 'AM/PM,',
    timeZoneSegment: 'fuseau horaire,',
    empty: 'Vide',
    placeholder: {
      year: 'yyyy',
      month: 'mm',
      day: 'dd',
      time: '––'
    }
  },
  themeCustomizer: {
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
      menuColor: 'Menu Color',
      menuAccent: 'Menu Accent',
      savePresetPlaceholder: 'Enter preset name',
      save: 'Save',
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
      },
      menuColor: {
        default: 'Default',
        inverted: 'Inverted',
        defaultTranslucent: 'Default Translucent',
        invertedTranslucent: 'Inverted Translucent'
      },
      menuAccent: {
        subtle: 'Subtle',
        bold: 'Bold'
      }
    }
  }
};

const fr: LocaleRegistry = {
  name: 'Français',
  key: 'fr',
  dir: 'ltr',
  messages
};

export default fr;
