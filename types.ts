export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceSchedule {
  id: number;
  name: string;
  time: string;
  description: string;
  category: 'Umum' | 'Sekolah Minggu' | 'Pemuda' | 'Wanita' | 'Bapak';
}

export interface Sermon {
  id: number;
  title: string;
  preacher: string;
  date: string;
  bibleVerse: string;
  summary: string;
  imageUrl: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
}

export type DataContextType = {
  schedules: ServiceSchedule[];
  sermons: Sermon[];
  news: NewsItem[];
  addSermon: (sermon: Sermon) => void;
  deleteSermon: (id: number) => void;
  addNews: (news: NewsItem) => void;
  deleteNews: (id: number) => void;
  updateSchedule: (schedule: ServiceSchedule) => void;
};