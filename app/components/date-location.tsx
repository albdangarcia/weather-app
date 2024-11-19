const DateLocation = () => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        // day: "numeric",
    };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    return (
        <div className="flex items-center justify-center flex-col font-bold mt-9">
            <p>{formattedDate}</p>
            <p className="bg-black rounded py-1.5 px-4 text-[#FAE262]">New York City, NY</p>
        </div>
    );
};

export default DateLocation;
