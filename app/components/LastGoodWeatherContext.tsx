"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo
} from 'react';
import { StoredWeatherData } from '../lib/types'; 

interface LastGoodWeatherContextType {
  lastGoodData: StoredWeatherData | null;
  setLastGoodData: (data: StoredWeatherData | null) => void;
}

const LastGoodWeatherContext = createContext<LastGoodWeatherContextType | undefined>(undefined);

export const LastGoodWeatherProvider = ({ children }: { children: ReactNode }) => {
  const [staleData, setStaleData] = useState<StoredWeatherData | null>(null);

  const handleSetLastGoodData = useCallback((data: StoredWeatherData | null) => {
    if (data) {
      // Create a new object for the state to ensure React detects the change
      setStaleData({ ...data, timestamp: Date.now() });
    } else {
      setStaleData(null);
    }
  }, [setStaleData]);

  // Memoize the context value object itself.
  // This ensures that consumers of the context only re-render if staleData or
  // the memoized handleSetLastGoodData function reference actually changes.
  const contextValue = useMemo(() => ({
    lastGoodData: staleData,
    setLastGoodData: handleSetLastGoodData,
  }), [staleData, handleSetLastGoodData]);

  return (
    <LastGoodWeatherContext.Provider value={contextValue}>
      {children}
    </LastGoodWeatherContext.Provider>
  );
};

export const useLastGoodWeather = (): LastGoodWeatherContextType => {
  const context = useContext(LastGoodWeatherContext);
  if (context === undefined) {
    throw new Error('useLastGoodWeather must be used within a LastGoodWeatherProvider');
  }
  return context;
};
