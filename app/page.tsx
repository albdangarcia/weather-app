import DateLocation from "./components/date-location";
import Nav from "./components/nav";
import WeatherInfo from "./components/weatherInfo";
import { fetchWeatherData } from "./lib/data/weather";
import { getCityByCoordinates } from "./lib/utils";

interface Props {
    searchParams: SearchParams;
}

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const Home = async ({ searchParams }: Props) => {
    const searchParam = await searchParams;
    const latitude = searchParam.lat;
    const longitude = searchParam.lon;

    console.log(latitude, longitude);

    // Fetch the weather data
    const { dailyForecasts, hourlyForecast, observationList } =
        await fetchWeatherData({ latitude, longitude });

    // get city name from coordinates
    const cityName = getCityByCoordinates({ latitude, longitude });

    return (
        <div className="">
            <Nav />
            <DateLocation cityName={cityName} />
            <WeatherInfo
                dailyForecasts={dailyForecasts}
                hourlyForecast={hourlyForecast}
                observationList={observationList}
            />
        </div>
    );
};

export default Home;
