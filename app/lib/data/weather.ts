import { fetchWithTimeout, handleApiResponse } from "../apiUtils";
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
  ProcessedDailyForecast,
} from "../types";
import { metersToMiles, pascalToInHg, processDailyForecasts } from "../utils";

const API_CONFIG = {
  baseUrl: "https://api.weather.gov",
  headers: {
    "User-Agent": `Weather App (${process.env.USER_AGENT_EMAIL})`,
  },
} as const;

type WeatherData = {
  dailyForecasts: ProcessedDailyForecast[];
  hourlyForecast: {
    startTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    shortForecast: string;
  }[];
  observationList: observationListType[];
  errorMessage: string;
};

type FetchWeatherDataReturnType = Partial<WeatherData>;

const fetchWeatherData = async ({
  latitude,
  longitude,
}: CoordinatesTypes): Promise<FetchWeatherDataReturnType> => {
  try {
    if (!latitude || !longitude) {
      // Provide default coordinates if none are given
      latitude = "40.7128"; // New York Latitude
      longitude = "-74.006"; // New York Longitude
    }

    // Initial point data fetch
    const pointUrl = `${API_CONFIG.baseUrl}/points/${latitude},${longitude}`;
    const pointResponse = await fetchWithTimeout(pointUrl, {
      // Get the Response
      headers: API_CONFIG.headers,
      next: { revalidate: 600 },
    });
    // Pass the Response directly to the simplified handleApiResponse
    const pointData = await handleApiResponse<PointData>(
      pointResponse,
      "Error fetching point data"
    );

    // Fetch forecast and station data concurrently
    const [
      forecastDailyResponse,
      forecastHourlyResponse,
      observationStationsResponse,
    ] = await Promise.all([
      fetchWithTimeout(pointData.properties.forecast, {
        headers: API_CONFIG.headers,
      }),
      fetchWithTimeout(pointData.properties.forecastHourly, {
        headers: API_CONFIG.headers,
      }),
      fetchWithTimeout(pointData.properties.observationStations, {
        headers: API_CONFIG.headers,
      }),
    ]);

    // Process the responses concurrently
    const [forecastDailyData, forecastHourlyData, observationStationsData] =
      await Promise.all([
        handleApiResponse<ForecastData>(
          forecastDailyResponse,
          "Error fetching forecast data"
        ),
        handleApiResponse<HourlyForecastData>(
          forecastHourlyResponse,
          "Error fetching hourly forecast data"
        ),
        handleApiResponse<ObservationStationsData>(
          observationStationsResponse,
          "Error fetching observation stations data"
        ),
      ]);

    // Validate forecast data structure more carefully
    if (
      !forecastDailyData?.properties?.periods ||
      !forecastHourlyData?.properties?.periods
    ) {
      // Log the problematic data structure if possible
      console.error("Invalid forecast data structure received.", {
        forecastDailyData,
        forecastHourlyData,
      });
      throw new Error("Invalid forecast data structure");
    }
    // Also check observation stations data
    if (
      !observationStationsData?.features?.length ||
      !observationStationsData.features[0]?.properties?.stationIdentifier
    ) {
      console.error("Invalid observation stations data structure received.", {
        observationStationsData,
      });
      throw new Error("Invalid observation stations data structure");
    }

    // Fetch observations from nearest station
    const nearestStation =
      observationStationsData.features[0].properties.stationIdentifier;
    const observationsUrl = `${API_CONFIG.baseUrl}/stations/${nearestStation}/observations/latest`;
    const observationsResponse = await fetchWithTimeout(observationsUrl, {
      // Get the Response
      headers: API_CONFIG.headers,
      next: { revalidate: 600 },
    });
    // Pass the Response directly to the simplified handleApiResponse
    const observationsData = await handleApiResponse<ObservationsData>(
      observationsResponse,
      "Error fetching observations data"
    );

    // Validate observations data
    if (!observationsData?.properties) {
      console.error("Invalid observations data structure received.", {
        observationsData,
      });
      throw new Error("Invalid observations data structure");
    }
    const obserProps = observationsData.properties; // Now safe to access

    // Process the data... (rest of your processing logic)
    const dailyForecasts: ProcessedDailyForecast[] = processDailyForecasts(
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
      .slice(0, 24);

    // Safely access observation properties after validation
    const humidityValue: number | null = obserProps.relativeHumidity?.value;
    const visibilityMeters: number | null = obserProps.visibility?.value;
    const pressurePascal: number | null = obserProps.barometricPressure?.value;

    const observations: ObservationType = {
      humidity: humidityValue ? Math.round(humidityValue) : null,
      visibility: visibilityMeters ? metersToMiles(visibilityMeters) : null,
      pressure: pressurePascal ? pascalToInHg(pressurePascal) : null,
    };

    const observationList: observationListType[] = [
      {
        label: "Humidity",
        icon: "/weatherIcons/humidity.svg",
        value: observations.humidity ? `${observations.humidity}%` : "N/A",
      },
      {
        label: "Visibility",
        icon: "/weatherIcons/visibility.svg",
        value: observations.visibility
          ? `${observations.visibility} mi`
          : "N/A",
      },
      {
        label: "Pressure",
        icon: "/weatherIcons/pressure.svg",
        value: observations.pressure ? `${observations.pressure} inHg` : "N/A",
      },
    ];

    return { dailyForecasts, hourlyForecast, observationList };
  } catch (error) {
    console.error(
      "Failed to Fetch Weather Data.",
      error instanceof Error ? error.message : error
    );
    // Re-throw a user-friendly error or the specific error, ensuring it's an Error object
    const errorMessage = `Failed to Fetch Weather Data. Reason: ${
      error instanceof Error ? error.message : String(error)
    }`;
    throw new Error(errorMessage);
  }
};

export { fetchWeatherData };
