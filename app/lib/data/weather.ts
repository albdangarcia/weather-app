import {
    DailyForecastType,
    hourlyForecastType,
    ObservationType,
} from "../types";

// Function to calculate the "feels like" temperature
const calculateFeelsLike = (
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
const celsiusToFahrenheit = (celsius: number): number => {
    return Math.round((celsius * 9/5) + 32);
};

// Function to fetch weather data
const fetchWeatherData = async () => {
    // URL for the National Weather Service API for New York City
    const url = "https://api.weather.gov/points/40.7128,-74.0060";
    // Headers for the request, including User-Agent
    const headers = {
        "User-Agent": `Weather App (${process.env.USER_AGENT_EMAIL})`,
    };

    try {
        // Fetch metadata for the specified point (latitude and longitude)
        const response = await fetch(url, { headers, cache: "force-cache" });
        if (!response.ok) {
            throw new Error(
                `Error fetching point data: ${response.statusText}`
            );
        }
        const data = await response.json();

        // Extract the forecast and hourly forecast URLs from the response
        const forecastDailyUrl = data.properties.forecast;
        const forecastHourlyUrl = data.properties.forecastHourly;
        const observationStationsUrl = data.properties.observationStations;

        // Fetch the forecast data using the forecast URL
        const forecastDailyResponse = await fetch(forecastDailyUrl, {
            headers,
        });
        if (!forecastDailyResponse.ok) {
            throw new Error(
                `Error fetching forecast data: ${forecastDailyResponse.statusText}`
            );
        }
        const forecastDailyData = await forecastDailyResponse.json();

        // Fetch the hourly forecast data using the forecastHourly URL
        const forecastHourlyResponse = await fetch(forecastHourlyUrl, {
            headers,
        });
        if (!forecastHourlyResponse.ok) {
            throw new Error(
                `Error fetching hourly forecast data: ${forecastHourlyResponse.statusText}`
            );
        }
        const forecastHourlyData = await forecastHourlyResponse.json();

        const observationStationsResponse = await fetch(
            observationStationsUrl,
            { headers }
        );
        if (!observationStationsResponse.ok) {
            throw new Error(
                `Error fetching observation stations data: ${observationStationsResponse.statusText}`
            );
        }
        const observationStationsData =
            await observationStationsResponse.json();
        const nearestStation =
            observationStationsData.features[0].properties.stationIdentifier;

        const observationsUrl = `https://api.weather.gov/stations/${nearestStation}/observations/latest`;
        const observationsResponse = await fetch(observationsUrl, { headers });
        if (!observationsResponse.ok) {
            throw new Error(
                `Error fetching observations data: ${observationsResponse.statusText}`
            );
        }
        const observationsData = await observationsResponse.json();

        // Check if the forecast data structure is valid
        if (
            !forecastDailyData.properties ||
            !forecastDailyData.properties.periods
        ) {
            throw new Error("Invalid forecast data structure");
        }
        // Check if the hourly forecast data structure is valid
        if (
            !forecastHourlyData.properties ||
            !forecastHourlyData.properties.periods
        ) {
            throw new Error("Invalid hourly forecast data structure");
        }

        // Map the forecast periods to a more usable format
        const dailyForecasts = forecastDailyData.properties.periods.map(
            (period: DailyForecastType) => ({
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
            })
        );

        // Map the hourly forecast periods to a more usable format
        const hourlyForecast = forecastHourlyData.properties.periods.map(
            (period: hourlyForecastType) => ({
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
            })
        );

        // Extract additional observation details and convert to Fahrenheit
        const observations: ObservationType = {
            temperature: celsiusToFahrenheit(
                observationsData.properties.temperature.value
            ),
            feelsLike: calculateFeelsLike(
                celsiusToFahrenheit(
                    observationsData.properties.temperature.value
                ),
                observationsData.properties.heatIndex.value !== null
                    ? celsiusToFahrenheit(
                          observationsData.properties.heatIndex.value
                      )
                    : null,
                observationsData.properties.windChill.value !== null
                    ? celsiusToFahrenheit(
                          observationsData.properties.windChill.value
                      )
                    : null
            ),
            humidity: observationsData.properties.relativeHumidity.value,
            visibility: observationsData.properties.visibility.value,
            pressure: observationsData.properties.barometricPressure.value,
        };

        console.log(observations);

        return { dailyForecasts, hourlyForecast, observations };
    } catch (error) {
        // Log any errors that occur during the fetch process
        console.error(error);
        return {
            dailyForecasts: [],
            hourlyForecast: [],
            observations: {
                temperature: 0,
                feelsLike: 0,
                humidity: 0,
                visibility: 0,
                pressure: 0,
            },
        };
    }
};

export { fetchWeatherData };
