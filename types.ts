
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
  imageUrl?: string;
}

export interface CommunityGroup {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

// New Types for Page Content
export interface HeroData {
  welcomeText: string;
  title: string;
  subtitle: string;
  verseText: string;
  verseReference: string;
  bgImageUrl: string;
}

export interface AboutData {
  title: string;
  description: string;
  foundedYear: string;
  familyCount: string;
  imageUrl: string;
}

export interface ContactData {
  address: string;
  phone: string;
  email: string;
  dailyVerse: string;
  dailyVerseRef: string;
  footerTitle?: string;
  footerDescription?: string;
}

export type DataContextType = {
  schedules: ServiceSchedule[];
  sermons: Sermon[];
  news: NewsItem[];
  navItems: NavItem[];
  communityGroups: CommunityGroup[];
  heroData: HeroData;
  aboutData: AboutData;
  contactData: ContactData;
  
  addSermon: (sermon: Sermon) => void;
  deleteSermon: (id: number) => void;
  addNews: (news: NewsItem) => void;
  deleteNews: (id: number) => void;
  
  addSchedule: (schedule: ServiceSchedule) => void;
  deleteSchedule: (id: number) => void;
  updateSchedule: (schedule: ServiceSchedule) => void;
  
  addNavItem: (item: NavItem) => void;
  deleteNavItem: (index: number) => void;
  updateNavItem: (index: number, item: NavItem) => void;

  addCommunityGroup: (group: CommunityGroup) => void;
  deleteCommunityGroup: (id: number) => void;
  
  updateHeroData: (data: HeroData) => void;
  updateAboutData: (data: AboutData) => void;
  updateContactData: (data: ContactData) => void;
};
