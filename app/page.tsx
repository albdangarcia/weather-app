import DateLocation from "./components/date-location";
import Nav from "./components/nav";
import WeatherInfo from "./components/weatherInfo";

export default function Home() {
    return (
        <div className="">
            <Nav />
            <DateLocation />
            <WeatherInfo />
        </div>
    );
}
