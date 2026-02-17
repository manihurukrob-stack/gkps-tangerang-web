import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ServiceSchedule, Sermon, NewsItem, DataContextType } from '../types';
import { SERVICE_SCHEDULES, RECENT_SERMONS, NEWS_ITEMS } from '../constants';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [schedules, setSchedules] = useState<ServiceSchedule[]>(SERVICE_SCHEDULES);
  const [sermons, setSermons] = useState<Sermon[]>(RECENT_SERMONS);
  const [news, setNews] = useState<NewsItem[]>(NEWS_ITEMS);

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