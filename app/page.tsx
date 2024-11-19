import DateLocation from "./components/date-location";
import WeatherInfo from "./components/weatherInfo";

export default function Home() {
    return (
        // <div className="font-[family-name:var(--font-geist-sans)]">
        <div className="">
            <DateLocation />
            <WeatherInfo />
        </div>
    );
}
