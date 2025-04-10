import { cities } from "./constants";
import { DateTime } from 'luxon';
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

    // Remove the first period (Tonight, Overnight, etc.)
    if (periods.length > 0) {
        const period = periods.shift(); // Remove the first period
        if (period) {
            processedForecasts.push({
                day: period.name,
                shortForecast: period.shortForecast,
                detailedForecast: period.detailedForecast,
                isDaytime: period.isDaytime,
                high: period.temperature,
                low: period.temperature,
            });
        }
    }

    for (let i = 0; i < periods.length; i += 2) {
        const dayPeriod = periods[i];
        const nightPeriod = periods[i + 1];

        if (!dayPeriod) continue;

        // Extract the day name from the full name (e.g., "Tuesday" -> "Tue")
        const day = dayPeriod.name.split(" ")[0].slice(0, 3);

        // Calculate high and low temperatures
        const high = nightPeriod
            ? Math.max(dayPeriod.temperature, nightPeriod.temperature)
            : dayPeriod.temperature;
        const low = nightPeriod
            ? Math.min(dayPeriod.temperature, nightPeriod.temperature)
            : dayPeriod.temperature;

        // Day temperature is the high, night temperature is the low
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
export const getCityByCoordinates = ({
    latitude = "40.7128",
    longitude = "-74.006",
}: CoordinatesTypes): string | undefined => {
    for (const cityObj of cities) {
        if (cityObj.lat === latitude && cityObj.long === longitude) {
            return cityObj.city;
        }
    }
    return undefined;
};

// Formats an ISO time string to a 12-hour time format (e.g., "8 AM", "11 AM") while preserving the original time zone.
export const formatTimeOriginalZone = (startTime: string): string => {
  const dt = DateTime.fromISO(startTime, { setZone: true });
  return dt.toFormat('h a'); // e.g., "8 AM", "11 AM"
}