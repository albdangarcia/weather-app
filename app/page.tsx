import { notFound } from "next/navigation";
import DateLocation from "./components/date-location";
import Nav from "./components/nav";
import WeatherInfo from "./components/weatherInfo";
import { fetchWeatherData } from "./lib/data/weather";
import { getCityByCoordinates } from "./lib/utils";
import GitHubIcon from "./components/github-Icon";

interface Props {
    searchParams: SearchParamsType;
}

type SearchParamsType = Promise<{ [key: string]: string | undefined }>;

const Home = async ({ searchParams }: Props) => {
    const { latitude, longitude } = await searchParams;

    // Fetch the weather data
    const { dailyForecasts, hourlyForecast, observationList, errorMessage } =
        await fetchWeatherData({ latitude, longitude });

    // Show error message if city not found
    if (errorMessage) {
        return notFound();
    }

    // get city name from coordinates
    const cityName = getCityByCoordinates({ latitude, longitude });

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
