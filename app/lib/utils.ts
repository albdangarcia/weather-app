import { cities } from "./constants";
import { DateTime } from "luxon";
import {
  CoordinatesTypes,
  DailyForecastType,
  ProcessedDailyForecast,
} from "./types";

// Function to convert pressure from Pascals to inches of mercury
export const pascalToInHg = (pascals: number): number => {
  return Math.round(pascals * 0.0002953);
};

// Function to convert meters to miles
export const metersToMiles = (meters: number): number => {
  return Math.round(meters * 0.000621371 * 100) / 100; // Round to 2 decimal places
};

// Function to process daily forecasts
export const processDailyForecasts = (
  periods: DailyForecastType[]
): ProcessedDailyForecast[] => {
  const processedForecasts: ProcessedDailyForecast[] = [];

  if (!periods || periods.length === 0) return processedForecasts;

  let alignedPeriods = [...periods];

  if (!alignedPeriods[0].isDaytime) {
    // This drops "Tonight" so the array cleanly starts with "Tomorrow"
    alignedPeriods = alignedPeriods.slice(1); 
  }

  for (let i = 0; i < alignedPeriods.length; i += 2) {
    const dayPeriod = alignedPeriods[i];
    const nightPeriod = alignedPeriods[i + 1];

    if (!dayPeriod) continue;

    const day = dayPeriod.name.split(" ")[0].slice(0, 3);

    const high = nightPeriod
      ? Math.max(dayPeriod.temperature, nightPeriod.temperature)
      : dayPeriod.temperature;
    const low = nightPeriod
      ? Math.min(dayPeriod.temperature, nightPeriod.temperature)
      : dayPeriod.temperature;

    processedForecasts.push({
      day,
      shortForecast: dayPeriod.shortForecast,
      detailedForecast: dayPeriod.detailedForecast,
      isDaytime: dayPeriod.isDaytime,
      high,
      low,
    });
  }

  return processedForecasts;
};

// Function to get city by coordinates
export const getCityByCoordinates = (coords: CoordinatesTypes): string => {
  const latToSearch = coords.latitude || "40.7128";
  const longToSearch = coords.longitude || "-74.006";

  for (const cityObj of cities) {
    if (cityObj.lat === latToSearch && cityObj.long === longToSearch) {
      return cityObj.city;
    }
  }

  return "New York";
};

// Formats an ISO time string to a 12-hour time format (e.g., "8 AM", "11 AM") while preserving the original time zone.
export const formatTimeOriginalZone = (startTime: string): string => {
  const dt = DateTime.fromISO(startTime, { setZone: true });
  return dt.toFormat("h a"); // e.g., "8 AM", "11 AM"
};
