import DateLocation from "./components/date-location";
import Nav from "./components/nav";
import WeatherInfo from "./components/weatherInfo";

interface Props {
    searchParams: SearchParams;
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Home = async ({ searchParams }: Props) => {
    const searchParam = await searchParams;
    const latParam = searchParam.lat;
    const lonParam = searchParam.lon;
    const lat: string = Array.isArray(latParam) ? latParam[0] : latParam ?? "";
    const lon: string = Array.isArray(lonParam) ? lonParam[0] : lonParam ?? "";

    return (
        <div className="">
            <Nav />
            <DateLocation latitude={lat} longitude={lon}/>
            <WeatherInfo latitude={lat} longitude={lon}/>
        </div>
    );
};

export default Home;
