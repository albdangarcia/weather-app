import DateLocation from "./components/date-location";
import Nav from "./components/nav";
import WeatherInfo from "./components/weatherInfo";
import { fetchWeatherData } from "./lib/data/weather";
import { getCityByCoordinates } from "./lib/utils";
import GitHubIcon from "./components/github-Icon";
import NotFoundError from "./not-found-error";
import LastGoodDataUpdater from "./components/LastGoodDataUpdater";
import { HourlyForecastType } from './lib/types';

interface Props {
  searchParams: SearchParamsType;
}

type SearchParamsType = Promise<{ [key: string]: string | undefined }>;

export default async function Home({ searchParams }: Props) {
  const { latitude, longitude } = await searchParams;

  const cityName = getCityByCoordinates({ latitude, longitude });
  
  // Fetch the weather data. fetchWeatherData handles default coordinates if lat/lon are undefined.
  const weatherApiResult = await fetchWeatherData({ latitude, longitude });

  const {
    dailyForecasts,
    hourlyForecast,
    observationList,
  } = weatherApiResult || {};

  // Check if the essential weather data arrays (daily, hourly, observations) were successfully fetched and contain data.
  if (
    !dailyForecasts?.length ||
    !hourlyForecast?.length ||
    !observationList?.length
  ) {
    return <NotFoundError error={"No weather data could be retrieved for this location."} />;
  }

  return (
    <>
      <GitHubIcon />
      <div className="mb-20">
        {/* Pass the successfully fetched data to the updater */}
        <LastGoodDataUpdater
          dailyForecasts={dailyForecasts}
          hourlyForecast={hourlyForecast as HourlyForecastType[]}
          observationList={observationList}
          cityName={cityName}
        />
        <Nav />
        <DateLocation cityName={cityName} />
        <WeatherInfo
          dailyForecasts={dailyForecasts}
          hourlyForecast={hourlyForecast as HourlyForecastType[]}
          observationList={observationList}
        />
      </div>
    </>
  );
}