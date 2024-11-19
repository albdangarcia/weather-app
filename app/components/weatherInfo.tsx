import { fetchWeatherData } from "../lib/data/weather";
import { getWeatherEmoji } from "./WeatherIcons";
import TemperatureSummary from "./temp-summary";

const WeatherInfo = async () => {
    // Fetch the weather data
    const { dailyForecasts, hourlyForecast, observations } =
        await fetchWeatherData();

    return (
        <div>
            <TemperatureSummary
                temperature={observations.temperature}
                description={observations.textDescription}
                detailedForecast={dailyForecasts[0].detailedForecast}
            />
            <div className="grid grid-cols-2">
                <div>
                    {/* hourly forecast */}
                    <h1 className="font-bold text-xl">Hourly Forecast</h1>
                    {hourlyForecast.map((period, index) => (
                        <div key={index} className="mb-6 grid grid-flow-row">
                            <p>{period.startTime}</p>
                            <p>
                                {getWeatherEmoji(
                                    period.shortForecast,
                                    period.isDaytime
                                )}{" "}
                                {period.shortForecast}
                            </p>
                            <p>
                                {period.temperature}{" "}
                                <span>{period.temperatureUnit}</span>
                            </p>
                        </div>
                    ))}

                    {/* forecast observations */}
                    <h1 className="font-bold text-xl">Current Observations</h1>
                    <div>
                        <p>{observations.textDescription}</p>
                        <p>{observations.temperature} °F</p>
                        <p>Feels Like: {observations.feelsLike} °F</p>
                        <p>Humidity: {observations.humidity} %</p>
                        <p>Visibility: {observations.visibility} meters</p>
                        <p>Pressure: {observations.pressure} inHg</p>
                    </div>
                </div>

                {/* daily forecast  */}
                <div>
                    <h1 className="font-bold text-xl">Daily Forecast</h1>
                    <div className="">
                        {dailyForecasts.map((forecast, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-3 justify-between"
                            >
                                <p className="font-medium">{forecast.day}</p>
                                <p className="flex items-center justify-center">
                                    {getWeatherEmoji(
                                        forecast.shortForecast,
                                        forecast.isDaytime
                                    )}{" "}
                                    {/* {forecast.shortForecast} */}
                                </p>
                                <div className="flex space-x-2 justify-center">
                                    <p className="w-12 text-left">
                                        {forecast.low}°
                                    </p>
                                    <p className="w-12 text-left">
                                        {forecast.high}°
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherInfo;
