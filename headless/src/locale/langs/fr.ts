import type { LocaleMessages } from '../types';

const fr: LocaleMessages = {
  pagination: {
    firstPage: 'Première page',
    prevPage: 'Page précédente',
    nextPage: 'Page suivante',
    lastPage: 'Dernière page'
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
    selectRow: 'Sélectionner la ligne {row}'
  },
  calendar: {
    prevPage: 'Page précédente',
    nextPage: 'Page suivante',
    selectMonth: 'Sélectionner un mois',
    selectYear: "Sélectionner l'année"
  },
  layout: {
    toggleSidebar: 'Basculer la barre latérale'
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
    step: 'Étape {step}'
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
    noResults: 'Aucun résultat trouvé.'
  },
  command: {
    noResults: 'Aucun résultat trouvé.'
  },
  dialog: {
    cancel: 'Annuler',
    confirm: 'Confirmer'
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
  }
};

export default fr;
