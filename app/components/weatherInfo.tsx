import { openSans } from "../fonts/fonts";
import {
    HourlyForecastType,
    observationListType,
    ProcessedDailyForecast,
} from "../lib/types";
import { getWeatherEmoji } from "./WeatherIcons";
import TemperatureSummary from "./temp-summary";
import Image from "next/image";

interface Props {
    dailyForecasts: ProcessedDailyForecast[];
    hourlyForecast: HourlyForecastType[];
    observationList: observationListType[];
}

const WeatherInfo = ({
    dailyForecasts,
    hourlyForecast,
    observationList,
}: Props) => {
    return (
        <div>
            <TemperatureSummary
                temperature={hourlyForecast[0].temperature}
                description={hourlyForecast[0].shortForecast}
                detailedForecast={dailyForecasts[0].detailedForecast}
            />
            <div
                className={`${openSans.className} grid md:grid-cols-2 grid-cols-1 w-[24rem] md:w-[48rem] mx-auto gap-y-6`}
            >
                {/* left col */}
                <div className="grid grid-cols-1 gap-y-6">
                    {/* hourly forecast */}
                    <div className={`flex overflow-x-auto text-sm`}>
                        {hourlyForecast.map((period, index) => (
                            <div
                                key={index}
                                className="text-center flex-shrink-0 w-16 space-y-1"
                            >
                                <p className="font-medium">
                                    {period.startTime}
                                </p>
                                <p className="flex items-center justify-center">
                                    {getWeatherEmoji(
                                        period.shortForecast,
                                        period.isDaytime
                                    )}
                                </p>
                                <p className="font-semibold">
                                    {period.temperature}°
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* forecast observations */}
                    <div className="bg-black py-4 rounded text-[#FAE262] grid grid-cols-3">
                        {observationList.map((observation, index) => (
                            <div
                                key={index}
                                className="text-center space-y-1 text-sm"
                            >
                                <Image
                                    className="flex mx-auto"
                                    src={observation.icon}
                                    alt={observation.label}
                                    width={35}
                                    height={35}
                                />
                                <p className="font-medium">
                                    {observation.label}
                                </p>
                                <p className="font-semibold">
                                    {observation.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* right col */}
                <div className="w-48 mx-auto">
                    {/* daily forecast */}
                    <h1 className="font-semibold border-b border-black mb-2">
                        Daily Forecast
                    </h1>
                    <div className="grid gap-y-1">
                        {/* start from index 1 to skipt the today forecast */}
                        {dailyForecasts.slice(1).map((forecast, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-3 justify-between"
                            >
                                <p className="font-medium">{forecast.day}</p>
                                <p className="flex items-center justify-center">
                                    {getWeatherEmoji(
                                        forecast.shortForecast,
                                        forecast.isDaytime
                                    )}
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
