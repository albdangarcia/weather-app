import { openSans } from "../fonts/fonts";
import { CoordinatesTypes } from "../lib/types";
import { getCityByCoordinates } from "../lib/utils";

const DateLocation = ({
    latitude = "40.7128",
    longitude = "-74.0060",
}: CoordinatesTypes) => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        // day: "numeric",
    };
    const cityName = getCityByCoordinates(latitude, longitude);
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    return (
        <div className={`flex items-center justify-center flex-col font-bold mt-5 ${openSans.className}`}>
            <p>{formattedDate}</p>
            <p className="bg-black rounded py-1.5 px-4 text-[#FAE262]">{cityName}</p>
        </div>
    );
};

export default DateLocation;
