import type { LocaleMessages, LocaleRegistry } from '../types';

const messages: LocaleMessages = {
  pagination: {
    firstPage: 'İlk sayfa',
    prevPage: 'Önceki sayfa',
    nextPage: 'Sonraki sayfa',
    lastPage: 'Son sayfa'
  },
  table: {
    emptyTitle: 'Veri yok',
    emptyDescription: 'Gösterilecek veri yok.',
    selectAllRows: 'Tüm satırları seç',
    sortByColumn: '{column} sütununa göre sırala',
    sortByColumnAsc: '{column} sütununa göre sırala, şu anda artan',
    sortByColumnDesc: '{column} sütununa göre sırala, şu anda azalan',
    resizeColumn: '{column} sütununu yeniden boyutlandır',
    expandRow: '{row} satırını genişlet',
    collapseRow: '{row} satırını daralt',
    selectRow: '{row} satırını seç'
  },
  calendar: {
    prevPage: 'Önceki sayfa',
    nextPage: 'Sonraki sayfa',
    selectMonth: 'Ay seç',
    selectYear: 'Yıl seç'
  },
  layout: {
    toggleSidebar: 'Yan çubuğu aç veya kapat'
  },
  inputNumber: {
    increment: 'Artır',
    decrement: 'Azalt',
    clear: 'Değeri temizle'
  },
  textarea: {
    clear: 'Metin alanını temizle'
  },
  tagsInput: {
    addTag: 'Etiket ekle',
    clear: 'Etiketleri temizle'
  },
  progress: {
    loading: 'Yükleniyor'
  },
  anchor: {
    nav: 'Çapa gezinmesi'
  },
  breadcrumb: {
    nav: 'Gezinti yolu'
  },
  stepper: {
    step: 'Adım {step}'
  },
  editable: {
    cancel: 'İptal',
    edit: 'Düzenle',
    submit: 'Kaydet'
  },
  combobox: {
    clearInput: 'Girdiyi temizle',
    noResults: 'Sonuç bulunamadı.',
    search: 'Ara',
    options: 'Seçenekler'
  },
  autocomplete: {
    toggleSuggestions: 'Önerileri aç veya kapat',
    clearInput: 'Girdiyi temizle',
    noResults: 'Sonuç bulunamadı.'
  },
  command: {
    noResults: 'Sonuç bulunamadı.'
  },
  dialog: {
    cancel: 'İptal',
    confirm: 'Onayla'
  },
  slider: {
    valueN: '{total} değerden {index}. değer',
    minimum: 'Minimum',
    maximum: 'Maksimum'
  },
  password: {
    clearInput: 'Girdiyi temizle',
    showPassword: 'Parolayı göster',
    hidePassword: 'Parolayı gizle'
  },
  date: {
    daySegment: 'gün,',
    monthSegment: 'ay,',
    yearSegment: 'yıl,',
    hourSegment: 'saat,',
    minuteSegment: 'dakika,',
    secondSegment: 'saniye,',
    dayPeriodSegment: 'ÖÖ/ÖS,',
    timeZoneSegment: 'saat dilimi,',
    empty: 'Boş',
    placeholder: {
      year: 'yyyy',
      month: 'mm',
      day: 'dd',
      time: '––'
    }
  }
};

const tr: LocaleRegistry = {
  name: 'Türkçe',
  key: 'tr',
  dir: 'ltr',
  messages
};

export default tr;
