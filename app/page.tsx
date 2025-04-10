import DateLocation from "./components/date-location";
import Nav from "./components/nav";
import WeatherInfo from "./components/weatherInfo";
import { fetchWeatherData } from "./lib/data/weather";
import { getCityByCoordinates } from "./lib/utils";
import GitHubIcon from "./components/github-Icon";
import NotFoundError from "./not-found-error";

interface Props {
  searchParams: SearchParamsType;
}

type SearchParamsType = Promise<{ [key: string]: string | undefined }>;

const Home = async ({ searchParams }: Props) => {
  const { latitude, longitude } = await searchParams;

  // Attempt to find the city name corresponding to the given latitude and longitude.
  const cityName = getCityByCoordinates({ latitude, longitude });

  // If no city name is found for the provided coordinates (e.g., invalid coordinates or not in the predefined list),
  // render the NotFoundError component with a specific message.
  if (!cityName) {
    return <NotFoundError error={"City not found."} />;
  }

  // Fetch the weather data
  const { dailyForecasts, hourlyForecast, observationList, errorMessage } =
    await fetchWeatherData({ latitude, longitude });

  // Check if the essential weather data arrays (daily, hourly, observations) were successfully fetched and contain data.
  if (
    !dailyForecasts?.length ||
    !hourlyForecast?.length ||
    !observationList?.length
  ) {
    return <NotFoundError error={"No Data Found"} />;
  }

  return (
    <>
      <GitHubIcon />
      <div className="mb-20">
        <Nav />
        <DateLocation cityName={cityName} />
        <WeatherInfo
          dailyForecasts={dailyForecasts}
          hourlyForecast={hourlyForecast}
          observationList={observationList}
        />
      </div>
    </>
  );
};

export default Home;
