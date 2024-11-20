import DateLocation from "./components/date-location";
import WeatherInfo from "./components/weatherInfo";
import Image from "next/image";

export default function Home() {
    return (
        <div className="">
            <Image
                className="absolute top-3 left-4"
                src="/weatherIcons/bars.svg"
                alt="nav"
                width={33}
                height={33}
            />
            <DateLocation />
            <WeatherInfo />
        </div>
    );
}
