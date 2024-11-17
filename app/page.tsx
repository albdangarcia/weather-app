import WeatherInfo from "./components/weatherInfo";

export default function Home() {
    return (
        <div className="font-[family-name:var(--font-geist-sans)]">
            <h1>Weather App</h1>
            <WeatherInfo />
        </div>
    );
}
