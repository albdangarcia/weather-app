import { fetchWeatherData } from "../lib/data/weather";
import { ForecastType } from "../lib/types";

const WeatherInfo = async () => {
    const forecast: ForecastType[] = await fetchWeatherData();

    return (
        <div>
            {forecast.map((period, index) => (
                <div key={index}>
                    <h2>{period.name}</h2>
                    <p>{period.shortForecast}</p>
                    <p>{period.detailedForecast}</p>
                    <p>
                        Temperature: {period.temperature}{" "}
                        {period.temperatureUnit}
                    </p>
                    <p>
                        Wind: {period.windSpeed} {period.windDirection}
                    </p>
                    <p>Daytime: {period.isDaytime ? "Yes" : "No"}</p>
                    <p>
                        Start Time:{" "}
                        {new Date(period.startTime).toLocaleString()}
                    </p>
                    <p>End Time: {new Date(period.endTime).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default WeatherInfo;
