import { NavItem, ServiceSchedule, Sermon, NewsItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda', href: '#home' },
  { label: 'Tentang Kami', href: '#about' },
  { label: 'Jadwal Ibadah', href: '#schedule' },
  { label: 'Renungan', href: '#sermons' },
  { label: 'Warta Jemaat', href: '#news' },
  { label: 'Kontak', href: '#contact' },
];

export const SERVICE_SCHEDULES: ServiceSchedule[] = [
  {
    id: 1,
    name: 'Ibadah Umum I (Bahasa Indonesia)',
    time: '07:00 WIB',
    description: 'Ibadah pagi dengan liturgi GKPS berbahasa Indonesia.',
    category: 'Umum',
  },
  {
    id: 2,
    name: 'Ibadah Sekolah Minggu',
    time: '09:00 WIB',
    description: 'Ibadah untuk anak-anak TK hingga SD kelas 6.',
    category: 'Sekolah Minggu',
  },
  {
    id: 3,
    name: 'Ibadah Umum II (Bahasa Simalungun)',
    time: '10:00 WIB',
    description: 'Ibadah siang menggunakan bahasa dan liturgi Simalungun.',
    category: 'Umum',
  },
  {
    id: 4,
    name: 'Ibadah Pemuda (Naposo Bulung)',
    time: '17:00 WIB',
    description: 'Persekutuan pemuda dan remaja GKPS.',
    category: 'Pemuda',
  },
];

export const RECENT_SERMONS: Sermon[] = [
  {
    id: 1,
    title: "Hidup yang Berbuah bagi Kristus",
    preacher: "Pdt. J. Saragih, M.Th",
    date: "12 November 2023",
    bibleVerse: "Yohanes 15:1-8",
    summary: "Sebagai ranting-ranting Kristus, kita dipanggil bukan hanya untuk menempel, tetapi untuk menghasilkan buah yang nyata dalam kehidupan sehari-hari.",
    imageUrl: "https://picsum.photos/800/600?random=1"
  },
  {
    id: 2,
    title: "Kesetiaan dalam Perkara Kecil",
    preacher: "Pdt. R. Damanik, S.Th",
    date: "05 November 2023",
    bibleVerse: "Lukas 16:10",
    summary: "Tuhan menguji hati kita melalui tanggung jawab kecil. Integritas seorang Kristen terlihat saat tidak ada orang yang melihat.",
    imageUrl: "https://picsum.photos/800/600?random=2"
  },
  {
    id: 3,
    title: "Pengharapan di Tengah Badai",
    preacher: "Vic. A. Purba",
    date: "29 Oktober 2023",
    bibleVerse: "Ibrani 6:19",
    summary: "Pengharapan kita adalah sauh yang kuat dan aman, yang telah dilabuhkan sampai ke belakang tabir, di mana Yesus telah masuk.",
    imageUrl: "https://picsum.photos/800/600?random=3"
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    title: "Persiapan Natal Gabungan 2023",
    date: "15 November 2023",
    category: "Kegiatan",
    content: "Panitia Natal mengundang seluruh jemaat untuk hadir dalam rapat persiapan final pada hari Sabtu ini di Gedung Serbaguna."
  },
  {
    id: 2,
    title: "Aksi Sosial: Donor Darah",
    date: "10 November 2023",
    category: "Pelayanan",
    content: "GKPS Tangerang bekerja sama dengan PMI mengadakan donor darah. Mari berbagi kehidupan bagi sesama yang membutuhkan."
  },
  {
    id: 3,
    title: "Penerimaan Calon Sidi Baru",
    date: "01 November 2023",
    category: "Pengumuman",
    content: "Pendaftaran kelas katekisasi sidi tahun ajaran baru telah dibuka. Hubungi sekretariat gereja untuk formulir pendaftaran."
  }
];