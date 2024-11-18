export interface DailyForecastType {
    name: string;
    startTime: string;
    endTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    windSpeed: string;
    windDirection: string;
    shortForecast: string;
    detailedForecast: string;
}

export interface hourlyForecastType {
    name: string;
    startTime: string;
    endTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    windSpeed: string;
    windDirection: string;
    shortForecast: string;
    detailedForecast: string;
}

// Define the type for observation data
export interface ObservationType {
    temperature: number;
    feelsLike: number;
    humidity: number;
    visibility: number;
    pressure: number;
}