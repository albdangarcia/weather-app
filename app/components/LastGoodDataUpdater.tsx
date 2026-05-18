"use client";

import { useEffect } from 'react';
import { StoredWeatherData, ProcessedDailyForecast, HourlyForecastType, observationListType } from '../lib/types';
import { useLastGoodWeather } from './LastGoodWeatherContext';

interface LastGoodDataUpdaterProps {
  dailyForecasts: ProcessedDailyForecast[];
  hourlyForecast: HourlyForecastType[];
  observationList: observationListType[];
  cityName: string;
}

export default function LastGoodDataUpdater({
  dailyForecasts,
  hourlyForecast,
  observationList,
  cityName,
}: LastGoodDataUpdaterProps) {
  const { setLastGoodData } = useLastGoodWeather();

  useEffect(() => {
    if (dailyForecasts && hourlyForecast && observationList && cityName) {
      const dataToStore: StoredWeatherData = {
        dailyForecasts,
        hourlyForecast,
        observationList,
        cityName,
      };
      setLastGoodData(dataToStore);
    }
  }, [dailyForecasts, hourlyForecast, observationList, cityName, setLastGoodData]);

  return null;
}
