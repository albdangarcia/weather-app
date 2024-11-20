import { montserrat } from "../fonts/fonts";
import { openSans } from "../fonts/fonts";

interface Props {
    temperature: number;
    description: string;
    detailedForecast: string;
}

const TemperatureSummary = ({
    temperature,
    description,
    detailedForecast,
}: Props) => {
    return (
        <div className="flex items-center justify-center mt-20 mb-[3rem]">
            <div className="w-96 text-center relative">
                <div className="relative">
                    <span className="rounded-full h-[16rem] w-[16rem] bg-[#FFB405] absolute z-0 left-[6rem] top-0" />
                    <p
                        className={`${montserrat.className} text-[13rem] font-extralight antialiased z-10 relative`}
                    >
                        {temperature}°
                    </p>
                </div>
                <p
                    className={`${openSans.className} top-[-1rem] relative font-semibold`}
                >
                    {description}
                </p>
                <p className={`${openSans.className} text-sm`}>{detailedForecast}</p>
            </div>
        </div>
    );
};

export default TemperatureSummary;
