import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ServiceSchedule, Sermon, NewsItem, DataContextType, NavItem, HeroData, AboutData, ContactData } from '../types';
import { SERVICE_SCHEDULES, RECENT_SERMONS, NEWS_ITEMS, NAV_ITEMS, DEFAULT_HERO, DEFAULT_ABOUT, DEFAULT_CONTACT } from '../constants';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- EXISTING STATE ---
  const [schedules, setSchedules] = useState<ServiceSchedule[]>(() => {
    const saved = localStorage.getItem('gkps_schedules');
    return saved ? JSON.parse(saved) : SERVICE_SCHEDULES;
  });

  const [sermons, setSermons] = useState<Sermon[]>(() => {
    const saved = localStorage.getItem('gkps_sermons');
    return saved ? JSON.parse(saved) : RECENT_SERMONS;
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('gkps_news');
    return saved ? JSON.parse(saved) : NEWS_ITEMS;
  });

  const [navItems, setNavItems] = useState<NavItem[]>(() => {
    const saved = localStorage.getItem('gkps_nav_items');
    return saved ? JSON.parse(saved) : NAV_ITEMS;
  });

  // --- NEW STATE FOR PAGE CONTENT ---
  const [heroData, setHeroData] = useState<HeroData>(() => {
    const saved = localStorage.getItem('gkps_hero');
    return saved ? JSON.parse(saved) : DEFAULT_HERO;
  });

  const [aboutData, setAboutData] = useState<AboutData>(() => {
    const saved = localStorage.getItem('gkps_about');
    return saved ? JSON.parse(saved) : DEFAULT_ABOUT;
  });

  const [contactData, setContactData] = useState<ContactData>(() => {
    const saved = localStorage.getItem('gkps_contact');
    return saved ? JSON.parse(saved) : DEFAULT_CONTACT;
  });

  // --- EFFECTS FOR SAVING ---
  useEffect(() => localStorage.setItem('gkps_schedules', JSON.stringify(schedules)), [schedules]);
  useEffect(() => localStorage.setItem('gkps_sermons', JSON.stringify(sermons)), [sermons]);
  useEffect(() => localStorage.setItem('gkps_news', JSON.stringify(news)), [news]);
  useEffect(() => localStorage.setItem('gkps_nav_items', JSON.stringify(navItems)), [navItems]);
  
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

  const updateHeroData = (data: HeroData) => setHeroData(data);
  const updateAboutData = (data: AboutData) => setAboutData(data);
  const updateContactData = (data: ContactData) => setContactData(data);

  return (
    <DataContext.Provider value={{ 
      schedules, sermons, news, navItems, heroData, aboutData, contactData,
      addSermon, deleteSermon, 
      addNews, deleteNews, 
      addSchedule, deleteSchedule, updateSchedule,
      addNavItem, deleteNavItem, updateNavItem,
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