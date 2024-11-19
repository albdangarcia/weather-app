import { fetchWeatherData } from "../lib/data/weather";
import {
    DailyForecastType,
    HourlyForecastType,
    ObservationType,
} from "../lib/types";
import { montserrat } from "../fonts/fonts";
import { getWeatherEmoji } from "../lib/utils";

// Define the type for the returned data
interface WeatherData {
    dailyForecasts: DailyForecastType[];
    hourlyForecast: HourlyForecastType[];
    observations: ObservationType;
}

const WeatherInfo = async () => {
    // Fetch the weather data
    const { dailyForecasts, hourlyForecast, observations }: WeatherData =
        await fetchWeatherData();

    return (
        <div>
            <h1 className="font-bold text-xl">Current Observations</h1>
            <div>
                <p>Temperature: {observations.temperature} °F</p>
                <p>Feels Like: {observations.feelsLike} °F</p>
                <p>Humidity: {observations.humidity} %</p>
                <p>Visibility: {observations.visibility} meters</p>
                <p>Pressure: {observations.pressure} inHg</p>
            </div>

            <h1 className="font-bold text-xl">Daily Forecast</h1>
            {dailyForecasts.map((period, index) => (
                <div key={index} className="mb-6">
                    <h2>{period.name}</h2>
                    <p>Short Forecast: {period.shortForecast}</p>
                    <p>Detailed Forecast: {period.detailedForecast}</p>
                    <p>
                        Temperature: {period.temperature}{" "}
                        <span className={montserrat.className}>
                            {period.temperatureUnit}
                        </span>
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

            <h1 className="font-bold text-xl">Hourly Forecast</h1>
            {hourlyForecast.map((period, index) => (
                <div key={index} className="mb-6 grid grid-flow-row">
                    <p>{period.startTime}</p>
                    <p>
                        {getWeatherEmoji(period.shortForecast, period.isDaytime)}{" "}
                        {period.shortForecast}
                    </p>
                    <p>
                        {period.temperature}{" "}
                        <span>{period.temperatureUnit}</span>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default WeatherInfo;