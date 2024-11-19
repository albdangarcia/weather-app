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

export interface HourlyForecastType {
    startTime: string;
    // endTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    shortForecast: string;
    // windSpeed: string;
    // windDirection: string;
    // detailedForecast: string;
}

// Define the type for observation data
export interface ObservationType {
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
        temperature: { value: number };
        heatIndex: { value: number | null };
        windChill: { value: number | null };
        relativeHumidity: { value: number };
        visibility: { value: number };
        barometricPressure: { value: number };
    };
}
