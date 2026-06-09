import type { LocaleMessages, LocaleRegistry } from '../types';

const messages: LocaleMessages = {
  pagination: {
    firstPage: 'Halaman pertama',
    prevPage: 'Halaman sebelumnya',
    nextPage: 'Halaman berikutnya',
    lastPage: 'Halaman terakhir'
  },
  table: {
    emptyTitle: 'Tidak ada data',
    emptyDescription: 'Tidak ada data yang dapat ditampilkan.',
    selectAllRows: 'Pilih semua baris',
    sortByColumn: 'Urutkan berdasarkan {column}',
    sortByColumnAsc: 'Urutkan berdasarkan {column}, saat ini menaik',
    sortByColumnDesc: 'Urutkan berdasarkan {column}, saat ini menurun',
    resizeColumn: 'Ubah ukuran kolom {column}',
    expandRow: 'Buka baris {row}',
    collapseRow: 'Tutup baris {row}',
    selectRow: 'Pilih baris {row}'
  },
  calendar: {
    prevPage: 'Halaman sebelumnya',
    nextPage: 'Halaman berikutnya',
    selectMonth: 'Pilih bulan',
    selectYear: 'Pilih tahun'
  },
  layout: {
    toggleSidebar: 'Alihkan bilah sisi'
  },
  inputNumber: {
    increment: 'Naikkan',
    decrement: 'Turunkan',
    clear: 'Hapus nilai'
  },
  textarea: {
    clear: 'Hapus area teks'
  },
  tagsInput: {
    addTag: 'Tambahkan tag',
    clear: 'Hapus tag'
  },
  progress: {
    loading: 'Memuat'
  },
  anchor: {
    nav: 'Navigasi jangkar'
  },
  breadcrumb: {
    nav: 'Breadcrumb'
  },
  stepper: {
    step: 'Langkah {step}'
  },
  editable: {
    cancel: 'Batal',
    edit: 'Edit',
    submit: 'Simpan'
  },
  combobox: {
    clearInput: 'Hapus input',
    noResults: 'Tidak ada hasil.',
    search: 'Cari',
    options: 'Opsi'
  },
  autocomplete: {
    toggleSuggestions: 'Alihkan saran',
    clearInput: 'Hapus input',
    noResults: 'Tidak ada hasil.'
  },
  command: {
    noResults: 'Tidak ada hasil.'
  },
  dialog: {
    cancel: 'Batal',
    confirm: 'Konfirmasi'
  },
  slider: {
    valueN: 'Nilai {index} dari {total}',
    minimum: 'Minimum',
    maximum: 'Maksimum'
  },
  password: {
    clearInput: 'Hapus input',
    showPassword: 'Tampilkan kata sandi',
    hidePassword: 'Sembunyikan kata sandi'
  },
  date: {
    daySegment: 'hari,',
    monthSegment: 'bulan,',
    yearSegment: 'tahun,',
    hourSegment: 'jam,',
    minuteSegment: 'menit,',
    secondSegment: 'detik,',
    dayPeriodSegment: 'AM/PM,',
    timeZoneSegment: 'zona waktu,',
    empty: 'Kosong',
    placeholder: {
      year: 'yyyy',
      month: 'mm',
      day: 'dd',
      time: '––'
    }
  }
};

const id: LocaleRegistry = {
  name: 'Bahasa Indonesia',
  key: 'id',
  dir: 'ltr',
  messages
};

export default id;
