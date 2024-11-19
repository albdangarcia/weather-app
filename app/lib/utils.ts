import { DailyForecastType, ProcessedDailyForecast } from "./types";
import Image from "next/image";

// Function to calculate the "feels like" temperature
export const calculateFeelsLike = (
    temperature: number,
    heatIndex: number | null,
    windChill: number | null
): number => {
    if (heatIndex !== null && temperature >= 80) {
        // 80°F
        return heatIndex;
    } else if (windChill !== null && temperature <= 50) {
        // 50°F
        return windChill;
    } else {
        return temperature;
    }
};

// Function to convert Celsius to Fahrenheit
export const celsiusToFahrenheit = (celsius: number): number => {
    return Math.round((celsius * 9) / 5 + 32);
};

// Function to convert pressure from Pascals to inches of mercury
export const pascalToInHg = (pascals: number): number => {
    return Math.round(pascals * 0.0002953);
};

// Function to convert meters to miles
export const metersToMiles = (meters: number): number => {
    return Math.round(meters * 0.000621371 * 100) / 100; // Round to 2 decimal places
};

// Generic helper function to handle API responses with proper typing
export const handleApiResponse = async <T>(response: Response, errorMessage: string): Promise<T> => {
    if (!response.ok) {
        throw new Error(`${errorMessage}: ${response.statusText}`);
    }
    const data = await response.json();
    return data as T;
};

// Function to format time to "h A" (e.g., "5 PM")
export const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
};

// Function to map shortForecast to emojis
// export const getWeatherEmoji = (shortForecast: string, isDaytime: boolean): string => {
//     const forecast = shortForecast.toLowerCase();
//     if (forecast.includes("sunny") || (forecast.includes("clear") && isDaytime)) {
//         return "☀️";
//     } else if (forecast.includes("clear") && !isDaytime) {
//         return "🌙";
//     } else if (forecast.includes("mostly sunny")) {
//         return "🌤️";
//     } else if (forecast.includes("partly cloudy")) {
//         return "⛅️";
//     } else if (forecast.includes("cloudy")) {
//         return "☁️";
//     } else if (forecast.includes("rain")) {
//         return "🌧️";
//     } else if (forecast.includes("snow")) {
//         return "❄️";
//     } else if (forecast.includes("thunderstorm")) {
//         return "⛈️";
//     } else if (forecast.includes("fog")) {
//         return "🌫️";
//     } else {
//         return "🌡️"; // Default emoji for other conditions
//     }
// };

// Function to process daily forecasts
export const processDailyForecasts = (periods: DailyForecastType[]): ProcessedDailyForecast[] => {
    const processedForecasts: ProcessedDailyForecast[] = [];
    
    // Remove the first period, assuming it refers to the current day (Tonight, Overnight, etc.)
    if (periods.length > 0) {
        periods.shift();  // Remove the first period
    }
    
    for (let i = 0; i < periods.length; i += 2) {
        const dayPeriod = periods[i];
        const nightPeriod = periods[i + 1];
        
        if (!dayPeriod) continue;
        
        // Extract the day name from the full name (e.g., "Tuesday" -> "Tue")
        let day = dayPeriod.name.split(' ')[0].slice(0, 3);
        
        // Replace the first day name with "Today"
        if (i === 0) {
            day = 'Today';
        }
        
        // Calculate high and low temperatures
        const high = nightPeriod ? Math.max(dayPeriod.temperature, nightPeriod.temperature) : dayPeriod.temperature;
        const low = nightPeriod ? Math.min(dayPeriod.temperature, nightPeriod.temperature) : dayPeriod.temperature;
        
        // Day temperature is the high, night temperature is the low
        processedForecasts.push({
            day,
            shortForecast: dayPeriod.shortForecast,
            isDaytime: dayPeriod.isDaytime,
            high,
            low,
        });
    }
    
    return processedForecasts;
};
