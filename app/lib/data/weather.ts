import {
    CoordinatesTypes,
    ForecastData,
    HourlyForecastData,
    HourlyForecastType,
    observationListType,
    ObservationsData,
    ObservationStationsData,
    ObservationType,
    PointData,
} from "../types";
import {
    calculateFeelsLike,
    celsiusToFahrenheit,
    handleApiResponse,
    metersToMiles,
    pascalToInHg,
    processDailyForecasts,
} from "../utils";

const API_CONFIG = {
    baseUrl: "https://api.weather.gov",
    headers: {
        "User-Agent": `Weather App (${process.env.USER_AGENT_EMAIL})`,
    },
} as const;

// Function to fetch weather data
const fetchWeatherData = async ({
    latitude,
    longitude,
}: CoordinatesTypes) => {
    try {
        // Validate latitude and longitude
        if (!latitude && !longitude) {
            latitude = "40.7128";
            longitude = "-74.006";
        }

        // Initial point data fetch
        const pointUrl = `${API_CONFIG.baseUrl}/points/${latitude},${longitude}`;
        const pointData = await handleApiResponse<PointData>(
            await fetch(pointUrl, {
                headers: API_CONFIG.headers,
                // cache: "force-cache",
                next: { revalidate: 600 },
            }),
            "Error fetching point data"
        );

        // Parallel fetch for forecasts and stations
        const [forecastDailyData, forecastHourlyData, observationStationsData] =
            await Promise.all([
                handleApiResponse<ForecastData>(
                    await fetch(pointData.properties.forecast, {
                        headers: API_CONFIG.headers,
                    }),
                    "Error fetching forecast data"
                ),
                handleApiResponse<HourlyForecastData>(
                    await fetch(pointData.properties.forecastHourly, {
                        headers: API_CONFIG.headers,
                    }),
                    "Error fetching hourly forecast data"
                ),
                handleApiResponse<ObservationStationsData>(
                    await fetch(pointData.properties.observationStations, {
                        headers: API_CONFIG.headers,
                    }),
                    "Error fetching observation stations data"
                ),
            ]);

        // Validate forecast data structure
        if (
            !forecastDailyData.properties?.periods ||
            !forecastHourlyData.properties?.periods
        ) {
            throw new Error("Invalid forecast data structure");
        }

        // Fetch observations from nearest station
        const nearestStation =
            observationStationsData.features[0].properties.stationIdentifier;
        const observationsUrl = `${API_CONFIG.baseUrl}/stations/${nearestStation}/observations/latest`;
        const observationsData = await handleApiResponse<ObservationsData>(
            await fetch(observationsUrl, {
                headers: API_CONFIG.headers,
                // cache: "force-cache",
                next: { revalidate: 600 },
            }),
            "Error fetching observations data"
        );

        // Process the data
        const dailyForecasts = processDailyForecasts(
            forecastDailyData.properties.periods
        );

        const hourlyForecast = forecastHourlyData.properties.periods
            .map((period: HourlyForecastType) => ({
                startTime: period.startTime,
                isDaytime: period.isDaytime,
                temperature: period.temperature,
                temperatureUnit: period.temperatureUnit,
                shortForecast: period.shortForecast,
            }))
            .slice(0, 24); // Limit to the first 24 hours

        const obserProps = observationsData.properties;
        const observations: ObservationType = {
            feelsLike: calculateFeelsLike(
                celsiusToFahrenheit(obserProps.temperature.value),
                obserProps.heatIndex.value !== null
                    ? celsiusToFahrenheit(obserProps.heatIndex.value)
                    : null,
                obserProps.windChill.value !== null
                    ? celsiusToFahrenheit(obserProps.windChill.value)
                    : null
            ),
            humidity: Math.round(obserProps.relativeHumidity.value),
            visibility: metersToMiles(obserProps.visibility.value),
            pressure: pascalToInHg(obserProps.barometricPressure.value),
        };

        const observationList: observationListType[] = [
            {
                label: "Humidity",
                icon: "/weatherIcons/humidity.svg",
                value: `${observations.humidity}%`,
            },
            {
                label: "Visibility",
                icon: "/weatherIcons/visibility.svg",
                value: `${observations.visibility} mi`,
            },
            {
                label: "Pressure",
                icon: "/weatherIcons/pressure.svg",
                value: `${observations.pressure} inHg`,
            },
        ];

        // delay to simulate loading
        // await new Promise((resolve) => setTimeout(resolve, 5000));

        return { dailyForecasts, hourlyForecast, observationList };
    } catch (error: unknown) {
        const err = error as Error;
        console.error("Weather data fetch error:", err);
        return {
            dailyForecasts: [],
            hourlyForecast: [],
            observationList: [],
            errorMessage: err.message || "Failed to fetch weather data",
        };
    }
};

export { fetchWeatherData };
