import Image from "next/image";

const weatherIconMap: { [key: string]: string } = {
    "sunny": "/weatherIcons/sunny.svg",
    "clear-day": "/weatherIcons/sunny.svg",
    "clear-night": "/weatherIcons/moon.svg",
    "mostly sunny": "/weatherIcons/mostly_sunny.svg",
    "partly cloudy-day": "/weatherIcons/partly_cloudy.svg",
    "partly cloudy-night": "/weatherIcons/partly_cloudy_night.svg",
    "cloudy": "/weatherIcons/cloudy.svg",
    "rain": "/weatherIcons/rain.svg",
    "snow": "/weatherIcons/snow.svg",
    "thunderstorm": "/weatherIcons/thunderstorm.svg",
    "fog": "/weatherIcons/fog.svg",
};

export const getWeatherEmoji = (shortForecast: string, isDaytime: boolean) => {
    const forecast = shortForecast.toLowerCase();
    let iconSrc = "";

    if (forecast.includes("sunny") || (forecast.includes("clear") && isDaytime)) {
        iconSrc = weatherIconMap["sunny"];
    } else if (forecast.includes("clear") && !isDaytime) {
        iconSrc = weatherIconMap["clear-night"];
    } else if (forecast.includes("mostly sunny")) {
        iconSrc = weatherIconMap["mostly sunny"];
    } else if (forecast.includes("partly cloudy") && isDaytime) {
        iconSrc = weatherIconMap["partly cloudy-day"];
    } else if (forecast.includes("partly cloudy") && !isDaytime) {
        iconSrc = weatherIconMap["partly cloudy-night"];
    } else if (forecast.includes("cloudy")) {
        iconSrc = weatherIconMap["cloudy"];
    } else if (forecast.includes("rain")) {
        iconSrc = weatherIconMap["rain"];
    } else if (forecast.includes("snow")) {
        iconSrc = weatherIconMap["snow"];
    } else if (forecast.includes("thunderstorm")) {
        iconSrc = weatherIconMap["thunderstorm"];
    } else if (forecast.includes("fog")) {
        iconSrc = weatherIconMap["fog"];
    } else {
        iconSrc = "/weatherIcons/default.svg"; // Default icon for other conditions
    }

    return (
        <Image
            className="brightness-0"
            src={iconSrc}
            alt="Weather icon"
            width={20}
            height={20}
        />
    );
};