import { openSans } from "../fonts/fonts";

interface Props {
    cityName: string | undefined;
}

const DateLocation = ({ cityName }: Props) => {
    // Getting the current date
    const currentDate = new Date();

    // Options for formatting the date
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
    };

    // Formatting the current date to a readable string
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    return (
        <div
            className={`flex items-center justify-center flex-col font-bold mt-5 ${openSans.className}`}
        >
            {/* Displaying the formatted date */}
            <p>{formattedDate}</p>
            {/* Displaying the city name or 'Unknown' if cityName is undefined */}
            <p className="bg-black rounded py-1.5 px-4 text-[#FAE262]">
                {cityName ? cityName : "Unknown"}
            </p>
        </div>
    );
};

export default DateLocation;
