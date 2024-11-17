import { ForecastType } from "../types";

const fetchWeatherData = async () => {
    const url = "https://api.weather.gov/points/40.7128,-74.0060";
    const headers = {
        "User-Agent": `Weather App (${process.env.USER_AGENT_EMAIL})`,
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`Error fetching point data: ${response.statusText}`);
        }
        const data = await response.json();
        const forecastUrl = data.properties.forecast;

        const forecastResponse = await fetch(forecastUrl, { headers });
        if (!forecastResponse.ok) {
            throw new Error(`Error fetching forecast data: ${forecastResponse.statusText}`);
        }
        const forecastData = await forecastResponse.json();

        if (!forecastData.properties || !forecastData.properties.periods) {
            throw new Error('Invalid forecast data structure');
        }

        const forecast = forecastData.properties.periods.map((period: ForecastType) => ({
            name: period.name,
            startTime: period.startTime,
            endTime: period.endTime,
            isDaytime: period.isDaytime,
            temperature: period.temperature,
            temperatureUnit: period.temperatureUnit,
            windSpeed: period.windSpeed,
            windDirection: period.windDirection,
            shortForecast: period.shortForecast,
            detailedForecast: period.detailedForecast,
        }));

        return forecast;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export { fetchWeatherData };