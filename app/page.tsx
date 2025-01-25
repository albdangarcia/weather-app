import DateLocation from "./components/date-location";
import Nav from "./components/nav";
import WeatherInfo from "./components/weatherInfo";

interface Props {
    searchParams: SearchParams;
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Home = async ({ searchParams }: Props) => {
    const searchParam = await searchParams;

    return (
        <div className="">
            <Nav />
            <DateLocation />
            <WeatherInfo latitude={searchParam.lat} longitude={searchParam.lon}/>
        </div>
    );
};

export default Home;
