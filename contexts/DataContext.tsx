import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ServiceSchedule, Sermon, NewsItem, DataContextType } from '../types';
import { SERVICE_SCHEDULES, RECENT_SERMONS, NEWS_ITEMS } from '../constants';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available, otherwise use constants
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

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('gkps_schedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    localStorage.setItem('gkps_sermons', JSON.stringify(sermons));
  }, [sermons]);

  useEffect(() => {
    localStorage.setItem('gkps_news', JSON.stringify(news));
  }, [news]);

  const addSermon = (newSermon: Sermon) => {
    setSermons([newSermon, ...sermons]);
  };

  const deleteSermon = (id: number) => {
    setSermons(sermons.filter(s => s.id !== id));
  };

  const addNews = (newNews: NewsItem) => {
    setNews([newNews, ...news]);
  };

  const deleteNews = (id: number) => {
    setNews(news.filter(n => n.id !== id));
  };

  const updateSchedule = (updatedSchedule: ServiceSchedule) => {
    setSchedules(schedules.map(s => s.id === updatedSchedule.id ? updatedSchedule : s));
  };

  return (
    <DataContext.Provider value={{ 
      schedules, sermons, news, 
      addSermon, deleteSermon, 
      addNews, deleteNews, 
      updateSchedule 
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