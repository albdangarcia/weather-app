export interface DailyForecastType {
    name: string;
    startTime: string;
    endTime: string;
    temperature: number;
    shortForecast: string;
    isDaytime: boolean;
    detailedForecast: string;
}

export interface ProcessedDailyForecast {
    day: string;
    shortForecast: string;
    detailedForecast: string;
    isDaytime: boolean;
    high: number;
    low: number;
}

export interface HourlyForecastType {
    startTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    shortForecast: string;
}

// Define the type for observation data
export interface ObservationType {
    textDescription: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    visibility: number;
    pressure: number;
}

// Type definitions for API responses
export interface PointData {
    properties: {
        forecast: string;
        forecastHourly: string;
        observationStations: string;
    };
}

export interface ForecastData {
    properties: {
        periods: DailyForecastType[];
    };
}

export interface HourlyForecastData {
    properties: {
        periods: HourlyForecastType[];
    };
}

export interface ObservationStationsData {
    features: Array<{
        properties: {
            stationIdentifier: string;
        };
    }>;
}

export interface ObservationsData {
    properties: {
        textDescription: string;
        temperature: { value: number };
        heatIndex: { value: number | null };
        windChill: { value: number | null };
        relativeHumidity: { value: number };
        visibility: { value: number };
        barometricPressure: { value: number };
    };
}
