
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ServiceSchedule, Sermon, NewsItem, DataContextType, NavItem, HeroData, AboutData, ContactData, CommunityGroup, User } from '../types';
import { 
  SERVICE_SCHEDULES, RECENT_SERMONS, NEWS_ITEMS, NAV_ITEMS, 
  DEFAULT_HERO, DEFAULT_ABOUT, DEFAULT_CONTACT, COMMUNITY_GROUPS, 
  DEFAULT_USERS, APP_VERSION 
} from '../constants';

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper untuk load data yang aman terhadap versi
const initializeState = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  
  const storedVersion = localStorage.getItem('gkps_version');
  // Jika versi beda, jangan pakai data lokal (return default)
  if (storedVersion !== APP_VERSION) {
    return defaultValue; 
  }
  
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Update versi saat mount
  useEffect(() => {
    const storedVersion = localStorage.getItem('gkps_version');
    if (storedVersion !== APP_VERSION) {
      // Bersihkan data lama jika versi berubah
      localStorage.removeItem('gkps_schedules');
      localStorage.removeItem('gkps_sermons');
      localStorage.removeItem('gkps_news');
      localStorage.removeItem('gkps_nav_items');
      localStorage.removeItem('gkps_community');
      localStorage.removeItem('gkps_users');
      localStorage.removeItem('gkps_hero');
      localStorage.removeItem('gkps_about');
      localStorage.removeItem('gkps_contact');
      
      localStorage.setItem('gkps_version', APP_VERSION);
      // Data sudah di-reset via initializeState logic saat render awal
    }
  }, []);

  // --- STATE ---
  // Menggunakan initializeState agar otomatis pakai Default jika versi baru
  const [schedules, setSchedules] = useState<ServiceSchedule[]>(() => initializeState('gkps_schedules', SERVICE_SCHEDULES));
  const [sermons, setSermons] = useState<Sermon[]>(() => initializeState('gkps_sermons', RECENT_SERMONS));
  const [news, setNews] = useState<NewsItem[]>(() => initializeState('gkps_news', NEWS_ITEMS));
  const [navItems, setNavItems] = useState<NavItem[]>(() => initializeState('gkps_nav_items', NAV_ITEMS));
  const [communityGroups, setCommunityGroups] = useState<CommunityGroup[]>(() => initializeState('gkps_community', COMMUNITY_GROUPS));
  const [users, setUsers] = useState<User[]>(() => initializeState('gkps_users', DEFAULT_USERS));
  const [heroData, setHeroData] = useState<HeroData>(() => initializeState('gkps_hero', DEFAULT_HERO));
  const [aboutData, setAboutData] = useState<AboutData>(() => initializeState('gkps_about', DEFAULT_ABOUT));
  const [contactData, setContactData] = useState<ContactData>(() => initializeState('gkps_contact', DEFAULT_CONTACT));

  // --- EFFECTS FOR SAVING ---
  useEffect(() => localStorage.setItem('gkps_schedules', JSON.stringify(schedules)), [schedules]);
  useEffect(() => localStorage.setItem('gkps_sermons', JSON.stringify(sermons)), [sermons]);
  useEffect(() => localStorage.setItem('gkps_news', JSON.stringify(news)), [news]);
  useEffect(() => localStorage.setItem('gkps_nav_items', JSON.stringify(navItems)), [navItems]);
  useEffect(() => localStorage.setItem('gkps_community', JSON.stringify(communityGroups)), [communityGroups]);
  useEffect(() => localStorage.setItem('gkps_users', JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem('gkps_hero', JSON.stringify(heroData)), [heroData]);
  useEffect(() => localStorage.setItem('gkps_about', JSON.stringify(aboutData)), [aboutData]);
  useEffect(() => localStorage.setItem('gkps_contact', JSON.stringify(contactData)), [contactData]);

  // --- FUNCTIONS ---
  const addSermon = (newSermon: Sermon) => setSermons([newSermon, ...sermons]);
  const deleteSermon = (id: number) => setSermons(sermons.filter(s => s.id !== id));

  const addNews = (newNews: NewsItem) => setNews([newNews, ...news]);
  const deleteNews = (id: number) => setNews(news.filter(n => n.id !== id));

  const addSchedule = (schedule: ServiceSchedule) => setSchedules([...schedules, schedule]);
  const deleteSchedule = (id: number) => setSchedules(schedules.filter(s => s.id !== id));
  const updateSchedule = (updatedSchedule: ServiceSchedule) => {
    setSchedules(schedules.map(s => s.id === updatedSchedule.id ? updatedSchedule : s));
  };

  const addNavItem = (item: NavItem) => setNavItems([...navItems, item]);
  const deleteNavItem = (index: number) => {
    const newItems = [...navItems];
    newItems.splice(index, 1);
    setNavItems(newItems);
  };
  const updateNavItem = (index: number, item: NavItem) => {
    const newItems = [...navItems];
    newItems[index] = item;
    setNavItems(newItems);
  };

  const addCommunityGroup = (group: CommunityGroup) => setCommunityGroups([...communityGroups, group]);
  const updateCommunityGroup = (updatedGroup: CommunityGroup) => {
    setCommunityGroups(communityGroups.map(g => g.id === updatedGroup.id ? updatedGroup : g));
  };
  const deleteCommunityGroup = (id: number) => setCommunityGroups(communityGroups.filter(g => g.id !== id));

  const addUser = (user: User) => setUsers([...users, user]);
  const updateUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
  };
  const deleteUser = (id: number) => setUsers(users.filter(u => u.id !== id));

  const updateHeroData = (data: HeroData) => setHeroData(data);
  const updateAboutData = (data: AboutData) => setAboutData(data);
  const updateContactData = (data: ContactData) => setContactData(data);

  return (
    <DataContext.Provider value={{ 
      schedules, sermons, news, navItems, communityGroups, users, heroData, aboutData, contactData,
      addSermon, deleteSermon, 
      addNews, deleteNews, 
      addSchedule, deleteSchedule, updateSchedule,
      addNavItem, deleteNavItem, updateNavItem,
      addCommunityGroup, updateCommunityGroup, deleteCommunityGroup,
      addUser, updateUser, deleteUser,
      updateHeroData, updateAboutData, updateContactData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
